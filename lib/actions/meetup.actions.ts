"use server";

import prisma from "@/lib/prisma";

import { type MeetUp } from "@prisma/client";
import {
  FilteredMeetupsResult,
  MeetUpDataType,
  MeetupTagType,
} from "@/types/posts";

import { redirect } from "next/navigation";
import { verifyAuth } from "../auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notification.actions";
import { getNotificationDate } from "@/utils";
import { PostFormValuesType } from "@/constants/posts";
import { MeetupWithTags } from "@/types/meetups.index";

export async function getAllMeetUps(): Promise<MeetUp[]> {
  try {
    const meetUps = await prisma.meetUp.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return meetUps;
  } catch (error) {
    console.error("Error getting meetUps:", error);
    throw error;
  }
}

async function handleMeetupTags(tagNames: string[]): Promise<{ id: number }[]> {
  const existingTags = await prisma.meetupTag.findMany({
    where: {
      name: {
        in: tagNames,
      },
    },
  });

  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tagNames.filter(
    (tagName) => !existingTagNames.includes(tagName)
  );

  if (newTagNames.length > 0) {
    await prisma.meetupTag.createMany({
      data: newTagNames.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  const allTags = await prisma.meetupTag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  return allTags.map((tag) => ({ id: tag.id }));
}

export async function createMeetUpWithTags(
  data: PostFormValuesType,
  tagNames: string[]
): Promise<MeetUp> {
  try {
    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to create a meetup."
    );

    const meetupData: MeetUpDataType = {
      title: data.heading,
      location: data.location ?? "",
      contactEmail: data.contactEmail ?? "",
      contactNumber: data.contactNumber ?? "",
      image: data.image ?? "",
      contentType: data.contentType,
      summary: data.content,
    };

    const allTagIdsToConnect = await handleMeetupTags(tagNames);

    const meetUp = await prisma.meetUp.create({
      data: {
        ...meetupData,
        responsiblePersonId: userId,
        clerkId,
      },
      include: {
        responsiblePerson: {
          select: {
            name: true,
            picture: true,
            username: true,
          },
        },
      },
    });

    await prisma.tagOnMeetup.createMany({
      data: allTagIdsToConnect.map((tag) => ({
        tagId: tag.id,
        meetupId: meetUp.id,
      })),
    });

    // NOTE - create notification for all followers of the user
    prisma.follower
      .findMany({
        where: {
          followedId: userId,
        },
        select: {
          followerId: true,
        },
      })
      .then((followers) => {
        const date = getNotificationDate(meetUp.createdAt);
        followers.forEach((follower) => {
          createNotification({
            date,
            meetupId: meetUp.id,
            title: meetUp.title,
            type: "MEETUP",
            userId: follower.followerId,
            senderName: meetUp.responsiblePerson.username,
            image: meetUp.responsiblePerson.picture,
          });
        });
      });

    redirect("/meet-ups");
  } catch (error) {
    console.error("Error creating meetUp:", error);
    throw error;
  }
}

export async function getTopFiveMeetupTags(): Promise<MeetupTagType[]> {
  try {
    // Group and count the tags
    const mostUsedTags = await prisma.tagOnMeetup.groupBy({
      by: ["tagId"],
      _count: {
        tagId: true,
      },
      orderBy: {
        _count: {
          tagId: "desc",
        },
      },
      take: 5,
    });

    // Fetch the details of the top tags
    const tagsWithDetails = await prisma.meetupTag.findMany({
      where: {
        id: {
          in: mostUsedTags.map((tag) => tag.tagId),
        },
      },
    });

    return tagsWithDetails;
  } catch (error) {
    console.error("Error fetching the top five meetup tags:", error);
    throw error;
  }
}

export async function getFilteredMeetups({
  tagIds,
  page = 1,
}: {
  tagIds?: number[];
  page?: number;
}): Promise<FilteredMeetupsResult> {
  const itemsPerPage = 20;
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get meetups."
    );

    const skip = (page - 1) * itemsPerPage;
    const meetups = await prisma.meetUp.findMany({
      where:
        tagIds && tagIds.length
          ? { tags: { some: { tagId: { in: tagIds } } } }
          : {},
      include: {
        responsiblePerson: {
          select: { name: true, picture: true },
        },
        tags: {
          select: { tag: { select: { id: true, name: true } } },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: itemsPerPage,
    });

    const transformedMeetups = meetups.map((meetup) => ({
      ...meetup,
      userCanEditMedia: meetup.responsiblePersonId === userId,
      tags: meetup.tags.map((t) => t.tag),
    }));

    const totalMeetups = await prisma.meetUp.count({
      where:
        tagIds && tagIds.length
          ? { tags: { some: { tagId: { in: tagIds } } } }
          : {},
    });

    const hasMore = page * itemsPerPage < totalMeetups;
    return {
      meetups: transformedMeetups,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching filtered meetups:", error);
    throw error;
  }
}

export async function getMeetupById(
  id: number
): Promise<MeetupWithTags | null> {
  try {
    const meetup = await prisma.meetUp.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          select: { tag: { select: { id: true, name: true } } },
        },
      },
    });
    if (meetup) {
      return {
        ...meetup,
        tags: meetup.tags.map((t) => t.tag),
      };
    }

    return null;
  } catch (error) {
    console.error(`Error getting meetup by ID ${id}:`, error);
    throw error;
  }
}

export type MeetupToEditType = {
  heading: string;
  content: string;
  image: string;
  contactEmail: string;
  contactNumber: string;
  location: string;
  tags: string[];
  contentType: string;
};

export async function getMeetupToEdit(
  id: number
): Promise<MeetupToEditType | null> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to edit a meetup."
    );

    const meetup = await prisma.meetUp.findUnique({
      where: {
        id,
        responsiblePersonId: userId,
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    if (!meetup) {
      return null;
    }

    return {
      heading: meetup.title,
      content: meetup.summary,
      image: meetup.image,
      contactEmail: meetup.contactEmail,
      contactNumber: meetup.contactNumber,
      location: meetup.location,
      tags: meetup.tags.map((tagOnMeetup) => tagOnMeetup.tag.name),
      contentType: meetup.contentType,
    };
  } catch (error) {
    console.error(`Error getting meetup to edit by ID ${id}:`, error);
    throw error;
  }
}

export async function updateMeetup(
  id: number,
  data: PostFormValuesType,
  tagNames: string[]
): Promise<MeetUp> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to update a meetup."
    );

    const meetupData: MeetUpDataType = {
      title: data.heading,
      location: data.location ?? "",
      contactEmail: data.contactEmail ?? "",
      contactNumber: data.contactNumber ?? "",
      image: data.image ?? "",
      contentType: data.contentType,
      summary: data.content,
    };

    const allTagIdsToConnect = await handleMeetupTags(tagNames);

    await prisma.$transaction(async (prisma) => {
      const updatedMeetup = await prisma.meetUp.update({
        where: { id, responsiblePersonId: userId },
        data: { ...meetupData, responsiblePersonId: userId },
        include: {
          responsiblePerson: true,
        },
      });

      await prisma.tagOnMeetup.deleteMany({
        where: { meetupId: id },
      });

      await prisma.tagOnMeetup.createMany({
        data: allTagIdsToConnect.map((tagId) => ({
          meetupId: updatedMeetup.id,
          tagId: tagId.id,
        })),
        skipDuplicates: true,
      });

      return updatedMeetup;
    });

    revalidatePath("/meet-ups");
    redirect("/meet-ups");
  } catch (error) {
    console.error(`Error updating meetup with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteMeetupAction(id: number): Promise<void> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to delete a meetup."
    );

    const deletedMeetup = await prisma.meetUp.delete({
      where: {
        id,
        responsiblePersonId: userId,
      },
    });

    if (!deletedMeetup) {
      throw new Error(
        `Meetup with ID ${id} not found or you are not authorized to delete it.`
      );
    }

    revalidatePath("/meet-ups");
    redirect("/meet-ups");
  } catch (error) {
    console.error("Error deleting meetUp:", error);
    throw error;
  }
}

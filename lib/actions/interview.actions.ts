"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Interview } from "@prisma/client";
import { InterviewDataType, InterviewTagType } from "@/types/posts";
import { verifyAuth } from "../auth";
import { PostFormValuesType } from "@/constants/posts";

export async function getAllInterviews(): Promise<Interview[]> {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
          },
        },
      },
    });
    return interviews;
  } catch (error) {
    console.error("Error fetching all interviews with creator details:", error);
    throw error;
  }
}

export async function getInterviewById(
  interviewId: number
): Promise<Interview | undefined> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to retrieve an interview."
    );

    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    if (!interview) {
      throw new Error(`No interview found for ID: ${interviewId}`);
    }

    const extendedInterview = {
      ...interview,
      userCanEditMedia: interview.creatorId === userId,
    };
    return extendedInterview;
  } catch (error) {
    console.error(`Error fetching interview with ID ${interviewId}:`, error);
    throw error;
  }
}

export async function getInterviewsByCreatorId(
  creatorId: number
): Promise<Interview[]> {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        creatorId,
      },
    });

    if (!interviews || interviews.length === 0) {
      throw new Error(`No interviews found for creator ID: ${creatorId}`);
    }

    return interviews;
  } catch (error) {
    console.error(
      `Error fetching interviews for creator ID ${creatorId}:`,
      error
    );
    throw error;
  }
}

async function handleInterviewTags(tagNames: string[]): Promise<number[]> {
  const existingTags = await prisma.interviewTag.findMany({
    where: {
      name: { in: tagNames },
    },
  });

  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tagNames.filter(
    (name) => !existingTagNames.includes(name)
  );

  if (newTagNames.length > 0) {
    await prisma.interviewTag.createMany({
      data: newTagNames.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }

  const allTags = await prisma.interviewTag.findMany({
    where: { name: { in: tagNames } },
  });

  return allTags.map((tag) => tag.id);
}

export async function createInterviewWithTags(
  data: PostFormValuesType,
  tagNames: string[]
): Promise<Interview> {
  try {
    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to create an interview."
    );

    const interviewData: InterviewDataType = {
      title: data.heading,
      contentType: data.contentType,
      clerkId,
      bannerImage: data.image ?? "",
      details: data.content,
      websiteLink: data.websiteLink ?? "",
      salary: Number(data.salary) || 0,
      salaryPeriod: data.salaryPeriod ?? "",
      updates: Number(data.updates) || 0,
    };

    const interview = await prisma.interview.create({
      data: {
        ...interviewData,
        creatorId: userId,
        clerkId,
      },
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
          },
        },
      },
    });

    const tagIds = await handleInterviewTags(tagNames);

    await prisma.tagOnInterview.createMany({
      data: tagIds.map((tagId) => ({
        tagId,
        interviewId: interview.id,
      })),
    });

    redirect("/interviews");
  } catch (error) {
    console.error("Error creating interview:", error);
    throw error;
  }
}

export async function getTagsByInterviewId(
  interviewId: number
): Promise<InterviewTagType[]> {
  try {
    const tagConnections = await prisma.tagOnInterview.findMany({
      where: {
        interviewId,
      },
      include: {
        tag: true,
      },
    });

    const tags = tagConnections.map((connection) => connection.tag);

    return tags;
  } catch (error) {
    console.error(
      `Error fetching tags for interview ID ${interviewId}:`,
      error
    );
    throw error;
  }
}

export async function getTopFiveTags(): Promise<InterviewTagType[]> {
  try {
    const mostUsedTags = await prisma.tagOnInterview.groupBy({
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

    const tagsWithDetails = await prisma.interviewTag.findMany({
      where: {
        id: {
          in: mostUsedTags.map((tag) => tag.tagId),
        },
      },
    });

    return tagsWithDetails;
  } catch (error) {
    console.error("Error fetching the top five tags:", error);
    throw error;
  }
}

export async function getFilteredInterviews({
  tagIds,
  page = 1,
}: {
  tagIds?: number[];
  page?: number;
}) {
  const itemsPerPage = 20;
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to retrieve interviews."
    );

    const skip = (page - 1) * itemsPerPage;
    const interviews = await prisma.interview.findMany({
      where:
        tagIds && tagIds.length
          ? {
              tags: {
                some: {
                  tagId: {
                    in: tagIds,
                  },
                },
              },
            }
          : {},
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: itemsPerPage,
    });

    const extendedInterviews = interviews.map((interview) => ({
      ...interview,
      userCanEditMedia: interview.creatorId === userId,
    }));

    const totalInterviews = await prisma.interview.count();

    const hasMore = page * itemsPerPage < totalInterviews;

    return {
      interviews: extendedInterviews,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching filtered interviews:", error);
    throw error;
  }
}

export type InterviewToEditType = {
  heading: string;
  content: string;
  image: string;
  websiteLink: string;
  salary: number;
  updates: number;
  salaryPeriod: string;
  tags: string[];
  contentType: string;
};

export async function getInterviewToEdit(
  id: number
): Promise<InterviewToEditType | null> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to edit an interview."
    );

    const interview = await prisma.interview.findUnique({
      where: {
        id,
        creatorId: userId,
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    if (!interview) {
      return null;
    }

    return {
      heading: interview.title,
      content: interview.details,
      image: interview.bannerImage,
      websiteLink: interview.websiteLink,
      salary: interview.salary,
      updates: interview.updates,
      salaryPeriod: interview.salaryPeriod,
      tags: interview.tags.map((tagOnInterview) => tagOnInterview.tag.name),
      contentType: interview.contentType,
    };
  } catch (error) {
    console.error(`Error getting interview to edit by ID ${id}:`, error);
    throw error;
  }
}

export async function updateInterview(
  id: number,
  data: PostFormValuesType,
  tagNames: string[]
): Promise<Interview> {
  try {
    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to update an interview."
    );

    const interviewData: InterviewDataType = {
      title: data.heading,
      contentType: data.contentType,
      clerkId,
      bannerImage: data.image ?? "",
      details: data.content,
      websiteLink: data.websiteLink ?? "",
      salary: Number(data.salary) || 0,
      salaryPeriod: data.salaryPeriod ?? "",
      updates: Number(data.updates) || 0,
    };

    const allTagIdsToConnect = await handleInterviewTags(tagNames);
    await prisma.$transaction(async (prisma) => {
      const updatedInterview = await prisma.interview.update({
        where: { id, creatorId: userId },
        data: { ...interviewData, creatorId: userId },
        include: {
          creator: true,
        },
      });

      await prisma.tagOnInterview.deleteMany({
        where: { interviewId: id },
      });

      await prisma.tagOnInterview.createMany({
        data: allTagIdsToConnect.map((tagId) => ({
          interviewId: updatedInterview.id,
          tagId,
        })),
        skipDuplicates: true,
      });

      return {
        heading: updatedInterview.title,
        content: updatedInterview.details,
        image: updatedInterview.bannerImage,
        websiteLink: updatedInterview.websiteLink,
        salary: updatedInterview.salary,
        salaryPeriod: updatedInterview.salaryPeriod,
      };
    });

    revalidatePath("/interviews");
    redirect("/interviews");
  } catch (error) {
    console.error(`Error updating interview with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteInterviewAction(id: number): Promise<void> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to delete an interview."
    );
    const deletedInterview = await prisma.interview.delete({
      where: {
        id,
        creatorId: userId,
      },
    });

    if (!deletedInterview) {
      throw new Error(
        `Interview with ID ${id} not found or you are not authorized to delete it.`
      );
    }

    revalidatePath("/interviews");
    redirect("/interviews");
  } catch (error) {
    console.error("Error deleting interview:", error);
    throw error;
  }
}

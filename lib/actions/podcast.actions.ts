"use server";

import { type Podcast } from "@prisma/client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { verifyAuth } from "../auth";
import { IPodcast, PodcastUserInfo } from "@/types/podcast.index";
import { POST_TYPE, PostFormValuesType } from "@/constants/posts";
import { createShow } from "./show.actions";

type PodcastByIdType = Partial<IPodcast>;

export async function getPodcastById({
  podcastId,
}: {
  podcastId: number;
}): Promise<PodcastByIdType> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get a podcast.",
      false
    );

    const podcast = await prisma.podcast.findUnique({
      where: {
        id: podcastId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        show: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      ...podcast,
      userCanEditMedia: podcast?.userId === userId,
    };
  } catch (error) {
    console.error("Error fetching podcast by ID:", error);
    throw error;
  }
}

export async function getPodcastByIdPage({
  podcastId,
}: {
  podcastId: number;
}): Promise<IPodcast | undefined> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get a podcast."
    );

    const podcast = await prisma.podcast.findUnique({
      where: {
        id: podcastId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        show: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!podcast) return;
    return {
      ...podcast,
      userCanEditMedia: podcast?.userId === userId,
    };
  } catch (error) {
    console.error("Error fetching podcast by ID:", error);
    throw error;
  }
}

export async function getAllPodcasts() {
  try {
    const podcasts = await prisma.podcast.findMany();

    return podcasts;
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    throw error;
  }
}

export async function getPodcastsWithUserInfo(
  amount: number,
  startNumber = 0
): Promise<PodcastUserInfo[]> {
  try {
    const podcasts = await prisma.podcast.findMany({
      skip: startNumber,
      take: amount,
      include: {
        user: {
          select: {
            name: true,
            location: true,
            picture: true,
          },
        },
      },
    });

    return podcasts as PodcastUserInfo[];
  } catch (error) {
    console.error("Error fetching all podcasts:", error);
    throw error;
  }
}

export async function getFilterPodcastsUserInfo({
  show,
  page = 1,
}: {
  show: number[];
  page?: number;
}) {
  const itemsPerPage = 20;
  try {
    const skip = (page - 1) * itemsPerPage;
    const podcasts = await prisma.podcast.findMany({
      where: {
        showId: {
          in: show,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            location: true,
            picture: true,
          },
        },
      },
      skip,
      take: 20,
    });

    const totalPodcasts = await prisma.podcast.count({
      where: show && show.length ? { showId: { in: show } } : {},
    });

    const hasMore = page * itemsPerPage < totalPodcasts;

    return {
      podcasts,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching filtered podcasts:", error);
    throw error;
  }
}

// The `.__isNew__` flag is specific to the react-select library.
// It indicates whether the option was created dynamically by the user
// (i.e., it's a new option that was not part of the original set of options).

export async function createPodcast(
  data: PostFormValuesType
): Promise<Podcast> {
  try {
    let newShowId = null;
    if (data.show?.__isNew__) {
      const newShow = await createShow({ name: data.show.label });
      newShowId = newShow.id;
    }

    const podcastData = {
      title: data.heading,
      details: data.content,
      image: data.image ?? "",
      url: data.podcast ?? "",
      showId: Number(newShowId) || Number(data.show!?.value),
      contentType: POST_TYPE.PODCAST,
    };

    const { clerkId, userId } = await verifyAuth(
      "You must be logged in to create a podcast."
    );

    await prisma.podcast.create({
      data: { ...podcastData, userId, clerkId },
    });

    redirect("/podcasts");
  } catch (error) {
    console.error("Error creating podcast:", error);
    throw error;
  }
}

export async function updatePodcast(id: number, data: PostFormValuesType) {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to update a podcast."
    );

    let newShowId = null;
    if (data.show!?.__isNew__) {
      const newShow = await createShow({ name: data.show.label });
      newShowId = newShow.id;
    }

    const podcastData = {
      title: data.heading,
      details: data.content,
      image: data.image ?? "",
      url: data.podcast ?? "",
      showId: Number(newShowId) || Number(data.show!?.value),
      contentType: POST_TYPE.PODCAST,
    };

    await prisma.podcast.update({
      where: {
        id,
        userId,
      },
      data: podcastData,
    });
    redirect("/podcasts");
  } catch (error) {
    console.error("Error updating podcast:", error);
    throw error;
  }
}

export async function deletePodcast(id: number) {
  try {
    const { clerkId } = await verifyAuth(
      "You must be authorized to delete a podcast."
    );

    await prisma.podcast.delete({
      where: {
        id,
        clerkId,
      },
    });

    redirect("/podcasts");
  } catch (error) {
    console.error("Error deleting podcast:", error);
    throw error;
  }
}

export async function getAllPodcastsWithUserInfo() {
  try {
    const podcasts = await prisma.podcast.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            picture: true,
          },
        },
      },
    });
    return podcasts;
  } catch (error) {
    console.error("Error retrieving podcasts with user info:", error);
    throw error;
  }
}

export async function getTopFiveShowIds() {
  try {
    const mostSubscribedShows = await prisma.usersSubscribedToShows.groupBy({
      by: ["showId"],
      _count: {
        showId: true,
      },
      orderBy: {
        _count: {
          showId: "desc",
        },
      },
      take: 5,
    });

    const showIds = mostSubscribedShows.map(
      (subscription) => subscription.showId
    );

    return showIds;
  } catch (error) {
    console.error("Error fetching the top five show IDs:", error);
    throw error;
  }
}

interface ShowOption {
  label: string;
  value: number;
}

export async function getAllShowOptions(): Promise<ShowOption[]> {
  try {
    const shows = await prisma.shows.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const showOptions: ShowOption[] = shows.map((show) => ({
      label: show.name,
      value: show.id,
    }));

    return showOptions;
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
}

export type PodcastWithShow = {
  heading: string;
  content: string;
  image: string;
  podcast: string;
  contentType: string;
  show: { label: string; value: string };
};

export async function getPodcastToEditById(
  mediaId: number
): Promise<PodcastWithShow | null> {
  try {
    const { clerkId } = await verifyAuth(
      "You must be logged in to edit a podcast."
    );

    const podcast = await prisma.podcast.findUnique({
      where: {
        id: mediaId,
        clerkId,
      },
      include: { show: true },
    });

    if (!podcast) {
      return null;
    }

    const podcastNormalised = {
      heading: podcast.title,
      content: podcast.details,
      image: podcast.image,
      podcast: podcast.url,
      contentType: podcast.contentType,
      show: { label: podcast.show.name ?? "", value: String(podcast.show.id) },
    };

    return podcastNormalised;
  } catch (error) {
    console.error("Error fetching podcast by ID:", error);
    throw error;
  }
}

"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import {
  type Podcast,
  type Interview,
  type Post,
  type Activities,
} from "@prisma/client";
import {
  PostPerformance,
  ProfileMeetup,
  UserProfile,
} from "@/types/profile.index";
import { ExtendedPrismaPost } from "@/types/posts";
import { PodcastWithUserInfo } from "@/types/podcast.index";

export async function getProfileData(
  paramsId: string
): Promise<UserProfile | null> {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to view your profile."
    );

    const data = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      include: {
        following: {
          take: 6,
          include: {
            followed: {
              select: {
                username: true,
                picture: true,
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    const isLoggedInUser = userId === data[0]?.id;

    return { ...data[0], isLoggedInUser };
  } catch (error) {
    console.error("Error fetching user by clerkId or username:", error);
    throw error;
  }
}

type ExtendedPost = Post & {
  tags: string[];
};

export type ProfilePostResponse = {
  data: ExtendedPost[];
  page: number;
  hasMore: boolean;
};

export async function getProfilePosts(
  paramsId: string,
  page = 1
): Promise<ProfilePostResponse> {
  const itemsPerPage = 5;

  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const skip = (page - 1) * itemsPerPage;

    const user = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.post.findMany({
      where: {
        authorId: user[0]?.id,
      },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: itemsPerPage,
      skip,
    });

    const totalPosts = await prisma.post.count({
      where: {
        authorId: user[0]?.id,
      },
    });

    const hasMore = page * itemsPerPage < totalPosts;

    const extendedData = data.map((post) => ({
      ...post,
      tags: post.tags.map((tagOnPost) => tagOnPost.tag.name),
    }));

    return {
      data: extendedData,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

export type ProfileMeetupResponse = {
  data: ProfileMeetup[];
  page: number;
  hasMore: boolean;
};

export async function getProfileMeetups(
  paramsId: string,
  page = 1
): Promise<ProfileMeetupResponse> {
  const itemsPerPage = 5;

  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const skip = (page - 1) * itemsPerPage;

    const user = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.meetUp.findMany({
      where: {
        responsiblePersonId: user[0]?.id,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: itemsPerPage,
      skip,
    });

    const totalMeetups = await prisma.meetUp.count({
      where: {
        responsiblePersonId: user[0]?.id,
      },
    });

    const extendedData = data.map((meetup) => ({
      ...meetup,
      tags: meetup.tags.map((obj) => {
        return { id: obj.tag.id, name: obj.tag.name };
      }),
      userCanEditMedia: true,
    }));

    const hasMore = page * itemsPerPage < totalMeetups;

    return {
      data: extendedData,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export type ProfilePodcast = Podcast & {
  user: {
    username: string;
    picture: string;
    location: string;
  };
};

export type ProfilePodcastResponse = {
  data: PodcastWithUserInfo[];
  page: number;
  hasMore: boolean;
};

export async function getProfilePodcasts(
  paramsId: string,
  page = 1
): Promise<ProfilePodcastResponse> {
  const itemsPerPage = 5;

  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const skip = (page - 1) * itemsPerPage;

    const user = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.podcast.findMany({
      where: {
        userId: user[0]?.id,
      },
      include: {
        user: {
          select: {
            username: true,
            picture: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: itemsPerPage,
      skip,
    });

    const totalPodcasts = await prisma.podcast.count({
      where: {
        userId: user[0]?.id,
      },
    });

    const hasMore = page * itemsPerPage < totalPodcasts;

    return {
      data,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export type ProfileInterview = Interview & {
  creator: {
    name: string;
    picture: string;
  };
};

export type ProfileInterviewsResponse = {
  data: ProfileInterview[];
  page: number;
  hasMore: boolean;
};

export async function getProfileInterviews(
  paramsId: string,
  page = 1
): Promise<ProfileInterviewsResponse> {
  const itemsPerPage = 5;
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const skip = (page - 1) * itemsPerPage;

    const user = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.interview.findMany({
      where: {
        creatorId: user[0]?.id,
      },
      include: {
        creator: {
          select: {
            username: true,
            name: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: itemsPerPage,
      skip,
    });

    const totalInterviews = await prisma.interview.count({
      where: {
        creatorId: user[0]?.id,
      },
    });

    const hasMore = page * itemsPerPage < totalInterviews;

    return {
      data,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

export interface ProfileHistoryResponse {
  data: Activities[];
  page: number;
  hasMore: boolean;
}

export async function getProfileHistory(
  paramsId: string,
  page = 1
): Promise<ProfileHistoryResponse> {
  const itemsPerPage = 5;

  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const skip = (page - 1) * itemsPerPage;

    const userId = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.activities.findMany({
      where: {
        userId: userId[0].id,
      },
      include: {
        post: {
          select: {
            id: true,
            image: true,
            content: true,
            viewCount: true,
            createdAt: true,
            heading: true,
            clerkId: true,
            blurImage: true,
            imageWidth: true,
            imageHeight: true,
            contentType: true,
            author: {
              select: {
                username: true,
                picture: true,
                id: true,
              },
            },
            likes: {
              select: {
                userId: true,
              },
            },
            comments: {
              select: {
                id: true,
                authorId: true,
              },
            },
            tags: {
              select: {
                tag: true,
              },
            },
          },
        },
        meetup: {
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
        podcast: {
          include: {
            user: {
              select: {
                username: true,
                picture: true,
                location: true,
              },
            },
          },
        },
        interview: {
          include: {
            creator: {
              select: {
                username: true,
                name: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: itemsPerPage,
      skip,
    });

    const totalActivities = await prisma.activities.count({
      where: {
        userId: userId[0].id,
      },
    });

    const hasMore = page * itemsPerPage < totalActivities;

    const filteredData = data.map((object) => {
      if (object.post) {
        const extendedPost: ExtendedPrismaPost = {
          ...object.post,
          numberOfAvailablePosts: totalActivities,
          likesCount: object.post.likes.length,
          commentsCount: object.post.comments.length,
          userCanEditMedia: object.post.author.id === userId[0].id,
          loggedInUserHasLikedPost: object.post.likes.some(
            (like) => like.userId === userId[0].id
          ),
          tags: object.post.tags.map((tagOnPost) => tagOnPost.tag.name),
        };
        return { ...object, post: extendedPost };
      }

      if (object.meetup) {
        const extendedMeetup: ProfileMeetup = {
          ...object.meetup,
          tags: object.meetup.tags.map((obj) => {
            return { id: obj.tag.id, name: obj.tag.name };
          }),
          userCanEditMedia: true,
        };
        return { ...object, meetup: extendedMeetup };
      }

      return object;
    });
    return {
      data: filteredData,
      page,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
}

export async function getPerformanceData(
  paramsId: string
): Promise<PostPerformance[]> {
  try {
    verifyAuth("You must be logged in to view your profile or other profiles.");

    const user = await prisma.user.findMany({
      where: {
        username: {
          equals: paramsId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
      },
    });

    const data = await prisma.post.findMany({
      where: {
        authorId: user[0]?.id,
      },
      select: {
        id: true,
        image: true,
        viewCount: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        viewCount: "desc",
      },
      take: 6,
      skip: 0,
    });

    return data;
  } catch (error) {
    console.error("Error fetching user meetups:", error);
    throw error;
  }
}

type YourReturnType = {
  data: ExtendedPost[] | ProfileMeetup[] | Podcast[] | ProfileInterview[];
  page: number;
  hasMore: boolean;
};

export type FetchFunctionType = (
  authorId: string,
  page: number
) => Promise<YourReturnType>;

"use server";

import prisma from "@/lib/prisma";
import { PostResult } from "@/types/searchbar.index";

interface SearchBarResults {
  posts: PostResult[];
  isMorePosts: boolean;
}

export async function getAllSearchBarResults(
  searchText: string,
  amountToSkip: number
): Promise<SearchBarResults> {
  try {
    const take = 10;
    let totalCount = 0;

    const postResults = await prisma.post
      .findMany({
        where: {
          heading: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          heading: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: amountToSkip,
        take,
      })
      .then((results) =>
        results.map(({ id, heading }) => ({ id, title: heading, type: "post" }))
      );
    totalCount += await prisma.post.count({
      where: {
        heading: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    const meetupResults = await prisma.meetUp
      .findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: amountToSkip,
        take,
      })
      .then((results) =>
        results.map(({ id, title }) => ({ id, title, type: "meetup" }))
      );
    totalCount += await prisma.meetUp.count({
      where: {
        title: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    const groupResults = await prisma.group
      .findMany({
        where: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: amountToSkip,
        take,
      })
      .then((results) =>
        results.map(({ id, name }) => ({ id, title: name, type: "group" }))
      );
    totalCount += await prisma.group.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    const podcastResults = await prisma.podcast
      .findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: amountToSkip,
        take,
      })
      .then((results) =>
        results.map(({ id, title }) => ({ id, title, type: "podcast" }))
      );
    totalCount += await prisma.podcast.count({
      where: {
        title: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    const interviewResults = await prisma.interview
      .findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: amountToSkip,
        take,
      })
      .then((results) =>
        results.map(({ id, title }) => ({ id, title, type: "interview" }))
      );
    totalCount += await prisma.interview.count({
      where: {
        title: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });

    const combinedResults = [
      ...postResults,
      ...meetupResults,
      ...groupResults,
      ...podcastResults,
      ...interviewResults,
    ];

    const isMorePosts = totalCount > amountToSkip + combinedResults.length;

    combinedResults.sort((a, b) => a.title.localeCompare(b.title));

    return {
      posts: combinedResults.slice(0, take), // Return only the number of items defined by `take`
      isMorePosts,
    };
  } catch (error) {
    console.error("Error retrieving combined search results:", error);
    throw error;
  }
}

export async function getSearchBarResults(
  searchText: string,
  searchHeading: string,
  amountToSkip: number
): Promise<SearchBarResults> {
  try {
    const take = 10;
    let totalCount = 0;
    let posts: PostResult[] = [];

    switch (searchHeading.toLowerCase()) {
      case "post": {
        const postResults = await prisma.post.findMany({
          skip: amountToSkip,
          take,
          where: {
            heading: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            heading: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        posts = postResults.map(({ id, heading }) => ({
          id,
          title: heading,
          type: "post",
        }));
        totalCount += await prisma.post.count({
          where: {
            heading: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        });
        break;
      }
      case "meetup": {
        const postResults = await prisma.meetUp.findMany({
          skip: amountToSkip,
          take,
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        posts = postResults.map(({ id, title }) => ({
          id,
          title,
          type: "meetup",
        }));
        totalCount += await prisma.meetUp.count({
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        });
        break;
      }
      case "group": {
        const postResults = await prisma.group.findMany({
          skip: amountToSkip,
          take,
          where: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        posts = postResults.map(({ id, name }) => ({
          id,
          title: name,
          type: "group",
        }));
        totalCount += await prisma.group.count({
          where: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        });
        break;
      }
      case "podcast": {
        const postResults = await prisma.podcast.findMany({
          skip: amountToSkip,
          take,
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        posts = postResults.map(({ id, title }) => ({
          id,
          title,
          type: "podcast",
        }));
        totalCount += await prisma.podcast.count({
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        });
        break;
      }
      case "interview": {
        const postResults = await prisma.interview.findMany({
          skip: amountToSkip,
          take,
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        posts = postResults.map(({ id, title }) => ({
          id,
          title,
          type: "interview",
        }));
        totalCount += await prisma.interview.count({
          where: {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        });
        break;
      }
      default:
        posts = [];
        break;
    }

    const postData = posts.map((post) => ({
      id: post.id,
      title: post.title,
      type: searchHeading.toLocaleLowerCase(),
    }));

    const isMorePosts = totalCount > amountToSkip + postData.length;

    return {
      posts: postData.slice(0, take),
      isMorePosts,
    };
  } catch (error) {
    console.error("Error retrieving search results:", error);
    throw error;
  }
}

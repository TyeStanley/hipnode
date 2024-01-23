"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import {
  CreateGroupParams,
  DeleteGroupParams,
  EditGroupParams,
  GetGroupByIdParams,
  GetGroupsQueryOptions,
} from "../../types/shared.types";
import { verifyAuth } from "../auth";

export async function isUserMemberOfGroup(groupId: number) {
  try {
    const { userId } = await verifyAuth();
    const isUserMemberOfGroup = await prisma.group.findFirst({
      where: {
        id: groupId,
        members: {
          some: {
            id: userId,
          },
        },
      },
    });

    return Boolean(isUserMemberOfGroup);
  } catch (error) {
    console.error("Error checking if user is a member of a group:", error);
  }
}

export async function joinGroup(groupId: number) {
  try {
    const { userId } = await verifyAuth();

    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
    revalidatePath(`/group/${groupId}`);
  } catch (error) {
    console.error("Error joining a group:", error);
  }
}

export async function leaveGroup(userId: number, groupId: number) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        admins: true,
      },
    });
    if (!group) {
      throw new Error("Group not found");
    }
    const { admins } = group;
    const isUserAdmin = admins.some((admin) => admin.id === userId);

    const updateData = isUserAdmin
      ? {
          admins: {
            disconnect: { id: userId },
          },
          members: {
            disconnect: { id: userId },
          },
        }
      : {
          members: {
            disconnect: { id: userId },
          },
        };
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: updateData,
    });

    revalidatePath(`/group/${groupId}`);
  } catch (error) {
    console.error("Error leaving a group:", error);
  }
}

// LINK - https://github.com/adrianhajdin/stack_overflow_nextjs13/blob/main/lib/actions/question.action.ts#L229
export async function createGroup(params: CreateGroupParams) {
  try {
    const {
      name,
      description,
      path,
      createdBy,
      logo,
      coverImage,
      admins,
      members,
    } = params;

    await prisma.group.create({
      data: {
        name,
        description,
        createdBy,
        logo,
        coverImage,
        admins: {
          connect: admins,
        },
        members: {
          connect: members,
        },
      },
    });
    revalidatePath(path);
  } catch (error) {
    // LINK - https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("a group with the same name already exists.");
      }
    }
  }
}

export async function getGroupById(params: GetGroupByIdParams) {
  try {
    const { groupId } = params;

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: true,
        posts: true,
        admins: true,
      },
    });

    return group;
  } catch (error) {
    console.error("Error retrieving a group:", error);
    throw error;
  }
}

export async function getGroups(myCursorId?: number) {
  // LINK - https://www.prisma.io/docs/concepts/components/prisma-client/pagination
  try {
    let queryOptions: GetGroupsQueryOptions = {
      take: 6, // Take only the limit number of results
    };

    if (myCursorId !== undefined) {
      queryOptions = {
        ...queryOptions,
        skip: 1, // Skip the first result
        cursor: { id: myCursorId },
      };
    }

    const groups = await prisma.group.findMany(queryOptions);
    return groups;
  } catch (error) {
    console.error("Error finding groups:", error);
    throw error;
  }
}

export async function editGroup(params: EditGroupParams) {
  try {
    const { groupId, name, description, logo, coverImage, admins, members } =
      params;

    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        name,
        description,
        logo,
        coverImage,
        admins: {
          connect: admins,
        },
        members: {
          connect: members,
        },
      },
    });
    revalidatePath(`/group/${groupId}`);
  } catch (error) {
    console.error("Error editing a group:", error);
    throw error;
  }
}

export async function deleteGroup(params: DeleteGroupParams) {
  try {
    const { groupId, path } = params;

    await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting a group:", error);
    throw error;
  }
}

export async function getNewlyLaunchedGroups() {
  try {
    const groups = await prisma.group.findMany({
      take: 11,
      orderBy: {
        createdAt: "desc",
      },
    });
    return groups;
  } catch (error) {
    console.error("Error finding newly launched groups:", error);
    throw error;
  }
}

export async function getMostPopularGroups() {
  try {
    const groups = await prisma.group.findMany({
      take: 11,
      orderBy: {
        members: {
          _count: "desc",
        },
      },
    });

    return groups;
  } catch (error) {
    console.error("Error finding most popular groups:", error);
    throw error;
  }
}

export async function getFastestGrowingGroups() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        members: true,
      },
    });

    const growthRates = groups.map((group) => {
      const createdAt = new Date(group.createdAt);
      const currentMembersCount = group.members.length;

      const daysSinceCreation = Math.floor(
        (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) //  (1000 * 60 * 60 * 24) equals the number of milliseconds in a day.
      );

      const growthRate = currentMembersCount / daysSinceCreation;
      return {
        id: group.id,
        name: group.name,
        logo: group.logo,
        description: group.description,
        growthRate,
      };
    });

    // Sort groups by growth rate in descending order
    growthRates.sort((a, b) => b.growthRate - a.growthRate);

    // Get the fastest-growing groups
    const fastestGrowingGroups = growthRates.slice(0, 11); // Get top 11 fastest-growing groups

    return fastestGrowingGroups;
  } catch (error) {
    console.error("Error finding fastest-growing groups:", error);
    throw error;
  }
}

interface GroupOption {
  label: string;
  value: number;
}

export async function fetchAllGroupsOptions(): Promise<GroupOption[]> {
  try {
    const groups = await prisma.group.findMany();

    const groupOptions: GroupOption[] = groups.map((group) => ({
      label: group.name,
      value: group.id,
    }));

    return groupOptions;
  } catch (error) {
    console.error("Error fetching all groups:", error);
    throw error;
  }
}

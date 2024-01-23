"use server";

import prisma from "@/lib/prisma";

export async function removeUserFromOnlineUsers(userId: number) {
  try {
    const existingOnlineUser = await prisma.onlineUser.findFirst({
      where: {
        userId,
      },
    });

    if (existingOnlineUser) {
      await prisma.onlineUser.delete({
        where: {
          id: existingOnlineUser.id,
        },
      });
      return "User removed from online users";
    } else {
      return "User not found in online users";
    }
  } catch (error) {
    console.error("Error removing user from online users:", error);
    throw error;
  }
}

export async function getAllOnlineUserIds() {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  try {
    const recentOnlineUsers = await prisma.onlineUser.findMany({
      where: {
        enteredAt: {
          gte: twoMinutesAgo,
        },
      },
      select: {
        userId: true,
      },
    });

    const userIds = recentOnlineUsers.map((user) => user.userId);

    await prisma.onlineUser.deleteMany({
      where: {
        enteredAt: {
          lt: twoMinutesAgo,
        },
      },
    });

    return userIds;
  } catch (error) {
    console.error("Error fetching and cleaning up online users:", error);
    throw error;
  }
}

export async function recreateOnlineUser(userId: number) {
  try {
    const existingOnlineUser = await prisma.onlineUser.findFirst({
      where: {
        userId,
      },
    });
    if (existingOnlineUser) {
      await prisma.onlineUser.delete({
        where: {
          id: existingOnlineUser.id,
        },
      });
    }
    const onlineUser = await prisma.onlineUser.create({
      data: {
        userId,
      },
    });
    return onlineUser;
  } catch (error) {
    console.error("Error recreating online user:", error);
    throw error;
  }
}

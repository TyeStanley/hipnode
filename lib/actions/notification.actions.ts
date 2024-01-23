"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "../auth";
import {
  CreateNotificationsParams,
  UpdateNotificationsParams,
  deleteNotificationParams,
} from "@/types/shared.types";
import { GetNotificationQueryOptions, GetNotificationsTypes } from "@/types";

export async function getUnreadNotificationsCount(
  userId: number
): Promise<number> {
  try {
    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return count;
  } catch (error) {
    console.error("Error retrieving unread notifications count:", error);
    throw error;
  }
}

export async function getUncheckedNotifications(
  userId: number,
  lastChecked: Date
): Promise<number> {
  try {
    const notifications = await prisma.notification.count({
      where: {
        userId,
        createdAt: {
          gte: lastChecked,
        },
      },
    });

    return notifications;
  } catch (error) {
    console.error("Error retrieving unchecked notifications:", error);
    throw error;
  }
}

export async function getNotificationsByCursorId(
  cursorId?: number
): Promise<GetNotificationsTypes> {
  try {
    const { userId } = await verifyAuth();

    let queryOptions: GetNotificationQueryOptions = {
      take: 10,
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (cursorId !== undefined) {
      queryOptions = {
        ...queryOptions,
        skip: 1,
        cursor: { id: cursorId },
      };
    }

    const notifications = await prisma.notification.findMany(queryOptions);

    if (!notifications) throw new Error("No notifications found");

    return {
      notifications,
      hasMoreData: notifications.length > 0,
    };
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
}

export async function createNotification({
  userId,
  image,
  senderName,
  type,
  commentContent,
  title,
  commentId,
  meetupId,
  followerId,
  likeId,
  date,
  commentParentId,
  isFollowed,
}: CreateNotificationsParams): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        senderName,
        image,
        userId,
        type,
        commentContent,
        title,
        commentId,
        meetupId,
        followerId,
        likeId,
        date,
        commentParentId,
        isFollowed,
      },
    });
  } catch (error) {
    console.error("Error creating notifications:", error);
    throw error;
  }
}

export async function deleteNotification({
  commentId,
  meetupId,
  followerId,
  likeId,
}: deleteNotificationParams): Promise<void> {
  try {
    await prisma.notification.deleteMany({
      where: {
        commentId,
        meetupId,
        followerId,
        likeId,
      },
    });

    if (commentId) {
      await prisma.notification.deleteMany({
        where: {
          commentParentId: commentId,
        },
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}

export async function updateNotification({
  commentContent,
  title,
  commentId,
  meetupId,
  followerId,
  likeId,
  date,
  isFollowed,
  isRead,
}: UpdateNotificationsParams): Promise<void> {
  try {
    await prisma.notification.updateMany({
      where: {
        commentId,
        meetupId,
        followerId,
        likeId,
      },
      data: {
        commentContent,
        title,
        date,
        isFollowed,
        isRead,
      },
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
}

export async function markAllReadNotifications(): Promise<void> {
  try {
    await prisma.notification.updateMany({
      where: {
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    console.error("Error mark all read notifications:", error);
    throw error;
  }
}

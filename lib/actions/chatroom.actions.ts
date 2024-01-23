"use server";

import prisma from "@/lib/prisma";

import {
  ChatroomType,
  CreateMessageType,
  EditMessageType,
} from "@/types/chatroom.index";
import { verifyAuth } from "../auth";

export async function createChatroom(userIds: number[]) {
  try {
    const chatroom = await prisma.chatroom.create({
      data: {},
    });

    await Promise.all(
      userIds.map((userId) =>
        prisma.chatroomUsers.create({
          data: {
            userId,
            chatroomId: chatroom.id,
          },
        })
      )
    );

    return chatroom;
  } catch (error) {
    console.error("Error creating chatroom:", error);
    throw error;
  }
}

export async function addUserToChatroom(data: ChatroomType) {
  try {
    const { userId, chatroomId } = data;

    const chatroomUser = await prisma.chatroomUsers.create({
      data: {
        userId,
        chatroomId,
      },
    });

    return chatroomUser;
  } catch (error) {
    console.error("Error adding user to chatroom:", error);
    throw error;
  }
}

export async function getAllChatroomUsers() {
  try {
    const chatroomUsers = await prisma.chatroomUsers.findMany();

    return chatroomUsers;
  } catch (error) {
    console.error("Error fetching chatroom users:", error);
    throw error;
  }
}

export async function isExistingChatroom(
  userIds: number[]
): Promise<number | null> {
  try {
    const [userId1, userId2] = userIds;

    const chatroomsForUser1 = await prisma.chatroomUsers.findMany({
      where: { userId: userId1 },
      select: { chatroomId: true },
    });

    for (const chatroom of chatroomsForUser1) {
      const user2InChatroom = await prisma.chatroomUsers.findFirst({
        where: {
          chatroomId: chatroom.chatroomId,
          userId: userId2,
        },
      });

      if (user2InChatroom) {
        return chatroom.chatroomId;
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding shared chatroom ID:", error);
    throw error;
  }
}

export async function getUserChatrooms() {
  const { userId } = await verifyAuth(
    "You must be logged in to view notifications.",
    false
  );
  try {
    const userChatrooms = await prisma.chatroomUsers.findMany({
      where: {
        userId,
      },
      include: {
        Chatroom: {
          include: {
            Message: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            ChatroomUsers: {
              where: {
                userId: {
                  not: userId,
                },
              },
              include: {
                User: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    picture: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Filter and map in a single step
    const chatroomsWithRecentMessage = userChatrooms
      .map(({ Chatroom }) => {
        const recentMessage = Chatroom.Message[0] || null;
        const otherUser = Chatroom.ChatroomUsers[0]?.User || null;

        return {
          id: Chatroom.id,
          createdAt: Chatroom.createdAt,
          updatedAt: Chatroom.updatedAt,
          recentMessage,
          otherUser,
        };
      })
      .filter((chatroom) => chatroom.recentMessage !== null);

    // Sort the filtered chatrooms
    chatroomsWithRecentMessage.sort((a, b) => {
      const dateA = new Date(a.recentMessage.createdAt).getTime();
      const dateB = new Date(b.recentMessage.createdAt).getTime();
      return dateB - dateA;
    });

    return chatroomsWithRecentMessage;
  } catch (error) {
    console.error("Error fetching chatrooms for user:", error);
    throw error;
  }
}

export async function removeUserFromChatroom(data: ChatroomType) {
  try {
    const { userId, chatroomId } = data;

    const chatroomUser = await prisma.chatroomUsers.deleteMany({
      where: {
        userId,
        chatroomId,
      },
    });

    return chatroomUser;
  } catch (error) {
    console.error("Error removing user from chatroom:", error);
    throw error;
  }
}

export async function deleteChatroom(chatroomId: number) {
  try {
    await prisma.chatroomUsers.deleteMany({
      where: {
        chatroomId,
      },
    });

    const chatroom = await prisma.chatroom.delete({
      where: {
        id: chatroomId,
      },
    });

    return chatroom;
  } catch (error) {
    console.error("Error deleting chatroom:", error);
    throw error;
  }
}

export async function createMessage(data: CreateMessageType) {
  const { chatroomId, userId, receiverUserId } = data;
  try {
    const message = await prisma.message.create({
      data,
    });

    createLiveChatNotification({
      chatroomId,
      messageId: message.id,
      userId,
      receiverUserId,
    });

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

export async function deleteMessage(messageUUID: string) {
  try {
    const message = await prisma.message.findFirst({
      where: { messageUUID },
    });

    if (!message) {
      throw new Error("Message not found");
    }

    const deletedMessage = await prisma.message.delete({
      where: { id: message.id },
    });

    return deletedMessage;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

export async function editMessage(data: EditMessageType) {
  const { messageUUID, text } = data;

  try {
    const message = await prisma.message.findFirst({
      where: { messageUUID },
    });

    if (!message) {
      throw new Error("Message not found");
    }
    const updatedMessage = await prisma.message.update({
      where: { id: message.id },
      data: { text },
    });

    return updatedMessage;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
}

export async function getMessagesForChatroom(chatroomId: number) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatroomId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error retrieving messages for chatroom:", error);
    throw error;
  }
}

type ChatNotificationType = {
  chatroomId: number;
  userId: number;
  messageId: number;
  receiverUserId: number;
};

export async function createLiveChatNotification(data: ChatNotificationType) {
  try {
    const updateResult = await prisma.chatNotification.updateMany({
      where: {
        chatroomId: data.chatroomId,
        userId: data.userId,
        hasBeenRead: false,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
    if (updateResult.count > 0) {
      return updateResult;
    } else {
      const newNotification = await prisma.chatNotification.create({
        data: { ...data },
      });
      return newNotification;
    }
  } catch (error) {
    console.error("Error creating/updating live chat notification:", error);
  }
}

export async function getUnreadNotifications() {
  const { userId } = await verifyAuth(
    "You must be logged in to view notifications.",
    false
  );

  try {
    const unreadNotifications = await prisma.chatNotification.findMany({
      where: {
        receiverUserId: userId,
        hasBeenRead: false,
      },
      select: {
        id: true,
        chatroomId: true,
        userId: true,
        receiverUserId: true,
        count: true,
      },
    });

    const notificationsData = unreadNotifications.map((notification) => ({
      chatNotificationId: notification.id,
      chatroomId: notification.chatroomId,
      userId: notification.userId,
      receiverUserId: notification.receiverUserId,
      count: notification.count,
    }));

    return notificationsData;
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    return [];
  }
}

export async function deleteChatNotification(
  notificationId: number
): Promise<boolean> {
  const { userId } = await verifyAuth(
    "You must be logged in to view notifications.",
    false
  );
  try {
    await prisma.chatNotification.delete({
      where: {
        id: notificationId,
        receiverUserId: userId,
      },
    });
    return true;
  } catch (error) {
    console.error(
      `Error deleting chat notification with ID ${notificationId}:`,
      error
    );
    return false;
  }
}

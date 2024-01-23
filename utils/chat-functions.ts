/* eslint-disable no-unused-vars */

import {
  useCallback,
  ChangeEvent,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { Types } from "ably";
import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

import {
  createLiveChatNotification,
  createMessage,
  deleteMessage,
  editMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import { uploadLivechatAttachment, getMediaType, adjustHeight } from "@/utils";
import {
  ChatMessage,
  ChatroomUser,
  LiveChatSubmissionProps,
  handleEmojiSelectProps,
  loadMessagesProps,
  useDropzoneHandlerProps,
} from "@/types/chatroom.index";

export enum API_RESULT {
  SUCCESS,
  FAILURE,
}

export const loadMessages = async ({
  chatroomId,
  chatroomUsers,
}: loadMessagesProps) => {
  if (chatroomId === null) {
    console.error("Invalid chatroom ID");
    return;
  }
  try {
    const messages = await getMessagesForChatroom(chatroomId);
    const transformedMessages = messages.map((message) => {
      const user = chatroomUsers.find((u) => u.id === message.userId);
      return {
        data: {
          user: {
            id: message.userId,
            username: user?.username,
            image: user?.image || "/christopher.png",
          },
          messageId: message.id,
          attachment: message.attachment || null,
          attachmentType: message.attachmentType || null,
          text: message.text || null,
          createdAt: message.createdAt,
          messageUUID: message.messageUUID,
        },
      };
    });
    return {
      messages: transformedMessages,
      success: API_RESULT.SUCCESS,
    };
  } catch (error) {
    console.error("Error fetching messages for chatroom:", error);
    return {
      error: "Failed to fetch messages",
      success: API_RESULT.FAILURE,
    };
  }
};

const uploadAttachment = async (file: File | File[]) => {
  try {
    const uploadResult = await uploadLivechatAttachment(file);
    return uploadResult.publicURL;
  } catch (error) {
    console.error("Error uploading:", error);
    throw new Error("Failed to upload file.");
  }
};

export const liveChatSubmission = async (args: LiveChatSubmissionProps) => {
  const {
    messageText,
    droppedFile,
    channel,
    chatroomId,
    currentUser,
    receiverUserId,
  } = args;

  const mediaType = droppedFile ? getMediaType(droppedFile) : null;

  let attachmentURL = null;
  const messageContent = messageText.trim();
  if (droppedFile) {
    attachmentURL = await uploadAttachment(droppedFile);
  }

  if (
    !chatroomId ||
    !currentUser.id ||
    (!attachmentURL && messageContent.length === 0)
  ) {
    return;
  }

  const messageUniqueId = uuidv4();
  const chatMessage = {
    text: messageContent || null,
    user: currentUser,
    chatroomId,
    attachment: attachmentURL,
    attachmentType: mediaType,
    createdAt: new Date(),
    messageUUID: messageUniqueId,
  };

  try {
    await channel.publish("chat-message", chatMessage);
    await createMessage({
      text: chatMessage.text,
      userId: currentUser.id,
      receiverUserId,
      chatroomId,
      attachment: chatMessage.attachment,
      attachmentType: chatMessage.attachmentType,
      messageUUID: messageUniqueId,
    });
    return API_RESULT.SUCCESS;
  } catch (error) {
    console.error("Error sending or creating message:", error);
    return API_RESULT.FAILURE;
  }
};

export const useDropzoneHandler = ({
  setDroppedFile,
}: useDropzoneHandlerProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) return;
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        const mediaType = getMediaType(file);
        if (mediaType === "unknown") return;
        setDroppedFile(file);
      }
    },
    [setDroppedFile]
  );

  return onDrop;
};

export const userTypingChange = ({
  e,
  setMessageText,
  typingChannel,
  userInfo,
  chatroomId,
  typingTimeoutRef,
}: {
  e: ChangeEvent<HTMLTextAreaElement>;
  setMessageText: (messageText: string) => void;
  typingChannel: Types.RealtimeChannelPromise;
  userInfo: ChatroomUser;
  chatroomId: number | null;
  typingTimeoutRef: MutableRefObject<number | null>;
}) => {
  const newMessageText = e.target.value;
  setMessageText(newMessageText);
  adjustHeight(e.target);

  // Check if the user is typing something
  if (newMessageText.trim() !== "" && typingChannel) {
    // Clear any existing timeout to reset the timer
    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send 'user is typing' message
    typingTimeoutRef.current = window.setTimeout(() => {
      typingChannel.publish("typing-status", {
        isTyping: true,
        userId: userInfo.id,
        username: userInfo.username,
        chatroomId,
      });

      // Set another timeout for 'user stopped typing' message
      typingTimeoutRef.current = window.setTimeout(() => {
        typingChannel.publish("typing-status", {
          isTyping: false,
          userId: userInfo.id,
          username: userInfo.username,
          chatroomId,
        });
      }, 1000); // Adjust the time as necessary
    }, 200); // Debounce delay (200ms is a common choice)
  }
};

export const handleDeleteClick = async ({
  messageUUID,
  setMessages,
}: {
  messageUUID: string;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}) => {
  try {
    const deletedMessage = await deleteMessage(messageUUID);
    if (deletedMessage) {
      setMessages((prevMessages) =>
        prevMessages.filter(
          (message) => message.data.messageUUID !== messageUUID
        )
      );
    }
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};

export const handleEditClick = async ({
  messageUUID,
  text,
}: {
  messageUUID: string;
  text: string;
}) => {
  try {
    await editMessage({ messageUUID, text });
  } catch (error) {
    console.error("Error deleting message:", error);
  }
};
export const findAudioDuration = (url: string) => {
  const match = url.match(/duration-(\d+)/);
  const extractedDuration = match ? parseInt(match[1], 10) : 0;
  return extractedDuration;
};

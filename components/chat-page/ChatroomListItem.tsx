import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useChannel } from "ably/react";

import { formatRelativeTime } from "@/utils";
import useChatStore from "@/app/chatStore";
import { ChatroomListItemProps, UserTyping } from "@/types/chatroom.index";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { deleteChatNotification } from "@/lib/actions/chatroom.actions";

const ChatroomListItem = ({
  chatroom,
  setShowChatRoomList,
  notification,
}: ChatroomListItemProps) => {
  const { setChatroomId, setChatroomUsers, chatroomId, onlineUsers } =
    useChatStore();
  const { userInfo } = useChatPageContext();
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const {
    id: chatroomListId,
    recentMessage: {
      text: recentMessageText,
      createdAt: recentMessageCreatedAt,
    },
    otherUser,
  } = chatroom;

  useEffect(() => {
    if (notification !== null && chatroomId !== chatroomListId) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  useEffect(() => {
    const handleReadNotification = async () => {
      if (chatroomId !== chatroomListId || notification === null) return;
      try {
        setShowNotification(false);
        deleteChatNotification(notification.chatNotificationId);
      } catch (error) {
        console.error("There was an error deleting the notification", error);
      }
    };
    handleReadNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroomId, notification]);

  useChannel("hipnode-livechat-typing-status", (message) => {
    setUserTyping(message.data);
  });

  const isChatroomUserTyping = useMemo(() => {
    return userTyping?.isTyping && userTyping.userId === otherUser.id;
  }, [userTyping, otherUser.id]);

  const isOtherUserOnline = onlineUsers
    ? onlineUsers.includes(otherUser.id)
    : false;

  if (!otherUser) return null;

  const formattedTime = formatRelativeTime(recentMessageCreatedAt);

  const handleChatroomClick = () => {
    if (userInfo && otherUser.id) {
      setChatroomUsers([
        userInfo,
        {
          id: otherUser.id,
          username: otherUser.username,
          image: otherUser.picture,
          name: otherUser.name,
        },
      ]);
      setChatroomId(chatroomListId);
      if (window.innerWidth < 768) {
        setShowChatRoomList(false);
      }
    }
  };

  return (
    <li
      className={`flex cursor-pointer gap-4 border-b border-sc-6 bg-light p-4 hover:bg-light-2 dark:border-dark-4 dark:bg-dark-2
    hover:dark:bg-dark-3 ${
      chatroomId === chatroomListId && "bg-light-2 dark:bg-dark-3"
    }`}
      onClick={handleChatroomClick}
    >
      <div
        className={`mt-4 h-2 w-2 rounded-full bg-red ${
          showNotification ? "flex" : "hidden"
        }`}
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            <figure className="relative flex h-10 w-10">
              <Image
                src={otherUser.picture}
                alt={`profile image for ${otherUser.name}`}
                height={40}
                width={40}
                className="shrink-0 rounded-full object-cover"
              />
              {isOtherUserOnline && (
                <figcaption className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-sc-2 bg-green-500 dark:border-light" />
              )}
            </figure>
            <div className="flex h-full flex-col justify-between">
              <p className="bold-14 text-sc-2_light">{otherUser.name}</p>
              <p className="regular-14 text-sc-4 dark:text-light-2">
                @{otherUser.username}
              </p>
            </div>
          </div>
          <time className="regular-14 text-sc-2_light">{formattedTime}</time>
        </div>
        <div>
          {isChatroomUserTyping ? (
            <p className="regular-14 text-sc-4">
              {otherUser.username} is typing...
            </p>
          ) : (
            <p className="regular-14 line-clamp-2 text-sc-4">
              {recentMessageText}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatroomListItem;

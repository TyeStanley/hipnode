"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PopoverClose } from "@radix-ui/react-popover";

import { formatRelativeTime } from "@/utils";
import useChatStore from "@/app/chatStore";
import { UserChatroomProps } from "@/types/searchbar.index";
import { NotificationType } from "@/types/chatroom.index";
import { deleteChatNotification } from "@/lib/actions/chatroom.actions";

const NavBarChatListItem = ({
  chatroom,
  notification,
}: {
  chatroom: UserChatroomProps;
  notification: NotificationType;
}) => {
  const { setChatroomUsers, setShowChat, createNewChatroom, userInfo } =
    useChatStore();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (notification !== null) {
      setShowNotification(true);
    }
  }, [notification]);

  const {
    recentMessage: {
      text: recentMessageText,
      createdAt: recentMessageCreatedAt,
    },
    otherUser: { id, username, picture: image, name },
  } = chatroom;

  const formattedTime = formatRelativeTime(recentMessageCreatedAt);

  const handleClick = async () => {
    setShowChat(true);

    if (id) {
      const chatroomUsers = [
        userInfo,
        {
          id,
          username,
          image,
          name,
        },
      ];
      setChatroomUsers(chatroomUsers);
      createNewChatroom();
    }
    if (notification) {
      setShowNotification(false);
      deleteChatNotification(notification.chatNotificationId);
    }
  };

  return (
    <PopoverClose
      className="flex cursor-pointer items-center justify-between gap-12 px-5 py-2.5 hover:bg-light-2 dark:hover:bg-dark-3"
      onClick={() => handleClick()}
    >
      <div className="flex gap-2.5">
        <Image
          src={image}
          alt={`profile image for ${name}`}
          height={40}
          width={40}
          className="shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="semibold-16 text-sc-2_light-2 line-clamp-1 self-start truncate">
            {name} <span className="regular-12 text-sc-3">{formattedTime}</span>
          </h3>
          <p className="regular-12 self-start text-sc-3">{recentMessageText}</p>
        </div>
      </div>
      {showNotification && notification && (
        <p className="semibold-14 flex-center h-[1.125rem] w-[1.125rem] rounded-full bg-red-80 text-white">
          {notification?.count}
        </p>
      )}
    </PopoverClose>
  );
};

export default NavBarChatListItem;

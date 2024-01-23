"use client";

import FillIcon from "../icons/fill-icons";
import useChatStore from "@/app/chatStore";
import { BaseUserInfo } from "@/types/profile.index";

const ProfileLiveChat = ({
  userInfo: chatroomUserInfo,
}: {
  userInfo: BaseUserInfo;
}) => {
  const {
    setChatroomUsers,
    setShowChat,
    createNewChatroom,
    userInfo,
    showChat,
  } = useChatStore();

  const { id, username, image, name } = chatroomUserInfo;

  const handleUserClick = (clickedUserId: number) => {
    const clickedUser = clickedUserId;

    if (clickedUser) {
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
      setShowChat(true);
      createNewChatroom();
    }
  };

  return (
    <button
      onClick={() => handleUserClick(id)}
      disabled={showChat}
      className="flex h-full items-center justify-center rounded-lg bg-blue-10 px-2.5 dark:bg-dark-4"
    >
      <FillIcon.Message className="fill-blue" />
    </button>
  );
};

export default ProfileLiveChat;

"use client";

import { useEffect } from "react";

import useChatStore from "@/app/chatStore";
import {
  getAllOnlineUserIds,
  recreateOnlineUser,
} from "@/lib/actions/online-user.actions";
import NavBarChatList from "./NavBarChatList";
import { ChatPageLinkProps } from "@/types/searchbar.index";

const ChatPageLink = ({ userInfo, userChatrooms }: ChatPageLinkProps) => {
  const { id } = userInfo;
  const { setUserInfo, setOnlineUsers } = useChatStore();

  const resetOnlineUsers = async () => {
    try {
      const onlineUserIds = await getAllOnlineUserIds();
      setOnlineUsers(onlineUserIds);
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  useEffect(() => {
    const handleAddUser = async () => {
      try {
        await recreateOnlineUser(id);
        await resetOnlineUsers();
      } catch (error) {
        console.error("Error adding user to online users:", error);
      }
    };
    if (id > 0) {
      handleAddUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const resetUsersPeriodically = async () => {
      try {
        const recreatedUser = await recreateOnlineUser(id);
        if (recreatedUser) {
          await resetOnlineUsers();
        }
      } catch (error) {
        console.error("Error resetting online users periodically:", error);
      }
    };
    const intervalId = setInterval(() => {
      if (id > 0) {
        resetUsersPeriodically();
      }
    }, 120000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setUserInfo(userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return <NavBarChatList userChatrooms={userChatrooms} />;
};

export default ChatPageLink;

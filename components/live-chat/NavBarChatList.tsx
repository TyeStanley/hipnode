"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";

import FillIcon from "../icons/fill-icons";
import NavBarChatListItem from "./NavBarChatListItem";
import { UserChatroomProps } from "@/types/searchbar.index";
import { NotificationType } from "@/types/chatroom.index";
import {
  getUnreadNotifications,
  getUserChatrooms,
} from "@/lib/actions/chatroom.actions";
import { LoaderComponent } from "../onboarding-components";
import { supabase } from "@/utils/supabaseClient";
import useChatStore from "@/app/chatStore";

const NavBarChatList = ({
  userChatrooms,
}: {
  userChatrooms: UserChatroomProps[];
}) => {
  const { userInfo, showChat, chatroomId } = useChatStore();
  const [hover, setHover] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatrooms, setChatrooms] =
    useState<UserChatroomProps[]>(userChatrooms);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const path = usePathname();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (notifications.length === 0) {
      setIsNewNotification(false);
    }
  }, [notifications]);

  const fetchNotifications = async (setLoader = true) => {
    try {
      if (setLoader) setIsLoading(true);
      const unreadNotifications = await getUnreadNotifications();
      if (unreadNotifications) {
        setNotifications(unreadNotifications);
      }
    } catch (error) {
      console.log("There was an error fetching your notifications", error);
    } finally {
      if (setLoader) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [isOpen]);

  /* @ts-ignore */
  const handleChange = (payload) => {
    const isCurrentUserMessageReceiver =
      payload.new.receiverUserId === userInfo.id;
    const isChatOpenForNotification =
      showChat && chatroomId === payload.new.chatroomId;

    if (isCurrentUserMessageReceiver && !isChatOpenForNotification) {
      fetchNotifications(false);
      refetchChatrooms();
      setIsNewNotification(true);
    }
  };

  useEffect(() => {
    supabase
      .channel("ChatNotification")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ChatNotification" },
        handleChange
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "ChatNotification" },
        handleChange
      )
      .subscribe();
  });

  if (path === "/chat") {
    return (
      <div className="cursor-not-allowed rounded-md bg-red p-2.5">
        <FillIcon.Message className="fill-white" />
      </div>
    );
  }

  const isActiveOrHovered = path === "/chat" || hover || isNewNotification;
  const chatIconBackgroundColor = isActiveOrHovered
    ? "bg-red"
    : "bg-sc-6 dark:bg-dark-4";
  const chatIconFillColor = isActiveOrHovered
    ? "fill-white"
    : "fill-sc-4 dark:fill-sc-6";

  const getNotificationsForChatroom = (chatroomId: number) => {
    return (
      notifications.filter(
        (notification) => notification.chatroomId === chatroomId
      )[0] || null
    );
  };

  const refetchChatrooms = async () => {
    try {
      const chatrooms = await getUserChatrooms();
      setChatrooms(chatrooms);
    } catch (error) {
      console.error("Error refetching chatrooms:", error);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={`rounded-md p-2.5 ${chatIconBackgroundColor}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FillIcon.Message className={chatIconFillColor} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-light_dark-4 mt-4 flex w-full min-w-[18rem] max-w-[21rem] flex-col gap-4 rounded-lg py-5 shadow-md">
          <h2 className="semibold-18 text-sc-2_light-2 px-5">Messages</h2>
          <ul className="flex h-full max-h-[18.125rem] w-full flex-col overflow-auto">
            {isLoading ? (
              <div className="flex-center h-full w-full py-5">
                <LoaderComponent />
              </div>
            ) : (
              chatrooms.map((chatroom) => (
                <NavBarChatListItem
                  key={chatroom.id}
                  chatroom={chatroom}
                  notification={getNotificationsForChatroom(chatroom.id)}
                />
              ))
            )}
          </ul>
          <Link href="/chat" className="semibold-14 self-center px-5 text-blue">
            See all in Messenger
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavBarChatList;

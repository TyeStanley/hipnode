import { useEffect, useState } from "react";
import { useChannel } from "ably/react";

import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatPageSearchBar, ChatroomListItem } from ".";
import {
  getUnreadNotifications,
  getUserChatrooms,
} from "@/lib/actions/chatroom.actions";
import { ChatMessage, NotificationType } from "@/types/chatroom.index";
import OutlineIcon from "../icons/outline-icons";
import useChatStore from "@/app/chatStore";
import { supabase } from "@/utils/supabaseClient";

const ChatPageChatList = () => {
  const { userInfo, chatroomId } = useChatStore();
  const { chatrooms, messages, showChatRoomList, setShowChatRoomList } =
    useChatPageContext();

  const [chatroomsList, setChatroomsList] = useState(chatrooms);
  const [recentMessage, setRecentMessage] = useState<String | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isNewNotification, setIsNewNotification] = useState(false);

  useChannel("hipnode-livechat", (message: ChatMessage) => {
    const chatroomExists = chatroomsList.find(
      (chatroom) => chatroom.id === message.data.chatroomId
    );
    if (chatroomExists) {
      setRecentMessage(message.data.text);
    }
  });

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getUserChatrooms();
      setChatroomsList(chatrooms);
    };
    fetchChatrooms();
  }, [messages, recentMessage, isNewNotification]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const unreadNotifications = await getUnreadNotifications();
        if (unreadNotifications) {
          setNotifications(unreadNotifications);
        }
      } catch (error) {
        console.error("There was an error fetching your notifications", error);
      }
    };
    fetchNotifications();
  }, [isNewNotification, chatroomsList]);

  const getNotificationsForChatroom = (chatroomId: number) => {
    return (
      notifications.filter(
        (notification) => notification.chatroomId === chatroomId
      )[0] || null
    );
  };

  /* @ts-ignore */
  const handleChange = (payload) => {
    const isRelevantNotification = chatroomsList.some(
      (chatroom) =>
        chatroom.id === payload.new.chatroomId &&
        payload.new.receiverUserId === userInfo.id
    );

    const isChatOpenForNotification = chatroomId === payload.new.chatroomId;

    if (isRelevantNotification && !isChatOpenForNotification) {
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

  return (
    <section className="flex h-fit w-full flex-col bg-light dark:bg-dark-2 md:h-full md:max-w-[27.5rem]">
      <div className="p-4 md:p-6">
        <p className="bold-18 text-sc-2_light">Messages</p>
      </div>
      <ChatPageSearchBar />
      {chatroomsList.length === 0 && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="self-center text-lg text-sc-4">
            Search to start a new chat
          </p>
          <OutlineIcon.Search className="h-8 w-8 stroke-sc-4" />
        </div>
      )}
      {showChatRoomList && (
        <ul className="flex h-full w-full flex-col overflow-scroll md:h-screen">
          {chatroomsList.map((chatroom) =>
            chatroom.recentMessage ? (
              <ChatroomListItem
                key={chatroom.id}
                chatroom={chatroom}
                setShowChatRoomList={setShowChatRoomList}
                notification={getNotificationsForChatroom(chatroom.id)}
              />
            ) : null
          )}
        </ul>
      )}
    </section>
  );
};

export default ChatPageChatList;

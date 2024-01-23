"use client";

import { useState, useEffect } from "react";

import { ChatPageContext } from "@/app/contexts/ChatPageContext";
import { ChatMessage, ChatPageProps } from "@/types/chatroom.index";
import { ChatPageChatList, ChatPageLiveChat } from ".";
import useChatStore from "@/app/chatStore";

const LiveChatPageLayout = ({ chatrooms, userInfo }: ChatPageProps) => {
  const { setShowChat } = useChatStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showChatRoomList, setShowChatRoomList] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowChatRoomList(window.innerWidth > 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowChat(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let secondUser;
  let defaultChatroomId;
  let otherUser;

  if (chatrooms.length > 0 && chatrooms[0].recentMessage) {
    secondUser = chatrooms[0].otherUser;
    defaultChatroomId = chatrooms[0].recentMessage.chatroomId;
    otherUser = {
      id: secondUser.id,
      username: secondUser.username,
      image: secondUser.picture,
      name: secondUser.name,
    };
  }

  return (
    <ChatPageContext.Provider
      value={{
        chatrooms,
        messages,
        userInfo,
        defaultChatroomId,
        setMessages,
        otherUser,
        showChatRoomList,
        setShowChatRoomList,
        isLoading,
        setIsLoading,
        isInputDisabled,
        setIsInputDisabled,
      }}
    >
      <main className="mt-[-10rem] flex h-screen min-h-screen w-screen justify-center bg-light pt-28 dark:bg-dark-2 md:mt-[-5rem] md:pb-12 md:pt-20">
        <section
          className="flex h-full w-full max-w-[90rem] flex-col border-x border-sc-6 dark:border-dark-2 md:flex-row
md:dark:border-dark-3"
        >
          <ChatPageChatList />
          <ChatPageLiveChat />
        </section>
      </main>
    </ChatPageContext.Provider>
  );
};

export default LiveChatPageLayout;

"use client";

import { AblyProvider } from "ably/react";

import { client } from "@/lib/ably";
import { LiveChatPageLayout } from ".";
import { ChatPageProps } from "@/types/chatroom.index";

const ChatPageWrapper = ({ chatrooms, userInfo }: ChatPageProps) => {
  return (
    <AblyProvider client={client}>
      <LiveChatPageLayout chatrooms={chatrooms} userInfo={userInfo} />
    </AblyProvider>
  );
};

export default ChatPageWrapper;

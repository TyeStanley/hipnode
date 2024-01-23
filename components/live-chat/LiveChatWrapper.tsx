"use client";

import { AblyProvider } from "ably/react";

import LiveChat from "./LiveChat";
import { client } from "@/lib/ably";

const LiveChatWrapper = () => {
  return (
    <AblyProvider client={client}>
      <LiveChat />
    </AblyProvider>
  );
};

export default LiveChatWrapper;

"use client";

import { createContext, useContext } from "react";

import { ChatPageContextType } from "@/types/chatroom.index";

export const ChatPageContext = createContext<ChatPageContextType | undefined>(
  undefined
);

export function useChatPageContext() {
  const context = useContext(ChatPageContext);

  if (!context) {
    throw new Error(
      "useChatPageContextType must be used within a ChatPageContextProvider that provides data"
    );
  }

  return context;
}

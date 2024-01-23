import { useEffect, useRef } from "react";

import { ChatMessage } from "@/types/chatroom.index";
import { ChatBoxMessage } from ".";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";

const ChatPageMessageList = () => {
  const { messages } = useChatPageContext();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView();
      }
    }, 100);
  }, [messages]);

  return (
    <ul className="relative flex h-full w-full flex-col items-end gap-4 overflow-scroll bg-light p-4 dark:bg-dark-2 md:p-8 md:dark:bg-dark-3">
      {messages &&
        messages.map((message: ChatMessage) => (
          <ChatBoxMessage key={message.data.messageId} message={message} />
        ))}
      <div ref={endOfMessagesRef} className="bottom-0 mt-1" />
    </ul>
  );
};

export default ChatPageMessageList;

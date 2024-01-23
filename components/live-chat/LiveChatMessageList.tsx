import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useChatStore from "@/app/chatStore";
import { ChatMessage, LiveChatMessageListProps } from "@/types/chatroom.index";
import { christopher } from "@/public/assets";
import OutlineIcon from "../icons/outline-icons";
import useMediaPlayerStore from "@/app/mediaPlayerStore";
import { LiveChatMessage } from ".";
import { LoaderComponent } from "../onboarding-components";

const LiveChatMessageList = React.memo(
  ({ messages, setMessages, setDroppedFile }: LiveChatMessageListProps) => {
    const { setLiveRecordingDuration } = useMediaPlayerStore();
    const router = useRouter();
    const {
      chatroomUsers,
      setShowChat,
      chatroomId,
      setChatroomUsers,
      onlineUsers,
    } = useChatStore();

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const [secondUser] = chatroomUsers.slice(1, 2);
    const {
      username: secondUserUsername = "",
      image: secondUserPicture = christopher,
      id: secondUserId,
    } = secondUser ?? {};

    const isSecondUserOnline = onlineUsers
      ? onlineUsers.includes(secondUserId)
      : false;

    useEffect(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView();
      }
    }, [messages]);

    const onlineStatus = isSecondUserOnline ? (
      <p className="semibold-9 md:semibold-10 text-green">Online</p>
    ) : (
      <p className="semibold-9 md:semibold-10 text-slate-400">Offline</p>
    );

    const handleChatPageClick = () => {
      setChatroomUsers([chatroomUsers[0], secondUser]);
      setShowChat(false);
      setDroppedFile(null);
      router.push(`/chat`);
    };

    useEffect(() => {
      setLiveRecordingDuration(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <section className="flex w-full items-center justify-between border-b border-sc-6 p-4 dark:border-sc-2">
          <figure className="flex items-center gap-2.5">
            <Image
              src={secondUserPicture}
              alt={`image of ${secondUserUsername}`}
              height={40}
              width={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <figcaption className="flex flex-col">
              <p className="base-14 md:base-18 text-sc-2_light-2">
                {secondUserUsername}
              </p>
              {onlineStatus}
            </figcaption>
          </figure>
          <div className="flex gap-5">
            <button onClick={handleChatPageClick}>
              <OutlineIcon.Expand />
            </button>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setShowChat(false);
                setDroppedFile(null);
              }}
            >
              <OutlineIcon.ArrowLargeDown className="stroke-sc-2 dark:stroke-light-2" />
            </div>
          </div>
        </section>
        <ul className="flex h-full w-full flex-col gap-5 overflow-y-scroll px-5 pt-5">
          {chatroomId === null ? (
            <div className="flex-center h-full w-full">
              <LoaderComponent />
            </div>
          ) : (
            messages.map((message: ChatMessage) => (
              <LiveChatMessage
                key={message.data.messageId}
                message={message}
                setMessages={setMessages}
              />
            ))
          )}
          <div ref={endOfMessagesRef} className="mt-1" />
        </ul>
      </>
    );
  }
);

LiveChatMessageList.displayName = "LiveChatMessageList";

export default LiveChatMessageList;

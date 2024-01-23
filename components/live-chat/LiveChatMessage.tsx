import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";

import useChatStore from "@/app/chatStore";
import { handleEditClick, handleDeleteClick } from "../../utils/chat-functions";
import { LiveChatMessageProps } from "@/types/chatroom.index";
import { EditDeleteButton, LinkPreview } from "../chat-page";
import { MessageAttachment } from ".";
import {
  extractUrls,
  isOnlyEmoji,
  formatTextWithLineBreaks,
} from "@/utils/chat-page-styling";

const LiveChatMessage = ({ message, setMessages }: LiveChatMessageProps) => {
  const { chatroomUsers } = useChatStore();
  const [hover, setHover] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const {
    data: {
      user: { id, image, username },
      text,
      messageUUID,
      attachment,
    },
  } = message;
  const [textareaValue, setTextareaValue] = useState<string | null>(text);
  const [displayText, setDisplayText] = useState<string | null>(text);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const segments = text ? extractUrls(text) : [];
  const links = segments.length
    ? segments.filter((segment) => segment.isUrl)
    : [];

  const isStringSingleEmoji = text ? isOnlyEmoji(text) : false;

  const textFontSize = isStringSingleEmoji ? "text-5xl" : "regular-16 ";

  const currentUserId = chatroomUsers[0].id;

  const isMessageFromCurrentUser = id === currentUserId;

  const calculateDivStyles = () => {
    if (isStringSingleEmoji) {
      return `bg-none p-1 ${isMessageFromCurrentUser ? "self-end" : ""}`;
    }
    return isMessageFromCurrentUser
      ? "bg-red-80 text-white self-end rounded-l-lg rounded-tr-sm p-2.5"
      : "bg-red-10 text-red-80 rounded-r-lg rounded-tl-sm p-2.5";
  };

  const messageAlign = isMessageFromCurrentUser
    ? "self-end flex-row-reverse"
    : "self-start flex-row";

  const handleDelete = () => {
    handleDeleteClick({ messageUUID, setMessages });
  };

  const handleEdit = () => {
    if (textareaValue === displayText || !textareaValue) {
      return;
    }
    setDisplayText(textareaValue);
    handleEditClick({ messageUUID, text: textareaValue });
  };

  return (
    <li
      ref={ref}
      className={`${messageAlign} flex max-w-full gap-2.5 break-words`}
      key={id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
        <Image
          src={image}
          alt={`Profile image for ${username}`}
          height={40}
          width={40}
          className="rounded-full object-cover"
        />
      </figure>
      <figure className="relative flex w-fit max-w-[250px] flex-col">
        {hover && isMessageFromCurrentUser && (
          <div className="absolute z-10 flex translate-x-2 translate-y-[-3px] self-end">
            <EditDeleteButton
              isStringSingleEmoji={isStringSingleEmoji}
              displayText={displayText}
              setTextareaValue={setTextareaValue}
              textareaValue={textareaValue}
              handleDelete={handleDelete}
              handleTextareaChange={handleTextareaChange}
              handleEdit={handleEdit}
              smallChatBox
            />
          </div>
        )}
        <MessageAttachment
          message={message}
          isMessageFromCurrentUser={isMessageFromCurrentUser}
        />
        {displayText && (
          <figcaption
            className={`${calculateDivStyles()} semibold-16 flex w-fit max-w-full flex-col overflow-hidden rounded-b-lg ${
              attachment && "mt-3"
            }`}
          >
            {inView &&
              links.map((link) => (
                <LinkPreview key={link.text} url={link.text} smallChatBox />
              ))}
            {extractUrls(displayText).map((segment, index) =>
              segment.isUrl ? (
                <Link
                  key={uuidv4()}
                  href={segment.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {segment.text}
                </Link>
              ) : (
                <span
                  key={uuidv4()}
                  className={`${textFontSize} max-w-full break-words`}
                  dangerouslySetInnerHTML={formatTextWithLineBreaks(
                    segment.text
                  )}
                />
              )
            )}
          </figcaption>
        )}
      </figure>
    </li>
  );
};

export default LiveChatMessage;

import Link from "next/link";
import Image from "next/image";

import FillIcon from "../icons/fill-icons";
import { MessageAttachmentProps } from "@/types/chatroom.index";
import { LiveChatVideoPlayer, LiveChatAudioPlayer } from ".";

const MessageAttachment = ({
  message,
  chatPage = false,
  isMessageFromCurrentUser = false,
}: MessageAttachmentProps) => {
  if (!message.data.attachment) {
    return null;
  }

  const {
    data: { attachmentType, attachment, messageId },
  } = message;

  // An instantly send message will not have a messageId
  const attachmentMessageId = messageId ?? message.id;

  const imageAndVideoHeight = chatPage ? 600 : 250;
  const imageAndVideoWidth = chatPage ? 600 : 300;

  switch (attachmentType) {
    case "image":
      return (
        <Link
          href={attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit min-w-[16rem] cursor-pointer flex-col justify-center overflow-hidden sm:min-w-[20rem]"
        >
          <Image
            src={attachment}
            height={imageAndVideoHeight}
            width={imageAndVideoWidth}
            alt="Attachment"
            className={`${
              chatPage
                ? "max-h-[37.5rem] max-w-[31.6875rem]"
                : "max-h-80 max-w-[250px]"
            } w-full rounded-lg object-contain`}
          />
        </Link>
      );

    case "video":
      return (
        <LiveChatVideoPlayer
          videoUrl={attachment}
          height={imageAndVideoHeight}
          width={imageAndVideoWidth}
          additionalClasses={`${
            chatPage
              ? "max-h-[37.5rem] max-w-[37.5rem]"
              : "max-h-[15rem] max-w-[15rem]"
          }h-full w-full rounded-lg`}
          messageId={attachmentMessageId}
        />
      );

    case "audio":
      return (
        <LiveChatAudioPlayer
          messageId={attachmentMessageId}
          audioUrl={attachment}
          isMessageFromCurrentUser={isMessageFromCurrentUser}
        />
      );

    case "document":
      return (
        <Link
          href={attachment}
          className={`flex-center rounded-xl ${
            chatPage ? "h-60 w-60" : "h-40 w-40"
          } ${isMessageFromCurrentUser ? "bg-red-80" : "bg-red-10"}`}
        >
          <FillIcon.Post
            className={`h-10 w-10 ${
              isMessageFromCurrentUser ? "fill-white" : "fill-red-80"
            }`}
          />
        </Link>
      );

    default:
      return null;
  }
};

export default MessageAttachment;

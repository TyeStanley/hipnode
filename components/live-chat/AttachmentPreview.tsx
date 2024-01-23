import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { CiFolderOn } from "react-icons/ci";

import FillIcon from "../icons/fill-icons";
import {
  AttachmentPreviewProps,
  RenderPreviewProps,
} from "@/types/chatroom.index";
import { getMediaType } from "@/utils";
import { LiveChatVideoPlayer, LiveChatAudioPlayer } from ".";

const RenderPreview = ({
  mediaType,
  attachmentPreview,
  chatPage = false,
}: RenderPreviewProps) => {
  const attachmentWidth = chatPage ? 400 : 250;
  const attachmentHeight = chatPage ? 600 : 250;
  const dimensionsRem = chatPage
    ? "md:max-w-[22rem] md:max-h-[25rem] max-w-[18rem]"
    : "max-h-[12rem] max-w-[18rem]";

  switch (mediaType) {
    case "image":
      return (
        <Image
          src={attachmentPreview}
          height={attachmentHeight}
          width={attachmentWidth}
          className={`w-full object-contain ${dimensionsRem}`}
          alt="Image preview"
        />
      );
    case "video":
      return (
        <LiveChatVideoPlayer
          videoUrl={attachmentPreview}
          height={attachmentHeight}
          width={attachmentWidth}
          additionalClasses={dimensionsRem}
        />
      );
    case "audio":
      return (
        <LiveChatAudioPlayer
          audioUrl={attachmentPreview}
          isMessageFromCurrentUser
        />
      );
    case "document":
      return (
        <Link
          href={attachmentPreview}
          className="flex-center h-40 w-40 rounded-xl bg-red-80"
        >
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </Link>
      );
    case "folder":
      return (
        <div className="flex-center h-40 w-40 rounded-xl bg-red-60">
          <CiFolderOn className="text-[50px] text-white" />
        </div>
      );
    default:
      return null;
  }
};

const AttachmentPreview = ({
  droppedFile,
  setDroppedFile,
  chatPage = false,
}: AttachmentPreviewProps) => {
  const [hover, setHover] = useState(false);
  const mediaType = getMediaType(droppedFile);
  const previewUrl = useMemo(() => {
    if (droppedFile) {
      const file = Array.isArray(droppedFile) ? droppedFile[0] : droppedFile;
      return URL.createObjectURL(file);
    }
    return null;
  }, [droppedFile]);

  return (
    <figure
      className="relative flex w-fit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        className={`${
          hover ? "flex-center" : "hidden"
        } absolute right-0 top-0 h-5 w-5 rounded-full bg-red-80/80 ${
          mediaType === "audio" ? "-right-5 -top-3" : "right-0 top-0"
        }`}
        onClick={() => {
          setDroppedFile(null);
        }}
      >
        <IoClose className="z-10 cursor-pointer text-[20px] text-white" />
      </button>
      {previewUrl && (
        <RenderPreview
          mediaType={mediaType}
          attachmentPreview={previewUrl}
          chatPage={chatPage}
        />
      )}
    </figure>
  );
};

export default AttachmentPreview;

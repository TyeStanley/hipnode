import LiveChatAudioPlayer from "@/components/live-chat/LiveChatAudioPlayer";
import { AudioPlayerImage } from "@/components/podcast-components";
import { PodcastImagePreviewProps } from "@/types/posts";
import MediaPlaceholder from "./MediaPlaceholder";

const PodcastImagePreview = ({
  previewValues,
  username,
  imagePreviewUrl,
}: PodcastImagePreviewProps) => {
  return (
    <div
      className={`${
        previewValues?.contentType !== "Podcast"
          ? "hidden"
          : "flex grow items-center justify-center"
      }`}
    >
      {imagePreviewUrl ? (
        <div className="flex w-full gap-7">
          <AudioPlayerImage imageSrc={previewValues?.image ?? ""} />
          <div className="flex flex-col gap-3">
            <p className="semibold-18 text-sc-2 dark:text-light-2">
              by @{username}
            </p>
            <LiveChatAudioPlayer
              audioUrl={previewValues?.podcast ?? ""}
              isMessageFromCurrentUser
            />
          </div>
        </div>
      ) : (
        <MediaPlaceholder />
      )}
    </div>
  );
};

export default PodcastImagePreview;

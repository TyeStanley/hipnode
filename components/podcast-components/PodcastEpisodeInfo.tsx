import { PodcastEpisodeInfoType } from "@/types/podcast.index";
import dynamic from "next/dynamic";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const PodcastEpisodeInfo = ({
  showName,
  episodeNumber,
  creatorName,
  userCanEditMedia,
  podcastId,
}: PodcastEpisodeInfoType) => {
  return (
    <div className="flex flex-col">
      <h2 className="base-9 md:regular-12 text-sc-2 dark:text-light-2">
        <div className="flex items-center justify-between">
          {showName} &bull; Episode {episodeNumber}
          {userCanEditMedia && (
            <MediaEditActionPopover
              positionStyles="translate-x-[-3.2rem] translate-y-[-0.2rem]"
              label="Podcast"
              mediaId={podcastId}
            />
          )}
        </div>
      </h2>
      <h3 className="semibold-14 md:semibold-18 mb-2.5 text-sc-2 dark:text-light-2 md:mb-3">
        by {creatorName}
      </h3>
    </div>
  );
};

export default PodcastEpisodeInfo;

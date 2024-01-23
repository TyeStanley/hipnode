import Link from "next/link";

import { playbackSpeedOptions } from "@/constants";
import { cyclePlaybackSpeed } from "@/hooks/podcastHooks";
import { PodcastSpeedButtonProps } from "@/types/podcast.index";

const PodcastSpeedButton = ({
  showInfo,
  audioRef,
  playbackSpeedIndex,
  dispatch,
  showId,
}: PodcastSpeedButtonProps) => {
  const handlePlaybackSpeedCycle = () => {
    const newIndex = cyclePlaybackSpeed({ audioRef, playbackSpeedIndex });
    dispatch({ type: "SET_PLAYBACK_SPEED_INDEX", payload: newIndex });
  };

  return (
    <div className="flex items-center gap-2">
      {showInfo && (
        <Link
          href={`/podcasts/${showId}`}
          className="text-sc-1_light-2 line-clamp-1 text-xs"
        >
          {showInfo}
        </Link>
      )}
      <button
        onClick={handlePlaybackSpeedCycle}
        className="text-sc-1_light-2 text-sm"
      >
        {playbackSpeedOptions[playbackSpeedIndex]}x
      </button>
    </div>
  );
};

export default PodcastSpeedButton;

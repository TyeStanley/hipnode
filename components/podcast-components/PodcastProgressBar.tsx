"use client";

import { formatPodcastDuration } from "@/utils";
import { Progress } from "../ui/progress";
import {
  handleProgressClickProps,
  PodcastProgressBarProps,
} from "@/types/podcast.index";

const handleProgressClick = ({
  audioRef,
  percentage,
}: handleProgressClickProps) => {
  if (audioRef.current) {
    if (typeof percentage === "number") {
      const newTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  }
};

const PodcastProgressBar = ({
  currentTime,
  totalDuration,
  audioRef,
}: PodcastProgressBarProps) => {
  const percentagePlayed = (currentTime / totalDuration) * 100;
  const formattedTime = formatPodcastDuration(currentTime);
  const formattedLength = formatPodcastDuration(totalDuration);

  return (
    <div className="flex w-full max-w-[20rem] items-center gap-3">
      <p className="text-sc-1_light-2 text-xs">{formattedTime}</p>
      <Progress
        value={percentagePlayed}
        onClick={(percentage) => handleProgressClick({ audioRef, percentage })}
        className="cursor-pointer"
      />
      <p className="text-sc-1_light-2 text-xs">{formattedLength}</p>
    </div>
  );
};

export default PodcastProgressBar;

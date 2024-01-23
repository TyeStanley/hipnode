import { IoIosPlay } from "react-icons/io";
import { IoPause } from "react-icons/io5";

import { PodcastBarPlayButtonProps } from "@/types/podcast.index";

const renderIcon = (isPlaying: boolean) => (
  <p className="text-lg text-sc-1 dark:text-white md:text-2xl">
    {isPlaying ? <IoPause /> : <IoIosPlay />}
  </p>
);

const PodcastBarPlayButton = ({
  songUrl,
  audioRef,
  handlePlayClick,
  isPlaying,
}: PodcastBarPlayButtonProps) => {
  return (
    <div className="flex gap-2">
      <audio id="podcast-audio" src={songUrl} ref={audioRef}>
        <a href={songUrl}> play song </a>
      </audio>
      <div onClick={handlePlayClick} className="flex-center cursor-pointer">
        {renderIcon(isPlaying)}
      </div>
    </div>
  );
};

export default PodcastBarPlayButton;

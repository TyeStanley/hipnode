import Image from "next/image";

import { podcast } from "@/public/assets";
import { PodcastBarImageProps } from "@/types/podcast.index";
import usePodcastStore from "@/app/podcastStore";
import { AudioAnimation } from ".";

const PodcastBarImage = ({
  podcastUserImage,
  dispatch,
  raisedZIndex,
}: PodcastBarImageProps) => {
  const { isPlaying } = usePodcastStore();

  const handleImageClick = () => {
    if (window.innerWidth < 768) {
      dispatch({ type: "SET_RAISED_Z_INDEX", payload: !raisedZIndex });
    }
  };

  const imagePosition = raisedZIndex
    ? "translate-y-0"
    : "translate-y-[-4rem] md:translate-y-0";

  const animationPosition = raisedZIndex
    ? "-top-10 right-[2.3rem] sm:-right-2 sm:top-2"
    : "-right-2 top-2";

  return (
    <figure className={`relative flex gap-2 ${imagePosition}`}>
      <div
        className="h-[3.125rem] w-[3.125rem] shrink-0 cursor-pointer rounded-full bg-red-60 md:cursor-default"
        onClick={handleImageClick}
      >
        <Image
          src={podcastUserImage || podcast}
          height={50}
          width={50}
          alt="picture of the podcast host"
          className="rounded-full"
        />
      </div>
      {isPlaying && (
        <div className={`absolute ${animationPosition}`}>
          <AudioAnimation />
        </div>
      )}
    </figure>
  );
};

export default PodcastBarImage;

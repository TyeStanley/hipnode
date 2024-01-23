"use client";

import Image from "next/image";

import usePodcastStore from "@/app/podcastStore";
import { AudioPlayerImageProps } from "@/types/podcast.index";

const AudioPlayerImage = ({ imageSrc, podcastId }: AudioPlayerImageProps) => {
  const { podcast, isPlaying } = usePodcastStore();

  const podcastIsCurrentlyPlaying = isPlaying && podcastId === podcast?.id;

  const recordStyles = podcastIsCurrentlyPlaying
    ? "md:-translate-x-8 -translate-x-2.5"
    : "md:-translate-x-20 -translate-x-6";

  return (
    <div className="flex h-fit">
      <div className="flex h-[3.125rem] w-[3.125rem] shrink-0 md:h-[9.375rem] md:w-[9.375rem]">
        <Image
          src={imageSrc}
          alt="Podcast Image"
          height={150}
          width={150}
          className="z-10 rounded-lg"
        />
      </div>
      <div
        className={`${recordStyles} flex h-[2.5rem] w-[2.5rem] shrink-0  self-center transition duration-300 md:h-[8.125rem] md:w-[8.125rem]`}
      >
        <Image
          src="/record.png"
          alt="Podcast Image"
          height={130}
          width={130}
          className={`${
            podcastIsCurrentlyPlaying && "animate-spin transition duration-1000"
          }`}
        />
      </div>
    </div>
  );
};

export default AudioPlayerImage;

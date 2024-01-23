"use client";

import usePodcastStore from "@/app/podcastStore";
import { useState, useRef, useEffect, useCallback } from "react";

import FillIcon from "../icons/fill-icons";
import CustomButton from "../CustomButton";
import { formatPodcastDuration, setToLocalStorage } from "@/utils";
import { PodcastPlayButtonProps } from "@/types/podcast.index";
import ShareButtons from "../ShareButtons";
import { shareIcons } from "@/constants/podcast";

const PodcastPlayButton = ({ url, podcast }: PodcastPlayButtonProps) => {
  const { songUrl, setSongUrl, togglePlay, isPlaying, setPodcast } =
    usePodcastStore();
  const [audioDuration, setAudioDuration] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", () => {
        const audioDuration = formatPodcastDuration(audioElement.duration);
        setAudioDuration(audioDuration);
      });
    }
  }, []);

  const handleClick = useCallback(() => {
    setPodcast(podcast);
    setSongUrl(url);
    if (!(isPlaying && url === songUrl)) {
      togglePlay();
    }
    setToLocalStorage("selectedPodcastId", podcast.id);
  }, [isPlaying, songUrl, url, podcast, setPodcast, setSongUrl, togglePlay]);

  const isAudioPlaying = url === songUrl && isPlaying;

  const playbackInfo = {
    label: isAudioPlaying ? "Playing" : "Play",
    icon: isAudioPlaying ? undefined : FillIcon.Play,
    bgColor: isAudioPlaying ? "bg-red-80" : "bg-blue",
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2.5 flex w-full items-center gap-5 md:mb-3">
        <p className="regular-10 md:semibold-14 whitespace-nowrap text-sc-2 dark:text-light-2">
          {audioDuration && audioDuration}
        </p>
      </div>
      <div className="flex w-full items-center gap-3.5 md:gap-5">
        <audio ref={audioRef}>
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <CustomButton
          label={playbackInfo.label}
          icon={playbackInfo.icon}
          className={`semibold-14 md:regular-16 items-end rounded-[1.25rem] transition duration-500 ${playbackInfo.bgColor} px-4 py-2 text-light`}
          onClick={handleClick}
        />
        <ShareButtons title={podcast.title} shareIcons={shareIcons} />
      </div>
    </div>
  );
};

export default PodcastPlayButton;

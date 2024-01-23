import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { playButton, pauseButton } from "@/public/assets";
import { formatTime } from "@/utils";
import { LiveChatAudioPlayerProps } from "@/types/chatroom.index";
import usePodcastStore from "@/app/podcastStore";
import useMediaPlayerStore from "@/app/mediaPlayerStore";
import { findAudioDuration } from "../../utils/chat-functions";
import { AudioPlayerLoader, LiveChatAudioPlayerAnimation } from ".";

const LiveChatAudioPlayer = ({
  audioUrl,
  messageId = undefined,
  isMessageFromCurrentUser = false,
}: LiveChatAudioPlayerProps) => {
  const { liveRecordingDuration } = useMediaPlayerStore();
  const { togglePlay, isPlaying: podcastIsPlaying } = usePodcastStore();
  const {
    audioMessageId,
    setAudioMessageId,
    setIsAudioPlaying,
    isAudioPlaying,
    isVideoPlaying,
    setIsVideoPlaying,
  } = useMediaPlayerStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const [showTime, setShowTime] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const time = formatTime(displayTime);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if ((podcastIsPlaying || isVideoPlaying) && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [podcastIsPlaying, isAudioPlaying, isVideoPlaying]);

  useEffect(() => {
    if (audioMessageId !== messageId) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioMessageId]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement !== null) {
      const handleMetadataLoaded = () => {
        if (audioElement.duration !== Infinity) {
          setDisplayTime(audioElement.duration);
        } else if (liveRecordingDuration > 0) {
          setDisplayTime(liveRecordingDuration);
        } else if (audioElement.src) {
          const extractedDuration = findAudioDuration(audioElement.src);
          setDisplayTime(extractedDuration);
        } else {
          setDisplayTime(0);
        }
      };

      const handleTimeUpdate = () => {
        setDisplayTime(audioElement.currentTime);
        setShowTime(true);
      };

      const handleAudioEnd = () => setIsPlaying(false);
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleCanPlayThrough = () => setIsLoading(false);
      const handleWaiting = () => setIsLoading(true);

      audioElement.addEventListener("loadedmetadata", handleMetadataLoaded);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", () => {
        setIsAudioPlaying(false);
        setIsPlaying(false);
      });
      audioElement.addEventListener("loadstart", handleLoadStart);
      audioElement.addEventListener("canplay", handleCanPlay);
      audioElement.addEventListener("canplaythrough", handleCanPlayThrough);
      audioElement.addEventListener("waiting", handleWaiting);

      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleMetadataLoaded
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleAudioEnd);
        audioElement.removeEventListener("loadstart", handleLoadStart);
        audioElement.removeEventListener("canplay", handleCanPlay);
        audioElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        audioElement.removeEventListener("waiting", handleWaiting);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, audioUrl]);

  const togglePlayPause = async () => {
    if (podcastIsPlaying) {
      togglePlay();
    }
    setAudioMessageId(messageId);

    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          setIsAudioPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsAudioPlaying(true);
          setIsVideoPlaying(false);
        }
      } catch (error) {
        console.error("Error trying to play the audio:", error);
      }
    }
  };

  const currentTrackIsPlaying = audioMessageId === messageId && isPlaying;

  return (
    <div
      className={`flex-center h-[3.125rem] w-[12rem] rounded-lg  ${
        isMessageFromCurrentUser ? "bg-red-80" : "bg-red-10"
      } px-3 py-2.5`}
    >
      <div className="flex w-full justify-between">
        {isLoading ? (
          <AudioPlayerLoader />
        ) : (
          <button
            type="button"
            onClick={togglePlayPause}
            className="shrink-0 cursor-pointer rounded-full"
          >
            <Image
              src={isPlaying ? pauseButton : playButton}
              alt={currentTrackIsPlaying ? "Pause" : "Play"}
              height={30}
              width={30}
              className="rounded-full"
            />
          </button>
        )}

        <figure
          className={`flex-center justify-self-center ${!showTime && "mr-6"}`}
        >
          <div
            className={`${
              isPlaying && "liveChatAudioAnimation"
            } flex-center max-h-[0.75rem] gap-[0.25rem]`}
          >
            <LiveChatAudioPlayerAnimation
              isPlaying={isPlaying}
              isMessageFromCurrentUser={isMessageFromCurrentUser}
            />
          </div>
        </figure>

        <figure className="flex-center">
          <time
            className={`semibold-14 ${
              isMessageFromCurrentUser ? "text-white" : "text-red-80"
            } `}
          >
            {showTime && time}
          </time>
        </figure>
      </div>
    </div>
  );
};

export default LiveChatAudioPlayer;

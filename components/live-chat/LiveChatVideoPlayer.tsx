import { useEffect, useRef } from "react";

import useMediaPlayerStore from "@/app/mediaPlayerStore";
import usePodcastStore from "@/app/podcastStore";
import { LiveChatVideoPlayerProps } from "@/types/chatroom.index";

const LiveChatVideoPlayer = ({
  videoUrl,
  height,
  width,
  additionalClasses,
  messageId = undefined,
}: LiveChatVideoPlayerProps) => {
  const {
    setIsVideoPlaying,
    isAudioPlaying,
    isVideoPlaying,
    setVideoMessageId,
    videoMessageId,
  } = useMediaPlayerStore();
  const { togglePlay, isPlaying } = usePodcastStore();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    setVideoMessageId(messageId);
    if (isPlaying) {
      togglePlay();
    }
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    if (videoMessageId !== messageId && videoRef.current) {
      videoRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoMessageId]);

  useEffect(() => {
    if ((isPlaying || isAudioPlaying) && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying, isAudioPlaying, isVideoPlaying]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      height={height}
      width={width}
      className={`w-full ${additionalClasses}`}
      onPlay={handleVideoPlay}
      onEnded={() => setIsVideoPlaying(false)}
      controls
    />
  );
};

export default LiveChatVideoPlayer;

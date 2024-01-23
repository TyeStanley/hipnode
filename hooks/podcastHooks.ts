import { RefObject } from "react";
import * as PodcastTypes from "@/types/podcast.index";
import { playbackSpeedOptions } from "@/constants";

export const handleStop = (audioRef: RefObject<HTMLAudioElement>) => {
  if (audioRef?.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.playbackRate = 1;
  }
};

export const cyclePlaybackSpeed = ({
  audioRef,
  playbackSpeedIndex,
}: PodcastTypes.CyclePlaybackSpeedProps) => {
  const newIndex = (playbackSpeedIndex + 1) % playbackSpeedOptions.length;
  if (audioRef && audioRef.current) {
    audioRef.current.playbackRate = playbackSpeedOptions[newIndex];
  }
  return newIndex;
};

export const getPodcastPlayerState = () => {
  const storedState = localStorage.getItem("podcastPlayerState");
  try {
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error parsing podcast player state:", error);
    return null;
  }
};

export const fetchPodcast = async ({
  podcast,
  getFromLocalStorage,
  getPodcastById,
  dispatch,
}: PodcastTypes.FetchPodcastProps) => {
  if (podcast === null) {
    const podcastId = getFromLocalStorage("selectedPodcastId");
    const isSongPlaying = getFromLocalStorage("podcastPlayerState");
    if (podcastId) {
      const podcastUpdated = await getPodcastById({
        podcastId: Number(podcastId),
      });
      if (podcastUpdated) {
        dispatch({ type: "INITIALISE_PODCAST", payload: podcastUpdated });
        if (isSongPlaying.isPlaying) {
          dispatch({ type: "SET_SHOW_PLAYER", payload: true });
        }
      }
    }
  }
};

export const loadPodcastFromLocalStorage = ({
  storedState,
  setSongUrl,
  setCurrentTime,
  audioRef,
}: PodcastTypes.LoadPodcastProps) => {
  if (storedState) {
    const { currentTime, songUrl } = storedState;
    setSongUrl(songUrl);
    if (currentTime > 0) {
      setCurrentTime(currentTime);
    }
    if (audioRef.current && Number.isFinite(storedState.currentTime)) {
      audioRef.current.currentTime = storedState.currentTime;
    }
  }
};

export const savePodcastPlayerState = ({
  isPlaying,
  currentTime,
  songUrl,
}: PodcastTypes.SavePodcastTypeProps) => {
  try {
    const state = {
      isPlaying,
      currentTime,
      songUrl,
    };
    localStorage.setItem("podcastPlayerState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving podcast player state:", error);
  }
};

export const handlePlayCall = ({
  podcast,
  dispatch,
  isPlaying,
  audioRef,
  state,
}: PodcastTypes.HandlePlayCallProps) => {
  const audioElement = document.getElementById(
    "podcast-audio"
  ) as HTMLAudioElement;

  if (audioElement && podcast !== null) {
    if (audioRef && audioRef.current) {
      audioRef.current.playbackRate =
        playbackSpeedOptions[state.playbackSpeedIndex];
      dispatch({
        type: "SET_PLAYBACK_SPEED_INDEX",
        payload: state.playbackSpeedIndex,
      });
    }

    dispatch({
      type: "UPDATE_PODCAST_INFO",
      payload: {
        image: podcast.image,
        showInfo: `#${podcast.episodeNumber} - ${podcast.title}`,
      },
    });

    if (isPlaying) {
      audioElement.play();
      dispatch({ type: "SET_SHOW_PLAYER", payload: true });
    }
  }
};

export const handleVolumeChange = ({
  newVolume,
  audioRef,
  dispatch,
}: PodcastTypes.HandleVolumeChangeProps) => {
  if (audioRef.current) {
    const volumeValue = newVolume[0] / 100;
    audioRef.current.volume = volumeValue;
    dispatch({ type: "SET_VOLUME", payload: newVolume });
  }
};

export const getAudioElement = () => {
  return document.getElementById("podcast-audio") as HTMLAudioElement;
};

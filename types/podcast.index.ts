import React, { FC } from "react";

import { Podcast } from "@prisma/client";
import { Action, State } from "@/components/podcast-components/podcastReducer";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FilterType } from ".";

export interface QueryObject {
  show?: string | string[];
}

export interface PodcastUserInfo extends Podcast {
  user: {
    name: string;
    location: string | null;
    picture: string;
  };
}

type UserInfo = {
  username?: string;
  name?: string;
  location: string | null;
  picture: string;
};

export type PodcastWithUserInfo = {
  id: number;
  title: string;
  details: string;
  user: UserInfo;
};

export interface IPodcast extends Podcast {
  user: {
    name: string;
  };
  show: {
    name: string;
  };
  userCanEditMedia: boolean;
}

export type PodcastByIdType = Partial<IPodcast | null>;

export interface AudioPlayerProps {
  podcast: IPodcast;
  url: string;
  podcastId: number;
}

export type SavePodcastTypeProps = {
  isPlaying: boolean;
  currentTime: any;
  songUrl: string | undefined;
};

export interface handleProgressClickProps {
  percentage: number | React.MouseEvent<HTMLDivElement, MouseEvent>;
  audioRef: React.RefObject<HTMLAudioElement>;
}
export interface PodcastPlayerState {
  isPlaying: boolean;
  currentTime: number;
  songUrl: string;
}

export interface FetchPodcastProps {
  podcast: IPodcast | null;
  getFromLocalStorage: (key: string) => PodcastPlayerState;
  getPodcastById: ({
    podcastId,
  }: {
    podcastId: number;
  }) => Promise<PodcastByIdType>;
  dispatch: any;
}

export interface LoadPodcastProps {
  storedState: PodcastPlayerState | null;
  setSongUrl: (url: string) => void;
  setCurrentTime: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface HandlePlayCallProps {
  podcast: IPodcast | null;
  dispatch: React.Dispatch<Action>;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  state: State;
}

export interface CyclePlaybackSpeedProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
}

export interface PodcastSpeedButtonProps {
  showInfo: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  playbackSpeedIndex: number;
  dispatch: React.Dispatch<Action>;
  showId?: number;
}

export interface PodcastProgressBarProps {
  currentTime: number;
  totalDuration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface PodcastPlayButtonProps {
  url: string;
  podcast: IPodcast;
}

export type PodcastListColumnType = {
  podcasts: {
    listNumber: string;
    list: PodcastUserInfo[] | undefined;
  };
};

export type PodcastEpisodeInfoType = {
  showName: string;
  episodeNumber: number;
  creatorName: string;
  podcastId: number;
  userCanEditMedia: boolean;
};

export interface HandleVolumeChangeProps {
  newVolume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

export interface PodcastBarVolumeControlProps {
  handleVolumeChange: (props: HandleVolumeChangeProps) => void;
  handleVolumeIconClick: () => void;
  handleCloseClick: () => void;
  volume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

export interface PodcastBarPlayButtonProps {
  songUrl: string | undefined;
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePlayClick: () => void;
  isPlaying: boolean;
}

export interface PodcastBarImageProps {
  podcastUserImage: string;
  dispatch: React.Dispatch<Action>;
  raisedZIndex: boolean;
}

export type LargePodcastCardType = {
  title: string;
  details: string;
  episodeNumber: number;
};

type ShareIconType = FC<{ className?: string }>;

interface ShareIconConfig {
  label: string;
  wrapper:
    | typeof FacebookShareButton
    | typeof TwitterShareButton
    | typeof LinkedinShareButton;
  icon: ShareIconType;
}

export interface ShareButtonsProps {
  title: string;
  label?: string;
  shareIcons: ShareIconConfig[];
}

interface PodcastDataProps {
  podcasts: PodcastUserInfo[];
  hasMore: boolean;
  page: number;
}

export interface PodcastPageFilterProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  podcastData: PodcastDataProps;
  userShowsIds: number[];
}

export interface PodcastFilterAndContentWrapperProps {
  listOfShows: FilterType[];
  podcastData: PodcastDataProps;
  usersShowsIds: number[];
}

export type CreatePodcastType = {
  title: string;
  details: string;
  image: string;
  url: string;
  showId: number;
  contentType: string;
};

export interface QueryOptions {
  skip: number;
  take?: number; // Optional
  include: {
    user: {
      select: {
        name: boolean;
        location: boolean;
        picture: boolean;
      };
    };
  };
}

export interface ShowOption {
  label: string;
  value: number;
}

export type PodcastWithShow = {
  heading: string;
  content: string;
  image: string;
  podcast: string;
  contentType: string;
  show: { label: string; value: string };
};

export interface AudioPlayerImageProps {
  imageSrc: string;
  podcastId?: number;
}

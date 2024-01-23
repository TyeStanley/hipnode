import { IPodcast } from "@/types/podcast.index";

export type State = {
  id: number | undefined;
  currentTime: number;
  totalDuration: number;
  showPlayer: boolean;
  showInfo: string;
  volume: number[];
  podcastUserImage: string;
  playbackSpeedIndex: number;
  raisedZIndex: boolean;
};

export type Action =
  | { type: "INITIALISE_PODCAST"; payload: IPodcast | null }
  | {
      type: "UPDATE_PODCAST_INFO";
      payload: { image: string; showInfo: string };
    }
  | { type: "RESET_PLAYER_SETTINGS" }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_TOTAL_DURATION"; payload: number }
  | { type: "SET_SHOW_PLAYER"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number[] }
  | { type: "SET_PODCAST_USER_IMAGE"; payload: string }
  | { type: "SET_PLAYBACK_SPEED_INDEX"; payload: number }
  | { type: "SET_RAISED_Z_INDEX"; payload: boolean };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INITIALISE_PODCAST": {
      const { id, episodeNumber, title, image } = action.payload || {};
      return {
        ...state,
        id,
        showInfo:
          episodeNumber && title
            ? `#${episodeNumber} - ${title}`
            : state.showInfo,
        podcastUserImage: image || state.podcastUserImage,
      };
    }
    case "UPDATE_PODCAST_INFO":
      return {
        ...state,
        podcastUserImage: action.payload.image,
        showInfo: action.payload.showInfo,
      };
    case "RESET_PLAYER_SETTINGS":
      return {
        ...state,
        showPlayer: false,
        playbackSpeedIndex: 1,
      };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_TOTAL_DURATION":
      return { ...state, totalDuration: action.payload };
    case "SET_SHOW_PLAYER":
      return { ...state, showPlayer: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_PODCAST_USER_IMAGE":
      return { ...state, podcastUserImage: action.payload };
    case "SET_PLAYBACK_SPEED_INDEX":
      return { ...state, playbackSpeedIndex: action.payload };
    case "SET_RAISED_Z_INDEX":
      return { ...state, raisedZIndex: action.payload };
    default:
      return state;
  }
};

export const initialState: State = {
  id: undefined,
  currentTime: 0,
  totalDuration: 0,
  showPlayer: false,
  showInfo: "",
  volume: [100],
  podcastUserImage: "",
  playbackSpeedIndex: 1,
  raisedZIndex: false,
};

import { create } from "zustand";

import { IPodcast } from "@/types/podcast.index";

interface PodcastStore {
  isPlaying: boolean;
  songUrl: string | undefined;
  podcast: IPodcast | null;
  togglePlay: () => void;
  setSongUrl: (url: string) => void;
  setPodcast: (podcast: IPodcast | null) => void;
}

const usePodcastStore = create<PodcastStore>((set) => ({
  isPlaying: false,
  songUrl: undefined,
  podcast: null,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSongUrl: (url: string) => set({ songUrl: url }),
  setPodcast: (podcast: IPodcast | null) => set({ podcast }),
}));

export default usePodcastStore;

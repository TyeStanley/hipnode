import Link from "next/link";

import { RightSidebarHeader } from "../shared-components";
import PodcastItem from "./PodcastItem";
import { PodcastsProps } from "@/types/homepage";

const Podcasts = ({ podcasts }: PodcastsProps) => {
  const podcastArray = podcasts.slice(0, 4);
  return (
    <aside className="flex w-full flex-col gap-5 rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3">
      <Link href="/podcasts">
        <RightSidebarHeader heading={"Podcasts"} />
      </Link>
      {podcastArray.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </aside>
  );
};

export default Podcasts;

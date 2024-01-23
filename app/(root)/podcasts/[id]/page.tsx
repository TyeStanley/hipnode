import { redirect } from "next/navigation";

import { getPodcastByIdPage } from "@/lib/actions/podcast.actions";
import { AudioPlayer, LargePodcastCard } from "@/components/podcast-components";
import { getBucketUrls } from "@/utils";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
interface PodcastPageProps {
  params: {
    id: string;
  };
}

const PodcastPage = async ({ params }: PodcastPageProps) => {
  const podcastId = parseInt(params.id);
  const podcast = await getPodcastByIdPage({ podcastId });
  const bucketUrls = await getBucketUrls("podcasts");
  if (!podcast || bucketUrls.length === 0) {
    redirect("/podcasts");
  }

  const { title, details, episodeNumber } = podcast;

  const randomIndex = getRandomInt(0, 2);

  return (
    <main className="dynamic-pages-styles">
      <section className="relative flex h-fit w-full max-w-3xl flex-col gap-5">
        <AudioPlayer
          podcast={podcast}
          url={bucketUrls[randomIndex]}
          podcastId={podcastId}
        />
        <LargePodcastCard
          title={title}
          details={details}
          episodeNumber={episodeNumber}
        />
      </section>
    </main>
  );
};

export default PodcastPage;

import { AudioPlayerProps } from "@/types/podcast.index";
import { AudioPlayerImage, PodcastEpisodeInfo, PodcastPlayButton } from ".";

const AudioPlayer = ({ podcast, url, podcastId }: AudioPlayerProps) => {
  const {
    id,
    image,
    episodeNumber,
    user: { name: creatorName },
    show: { name: showName },
    userCanEditMedia,
  } = podcast;

  return (
    <section className="flex h-fit w-full justify-between gap-2 rounded-2xl bg-light p-3.5 dark:bg-dark-3 md:gap-0 md:p-5">
      <AudioPlayerImage imageSrc={image} podcastId={id} />

      <div className="flex-1 flex-col">
        <PodcastEpisodeInfo
          showName={showName}
          episodeNumber={episodeNumber}
          creatorName={creatorName}
          podcastId={podcastId}
          userCanEditMedia={userCanEditMedia}
        />
        <PodcastPlayButton url={url} podcast={podcast} />
      </div>
    </section>
  );
};

export default AudioPlayer;

import Link from "next/link";
import Image from "next/image";

import { PodcastWithUserInfo } from "@/types/podcast.index";

const PodcastCard = ({ info }: { info: PodcastWithUserInfo }) => {
  const {
    id,
    title,
    details,
    user: { name, location, picture },
  } = info;
  return (
    <Link href={`/podcasts/${id}`} className="h-fit w-full self-start">
      <article className="bg-light_dark-3 flex h-fit flex-col justify-between self-start rounded-2xl p-3.5 hover:shadow-lg hover:dark:bg-dark-4">
        <section className="flex flex-col gap-2.5">
          <header>
            <h2 className="text-sc-1_light-2 semibold-16">{title}</h2>
          </header>
          <p
            className="text-sc-3_light-6 base-12"
            dangerouslySetInnerHTML={{ __html: details.slice(1, -1) }}
          ></p>
        </section>

        <footer className="mt-5 flex items-center gap-2.5">
          <figure>
            <Image
              src={picture}
              alt="Host of the podcast"
              height={30}
              width={30}
              className="max-h-[1.875rem] rounded-full"
            />
          </figure>
          <div className="flex flex-col">
            <h3 className="text-sc-2_light semibold-14">{name}</h3>
            <p className="regular-10 text-sc-3">{location}</p>
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default PodcastCard;

import { redirect } from "next/navigation";

import {
  getFilterPodcastsUserInfo,
  getTopFiveShowIds,
} from "@/lib/actions/podcast.actions";
import { getAllUsersShows, getTopFiveShows } from "@/lib/actions/show.actions";
import FormLink from "@/components/FormLink";
import { podcastFormLinkProps } from "@/constants";
import Meetups from "@/components/home-page/meetup/Meetups";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import PodcastFilterAndContentWrapper from "@/components/podcast-components/PodcastFilterAndContentWrapper";
import { verifyAuth } from "@/lib/auth";

interface SearchProps {
  show: string | string[];
  amount: string;
}

const Podcasts = async ({ searchParams }: { searchParams: SearchProps }) => {
  const topFiveShows = await getTopFiveShowIds();
  const meetups = await getAllMeetUps();

  const { userId } = await verifyAuth(
    "You must be logged in to get Post Content."
  );

  if (!userId) {
    console.error("Can't find user");
    redirect("/");
  }

  let listOfShows = await getAllUsersShows();
  if (!listOfShows.length) {
    listOfShows = await getTopFiveShows(topFiveShows);
  }

  if (!listOfShows) {
    redirect("/");
  }
  const usersShowsIds = listOfShows.length
    ? listOfShows.map((show) => show.id)
    : topFiveShows;
  let podcastData;
  let showStrings;

  if (!searchParams || Object.keys(searchParams).length === 0) {
    podcastData = await getFilterPodcastsUserInfo({
      show: usersShowsIds,
    });
  } else if (searchParams.show) {
    showStrings = searchParams.show;
    if (!Array.isArray(showStrings)) {
      showStrings = [showStrings];
    }
    const filteredShowIds = showStrings.map(Number);
    podcastData = await getFilterPodcastsUserInfo({
      show: filteredShowIds,
    });
  }

  return (
    <main className="general-pages-styles pt-[6rem] lg:pt-[5.875rem]">
      <div className="flex h-full w-full max-w-[44rem] flex-col gap-5 overflow-hidden lg:sticky lg:max-w-[85rem] lg:flex-row">
        {podcastData && (
          <PodcastFilterAndContentWrapper
            listOfShows={listOfShows}
            podcastData={podcastData}
            usersShowsIds={usersShowsIds}
          />
        )}

        <section className="flex w-full lg:max-w-[20.3125rem] lg:overflow-hidden">
          <div className="flex w-full flex-col gap-5 overflow-scroll">
            <FormLink {...podcastFormLinkProps} className="hidden lg:flex" />
            <Meetups meetUps={meetups} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Podcasts;

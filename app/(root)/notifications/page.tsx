import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import {
  getPopularTags,
  numberOfPeopleFollowed,
} from "@/lib/actions/post.action";
import { getGroups } from "@/lib/actions/group.actions";

import { verifyAuth } from "@/lib/auth";
import Notifications from "@/components/notification-page/Notifications";
import PopularTags from "@/components/home-page/tags/PopularTags";
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

const NotificationPage = async () => {
  const { loggedInUserImage } = await verifyAuth(
    "You must be logged in",
    false
  );

  const [meetups, podcasts, tagsData, groups, peopleFollowed] =
    await Promise.all([
      getAllMeetUps(),
      getAllPodcastsWithUserInfo(),
      getPopularTags(),
      getGroups(),
      numberOfPeopleFollowed(),
    ]);

  return (
    <div
      className="px-5 pt-[1.875rem] sm:flex sm:justify-center xl:justify-start xl:gap-5 xl:px-10 xl:py-0 
        2xl:mx-auto 2xl:max-w-[90rem]"
    >
      <aside className="hidden xl:fixed xl:inset-y-0 xl:left-auto xl:flex xl:max-w-[13.125rem] xl:flex-col xl:gap-5 xl:overflow-y-auto xl:pb-5 xl:pt-[6.25rem]">
        <Sidebar
          isLoggedIn={Boolean(loggedInUserImage)}
          peopleFollowed={peopleFollowed}
        />
        <PopularTags tagsData={tagsData} />
        <PinnedGroup groups={groups} />
      </aside>

      <Notifications />

      <aside className="hidden xl:fixed xl:inset-y-0 xl:right-[max(2.5rem,calc(50%-42.5rem))] xl:flex xl:max-w-[20.3125rem] xl:flex-col xl:gap-5 xl:overflow-y-auto xl:pb-5 xl:pt-[6.25rem]">
        <Meetups meetUps={meetups} />
        <Podcasts podcasts={podcasts} />
      </aside>
    </div>
  );
};

export default NotificationPage;

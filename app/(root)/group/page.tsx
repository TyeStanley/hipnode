import {
  getFastestGrowingGroups,
  getMostPopularGroups,
  getNewlyLaunchedGroups,
} from "@/lib/actions/group.actions";
import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import { getPostsFromGroups } from "@/lib/actions/post.action";

import GroupPost from "@/components/group-page/group-post/GroupPost";
import MobileGroupSection from "@/components/group-page/mobileGroupSection/MobileGroupSection";
import InfiniteScroll from "@/components/InfiniteScroll";

import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import GroupSection from "@/components/group/GroupSection";

export const dynamic = "force-dynamic";

const GroupPage = async () => {
  const [meetups, podcasts, posts] = await Promise.all([
    getAllMeetUps(),
    getAllPodcastsWithUserInfo(),
    getPostsFromGroups(),
  ]);

  return (
    <div className="flex flex-col gap-y-5 p-5 lg:flex-row lg:gap-y-0 lg:p-0 lg:px-10 2xl:mx-auto 2xl:max-w-[90rem]">
      <div className="group-page-left-sidebar">
        <GroupSection
          fastestGrowingGroupsPromise={getFastestGrowingGroups()}
          newlyLaunchedGroupsPromise={getNewlyLaunchedGroups()}
          mostPopularGroupsPromise={getMostPopularGroups()}
        />
      </div>

      <MobileGroupSection
        fastestGrowingGroupsPromise={getFastestGrowingGroups()}
        newlyLaunchedGroupsPromise={getNewlyLaunchedGroups()}
        mostPopularGroupsPromise={getMostPopularGroups()}
      />

      <article
        className="lg:h-screen lg:overflow-y-auto lg:py-[1.875rem] 
        lg:pl-[14.375rem] lg:pr-[21.5625rem]"
      >
        <InfiniteScroll
          renderItem={GroupPost}
          initialData={posts}
          fetchData={getPostsFromGroups}
          className="columns-1 gap-5 sm:columns-2 2xl:columns-3"
        />
      </article>

      <aside className="group-page-right-sidebar">
        <Meetups meetUps={meetups} />
        <Podcasts podcasts={podcasts} />
      </aside>
    </div>
  );
};

export default GroupPage;

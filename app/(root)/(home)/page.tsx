import Podcasts from "@/components/home-page/podcast/Podcasts";
import Meetups from "@/components/home-page/meetup/Meetups";
import PostCardList from "@/components/home-page/post-card/PostCardList";
import Sidebar from "@/components/home-page/sidebar/Sidebar";

import { getAllMeetUps } from "@/lib/actions/meetup.actions";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";

import {
  getAllPosts,
  getAllPostsByTagName,
  getPopularTags,
  numberOfPeopleFollowed,
} from "@/lib/actions/post.action";
import PopularTags from "@/components/home-page/tags/PopularTags";
import PinnedGroup from "@/components/home-page/pinned-group/PinnedGroup";
import { getGroups } from "@/lib/actions/group.actions";
import ResponsiveCreatePostInput from "@/components/posts/create-post-form/ResponsiveCreatePostInput";
import { verifyAuth } from "@/lib/auth";

const Home = async ({ searchParams }: { searchParams: { tag: string } }) => {
  const { loggedInUserImage } = await verifyAuth("Welcome to Hipnode", false);

  const [meetups, podcasts, posts, tagsData, groups, peopleFollowed] =
    await Promise.all([
      getAllMeetUps(),
      getAllPodcastsWithUserInfo(),
      searchParams.tag
        ? getAllPostsByTagName({ tagName: searchParams.tag })
        : getAllPosts({}),
      getPopularTags(),
      getGroups(),
      numberOfPeopleFollowed(),
    ]);
  return (
    <section className="bg-light-2_dark-2 sticky top-[5.25rem] mt-[-5rem] flex h-fit min-h-screen w-screen justify-center overflow-hidden px-5 py-20 lg:top-0 lg:h-screen lg:max-h-screen lg:py-5  lg:pb-[2.3rem] lg:pt-[5.875rem]">
      <div className="flex h-full w-full max-w-[44rem] flex-col gap-5 lg:max-w-[85rem] lg:flex-row">
        <div className="flex lg:w-[13.125rem]">
          <div className="flex w-full flex-col gap-5 overflow-y-auto pt-5 lg:max-h-screen lg:pt-0">
            <Sidebar
              isLoggedIn={Boolean(loggedInUserImage)}
              peopleFollowed={peopleFollowed}
            />
            <div className="flex lg:hidden">
              <ResponsiveCreatePostInput
                userImage={loggedInUserImage ?? "/images/emoji.png"}
              />
            </div>
            <div className="hidden lg:flex">
              <PopularTags tagsData={tagsData} />
            </div>

            <div className="hidden lg:flex">
              <PinnedGroup groups={groups} />
            </div>
          </div>
        </div>

        <div className="flex max-h-full w-full flex-col gap-5">
          <div className="hidden w-full lg:flex">
            <ResponsiveCreatePostInput
              userImage={loggedInUserImage ?? "/images/emoji.png"}
            />
          </div>
          <div className="flex h-full w-full overflow-hidden">
            <PostCardList posts={posts} />
          </div>
        </div>

        <div className="flex w-full lg:max-h-screen lg:w-[20.3125rem]">
          <div className="flex w-full flex-col gap-5 overflow-y-auto sm:flex-row lg:max-h-screen lg:flex-col">
            <Meetups meetUps={meetups} />
            <Podcasts podcasts={podcasts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

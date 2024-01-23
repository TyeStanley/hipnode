import {
  getNewPostsByGroupId,
  getPopularGroupPosts,
  getPopularTagsOnGroupPage,
} from "@/lib/actions/post.action";
import { groupFormLinkProps } from "@/constants";
import { getGroupById } from "@/lib/actions/group.actions";

import FormLink from "@/components/FormLink";
import ActiveMembers from "@/components/group-detail-page/active-members/ActiveMembers";
import Explore from "@/components/explore/Explore";
import GroupAbout from "@/components/group-detail-page/GroupAbout";
import GroupAdmins from "@/components/group-detail-page/GroupAdmins";
import GroupCover from "@/components/group-detail-page/GroupCover";
import RecentMedia from "@/components/group-detail-page/RecentMedia";
import FetchGroupDetailPosts from "@/components/group-detail-page/FetchGroupDetailPosts";
import PopularTags from "@/components/home-page/tags/PopularTags";

const GroupDetailPage = async ({ params }: { params: { id: string } }) => {
  const groupId = Number(params.id);
  const group = await getGroupById({ groupId });
  const tagsData = await getPopularTagsOnGroupPage(groupId);
  // NOTE - Since this is the first query, there is no cursor to pass in.
  const defaultMyCursorId = undefined;
  const newPosts = await getNewPostsByGroupId(defaultMyCursorId, groupId);
  const popularPosts = await getPopularGroupPosts(defaultMyCursorId, groupId);

  return (
    <main className="bg-light-2_dark-2">
      <div className="flex flex-col gap-5 p-5 lg:flex-row lg:px-10 lg:py-0 2xl:mx-auto 2xl:max-w-[90rem]">
        <section
          className="flex flex-col gap-5 lg:ml-[14.375rem] lg:mr-[21.5625rem] 
          lg:h-screen lg:max-w-[49.0625rem] lg:grow lg:overflow-y-auto lg:py-[1.875rem]"
        >
          {group && <GroupCover group={group} />}
          <FormLink {...groupFormLinkProps} className="flex lg:hidden" />
          <Explore groupId={groupId} />
          {newPosts.length > 0 ? (
            <FetchGroupDetailPosts
              initialNewPost={newPosts}
              initialPopularPost={popularPosts}
              fetchNewPost={getNewPostsByGroupId}
              fetchPopularPost={getPopularGroupPosts}
              groupId={groupId}
            />
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center">
              <h1 className="semibold-18 dark:text-light-2">No posts yet</h1>
              <p className="regular-16 text-sc-3">
                Be the first to post in this group!
              </p>
            </div>
          )}
        </section>

        <aside
          className="group-detail-sidebar flex flex-col  gap-5 lg:right-[max(2.5rem,calc(50%-42.5rem))]
          lg:order-last lg:h-screen lg:max-w-[20.3125rem] lg:grow lg:flex-col"
        >
          <FormLink
            {...groupFormLinkProps}
            className="hidden lg:flex lg:w-full lg:max-w-[20.3125rem]"
          />
          <ActiveMembers members={group?.members ?? []} />
          <RecentMedia media={group?.posts ?? []} />
        </aside>

        <aside
          className="group-detail-sidebar flex flex-col  gap-5 
          lg:left-auto lg:order-first lg:h-screen lg:max-w-[13.125rem]"
        >
          <GroupAbout
            description={group?.description ?? group?.name ?? "N/A"}
          />
          <GroupAdmins admins={group?.admins ?? []} />
          <PopularTags tagsData={tagsData} />
        </aside>
      </div>
    </main>
  );
};

export default GroupDetailPage;

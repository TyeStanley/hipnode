import {
  getFastestGrowingGroups,
  getMostPopularGroups,
  getNewlyLaunchedGroups,
  fetchAllGroupsOptions,
} from "@/lib/actions/group.actions";

import CreatePost from "@/components/posts/create-post-form/CreatePost";

import { getAllShowOptions } from "@/lib/actions/podcast.actions";
import { CreatePostProvider } from "@/app/contexts/CreatePostContext";

const CreatePostPage = async () => {
  const [
    groups,
    shows,
    fastestGrowingGroups,
    mostPopularGroups,
    newlyLaunchedGroups,
  ] = await Promise.all([
    fetchAllGroupsOptions(),
    getAllShowOptions(),
    getFastestGrowingGroups(),
    getMostPopularGroups(),
    getNewlyLaunchedGroups(),
  ]);

  return (
    <main className="flex h-fit justify-center overflow-scroll bg-light-2 p-5 pb-[6rem] dark:bg-dark-2 md:items-center">
      <CreatePostProvider>
        <CreatePost
          shows={shows}
          groups={groups}
          fastestGrowingGroups={fastestGrowingGroups}
          mostPopularGroups={mostPopularGroups}
          newlyLaunchedGroups={newlyLaunchedGroups}
        />
      </CreatePostProvider>
    </main>
  );
};

export default CreatePostPage;

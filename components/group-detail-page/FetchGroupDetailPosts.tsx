"use client";

import { useSearchParams } from "next/navigation";

import InfiniteScroll from "@/components/InfiniteScroll";
import GroupDetailPost from "@/components/group-detail-page/group-detail-post/GroupDetailPost";
import { FetchGroupDetailPostsProps } from "@/types";

const FetchGroupDetailPosts = ({
  initialNewPost,
  initialPopularPost,
  fetchNewPost,
  fetchPopularPost,
  groupId,
}: FetchGroupDetailPostsProps) => {
  const searchParams = useSearchParams();
  const explore = searchParams.get("posts");

  const fetchData = explore === "Popular" ? fetchPopularPost : fetchNewPost;
  const initialData =
    explore === "Popular" ? initialPopularPost : initialNewPost;

  return (
    <InfiniteScroll
      initialData={initialData}
      fetchData={fetchData}
      renderItem={GroupDetailPost}
      className="flex flex-col gap-5"
      groupId={groupId}
    />
  );
};

export default FetchGroupDetailPosts;

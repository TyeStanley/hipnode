"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { MeetupsCard } from "../meetup-components";
import { SeeMoreButton } from "../interview-components";

import { getProfilePosts } from "@/lib/actions/profile.actions";

const PostsList = ({ data, authorId, resultType }: any) => {
  const [dataList, setDataList] = useState<any[]>(data.data);
  const [currentPage, setCurrentPage] = useState<number>(data.page);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(data.hasMore);
  const [ref, inView] = useInView();

  useEffect(() => {
    // fetches more data when the user scrolls to the bottom of the page
    const fetchMoreData = async () => {
      if (inView || loadMore) {
        try {
          const moreData = await getProfilePosts(authorId, currentPage + 1);

          if (moreData.data.length) {
            setDataList((prevData) => [...(prevData ?? []), ...moreData.data]);

            setCurrentPage((prevPage) => prevPage + 1);
          }

          setHasMoreData(moreData.hasMore);
        } catch (error) {
          console.error("Error fetching more meetups:", error);
        } finally {
          setLoadMore(false);
        }
      }
    };
    fetchMoreData();
  }, [inView, loadMore, resultType, authorId, currentPage]);

  return (
    <ul className="mb-20 flex flex-col gap-5">
      {dataList.map((item) => (
        <MeetupsCard key={item.id} meetUp={item} />
      ))}
      <SeeMoreButton hasMore={true} setLoadMore={setLoadMore} />
      <p
        ref={ref}
        className={`${
          !hasMoreData && "hidden lg:hidden"
        } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
      >
        Loading...
      </p>
    </ul>
  );
};

export default PostsList;

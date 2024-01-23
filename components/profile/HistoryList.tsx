"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { SeeMoreButton, InterviewCard } from "../interview-components";
import { getProfileHistory } from "@/lib/actions/profile.actions";
import { PostCard } from "../home-page/post-card";
import { MeetupsCard } from "../meetup-components";
import { PodcastCard } from "../podcast-components";

interface HistoryListProps {
  data: {
    data: any[];
    page: number;
    hasMore: boolean;
  };
  authorId: string;
}

const HistoryList = ({ data, authorId }: HistoryListProps) => {
  const [dataList, setDataList] = useState(data.data);
  const [currentPage, setCurrentPage] = useState(data.page);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(data.hasMore);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchMoreData = async () => {
      if (inView || loadMore) {
        try {
          const moreData = await getProfileHistory(authorId, currentPage + 1);

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
  }, [inView, loadMore, authorId, currentPage]);

  return (
    <ul className="mt-5 flex translate-y-[-1.25rem] flex-col gap-5 overflow-auto">
      {dataList.map((item) => {
        if (item.post !== null)
          return (
            <PostCard
              key={item.post.id}
              post={item.post}
              setTagged={() => {}}
            />
          );

        if (item.meetup !== null)
          return <MeetupsCard key={item.meetup.id} meetUp={item.meetup} />;

        if (item.podcast !== null)
          return <PodcastCard key={item.podcast.id} info={item.podcast} />;

        if (item.interview !== null)
          return (
            <InterviewCard
              key={item.interview.id}
              interviewData={item.interview}
            />
          );

        return null;
      })}

      <SeeMoreButton hasMore={hasMoreData} setLoadMore={setLoadMore} />

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

export default HistoryList;

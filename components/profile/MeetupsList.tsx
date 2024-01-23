"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { MeetupsCard } from "../meetup-components";
import { SeeMoreButton } from "../interview-components";

import {
  ProfileMeetupResponse,
  getProfileMeetups,
} from "@/lib/actions/profile.actions";

interface MeetupsListProps {
  data: ProfileMeetupResponse;
  authorId: string;
  resultType: string;
}

const MeetupsList = ({ data, authorId, resultType }: MeetupsListProps) => {
  const [dataList, setDataList] = useState(data.data);
  const [currentPage, setCurrentPage] = useState(data.page);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(data.hasMore);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchMoreData = async () => {
      if (inView || loadMore) {
        try {
          const moreData = await getProfileMeetups(authorId, currentPage + 1);

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
    <ul className="flex flex-col gap-5 overflow-auto">
      {dataList.map((item) => (
        <MeetupsCard key={item.id} meetUp={item} />
      ))}

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

export default MeetupsList;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { BoxShading, InterviewCard, SeeMoreButton } from ".";
import { extractArray } from "@/utils";
import { getFilteredInterviews } from "@/lib/actions/interview.actions";
import { InterviewPageProps, InterviewProps } from "@/types/interview.index";
import { LoaderComponent } from "../onboarding-components";

const InterviewPageFilter = ({
  loading,
  setLoading,
  interviewData,
  interviewArray,
}: InterviewPageProps) => {
  const queryString = useSearchParams().toString();
  const interviewIds =
    queryString === ""
      ? interviewArray
      : extractArray(queryString, "interview");

  const [interviewList, setInterviewList] = useState<InterviewProps[]>(
    interviewData.interviews
  );
  const [loadMore, setLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(interviewData.page);
  const [hasMoreInterviews, setHasMoreInterviews] = useState(
    interviewData.hasMore
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchMoreInterviews = async () => {
      if (inView || loadMore) {
        try {
          const moreInterviews = await getFilteredInterviews({
            tagIds: interviewIds,
            page: currentPage,
          });
          if (moreInterviews.interviews.length) {
            setInterviewList((prevInterviews) => [
              ...(prevInterviews ?? []),
              ...moreInterviews.interviews,
            ]);
            setCurrentPage((prevPage) => prevPage + 1);
          }
          setHasMoreInterviews(moreInterviews.hasMore);
          setLoadMore(false);
        } catch (error) {
          console.error("Error fetching more interviews:", error);
          setLoadMore(false);
        }
      }
    };
    fetchMoreInterviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loadMore]);

  useEffect(() => {
    setInterviewList(interviewData.interviews);
    setCurrentPage(1);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewData, queryString]);

  useEffect(() => {
    if (queryString === "") {
      setHasMoreInterviews(true);
      setCurrentPage(1);
    }
  }, [queryString]);

  if (loading) {
    return (
      <div className="flex-center flex w-full">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <article className="relative flex xl:w-full">
      <BoxShading />
      <section className="flex w-fit flex-col gap-5 overflow-y-scroll xl:w-full">
        {interviewList.length === 0 && <p>No interviews available.</p>}
        {interviewList.length &&
          interviewList.map((interview) => (
            <InterviewCard key={interview.id} interviewData={interview} />
          ))}
        <SeeMoreButton hasMore={hasMoreInterviews} setLoadMore={setLoadMore} />
        <p
          ref={ref}
          className={`${
            !hasMoreInterviews && "hidden lg:hidden"
          } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
        >
          Loading...
        </p>
      </section>
    </article>
  );
};

export default InterviewPageFilter;

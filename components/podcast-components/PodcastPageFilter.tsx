"use client";

import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { getFilterPodcastsUserInfo } from "@/lib/actions/podcast.actions";
import { extractArray } from "@/utils";
import { PodcastPageFilterProps } from "@/types/podcast.index";
import { BoxShading, SeeMoreButton } from "../interview-components";
import { PodcastListColumn } from ".";
import { LoaderComponent } from "../onboarding-components";

const PodcastPageFilter = ({
  loading,
  setLoading,
  podcastData,
  userShowsIds,
}: PodcastPageFilterProps) => {
  const queryString = useSearchParams().toString();
  const showsArray =
    queryString === "" ? userShowsIds : extractArray(queryString, "show");

  const [podcasts, setPodcasts] = useState(podcastData?.podcasts);
  const [currentPage, setCurrentPage] = useState<number>(podcastData?.page);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMorePodcasts, setHasMorePodcasts] = useState(podcastData?.hasMore);
  const [ref, inView] = useInView();

  const oddPodcasts = podcasts?.filter((_, index) => index % 2 !== 0);
  const evenPodcasts = podcasts?.filter((_, index) => index % 2 === 0);

  const displayedPodcasts = [
    {
      listNumber: "List One",
      list: evenPodcasts,
    },
    {
      listNumber: "List Two",
      list: oddPodcasts,
    },
  ];

  useEffect(() => {
    if (queryString === "") {
      setHasMorePodcasts(true);
      setCurrentPage(1);
    }
  }, [queryString]);

  useEffect(() => {
    const fetchMorePodcasts = async () => {
      if (inView || loadMore) {
        try {
          const morePodcasts = await getFilterPodcastsUserInfo({
            show: showsArray,
            page: currentPage,
          });
          if (morePodcasts.podcasts.length) {
            setPodcasts((prevPodcasts) => [
              ...(prevPodcasts ?? []),
              ...morePodcasts.podcasts,
            ]);
            setCurrentPage((prevPage) => prevPage + 1);
          }
          setHasMorePodcasts(morePodcasts.hasMore);
          setLoadMore(false);
        } catch (error) {
          console.error("Error fetching more podcasts:", error);
          setLoadMore(false);
        }
      }
    };
    fetchMorePodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loadMore]);

  useEffect(() => {
    setPodcasts(podcastData?.podcasts);
    setCurrentPage(1);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastData, queryString]);

  if (loading) {
    return (
      <div className="flex-center flex h-full w-full">
        <LoaderComponent />
      </div>
    );
  }
  return (
    <article className="relative flex h-full w-full flex-col">
      <BoxShading />
      <section className="no-scrollbar flex w-full flex-col lg:overflow-scroll lg:pb-10">
        <div className="flex flex-col gap-5 xl:flex-row">
          {podcasts && podcasts.length === 0 && <p>No podcasts available.</p>}
          {podcasts &&
            displayedPodcasts.map((podcasts) => (
              <PodcastListColumn
                key={podcasts.listNumber}
                podcasts={podcasts}
              />
            ))}
        </div>
        <SeeMoreButton
          hasMore={hasMorePodcasts}
          setLoadMore={setLoadMore}
          className="mt-5"
        />
        <p
          ref={ref}
          className={`${
            !hasMorePodcasts && "hidden lg:hidden"
          } mt-2 hidden animate-pulse self-center dark:text-light-2 lg:flex`}
        >
          Loading...
        </p>
      </section>
    </article>
  );
};

export default PodcastPageFilter;

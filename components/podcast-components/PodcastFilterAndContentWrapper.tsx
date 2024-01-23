"use client";

import { useState } from "react";

import { podcastFormLinkProps } from "@/constants";
import { Categories, PodcastPageFilter } from ".";
import FormLink from "../FormLink";
import { PodcastFilterAndContentWrapperProps } from "@/types/podcast.index";

const PodcastFilterAndContentWrapper = ({
  listOfShows,
  podcastData,
  usersShowsIds,
}: PodcastFilterAndContentWrapperProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <section className="flex h-full w-full flex-col gap-5 lg:w-[13.125rem]">
        <FormLink {...podcastFormLinkProps} className="flex lg:hidden" />

        <div className="hidden overflow-scroll lg:flex">
          <Categories
            setLoading={setLoading}
            filters={listOfShows}
            page="podcasts"
            urlFilter="show"
            className="md:w-[13.125rem]"
          />
        </div>
      </section>
      <section className="flex w-full flex-col">
        <PodcastPageFilter
          loading={loading}
          setLoading={setLoading}
          podcastData={podcastData}
          userShowsIds={usersShowsIds}
        />
      </section>
    </>
  );
};

export default PodcastFilterAndContentWrapper;

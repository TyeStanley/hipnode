"use client";

import { useState } from "react";

import { meetupFormLinkProps } from "@/constants";
import FormLink from "../FormLink";
import { MeetupFilterAndContentWrapperProps } from "@/types/meetups.index";
import { MeetupPageFilter } from ".";
import { Categories } from "../podcast-components";

const MeetupFilterAndContentWrapper = ({
  meetupTags,
  meetupData,
  meetupFilters,
}: MeetupFilterAndContentWrapperProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <section
        className="
      flex w-full flex-col gap-5 lg:w-[13.125rem]"
      >
        <FormLink {...meetupFormLinkProps} className="flex lg:hidden" />
        <Categories
          setLoading={setLoading}
          filters={meetupTags}
          page="meet-ups"
          urlFilter="meetup"
          className="lg:w-[13.125rem]"
        />
      </section>
      <MeetupPageFilter
        loading={loading}
        setIsLoading={setLoading}
        meetupsData={meetupData}
        meetupFilters={meetupFilters}
      />
    </>
  );
};

export default MeetupFilterAndContentWrapper;

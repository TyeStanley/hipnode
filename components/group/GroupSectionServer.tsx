"use client";

import { useState } from "react";

import OutlineIcons from "@/components/icons/outline-icons";
import { HeadingsType } from "@/types";
import SectionGroup from "@/components/SectionGroup";

import { headings } from "@/constants";

const GroupSectionServer = ({
  fastestGrowingGroups,
  mostPopularGroups,
  newlyLaunchedGroups,
  setValue,
}: any) => {
  const [expandedGroupIndex, setExpandedGroupIndex] = useState<null | number>(
    null
  );

  const sectionHeadings = headings(
    fastestGrowingGroups,
    mostPopularGroups,
    newlyLaunchedGroups
  );

  return (
    <aside
      className={`bg-light_dark-4 relative flex w-fit flex-col rounded-2xl p-2.5 md:flex-row ${
        expandedGroupIndex !== null ? "gap-2.5" : "gap-5"
      }`}
    >
      {/* <TopPointDecoration /> */}
      <figure
        className={`${expandedGroupIndex === null && "hidden"} cursor-pointer`}
        onClick={() => setExpandedGroupIndex(null)}
      >
        <OutlineIcons.ArrowLeft className="stroke-sc-2 hover:opacity-80 hover:transition-opacity dark:stroke-sc-3" />
      </figure>

      {sectionHeadings.map((section: HeadingsType, index: number) => (
        <SectionGroup
          key={section.title}
          section={section}
          index={index}
          expandedGroupIndex={expandedGroupIndex}
          setExpandedGroupIndex={setExpandedGroupIndex}
          setValue={setValue}
        />
      ))}
    </aside>
  );
};

export default GroupSectionServer;

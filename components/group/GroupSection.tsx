"use client";

import { useState, use } from "react";

import OutlineIcons from "@/components/icons/outline-icons";
import { GroupSectionProps, HeadingsType } from "@/types";
import SectionGroup from "@/components/SectionGroup";
import TopPointDecoration from "@/components/TopPointDecoration";
import { headings } from "@/constants";

const GroupSection = ({
  fastestGrowingGroupsPromise,
  mostPopularGroupsPromise,
  newlyLaunchedGroupsPromise,
}: GroupSectionProps) => {
  const [expandedGroupIndex, setExpandedGroupIndex] = useState<null | number>(
    null
  );

  const fastestGrowingGroups = use(fastestGrowingGroupsPromise);
  const mostPopularGroups = use(mostPopularGroupsPromise);
  const newlyLaunchedGroups = use(newlyLaunchedGroupsPromise);

  const sectionHeadings = headings(
    fastestGrowingGroups,
    mostPopularGroups,
    newlyLaunchedGroups
  );

  return (
    <aside
      className={`bg-light_dark-4 relative flex max-w-[13.125rem] flex-col rounded-2xl p-2.5 ${
        expandedGroupIndex !== null ? "gap-2.5" : "gap-5"
      }`}
    >
      <TopPointDecoration />
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
        />
      ))}
    </aside>
  );
};

export default GroupSection;

import { HeadingsType } from "@/types";
import React, { useState } from "react";
import SectionGroup from "../SectionGroup";
import TopPointDecoration from "../TopPointDecoration";
import OutlineIcon from "../icons/outline-icons";

type GroupSectionContentProps = {
  sectionHeadings: HeadingsType[];
};

const GroupSectionContent = ({ sectionHeadings }: GroupSectionContentProps) => {
  const [expandedGroupIndex, setExpandedGroupIndex] = useState<null | number>(
    null
  );
  return (
    <aside
      className={`bg-light_dark-4 relative flex w-56 flex-col rounded-2xl p-2.5 ${
        expandedGroupIndex !== null ? "gap-2.5" : "gap-5"
      }`}
    >
      <TopPointDecoration />
      <figure
        className={`${expandedGroupIndex === null && "hidden"} cursor-pointer`}
        onClick={() => setExpandedGroupIndex(null)}
      >
        <OutlineIcon.ArrowLeft className="stroke-sc-2 hover:opacity-80 hover:transition-opacity dark:stroke-sc-3" />
      </figure>

      {sectionHeadings?.map((section: HeadingsType, index: number) => (
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

export default GroupSectionContent;

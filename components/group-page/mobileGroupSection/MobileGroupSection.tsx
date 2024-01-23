"use client";

import { useState, use } from "react";
import { useSearchParams } from "next/navigation";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import FastestGrowingGroups from "@/components/group-page/mobileGroupSection/FastestGrowingGroups";
import PopularAndNewGroups from "@/components/group-page/mobileGroupSection/PopularAndNewGroups";
import GroupHeader from "@/components/group-page/mobileGroupSection/GroupHeader";
import CollapsibleHeader from "@/components/group-page/mobileGroupSection/CollapsibleHeader";
import SeeAllGroups from "@/components/group-page/mobileGroupSection/SeeAllGroups";
import { GroupData, GroupSectionProps } from "@/types";
import { groupHeaderData } from "@/constants";

const MobileGroupSection = ({
  fastestGrowingGroupsPromise,
  mostPopularGroupsPromise,
  newlyLaunchedGroupsPromise,
}: GroupSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const groups = searchParams.get("groups") ?? "N/A";

  const fastestGrowingGroups = use(fastestGrowingGroupsPromise);
  const mostPopularGroups = use(mostPopularGroupsPromise);
  const newlyLaunchedGroups = use(newlyLaunchedGroupsPromise);

  const groupData = {
    // NOTE - cannot be exportable because of passed group data
    "fastest-growing": fastestGrowingGroups,
    "Most Popular": mostPopularGroups,
    "Newly Launched": newlyLaunchedGroups,
  };

  const selectedGroup = groupData[groups as keyof GroupData];
  const selectedGroupHeader = groupHeaderData[groups as keyof GroupData];

  return (
    <section className="block lg:hidden">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`bg-light_dark-3 rounded-2xl p-2.5 ${isOpen && "pb-3.5"}`}
      >
        {/* // NOTE - When a user click the See all button, the GroupHeader will be rendered. */}
        {selectedGroupHeader ? (
          <GroupHeader
            color={selectedGroupHeader.header.color}
            Icon={selectedGroupHeader.header.icon}
            title={selectedGroupHeader.header.title}
          />
        ) : (
          // NOTE - Default GroupHeader that can be toggled.
          <CollapsibleHeader isOpen={isOpen} />
        )}
        <CollapsibleContent>
          {/* // NOTE - When a user click the See all button, the SeeAllGroups will be rendered. */}
          {selectedGroup ? (
            <SeeAllGroups allGroups={selectedGroup} />
          ) : (
            <>
              {/* // NOTE - Default three groups showing */}
              <FastestGrowingGroups
                fastestGrowingGroups={fastestGrowingGroups}
              />
              <PopularAndNewGroups
                mostPopularGroups={mostPopularGroups}
                newlyLaunchedGroups={newlyLaunchedGroups}
              />
            </>
          )}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default MobileGroupSection;

import GroupSectionServer from "@/components/group/GroupSectionServer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const GroupPopover = ({
  currentGroup,
  fastestGrowingGroups,
  mostPopularGroups,
  newlyLaunchedGroups,
  setValue,
}: any) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="flex  justify-between border-none text-base text-blue-80 dark:bg-dark-4"
      >
        <div className="flex w-fit flex-row  rounded-md px-[0.625rem] py-[0.25rem] dark:bg-dark-4">
          <p
            className={`flex items-center justify-start gap-2 text-[0.563rem]  sm:text-[0.875rem] md:leading-[1.375rem] ${
              currentGroup ? "text-blue-80" : "dark:text-light-2"
            }`}
          >
            {currentGroup || "Select Group"}{" "}
            <ChevronDown className=" h-4 w-4 text-white opacity-50" />
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex md:translate-x-[-15.8rem]">
        <GroupSectionServer
          fastestGrowingGroups={fastestGrowingGroups}
          mostPopularGroups={mostPopularGroups}
          newlyLaunchedGroups={newlyLaunchedGroups}
          setValue={setValue}
        />
      </PopoverContent>
    </Popover>
  );
};

export default GroupPopover;

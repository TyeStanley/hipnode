import OutlineIcon from "@/components/icons/outline-icons";

import { RightSidebarHeaderProps } from "@/types/homepage";
const RightSidebarHeader = ({ heading }: RightSidebarHeaderProps) => (
  <div className="flex items-center">
    <header className="pr-[0.188rem] text-base font-semibold text-sc-2 dark:text-light-2">
      {heading}
    </header>
    <OutlineIcon.ArrowRight />
  </div>
);

export default RightSidebarHeader;

import { cn } from "@/lib/utils";
import HorizontalTab from "./HorizontalTab";

const HorizontalScrollList = ({ classNames }: { classNames?: string }) => (
  <div
    className={cn(
      "flex h-[2.0625rem] cursor-pointer gap-[1.625rem] border-b border-light-2 px-5 xl:h-[2.1875rem] xl:px-[2.06rem] dark:border-dark-3",
      classNames
    )}
  >
    <HorizontalTab />
  </div>
);

export default HorizontalScrollList;

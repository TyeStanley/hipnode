import { Dispatch, SetStateAction } from "react";

import OutlineIcon from "@/components/icons/outline-icons";

interface SeeMoreButtonProps {
  hasMore: boolean;
  setLoadMore: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const SeeMoreButton = ({
  hasMore,
  setLoadMore,
  className,
}: SeeMoreButtonProps) => {
  return (
    <button
      className={`${className} flex w-fit items-center gap-2.5 lg:hidden ${
        !hasMore && "hidden"
      }`}
      onClick={() => setLoadMore(true)}
    >
      <p className="text-sc-3">See More</p>
      <OutlineIcon.ArrowRight className="stroke-sc-3" />
    </button>
  );
};

export default SeeMoreButton;

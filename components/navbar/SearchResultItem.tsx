import Link from "next/link";

import { resultInfo } from "@/constants/search-bar";
import FillIcon from "../icons/fill-icons";
import { SearchResultItemProps } from "@/types/searchbar.index";

const SearchResultItem = ({ result, handleClose }: SearchResultItemProps) => {
  const resultData = resultInfo.find((info) => info.title === result.type);
  const IconComponent = resultData?.icon || FillIcon.Post;
  const url = resultData?.url;

  return (
    <Link
      href={`${url}/${result.id}`}
      key={result.id}
      className="flex w-full cursor-pointer gap-2.5 px-4 py-3 hover:bg-light-2 dark:hover:bg-dark-4"
      onClick={() => handleClose()}
    >
      <IconComponent className="h-4 w-4 shrink-0 fill-sc-3 dark:fill-sc-4" />
      <li className="flex flex-col">
        <p className="text-xs font-bold text-sc-2 dark:text-light">
          {result.title}
        </p>
        <span className="text-[10px] font-semibold text-light-4">
          {result.type}
        </span>
      </li>
    </Link>
  );
};

export default SearchResultItem;

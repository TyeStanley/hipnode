"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { exploreIcons } from "@/constants";

const ExploreButton = ({ groupId }: { groupId: number }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("posts");
  const searchForNew = search !== "Popular";
  const searchForPopular = search === "Popular";

  const colorVariants: { [key: string]: string } = {
    // NOTE - newIcon is the star symbol
    newIcon: searchForNew ? "fill-red-80" : "fill-sc-2 dark:fill-light-2",
    // NOTE - newIconSecondary is the text in the star symbol
    newIconSecondary: searchForNew
      ? "fill-red-10"
      : "fill-light-2 dark:fill-dark-3",

    popularIcon: searchForPopular
      ? "fill-red-80"
      : "fill-sc-2 dark:fill-light-2",

    newIconBg: searchForNew ? "bg-red-10" : "bg-light-2 dark:bg-dark-4",
    newIconText: searchForNew ? "text-red-80" : "text-sc-2 dark:text-light-2",

    popularBg: searchForPopular ? "bg-red-10" : "bg-light-2 dark:bg-dark-4",
    popularText: searchForPopular
      ? "text-red-80"
      : "text-sc-2 dark:text-light-2",
  };

  return (
    <>
      {exploreIcons.map((icon) => (
        <Link
          href={{
            pathname: `/group/${groupId}`,
            query: { posts: icon.label },
          }}
          key={icon.label}
          className={`flex h-8 cursor-pointer flex-row items-center justify-center gap-[0.62rem] 
          rounded-[0.25rem] p-[0.375rem] hover:opacity-80 hover:transition-opacity 
          ${colorVariants[icon.bgColor]} ${colorVariants[icon.textColor]}`}
        >
          {
            <icon.Icon
              className={colorVariants[icon.color]}
              color={colorVariants[icon.color]}
              secondaryColor={colorVariants[icon.secondaryColor as string]}
            />
          }
          {icon.label}
        </Link>
      ))}
    </>
  );
};

export default ExploreButton;

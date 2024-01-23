import { SidebarItemProps } from "@/types/posts";
import Link from "next/link";

const SidebarItem = ({ item, peopleFollowed }: SidebarItemProps) => {
  const { title, icon, subTitle, loggedInFollowerFilter, description } = item;

  const IconComponent = icon;

  return (
    <Link
      key={title}
      className="flex w-full cursor-pointer flex-row items-center justify-between rounded-md p-1.5 hover:translate-x-1 hover:scale-[101%] hover:bg-light-2 dark:hover:bg-dark-4"
      href={`?filter=${title.toLowerCase()}`}
    >
      <div className="bg-light-2_dark-4 flex-center h-[1.75rem] w-[1.75rem] shrink-0 rounded-md">
        <IconComponent />
      </div>
      <div className="flex w-full flex-col justify-between pl-[0.375rem]">
        <p className="flex flex-row text-[0.75rem] font-semibold leading-[1.125rem] text-sc-2 dark:text-light">
          {title}
          {subTitle && (
            <span className="hidden  pl-0.5 md:flex">{subTitle}</span>
          )}
          {loggedInFollowerFilter && (
            <span className="ml-[0.25rem] flex h-[1.25rem] w-[1.375rem] items-center justify-center rounded-md bg-red-80 text-[0.563rem] font-semibold leading-[0.875rem] text-light">
              {peopleFollowed}
            </span>
          )}
        </p>
        <p className="line-clamp-1 hidden text-[0.563rem] dark:text-sc-3 lg:block">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default SidebarItem;

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import pluralize from "pluralize";

import { notificationTabs } from "@/constants";
import { NotificationTab } from "@/types";

const HorizontalTab = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const selectedTab =
    search.get("tab") ?? notificationTabs[0].title.toLowerCase();

  return (
    <>
      {notificationTabs.map((tab: NotificationTab) => {
        const IconComponent = tab.icon;
        const isTabComments = tab.title === "Comment";
        return (
          <Link
            href={{
              pathname,
              query: { tab: tab.title.toLowerCase() },
            }}
            key={tab.title}
            className={`${
              selectedTab === tab.title.toLowerCase()
                ? "border-blue dark:border-blue-80"
                : "border-transparent"
            } flex h-[2.0625rem] items-center justify-start gap-2 overflow-visible whitespace-nowrap border-b pb-[0.625rem] 
                text-start hover:opacity-80 hover:transition-opacity xl:h-[2.1875rem]`}
          >
            {IconComponent && (
              <IconComponent
                className={`${
                  selectedTab === tab.title.toLowerCase()
                    ? isTabComments
                      ? "stroke-blue dark:stroke-blue-80"
                      : "fill-blue dark:fill-blue-80"
                    : isTabComments
                      ? "stroke-sc-2 dark:stroke-sc-3"
                      : "fill-sc-2 dark:fill-sc-3"
                } shrink-0`}
              />
            )}
            <span
              className={`semibold-14 xl:semibold-16 ${
                selectedTab === tab.title.toLowerCase()
                  ? "text-blue dark:text-blue-80"
                  : "text-sc-2 dark:text-sc-3"
              }`}
            >
              {`${pluralize(tab.title)}`}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default HorizontalTab;

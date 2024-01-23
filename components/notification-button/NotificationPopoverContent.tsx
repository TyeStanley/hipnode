"use client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";

import { MAX_NOTIFICATIONS } from "@/constants";
import { NotificationProps } from "@/types";
import { filterNotifications, sortedNotifications } from "@/utils";
import { Separator } from "../ui/separator";
import HorizontalScrollList from "./HorizontalScrollList";
import NotificationComment from "./NotificationComment";
import MarkAllReadButton from "./MarkAllReadButton";
import { NoNotificationMessage } from "../notification-page/NoNotificationMessage";
import Spinner from "../Spinner";

const NotificationPopoverContent = ({
  notificationData,
  setIsPopoverOpen,
  unreadNotifications,
  isInitialLoading,
}: {
  notificationData: NotificationProps[];
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
  unreadNotifications: number;
  isInitialLoading: boolean;
}) => {
  const selectedTab = useSearchParams().get("tab");
  const notifications = filterNotifications(notificationData, selectedTab);
  const sortedNotificationData = sortedNotifications(notifications);

  return (
    <section className="relative w-[20.9375rem] rounded-lg bg-light pt-5 dark:bg-dark-4 xl:w-[36.8125rem] xl:pt-[1.875rem]">
      {/* // NOTE - The pointy part of the popover */}
      <div
        className="absolute left-32 top-[-0.42rem] h-[12.6875rem] w-[12.875rem] rounded-lg 
          bg-mobile-notification-popover bg-no-repeat dark:bg-mobile-dark-notification-popover 
          xl:left-0 xl:top-[-0.4rem] xl:h-[11.688rem] xl:w-[36.813rem] xl:bg-notification-popover 
          dark:xl:bg-dark-notification-popover"
      />

      <div className="flex flex-col gap-5">
        {/* // NOTE - Top section */}
        <section className="relative z-10 bg-light dark:bg-dark-4">
          <div className="flex flex-col gap-5 rounded-t-lg xl:gap-[1.875rem]">
            <div className="flex items-center justify-center gap-[3.9375rem] xl:gap-[13.9375rem]">
              <h1 className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2 xl:text-[1.625rem] xl:leading-[2.375rem]">
                {unreadNotifications} Notifications
              </h1>
              <MarkAllReadButton
                unreadNotifications={unreadNotifications}
                setIsPopoverOpen={setIsPopoverOpen}
              />
            </div>
            <Separator className="bg-light-2 dark:bg-dark-3" />
            <div className="flex overflow-x-scroll">
              <HorizontalScrollList />
            </div>
          </div>
        </section>
        {/* // NOTE - Comments section */}
        <section className="relative z-10 flex flex-col justify-center rounded-b-lg bg-white dark:bg-dark-4">
          <div className="flex flex-col gap-5 px-5 xl:gap-[1.875rem] xl:px-[1.875rem]">
            {isInitialLoading ? (
              <div className="flex items-center justify-center pt-7">
                <Spinner />
              </div>
            ) : sortedNotificationData.length !== 0 ? (
              sortedNotificationData
                .slice(0, MAX_NOTIFICATIONS)
                .map((notification) => (
                  <NotificationComment
                    key={notification.id}
                    senderName={notification.senderName}
                    type={notification.type}
                    comment={notification.commentContent}
                    date={notification.date}
                    title={notification.title}
                    isRead={notification.isRead}
                    image={notification.image}
                    isFollowed={notification.isFollowed}
                    commentId={notification.commentId}
                  />
                ))
            ) : (
              <NoNotificationMessage selectedTab={selectedTab} />
            )}
            <Link
              href="/notifications"
              className="semibold-14 font-feature mb-[1.625rem] inline-flex justify-center text-blue hover:underline dark:text-blue-80 xl:mb-[1.875rem]"
            >
              View All Notifications
            </Link>
          </div>
        </section>
      </div>
      {/* NOTE - To make the blur effect */}
      <div
        className="absolute bottom-0 left-3 -z-10 h-[88%] w-[19.625rem] shrink-0 bg-sc-3 opacity-50 blur-[3.125rem] 
        dark:bg-dark-1 xl:left-[1.88rem] xl:w-[33.375rem]"
      />
    </section>
  );
};

export default NotificationPopoverContent;

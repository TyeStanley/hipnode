"use client";
import { useSearchParams } from "next/navigation";

import { filterNotifications, sortedNotifications } from "@/utils";
import { useNotifications } from "@/app/contexts/NotificationContext";
import HorizontalScrollList from "@/components/notification-button/HorizontalScrollList";
import NotificationInfiniteScroll from "./NotificationInfiniteScroll";
import MarkAllReadButton from "../notification-button/MarkAllReadButton";

const Notifications = () => {
  const selectedTab = useSearchParams().get("tab");
  const { notificationData, addNotifications, isInitialLoading } =
    useNotifications();

  const notifications = filterNotifications(notificationData, selectedTab);
  const sortedNotificationData = sortedNotifications(notifications);
  const unreadNotifications = notificationData?.filter(
    (notification) => !notification.isRead
  );

  return (
    <div className="flex flex-col xl:relative xl:left-[14.375rem] xl:w-[max(35rem,calc(100%-575px))] xl:grow xl:pt-5 2xl:max-w-[49.0625rem]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="semibold-26 text-sc-2 dark:text-light">
            Notifications
          </h1>
          <MarkAllReadButton unreadNotifications={unreadNotifications.length} />
        </div>
        <div className="flex overflow-x-scroll">
          <HorizontalScrollList classNames="border-sc-5 px-0 xl:px-0" />
        </div>
      </div>
      <NotificationInfiniteScroll
        notifications={sortedNotificationData}
        isInitialLoading={isInitialLoading}
        selectedTab={selectedTab}
        addNotifications={addNotifications}
      />
    </div>
  );
};

export default Notifications;

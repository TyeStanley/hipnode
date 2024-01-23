"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { NotificationProps } from "@/types";
import { getNotificationsByCursorId } from "@/lib/actions/notification.actions";
import Spinner from "@/components/Spinner";
import { NoNotificationMessage } from "./NoNotificationMessage";
import NotificationComment from "../notification-button/NotificationComment";

let hasMoreNotification = true;

const NotificationInfiniteScroll = ({
  notifications,
  isInitialLoading,
  selectedTab,
  addNotifications,
}: {
  notifications: NotificationProps[];
  isInitialLoading: boolean;
  selectedTab: string | null;
  addNotifications: (notifications: NotificationProps[]) => void;
}) => {
  const [data, setData] = useState<NotificationProps[]>([]);
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(notifications);
  }, [notifications]);

  const loadMoreData = async () => {
    setIsLoading(true);
    const cursorId = data[data.length - 1]?.id;
    const { notifications, hasMoreData } =
      await getNotificationsByCursorId(cursorId);
    if (!hasMoreData) {
      setIsLoading(false);
      hasMoreNotification = false;
      return;
    }
    setData((prevData) => [...prevData, ...notifications]);
    addNotifications(notifications);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && hasMoreNotification) loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="flex max-h-[100dvh] flex-col gap-y-5 overflow-y-auto pb-[6.125rem] pt-5 md:pb-[1.875rem] xl:gap-y-6 xl:pt-[1.875rem]">
      {isInitialLoading ? (
        <div className="flex items-center justify-center pt-20">
          <Spinner />
        </div>
      ) : data.length ? (
        data.map((notification) => (
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
            classNames="bg-light"
          />
        ))
      ) : (
        <NoNotificationMessage selectedTab={selectedTab} />
      )}
      <div
        ref={ref}
        className={`${
          hasMoreNotification
            ? "flex items-center justify-center pb-3"
            : "hidden"
        }`}
      >
        {isLoading && data.length > 0 && <Spinner />}
      </div>
    </div>
  );
};
export default NotificationInfiniteScroll;

"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { updateNotificationLastChecked } from "@/lib/actions/user.actions";
import {
  getNotificationsByCursorId,
  getUncheckedNotifications,
  getUnreadNotificationsCount,
} from "@/lib/actions/notification.actions";
import { NotificationButtonProps } from "@/types";
import { useNotifications } from "@/app/contexts/NotificationContext";
import { Popover, PopoverContent } from "@/components/ui/popover";
import NotificationPopoverContent from "../notification-button/NotificationPopoverContent";
import NotificationPopoverTrigger from "../notification-button/NotificationPopoverTrigger";
import {
  ALIGN_OFFSET_LAPTOP,
  ALIGN_OFFSET_MOBILE,
  SIDE_OFFSET_LAPTOP,
  SIDE_OFFSET_MOBILE,
} from "@/constants";

const NotificationButton = ({
  currentUserId,
  lastChecked,
}: NotificationButtonProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const isLaptop = useMediaQuery("(min-width: 1280px)");
  const pathName = usePathname();
  const isNotificationPage = pathName === "/notifications";
  const {
    showBadge,
    notificationData,
    setIsPopoverOpen,
    setShowBadge,
    setNotificationData,
    isInitialLoading,
  } = useNotifications();

  useEffect(() => {
    (async () => {
      const { notifications } = await getNotificationsByCursorId();
      const uncheckedNotifications = await getUncheckedNotifications(
        currentUserId,
        lastChecked
      );
      const showBadge = uncheckedNotifications > 0;
      !isNotificationPage && setShowBadge(showBadge);
      setNotificationData(notifications);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const unreadNotifications =
        await getUnreadNotificationsCount(currentUserId);
      setUnreadNotifications(unreadNotifications);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData]);

  const handlePopoverClick = (open: boolean) => {
    updateNotificationLastChecked(currentUserId);
    setShowBadge(false);
    setIsPopoverOpen(open);
  };

  return (
    <Popover onOpenChange={(open) => handlePopoverClick(open)}>
      <NotificationPopoverTrigger
        isNotificationPage={isNotificationPage}
        showBadge={showBadge}
      />
      <PopoverContent
        hideWhenDetached={true}
        sideOffset={isLaptop ? SIDE_OFFSET_LAPTOP : SIDE_OFFSET_MOBILE}
        align="end"
        alignOffset={isLaptop ? ALIGN_OFFSET_LAPTOP : ALIGN_OFFSET_MOBILE}
        className="w-full"
        avoidCollisions={false}
      >
        <NotificationPopoverContent
          notificationData={notificationData}
          setIsPopoverOpen={setIsPopoverOpen}
          unreadNotifications={unreadNotifications}
          isInitialLoading={isInitialLoading}
        />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;

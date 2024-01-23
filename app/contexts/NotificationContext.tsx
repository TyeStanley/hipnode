"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import { Notification, NotificationProviderProps } from "@/types";
import { supabase } from "@/utils/supabaseClient";
import { getUncheckedNotifications } from "@/lib/actions/notification.actions";
import { updateNotificationLastChecked } from "@/lib/actions/user.actions";

const NotificationContext = createContext<{
  notificationData: Notification[];
  setNotificationData: (notifications: Notification[]) => void;
  addNotifications: (notifications: Notification[]) => void;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
  setShowBadge: Dispatch<SetStateAction<boolean | undefined>>;
  showBadge: boolean | undefined;
  isInitialLoading: boolean;
} | null>(null);

export const NotificationProvider = ({
  children,
  currentUserId,
  lastChecked,
}: NotificationProviderProps) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>();
  const isNotificationPage = usePathname() === "/notifications";

  const setNotificationData = (notifications: Notification[]) => {
    setNotifications(notifications);
    setIsInitialLoading(false);
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const addNotifications = (notifications: Notification[]) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...notifications,
    ]);
  };

  const removeNotification = (notificationId: number | undefined) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  const updateNotification = (updatedNotification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === updatedNotification.id
          ? updatedNotification
          : notification
      )
    );
  };

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Notification",
          filter: `userId=eq.${currentUserId}`,
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedNotificationId = (payload.old as Notification).id;
            removeNotification(deletedNotificationId);
            const uncheckedNotifications = await getUncheckedNotifications(
              currentUserId,
              lastChecked
            );
            const showBadge = uncheckedNotifications > 0;
            if (!isPopoverOpen && !isNotificationPage) {
              setShowBadge(showBadge);
            }
            return;
          }
          if (payload.eventType === "UPDATE") {
            const updatedNotification = payload.new as Notification;
            updateNotification(updatedNotification);
            return;
          }
          if (payload.eventType === "INSERT") {
            // NOTE - when the popover is open, the user is checking the notifications. So, no unchecked mark needed
            if (!isPopoverOpen && !isNotificationPage) setShowBadge(true);
            const newNotification = payload.new as Notification;
            addNotification(newNotification);
            isNotificationPage && updateNotificationLastChecked(currentUserId);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, isPopoverOpen, lastChecked, isNotificationPage]);

  return (
    <NotificationContext.Provider
      value={{
        notificationData: notifications,
        setNotificationData,
        addNotifications,
        setIsPopoverOpen,
        setShowBadge,
        showBadge,
        isInitialLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

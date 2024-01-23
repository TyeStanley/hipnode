"use client";
import { Dispatch, SetStateAction } from "react";

import { markAllReadNotifications } from "@/lib/actions/notification.actions";
import OutlineIcon from "../icons/outline-icons";

const MarkAllReadButton = ({
  unreadNotifications,
  setIsPopoverOpen,
}: {
  unreadNotifications: number;
  setIsPopoverOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const isMarkAllRead = unreadNotifications === 0;

  return (
    <button
      onClick={() => {
        markAllReadNotifications();
        setIsPopoverOpen?.(true);
      }}
      disabled={isMarkAllRead}
      className={`${
        isMarkAllRead
          ? "bg-light"
          : "bg-blue-10 hover:opacity-80 hover:transition-opacity"
      } flex h-9 w-[8.25rem] items-center justify-center gap-2.5 rounded-md px-2.5 
        py-[0.4375rem] dark:bg-dark-3 xl:h-[2.375rem] xl:w-36`}
    >
      <OutlineIcon.Checkmark
        className={isMarkAllRead ? "fill-sc-3" : "fill-blue dark:fill-blue-80"}
      />{" "}
      <span
        className={`${
          isMarkAllRead ? "text-sc-3" : "text-blue dark:text-blue-80"
        } semibold-14 xl:semibold-16`}
      >
        Mark All Read
      </span>
    </button>
  );
};

export default MarkAllReadButton;

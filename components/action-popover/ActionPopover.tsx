"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, MoreVertical } from "lucide-react";

import CommentIconButton from "../posts/comment/CommentIconButton";
import OutlineIcon from "@/components/icons/outline-icons";

interface ActionPopoverProps {
  onEditClick: () => void;
  deletePost: () => void;
  label: string;
  positionStyles?: string;
  isComment?: boolean;
}

const ActionPopover = ({
  onEditClick,
  deletePost,
  label,
  positionStyles,
  isComment,
}: ActionPopoverProps) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleDeleteClick = () => {
    if (isConfirmingDelete) {
      deletePost();
      setIsPopoverOpen(false);
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger onClick={togglePopover}>
        <CommentIconButton
          Icon={isComment ? MoreHorizontal : MoreVertical}
          color="text-sc-3"
        />
      </PopoverTrigger>
      <PopoverContent>
        <section
          className={`${positionStyles} flex w-fit flex-col rounded-xl border border-solid border-sc-5 bg-light-2 p-[1.25rem] dark:border-dark-3 dark:bg-dark-4`}
        >
          <div
            onClick={onEditClick}
            className="mb-[0.625rem] flex cursor-pointer flex-row items-center justify-start"
          >
            <div className="fill-light-2">
              <OutlineIcon.Edit />
            </div>
            <p className="pl-[0.625rem] text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-light-2">
              {`Edit ${label}`}
            </p>
          </div>

          <div
            onClick={handleDeleteClick}
            className="flex cursor-pointer items-center justify-start"
          >
            <div className="fill-light-2 dark:fill-dark-4">
              <OutlineIcon.Trash />
            </div>
            <p
              className={`pl-[0.625rem] text-[0.875rem] font-semibold leading-[1.375rem] ${
                isConfirmingDelete ? "text-red" : "text-red-60"
              }`}
            >
              {isConfirmingDelete ? "Confirm Delete" : `Delete ${label}`}
            </p>
          </div>

          {isConfirmingDelete && (
            <div
              onClick={handleCancelDelete}
              className="flex cursor-pointer items-center justify-start"
            >
              <p className="pl-[1.9rem] pt-1 text-[0.875rem] font-semibold leading-[1.375rem] text-blue dark:text-blue">
                Cancel Delete
              </p>
            </div>
          )}
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default ActionPopover;

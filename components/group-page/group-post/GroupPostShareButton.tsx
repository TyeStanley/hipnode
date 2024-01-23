"use client";
import { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

import { chatIcon, moreIcon } from "@/constants/posts";
import { shareIcons } from "@/constants/podcast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ShareIconComponent,
  ShareIconsSection,
  ShareUrlLink,
} from "@/components/posts/post-by-id/left-column";
import FillIcon from "@/components/icons/fill-icons";
import { toast } from "@/components/ui/use-toast";
import { SHARE_URL } from "@/constants";

const GroupPostShareButton = ({ id }: { id: number }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [showMoreIcons, setShowMoreIcons] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const iconsToDisplay = showMoreIcons ? shareIcons : shareIcons.slice(0, 4);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard.",
      variant: "formFieldsFill",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="relative cursor-pointer hover:opacity-80 hover:transition-opacity">
          <FillIcon.Share className="fill-sc-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-light_dark-3 flex w-full max-w-[34.5rem] flex-col gap-11 rounded-2xl border-0 p-8">
        <div className="flex w-full justify-between">
          <p className="semibold-18 text-sc-2_light-2">Share with</p>
          <DialogClose className="text-sc-2_light-2 text-2xl">
            <IoClose />
          </DialogClose>
        </div>
        <div className="flex w-full flex-wrap justify-evenly gap-4">
          <Link href="/chat">
            <ShareIconComponent
              icon={chatIcon}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />
          </Link>
          <ShareIconsSection
            icons={iconsToDisplay}
            hoveredIcon={hoveredIcon}
            setHoveredIcon={setHoveredIcon}
            currentUrl={`${SHARE_URL}/posts/post/${id}`}
          />
          <div
            className="flex"
            onClick={() => setShowMoreIcons((prev) => !prev)}
          >
            <ShareIconComponent
              icon={moreIcon}
              hoveredIcon={hoveredIcon}
              setHoveredIcon={setHoveredIcon}
            />
          </div>
        </div>
        <ShareUrlLink
          currentUrl={`${SHARE_URL}/posts/post/${id}`}
          handleCopyClick={handleCopyClick}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GroupPostShareButton;

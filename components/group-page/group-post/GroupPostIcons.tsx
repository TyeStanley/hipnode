"use client";

import Link from "next/link";
import { useState } from "react";

import FillIcon from "@/components/icons/fill-icons";
import { togglePostLike } from "@/lib/actions/post.action";
import Spinner from "@/components/Spinner";
import { toast } from "@/components/ui/use-toast";
import GroupPostShareButton from "./GroupPostShareButton";

const GroupPostIcons = ({
  id,
  hasUserLiked,
}: {
  id: number;
  hasUserLiked: boolean;
}) => {
  const [like, setLike] = useState(hasUserLiked);
  const [isPending, setIsPending] = useState(false);

  const handleLike = async () => {
    try {
      setIsPending(true);
      await togglePostLike(id);
      setLike((prev) => !prev);
    } catch (error) {
      toast({
        title: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <div
        onClick={handleLike}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        {isPending ? (
          <Spinner classNames="w-5 h-5 flow-root" />
        ) : (
          <FillIcon.Heart className={`${like ? "fill-red-80" : "fill-sc-5"}`} />
        )}
      </div>
      <Link
        href={`/posts/post/${id}`}
        className="relative cursor-pointer hover:opacity-80 hover:transition-opacity"
      >
        <FillIcon.Comment className="fill-sc-5" />
      </Link>
      <GroupPostShareButton id={id} />
    </div>
  );
};

export default GroupPostIcons;

"use client";

import { useState } from "react";

import Heart from "@/components/icons/fill-icons/Heart";
import { toast } from "@/components/ui/use-toast";
import { togglePostLike } from "@/lib/actions/post.action";
import Spinner from "@/components/Spinner";

const GroupDetailPostLikeButton = ({
  hasUserLiked,
  postId,
}: {
  hasUserLiked: boolean;
  postId: number;
}) => {
  const [like, setLike] = useState(hasUserLiked);
  const [isPending, setIsPending] = useState(false);

  const handleLike = async () => {
    try {
      setIsPending(true);
      await togglePostLike(postId);
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
    <div
      onClick={handleLike}
      className="relative hidden hover:opacity-80 hover:transition-opacity xl:block"
    >
      {isPending ? (
        <Spinner classNames="low-root w-[1.875rem] h-[1.875rem]" />
      ) : (
        <Heart isLiked={like} />
      )}
    </div>
  );
};

export default GroupDetailPostLikeButton;

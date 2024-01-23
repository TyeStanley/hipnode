"use client";
import { useState } from "react";

import { followUser } from "@/lib/actions/post.action";
import OutlineIcon from "@/components/icons/outline-icons";
import { toast } from "../ui/use-toast";
import Spinner from "../Spinner";

const FollowAdminButton = ({
  adminId,
  isFollowing,
}: {
  adminId: number;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const [isPending, setIsPending] = useState(false);

  const handleFollow = async () => {
    try {
      setIsPending(true);
      const followStatus = await followUser(adminId);
      setFollowing(followStatus);
    } catch (error) {
      toast({
        title: "Failed to follow the user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div
      onClick={handleFollow}
      className={`${
        following ? "hidden" : "flex"
      } h-[1.875rem] w-[1.875rem] shrink-0 cursor-pointer items-center justify-center 
        rounded-full ${
          isPending ? "bg-none" : "bg-blue-10"
        } hover:opacity-80 hover:transition-opacity`}
    >
      {isPending ? (
        <Spinner classNames="low-root w-5 h-5" />
      ) : (
        <OutlineIcon.Follow className="fill-blue-10" />
      )}
    </div>
  );
};

export default FollowAdminButton;

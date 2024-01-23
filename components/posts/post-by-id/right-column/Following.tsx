"use client";

import { useState } from "react";

import CustomButton from "@/components/CustomButton";
import { followUser } from "@/lib/actions/post.action";
import { FollowingProps } from "@/types/posts";

const Following = ({ authorId, isFollowing }: FollowingProps) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const followStatus = await followUser(authorId);
    setFollowing(followStatus);
  };

  const followingStatus = following ? "Following" : "Follow";

  return (
    <CustomButton
      label={followingStatus}
      className="mb-[1.25rem] flex w-full items-center rounded-md bg-blue p-[0.625rem] text-[1.125rem] leading-[1.625rem] text-light"
      onClick={handleFollow}
    />
  );
};

export default Following;

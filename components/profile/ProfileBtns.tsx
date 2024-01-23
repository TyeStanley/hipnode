"use client";

import { useState } from "react";

import { followUser } from "@/lib/actions/post.action";
import ProfileLiveChat from "./ProfileLiveChat";
import { BaseUserInfo } from "@/types/profile.index";

const ProfileBtns = ({
  userInfo,
  isFollowing,
}: {
  userInfo: BaseUserInfo;
  isFollowing: boolean;
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const followStatus = await followUser(userInfo.id);
    setFollowing(followStatus);
  };

  return (
    <div className="mt-5 flex h-10 w-full items-center justify-center gap-2.5">
      <button
        className="flex h-full w-full items-center justify-center rounded-lg bg-blue text-base font-semibold leading-6 text-white"
        type="button"
        onClick={handleFollow}
      >
        {following ? "Following" : "Follow"}
      </button>

      <ProfileLiveChat userInfo={userInfo} />
    </div>
  );
};

export default ProfileBtns;

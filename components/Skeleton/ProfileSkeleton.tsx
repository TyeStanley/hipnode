import React from "react";
import RightColumnWrapper from "../posts/post-by-id/right-column/RightColumnWrapper";

const ProfileSkeleton = () => {
  return (
    <RightColumnWrapper>
      <div className="mb-[1.25rem] flex h-[6.25rem] w-[6.25rem] animate-pulse items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mb-[1.25rem] h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-[1.25rem] h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-[1.25rem] h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </RightColumnWrapper>
  );
};

export default ProfileSkeleton;

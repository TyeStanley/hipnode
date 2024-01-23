import React from "react";
import CustomButton from "../CustomButton";
import FillIcon from "../icons/fill-icons";

const ProfileModalUserInfo = () => (
  <>
    <p className="text-[1.625rem] font-semibold leading-[2.375rem] text-sc-2 dark:text-light">
      AR. Jakir
    </p>
    <p className="pb-[1.25rem] font-normal leading-6 text-sc-3">
      User Interface Design
    </p>
    <div className="flex items-center justify-center gap-[0.625rem]  pb-[1.25rem]">
      <CustomButton
        label="Follow"
        className="w-[7.75rem] bg-blue p-[0.375rem] font-semibold leading-6 text-light"
      />
      <div className="grid h-[2.25rem] w-[2.25rem] place-items-center rounded-lg  bg-blue-10 dark:bg-dark-4">
        <FillIcon.Message className="fill-blue" />
      </div>
    </div>
    <p className="pb-[1.25rem] text-center font-[0.875rem] leading-[1.375rem] text-purple-black-20 dark:text-light-3">
      333 Followers
      <span className="relative top-[-0.125rem] px-1 text-[2rem]">.</span>
      501 Points
    </p>
    <p className="pb-[1.25rem] font-[0.875rem] leading-[1.375rem] text-purple-black-20 dark:text-light-3">
      Following 47
    </p>
  </>
);

export default ProfileModalUserInfo;

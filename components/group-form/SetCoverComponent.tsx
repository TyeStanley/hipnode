"use client";

import Image from "next/image";
import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SetCoverIcon } from "../icons/outline-icons/Icon";
import OutlineIcon from "../icons/outline-icons";
import { Input } from "@/components/ui/input";
import { uploadGroupImages } from "@/utils";
import { PLACEHOLDER_IMAGE_URL } from "@/constants";

const SetCoverComponent = ({
  groupCover,
  groupId,
  type,
}: {
  groupCover: string | null | undefined;
  groupId: number | undefined;
  type: "create" | "edit";
}) => {
  const router = useRouter();
  const search = useSearchParams();
  const profilePhotoURL = search.get("profilePhotoURL");
  const coverURL = search.get("coverURL");

  const handleSetCover = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const uploadedURL = await uploadGroupImages(file, "group-cover", "cover");

      const editPage = `edit/${groupId}`;
      const createPage = `create-group`;

      router.push(
        `/group/${
          type === "edit" ? editPage : createPage
        }?coverURL=${uploadedURL}&profilePhotoURL=${profilePhotoURL ?? ""}`
      );
    }
  };
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex gap-2.5">
        <label
          htmlFor="cover"
          className="semibold-10 flex h-7 cursor-pointer items-center gap-2.5 rounded-[0.25rem] bg-light-2 px-2.5 py-1 
            text-sc-2 hover:opacity-80 hover:transition-opacity dark:bg-dark-4 dark:text-light-2"
        >
          <SetCoverIcon />
          {coverURL || groupCover ? "Change Cover" : "Set Cover"}
        </label>
        <Input
          id="cover"
          type="file"
          name="cover"
          accept="image/*"
          onChange={handleSetCover}
          className="hidden"
        />
      </div>
      {groupCover || coverURL ? (
        <Image
          className="h-[8.25rem] w-full rounded-lg object-cover sm:h-[10.4375rem]"
          src={coverURL || groupCover || PLACEHOLDER_IMAGE_URL}
          width={295}
          height={132}
          alt="cover image"
        />
      ) : (
        <div className="flex h-[8.25rem] w-full items-center justify-center rounded-lg bg-light-2 dark:bg-dark-4 sm:h-[10.4375rem]">
          <OutlineIcon.ImageIcon className="stroke-sc-4 sm:h-10 sm:w-10" />
        </div>
      )}
    </div>
  );
};

export default SetCoverComponent;

"use client";

import { useState } from "react";
import SocialIcon from "./SocialIcon";
import Link from "next/link";
import OutlineIcon from "../icons/outline-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { updateProfileInfo } from "@/lib/actions/user.actions";
import { EditSocialsProps, SocialLinkProps } from "@/types/profile.index";
import { socialNames } from "@/constants/reusable";

const EditSocials = ({
  website,
  twitter,
  instagram,
  facebook,
  isLoggedInUser,
}: EditSocialsProps) => {
  const [links, setLinks] = useState<SocialLinkProps>({
    website: website ?? "",
    twitter: twitter ?? "",
    instagram: instagram ?? "",
    facebook: facebook ?? "",
  });

  const handleSubmit = async () => {
    if (
      website === links.website &&
      twitter === links.twitter &&
      instagram === links.instagram &&
      facebook === links.facebook
    ) {
      return;
    }

    await updateProfileInfo({
      website: String(links.website),
      twitter: String(links.twitter),
      instagram: String(links.instagram),
      facebook: String(links.facebook),
    });
  };

  return (
    <>
      <div className="mt-5 flex flex-wrap justify-center gap-5 md:flex-col">
        {links.website && (
          <Link
            href={String(links.website)}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 text-base font-semibold leading-6 text-sc-2 dark:text-sc-6`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <OutlineIcon.Web className="fill-sc-2 dark:fill-light-2" />
            <p className="max-w-[150px] truncate">{links.website}</p>
          </Link>
        )}

        <div className="flex justify-center gap-5">
          {Object.entries(links).map(([key, value]) => {
            if (value && key !== "website") {
              return (
                <SocialIcon
                  key={key}
                  icon={key.charAt(0).toUpperCase() + key.slice(1)}
                  link={String(value)}
                />
              );
            }
            return null;
          })}
        </div>
      </div>

      {isLoggedInUser && (
        <Dialog>
          <DialogTrigger className="mt-5">
            <button className="rounded-lg bg-blue px-2 py-1 text-sm font-semibold leading-6 text-white hover:bg-blue/80">
              Edit Socials
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-lg text-sc-2 dark:border-dark-4 dark:bg-dark-4">
            <h1 className="text-lg font-semibold text-sc-2 dark:text-sc-6">
              Social Links
            </h1>

            {socialNames.map(({ field, icon }) => (
              <div key={field} className="flex items-center gap-2">
                {icon}

                <input
                  type="text"
                  placeholder={`${field} link`}
                  value={links[field as keyof SocialLinkProps]}
                  onChange={(e) =>
                    setLinks({ ...links, [field]: e.target.value })
                  }
                  className="rounded-lg border border-white p-1 text-sc-2 outline-none focus:border-sc-5 focus:bg-sc-6 dark:border-dark-4 dark:bg-dark-4 dark:text-sc-6 focus:dark:border-white focus:dark:bg-dark-3"
                />
              </div>
            ))}

            <DialogClose className="mt-5" onClick={handleSubmit}>
              <button className="w-full rounded-lg bg-blue px-2 py-1 text-sm font-semibold leading-6 text-white hover:bg-blue/80">
                Save Changes
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditSocials;

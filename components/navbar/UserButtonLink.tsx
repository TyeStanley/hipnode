"use client";

import Link from "next/link";
import FillIcon from "@/components/icons/fill-icons";
import { PopoverClose } from "@radix-ui/react-popover";

const UserButtonLink = ({ link, text }: { link: string; text: string }) => {
  const Icon = FillIcon[text as keyof typeof FillIcon];

  return (
    <PopoverClose asChild>
      <Link
        key={text}
        href={link}
        className="flex items-center gap-3.5 rounded text-base font-semibold leading-6 text-sc-2 dark:text-light-2"
      >
        <Icon className="fill-sc-2 dark:fill-light-2" />
        {text}
      </Link>
    </PopoverClose>
  );
};

export default UserButtonLink;

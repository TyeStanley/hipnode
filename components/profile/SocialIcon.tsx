"use client";

import Link from "next/link";

import OutlineIcon from "../icons/outline-icons";
import { SocialIconsProps } from "@/types";

const SocialIcon = ({ icon, link }: SocialIconsProps) => {
  const Icon = OutlineIcon[icon as keyof typeof OutlineIcon];

  return (
    <Link key={icon} href={link} target="_blank" rel="noopener">
      <Icon className="fill-sc-4 dark:fill-sc-6" />
    </Link>
  );
};

export default SocialIcon;

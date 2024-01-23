"use client";

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "react-share";

import OutlineIcon from "@/components/icons/outline-icons";

export const shareIcons = [
  {
    wrapper: FacebookShareButton,
    label: "Facebook",
    icon: OutlineIcon.Facebook,
  },
  {
    wrapper: TelegramShareButton,
    label: "Telegram",
    icon: OutlineIcon.Instagram,
  },
  {
    wrapper: TwitterShareButton,
    label: "Twitter",
    icon: OutlineIcon.Twitter,
  },
  {
    wrapper: EmailShareButton,
    label: "Email",
    icon: OutlineIcon.Mention,
  },
  {
    wrapper: LinkedinShareButton,
    label: "LinkedIn",
    icon: OutlineIcon.LinkedIn,
  },
];

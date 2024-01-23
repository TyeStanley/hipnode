"use client";

import SocialIcon from "@/components/icons/outline-icons/SocialIcon";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export const shareIcons = [
  {
    label: "facebook",
    wrapper: FacebookShareButton,
    icon: SocialIcon.Facebook,
  },
  {
    label: "twitter",
    wrapper: TwitterShareButton,
    icon: SocialIcon.Twitter,
  },
  {
    label: "linkedIn",
    wrapper: LinkedinShareButton,
    icon: SocialIcon.LinkedIn,
  },
];

import Image from "next/image";

import { SocialMediaIconProps } from "@/types/homepage";

const SocialMediaIcon = ({ authorPicture }: SocialMediaIconProps) => (
  <figure className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full hover:scale-105 lg:h-[2.5rem] lg:w-[2.5rem]">
    <Image
      src={authorPicture || "/images/emoji_2.png"}
      alt="authors avatar"
      width={50}
      height={50}
      className="rounded-full"
    />
    <figcaption className="sr-only">Social media profile image</figcaption>
  </figure>
);

export default SocialMediaIcon;

import Image from "next/image";

import { InterviewBannerImageType } from "@/types/interview.index";

const InterviewBannerImage = ({
  bannerImage,
  className,
  height,
  width,
  roundedTop = false,
}: InterviewBannerImageType) => {
  const borderRadius = roundedTop ? "rounded-t-lg" : "rounded-lg";
  return (
    <figure className={className}>
      <Image
        src={bannerImage}
        height={height}
        width={width}
        alt="banner image"
        className={`${borderRadius} object-cover`}
      />
    </figure>
  );
};

export default InterviewBannerImage;

import Image from "next/image";

import { ImageWithCaptionProps } from "@/types/homepage";

const ImageWithCaption = ({
  imageSrc,
  imageAlt,
  imageWidth = 40,
  imageHeight = 40,
  className = "",
  caption = "",
}: ImageWithCaptionProps) => (
  <figure className="flex shrink-0 items-center">
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      className={className}
    />
    <figcaption className="sr-only">{caption}</figcaption>
  </figure>
);

export default ImageWithCaption;

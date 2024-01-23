import Image from "next/image";

import { PostImageProps } from "@/types/homepage";

const PostImage = ({
  postImage,
  blurImage,
  imageHeight,
  imageWidth,
}: PostImageProps) => (
  <div className="">
    <figure className="flex h-full min-h-[3.5rem] w-[3.5rem] grow rounded-2xl md:min-h-[9.75rem] md:w-[9.75rem]">
      <Image
        src={postImage}
        alt="post-card-placeholder"
        blurDataURL={blurImage}
        width={imageWidth}
        height={imageHeight}
        placeholder="blur"
        className="rounded-md border-2 object-cover  dark:border-light-3 "
      />
      <figcaption className="sr-only">
        Placeholder image for a social media post
      </figcaption>
    </figure>
  </div>
);

export default PostImage;

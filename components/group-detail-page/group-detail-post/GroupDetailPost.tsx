"use client";

import Image from "next/image";
import { Post } from "@prisma/client";
import Link from "next/link";

import { formatGroupDetailPostDate } from "@/utils";
import { PostCardTypes } from "@/types";
import GroupDetailPostHeader from "@/components/group-detail-page/group-detail-post/GroupDetailPostHeader";
import GroupDetailPostFooter from "@/components/group-detail-page/group-detail-post/GroupDetailPostFooter";
import { Card } from "@/components/ui/card";

const GroupDetailPost = (post: Post) => {
  const {
    id,
    author,
    image,
    createdAt,
    heading,
    hasUserLiked,
    likesCount,
    commentsCount,
    viewCount,
    tagNames,
  } = post as PostCardTypes;
  const date = formatGroupDetailPostDate(new Date(createdAt));

  return (
    <article className="group relative">
      <Link
        href={`/posts/post/${id}`}
        className="post-link rounded-[0.625rem] lg:rounded-2xl"
      ></Link>
      <Card
        className="bg-light_dark-3 flex min-h-[9.25rem] flex-row gap-3.5 rounded-[0.625rem]
          p-3.5 lg:gap-5 lg:rounded-2xl lg:p-5"
      >
        <Image
          src={image}
          alt={`${heading} image`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-[0.25rem] object-cover sm:h-[9.75rem] sm:w-[9.75rem] sm:rounded-2xl
            lg:h-14 lg:w-14 lg:border lg:border-contentCard lg:shadow-contentCard xl:h-[9.75rem] xl:w-[9.75rem]"
        />
        <div className="flex grow flex-col justify-between gap-5">
          <GroupDetailPostHeader
            heading={heading}
            author={author}
            tags={tagNames}
            hasUserLiked={hasUserLiked}
            postId={id}
          />
          <GroupDetailPostFooter
            author={author}
            date={date}
            viewCount={viewCount}
            likesCount={likesCount}
            commentsCount={commentsCount}
          />
        </div>
      </Card>
    </article>
  );
};

export default GroupDetailPost;

"use client";
import Link from "next/link";

import { Card, CardFooter } from "@/components/ui/card";
import { GroupPost as GroupPostProps } from "@/types/models";
import { Post } from "@prisma/client";
import { formatPostDate } from "@/utils";
import GroupPostHeader from "@/components/group-page/group-post/GroupPostHeader";
import GroupPostContent from "@/components/group-page/group-post/GroupPostContent";
const GroupPost = (post: Post) => {
  const {
    id,
    author,
    group,
    image,
    content,
    createdAt,
    heading,
    hasUserLiked,
  } = post as GroupPostProps;

  const date = formatPostDate(createdAt);

  return (
    <article className="group relative">
      <Link
        className="post-link rounded-2xl border-hidden"
        href={`/posts/post/${id}`}
      ></Link>
      <Card className="bg-light_dark-3 mb-5 break-inside-avoid text-sc-2 dark:text-light-2 2xl:max-w-[15.5rem]">
        <GroupPostHeader
          author={author}
          groupName={group?.name as string}
          groupId={group?.id}
        />
        <GroupPostContent
          {...{
            image,
            groupName: group?.name as string,
            heading,
            content,
            id,
            hasUserLiked,
          }}
        />
        <CardFooter>
          <p className="regular-12 text-sc-3">{date}</p>
        </CardFooter>
      </Card>
    </article>
  );
};

export default GroupPost;

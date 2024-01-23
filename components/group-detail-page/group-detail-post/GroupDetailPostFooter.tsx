import Link from "next/link";

import StatsDescription from "@/components/profile/StatsDescription";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupDetailPostFooter = ({
  author,
  date,
  likesCount,
  commentsCount,
  viewCount,
}: {
  author: { id: number; username: string; picture?: string };
  date: string;
  likesCount: number;
  commentsCount: number;
  viewCount: number;
}) => (
  <div className="flex flex-row gap-[1.875rem] lg:items-center lg:justify-between lg:gap-10">
    <div className="hidden xl:flex xl:flex-row xl:gap-2.5">
      <Avatar className="relative h-10 w-10 shrink-0 hover:opacity-80 hover:transition-opacity">
        <Link href={`/profile/${author.id}`}>
          <AvatarImage
            src={author.picture}
            alt={`${author.username}'s avatar`}
          />
          <AvatarFallback>{author.username.charAt(0)}</AvatarFallback>
        </Link>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          <Link
            href={`/profile/${author.id}`}
            className="semibold-14 relative text-sc-2 hover:underline dark:text-sc-6"
          >
            {author.username}
          </Link>
          <p className="text-sc-5">{`•`}</p>
        </div>
        <p className="regular-10 text-sc-3 dark:text-sc-5">{date}</p>
      </div>
    </div>
    <div className="flex flex-row gap-[1.875rem] xl:items-center xl:gap-10">
      <StatsDescription
        className={`line-clamp-1 md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
      >
        {viewCount} Views
      </StatsDescription>
      <StatsDescription
        className={`line-clamp-1 md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
      >
        {likesCount} Likes
      </StatsDescription>
      <StatsDescription
        className={`line-clamp-1 md:text-[0.875rem] md:leading-[1.375rem] lg:text-[0.5625rem] lg:leading-[0.875rem] xl:text-[0.875rem] xl:leading-[1.375rem]`}
      >
        {commentsCount} Comments
      </StatsDescription>
    </div>
  </div>
);

export default GroupDetailPostFooter;

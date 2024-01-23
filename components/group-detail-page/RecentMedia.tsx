import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const RecentMedia = ({ media }: { media: Post[] }) => {
  const rowSpan2 = "row-span-2 h-[11.625rem] xs:h-full lg:h-[11.625rem]";

  return (
    <div className="bg-light_dark-3 flex flex-col gap-2.5 rounded-2xl p-5 text-sc-2 dark:text-light-2">
      <p className="semibold-16">Recent media</p>
      <div className="grid grid-cols-3 grid-rows-4 gap-2.5 xs:flex xs:flex-wrap xs:gap-2 lg:grid lg:grid-cols-3 lg:grid-rows-4 lg:gap-2.5">
        {media.slice(0, 10).map((post, i) => (
          <Link
            href={`/posts/post/${post.id}`}
            key={post.id}
            className={`${i === 2 && rowSpan2} ${
              i === 6 && rowSpan2
            } w-[5.5rem] rounded-[0.25rem] border border-media shadow-media hover:opacity-80 hover:transition-opacity`}
          >
            <Image
              width={88}
              height={88}
              src={post.image}
              alt={`${post.heading}'s image`}
              className="h-full w-full rounded-[0.25rem] object-cover xs:h-[5.5rem] xs:w-[5.5rem] lg:h-full lg:w-full"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMedia;

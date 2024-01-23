import Link from "next/link";

import { DevelopmentInfoProps } from "@/types/posts";

const DevelopmentInformation = ({ devInfo }: DevelopmentInfoProps) => {
  return (
    <aside className="flex w-full flex-col gap-4 pt-4">
      {devInfo.map((item, index) => (
        <div
          key={index}
          className="flex w-full flex-col border-t border-sc-6 pt-4  dark:border-sc-2 "
        >
          <Link
            href={`/posts/post/${item.postId}`}
            className="flex w-full flex-col "
          >
            <p className="text-[0.75rem] leading-[1.125rem] text-sc-2  hover:text-red-60 dark:text-light-2 dark:hover:text-red-60">
              {item.heading}
            </p>
            <p className="text-[0.75rem] leading-[1.625rem] text-sc-3 hover:text-red-60 dark:hover:text-red-60">
              {item.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
          </Link>
        </div>
      ))}
    </aside>
  );
};

export default DevelopmentInformation;

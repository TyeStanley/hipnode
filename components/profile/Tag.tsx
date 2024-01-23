"use client";
import { MouseEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Tag = ({ text }: { text: string }) => {
  const router = useRouter();
  const tag = useSearchParams().get("tag");
  const posts = useSearchParams().get("posts");
  const pathName = usePathname();

  const handleTagClick = (event: MouseEvent) => {
    event.preventDefault();
    if (tag === text) {
      router.push(`${pathName}?${tag}&posts=${posts}`);
    } else {
      router.push(`${pathName}?tag=${text}&posts=${posts}`);
    }
  };

  return (
    <button
      onClick={handleTagClick}
      className={`relative cursor-pointer rounded-full px-2.5 py-1 text-[0.5625rem] leading-[0.875rem]  
        hover:opacity-80 hover:transition-opacity md:text-[0.625rem] 
        md:font-semibold md:leading-[1rem] ${
          tag === text
            ? "bg-red-10 text-red-80"
            : "bg-sc-6 text-sc-4 dark:bg-dark-4 dark:text-sc-5"
        }`}
    >
      {text}
    </button>
  );
};

export default Tag;

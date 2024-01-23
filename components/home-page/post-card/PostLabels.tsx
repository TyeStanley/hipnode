import Link from "next/link";

import { PostLabelProps } from "@/types/homepage";

const PostLabels = ({ tags }: PostLabelProps) => (
  <div>
    <ul className="flex justify-start gap-[0.625rem]">
      {tags.map((item) => (
        <Link href={`?tag=${item}`} key={item}>
          <li className="semibold-10 w-fit  cursor-pointer rounded-full bg-light-3 px-[0.625rem] py-1 leading-[0.875rem] hover:scale-110 hover:bg-light-2 hover:shadow-lg dark:bg-dark-4 dark:text-sc-5 hover:dark:bg-dark-2">
            {item}
          </li>
        </Link>
      ))}
    </ul>
  </div>
);
export default PostLabels;

import Link from "next/link";

import { PinnedGroupItemProps } from "@/types/homepage";
import GroupImage from "./GroupImage";

const PinnedGroupItem = ({ group }: PinnedGroupItemProps) => {
  const { name, description, coverImage, id } = group;
  return (
    <Link href={`/group/${id}`}>
      <li className="flex cursor-pointer items-center gap-2.5 hover:translate-x-1 hover:scale-[101%]">
        {coverImage && <GroupImage src={coverImage} name={name} />}

        <article className="flex flex-col">
          <h3 className="semibold-12 text-sc-4_light-2">{name}</h3>
          <p className="base-9 line-clamp-1 text-sc-4 dark:text-sc-3">
            {description}
          </p>
        </article>
      </li>
    </Link>
  );
};

export default PinnedGroupItem;

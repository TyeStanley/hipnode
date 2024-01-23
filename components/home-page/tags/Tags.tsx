import { tags } from "@/constants";
import TagItem from "./TagItem";
import { cn } from "@/lib/utils";

const Tags = ({ className }: { className?: string }) => (
  <aside className={cn("min-w-[13rem] px-[1.25rem] pt-0", className)}>
    <div className="flex h-fit flex-col items-start justify-center rounded-2xl bg-light p-5 dark:bg-dark-3">
      <h1 className="semibold-16 mb-5 text-sc-2 dark:text-light-2">
        Popular Tags
      </h1>
      {tags.map((tag) => (
        <TagItem tag={tag} key={tag.name} />
      ))}
    </div>
  </aside>
);

export default Tags;

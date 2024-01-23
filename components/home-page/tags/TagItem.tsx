import { colorVariants } from "@/constants";
import { TagProps } from "@/types/homepage";

const TagItem = ({ tag }: TagProps) => {
  const IconComponent = tag.icon;
  return (
    <div className="mb-[0.675rem] flex items-center justify-center gap-3">
      <div
        className={`flex rounded-lg ${
          colorVariants[tag.iconBgColor]
        } p-[0.375rem]`}
      >
        <IconComponent className={`${colorVariants[tag.iconFillColor]}`} />
      </div>
      <div className="flex flex-col">
        <p className="semibold-12 text-sc-4 dark:text-light-2">#{tag.name}</p>
        <p className="regular-10 line-clamp-1 text-sc-4 dark:text-sc-3">
          {tag.views}
        </p>
      </div>
    </div>
  );
};

export default TagItem;

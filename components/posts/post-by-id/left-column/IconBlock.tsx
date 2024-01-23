import { IconBlockProps } from "@/types/posts";

const IconBlock = ({ label, count, IconComponent }: IconBlockProps) => (
  <div className="flex items-center gap-[0.875rem]">
    <div className="flex-center h-7 w-7 rounded-md">
      <IconComponent />
    </div>
    <p className="text-[1rem] font-semibold leading-6 text-sc-3 dark:text-sc-3">
      {count ? `${count} ` : ""}
      {label}
    </p>
  </div>
);

export default IconBlock;

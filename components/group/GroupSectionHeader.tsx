import { ColorVariantsType, GroupSectionHeaderProps } from "@/types";

export const colorVariants: ColorVariantsType = {
  bgYellow: "bg-yellow-10",
  bgRed: "bg-red-10",
  bgBlue: "bg-blue-10",
};

const GroupSectionHeader = ({
  title,
  bgColor,
  icon,
}: GroupSectionHeaderProps) => {
  const IconComponent = icon;
  return (
    <header
      className={`flex w-full flex-col rounded-[0.625rem] p-2.5 ${colorVariants[bgColor]}`}
    >
      <figure className="flex gap-1.5">
        <IconComponent />
        <figcaption className="semibold-18 text-sc-2">{title}</figcaption>
      </figure>
      <h5 className="base-10 text-sc-3">List updated daily at midnight PST.</h5>
    </header>
  );
};

export default GroupSectionHeader;

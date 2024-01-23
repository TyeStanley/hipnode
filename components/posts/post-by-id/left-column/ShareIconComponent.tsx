import { ShareIconComponentProps } from "@/types/posts";

const ShareIconComponent = ({
  icon,
  hoveredIcon,
  setHoveredIcon,
}: ShareIconComponentProps) => {
  const isIconHoveredOver = hoveredIcon === icon.label;
  const IconComponent = icon.icon;
  const hoveredStyle = icon.label === "Chat" ? "stroke-red" : "fill-red";
  const unhoveredStyle =
    icon.label === "Chat"
      ? "stroke-sc-2 dark:stroke-light-2"
      : "fill-sc-2 dark:fill-light-2";

  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-2"
      onMouseOver={() => setHoveredIcon(icon.label)}
      onMouseLeave={() => setHoveredIcon("")}
    >
      <div
        className={`${
          isIconHoveredOver ? "bg-red-10" : "bg-light-2_dark-4"
        } flex-center h-[4.25rem] w-[4.25rem] shrink-0 rounded-full`}
      >
        <IconComponent
          className={`${isIconHoveredOver ? hoveredStyle : unhoveredStyle}`}
        />
      </div>
      <p
        className={`semibold-14 ${
          isIconHoveredOver
            ? "text-red dark:text-red"
            : "text-sc-4 dark:text-sc-5"
        }`}
      >
        {icon.label}
      </p>
    </div>
  );
};

export default ShareIconComponent;

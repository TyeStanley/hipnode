import Image from "next/image";
import { OptionRendererProps, TagOption } from "react-tag-autocomplete";

import { cn } from "@/lib/utils";

interface UserTagOption extends TagOption {
  user: {
    picture: string;
  };
}

// NOTE - https://www.npmjs.com/package/react-tag-autocomplete
const CustomOption = (props: OptionRendererProps) => {
  const { children, classNames, option: rawOption, ...optionProps } = props;
  const option = rawOption as UserTagOption;
  const classes = [
    classNames.option,
    option.active ? "is-active" : "",
    option.selected ? "is-selected" : "",
  ];

  return (
    <div className={cn(classes.join(" "), "flex gap-1")} {...optionProps}>
      <Image
        src={option.user?.picture ?? ""}
        width={20}
        height={20}
        className={`h-5 w-5 rounded-full ${option.user?.picture ?? "hidden"}`}
        alt={`Avatar of ${option.label}`}
      />
      {children}
    </div>
  );
};

export default CustomOption;

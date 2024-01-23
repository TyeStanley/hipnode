import { Tag, TagRendererProps } from "react-tag-autocomplete";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface UserTag extends Tag {
  user: {
    picture: string;
  };
}

// NOTE - https://www.npmjs.com/package/react-tag-autocomplete
const CustomTag = (props: TagRendererProps) => {
  const { classNames, tag: rawTag, ...tagProps } = props;
  const tag = rawTag as UserTag;
  return (
    <button
      type="button"
      className={cn(classNames.tag, "inline-flex")}
      {...tagProps}
    >
      <div className={cn(classNames.tagName, "inline-flex items-center gap-1")}>
        <span>
          <Image
            src={tag.user?.picture ?? ""}
            alt={`Avatar of ${tag.label}`}
            className={`h-[0.8rem] w-[0.8rem] rounded-full ${
              tag.user?.picture ?? "hidden"
            }`}
            width={12.8}
            height={12.8}
          />
        </span>
        <span className="mt-[0.0625rem]">{tag.label}</span>
        <span className="delete-users-tag"></span>
      </div>
    </button>
  );
};

export default CustomTag;

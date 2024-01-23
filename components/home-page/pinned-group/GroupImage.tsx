import Image from "next/image";

import { GroupImageProps } from "@/types/shared.types";

const GroupImage = ({ src, name }: GroupImageProps) => {
  return (
    <Image
      src={src}
      alt={`Logo of group ${name} in list of pinned groups`}
      height={32}
      width={32}
      className="rounded"
    />
  );
};

export default GroupImage;

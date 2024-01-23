import Image from "next/image";

import { CardContent } from "@/components/ui/card";
import GroupPostIcons from "@/components/group-page/group-post/GroupPostIcons";

const GroupPostContent = ({
  image,
  groupName,
  heading,
  content,
  id,
  hasUserLiked,
}: {
  image: string;
  groupName: string;
  heading?: string;
  content: string;
  id: number;
  hasUserLiked: boolean;
}) => (
  <CardContent className="flex flex-col gap-[0.62rem]">
    <Image
      className="w-full rounded-[0.65rem]"
      src={image}
      width={315}
      height={146}
      alt={`Post image from a ${groupName} group`}
    />
    <GroupPostIcons id={id} hasUserLiked={hasUserLiked} />
    <h6 className="semibold-14 font-feature line-clamp-3">{heading}</h6>
    <p className="regular-12 line-clamp-6">{content}</p>
  </CardContent>
);

export default GroupPostContent;

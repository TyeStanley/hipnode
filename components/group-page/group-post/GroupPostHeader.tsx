import Link from "next/link";

import { CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GroupPostHeader = ({
  author,
  groupName,
  groupId,
}: {
  author: {
    id: number;
    username: string;
    picture?: string;
  };
  groupName: string;
  groupId: number;
}) => {
  const { username, picture, id } = author;
  return (
    <CardHeader className="flex flex-row items-center gap-[0.62rem]">
      <Avatar className="flex h-[2.125rem] w-[2.125rem] items-center justify-center hover:opacity-80 hover:transition-opacity">
        <Link href={`/profile/${id}`}>
          <AvatarImage src={picture} alt={`${username}'s avatar`} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Link>
      </Avatar>
      <div className="flex flex-col">
        <Link
          className="semibold-12 relative hover:underline"
          href={`/group/${groupId}`}
        >
          {groupName}
        </Link>
        <Link
          href={`/profile/${author.id}`}
          className="regular-10 relative hover:underline"
        >
          {username}
        </Link>
      </div>
    </CardHeader>
  );
};

export default GroupPostHeader;

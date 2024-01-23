import Link from "next/link";

import { isFollowingUser } from "@/lib/actions/post.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowAdminButton from "./FollowAdminButton";

const Admin = async ({
  admin,
}: {
  admin: { picture: string; username: string; id: number };
}) => {
  const isFollowing = await isFollowingUser(admin.id);
  return (
    <div className="flex flex-row items-center justify-between">
      <Link
        href={`/profile/${admin.id}`}
        className="line-clamp-1 flex items-center gap-2.5 hover:opacity-80 hover:transition-opacity"
      >
        <Avatar className="h-[1.875rem] w-[1.875rem]">
          <AvatarImage src={admin.picture} alt={admin.username} />
          <AvatarFallback>{admin.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="semibold-14 font-feature truncate text-sc-2 dark:text-light-2">
          {admin.username}
        </p>
      </Link>
      <FollowAdminButton adminId={admin.id} isFollowing={isFollowing} />
    </div>
  );
};

export default Admin;

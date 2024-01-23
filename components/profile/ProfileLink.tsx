import Image from "next/image";
import Link from "next/link";

import { ProfileLinkProps } from "@/types";

const ProfileLink = ({ username, picture }: ProfileLinkProps) => (
  <Link key={username} href={`/profile/${username}`}>
    <Image
      src={picture}
      alt={`${username} profile`}
      width={30}
      height={30}
      className="rounded-full bg-sc-6 dark:border-dark-3"
    />
  </Link>
);

export default ProfileLink;

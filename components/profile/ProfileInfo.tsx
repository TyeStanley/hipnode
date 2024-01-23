import Image from "next/image";
import Link from "next/link";

import ProfileBtns from "./ProfileBtns";
import ProfileLink from "./ProfileLink";
import TextDescription from "./TextDescription";
import ProfileInfoEdit from "./ProfileInfoEdit";
import { formatUserJoinedDate } from "@/lib/utils";

import { ProfileInfoProps } from "@/types";

import dynamic from "next/dynamic";

const EditSocials = dynamic(() => import("@/components/profile/EditSocials"), {
  ssr: false,
});

const ProfileModal = ({ user }: ProfileInfoProps) => {
  const {
    id,
    username,
    picture,
    title,
    bio,
    createdAt,
    website,
    twitter,
    instagram,
    facebook,
    points,
    following,
    isLoggedInUser,
    isFollowing,
    _count,
  } = user;

  const chatUserInfo = {
    id,
    username,
    image: picture,
    name: username,
  };

  return (
    <div className="relative mx-auto flex flex-col items-center rounded-2xl bg-white p-5 dark:bg-dark-3 min-[477px]:max-w-[13.125rem]">
      <div className="absolute left-0 top-0 h-[6.50rem] w-full rounded-t-2xl bg-profile-modal bg-cover bg-center bg-no-repeat" />

      <Image
        src={picture ?? "/images/emoji_2.png"}
        alt="profile"
        width={130}
        height={130}
        className="relative mx-5 mt-5 rounded-full border-4 border-white bg-yellow-30 dark:border-dark-3"
      />

      <h3 className="mt-2.5 text-[1.625rem] font-semibold leading-[2.375rem] text-sc-1 dark:text-light">
        {username}
      </h3>

      <ProfileInfoEdit
        text={title ?? "No title"}
        field={"title"}
        isLoggedInUser={isLoggedInUser}
      />

      {!isLoggedInUser && (
        <ProfileBtns userInfo={chatUserInfo} isFollowing={isFollowing} />
      )}

      <TextDescription className="mt-5 text-sc-2 dark:text-sc-6">
        {_count.followers} Followers • {points} Points
      </TextDescription>

      <TextDescription className="mt-5 text-sc-2 dark:text-sc-6">
        Following {_count.following}
      </TextDescription>

      <div className="mb-5 mt-4 flex flex-wrap justify-center gap-2.5">
        {following?.map(({ followed }) => (
          <ProfileLink
            key={followed.username}
            username={followed.username}
            picture={followed.picture}
          />
        ))}

        {following && _count.following > 6 ? (
          <Link
            href="/"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sc-6"
          >
            <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2">
              {_count.following - 6}+
            </p>
          </Link>
        ) : (
          following.length === 0 && (
            <Link
              href="/"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sc-6 dark:bg-dark-4"
            >
              <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-white">
                0
              </p>
            </Link>
          )
        )}
      </div>

      <ProfileInfoEdit
        text={bio ?? "No bio"}
        field={"bio"}
        isLoggedInUser={isLoggedInUser}
        className={`text-[0.875rem] font-semibold leading-[1.375rem] text-sc-3`}
      />

      <EditSocials
        website={website}
        twitter={twitter}
        instagram={instagram}
        facebook={facebook}
        isLoggedInUser={isLoggedInUser}
      />

      <div className="mt-5 h-px w-full bg-light-2 dark:bg-sc-3 md:mt-7" />

      <TextDescription className="mt-5 text-sc-3 dark:text-sc-6 md:mt-7">
        joined {formatUserJoinedDate(createdAt)}
      </TextDescription>
    </div>
  );
};

export default ProfileModal;

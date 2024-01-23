import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { formatInterviewDate } from "@/utils";
import { InterviewHeaderProps } from "@/types/interview.index";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const InterviewHeader = ({
  userImage,
  username,
  date,
  id,
  userCanEditMedia,
  creatorId,
}: InterviewHeaderProps) => {
  const interviewDate = formatInterviewDate(date);
  return (
    <header className="flex w-full justify-between">
      <Link href={`/profile/${creatorId}`}>
        <div className="flex gap-4">
          <Image
            src={userImage}
            height={40}
            width={40}
            alt="user image"
            className="h-10 w-10 rounded-full md:h-11 md:w-11"
          />
          <div className="flex flex-col">
            <strong className="semibold-14 sm:semibold-16 ">{username}</strong>
            <time className="base-12 sm:base-14 text-sc-3">
              {interviewDate}
            </time>
          </div>
        </div>
      </Link>

      {userCanEditMedia && (
        <MediaEditActionPopover
          positionStyles="translate-x-[-4rem] translate-y-[-1.2rem]"
          label="Interview"
          mediaId={id}
        />
      )}
    </header>
  );
};

export default InterviewHeader;

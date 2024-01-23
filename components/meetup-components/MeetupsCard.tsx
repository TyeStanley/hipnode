import Image from "next/image";
import Link from "next/link";

import { getFormattedDateMeetUpCard } from "@/utils";
import { MeetUpExtended, MeetupTag } from "@/types/meetups.index";
import SanatizedHtml from "../posts/post-by-id/main-content/SanatizedHtml";
import dynamic from "next/dynamic";

const MediaEditActionPopover = dynamic(
  () => import("@/components/action-popover/MediaEditActionPopover"),
  { ssr: false }
);

const MeetupsCard = ({ meetUp }: { meetUp: MeetUpExtended }) => {
  const { image, title, location, summary, tags, userCanEditMedia, id } =
    meetUp;
  const { day, monthText } = getFormattedDateMeetUpCard(meetUp.createdAt);

  return (
    <article className="bg-light_dark-3 flex flex-col gap-4 rounded-2xl p-3.5 hover:shadow-lg hover:dark:bg-dark-4 md:gap-6 md:p-5">
      <div className="flex justify-between">
        <figure className="flex items-center gap-5">
          <Link href={`/meet-ups/${id}`}>
            <Image
              src={image}
              alt={`A logo of the organization hosting the meetup ${title}`}
              width={48}
              height={48}
              className="rounded-md md:h-[4.5rem] md:w-[4.5rem]"
            />
          </Link>
          <figcaption className="semibold-14 flex flex-col gap-1 md:gap-2">
            <Link href={`/meet-ups/${id}`}>
              <h3 className="text-sc-2_light-2 semibold-14 md:semibold-18">
                {title}
              </h3>
            </Link>
            <p className="base-10 md:base-14 text-sc-3">{location}</p>
          </figcaption>
        </figure>

        <div className="bg-light_dark-4 flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center rounded-md md:h-[4.5rem] md:w-[3.6875rem]">
          <time className="semibold-12 md:semibold-16 text-sc-2_light-2">
            {monthText}
          </time>
          <p className="semibold-16 md:bold-26 text-blue">{day}</p>
        </div>
      </div>

      <p className="text-sc-1_light-2 flex">
        <SanatizedHtml content={summary}></SanatizedHtml>
      </p>
      <div className="flex items-center justify-between">
        <ul className="flex gap-2.5">
          {tags.map((tag: MeetupTag) => (
            <li
              key={tag.id}
              className="bg-light-3_dark-4 semibold-10 md:semibold-12 rounded-full px-2 py-[0.125rem] text-sc-4"
            >
              {tag.name}
            </li>
          ))}
        </ul>
        {userCanEditMedia && (
          <MediaEditActionPopover
            positionStyles="translate-x-[-2.8rem] translate-y-[-8.2rem]"
            label="Meetup"
            mediaId={id}
          />
        )}
      </div>
    </article>
  );
};

export default MeetupsCard;

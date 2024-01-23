import Link from "next/link";

import { MeetupItemProps } from "@/types/homepage";

import { ImageWithCaption } from "@/components/home-page/shared-components";
import Pills from "@/components/home-page/pills/Pills";
import { MeetupDate } from "@/components/home-page/meetup";

const MeetupItem = ({
  meet: { id, createdAt, title, image, location },
}: MeetupItemProps) => (
  <Link key={id} href={`/meet-ups/${id}`}>
    <article className="flex flex-row bg-light dark:bg-dark-3">
      <MeetupDate createdAt={createdAt} />
      <div className="flex flex-col justify-between pl-[0.875rem]">
        <div className="flex flex-col gap-0.5 ">
          <div className="overflow-hidden">
            <h3 className="semibold-14 truncate capitalize text-sc-2 dark:text-light-2">
              {title}...
            </h3>
          </div>
          <div className="flex gap-[0.375rem]">
            <ImageWithCaption
              imageSrc={image}
              imageTitle={title}
              imageAlt={title}
              caption={location}
              imageWidth={16}
              imageHeight={16}
              className="h-[1rem] w-[1rem] rounded-full"
            />
            <p className="base-10 text-sc-3">{location}</p>
          </div>
        </div>
        <div className="flex">
          <Pills />
        </div>
      </div>
    </article>
  </Link>
);

export default MeetupItem;

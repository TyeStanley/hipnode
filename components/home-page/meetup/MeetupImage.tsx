import Image from "next/image";

import { MeetupImageInterface } from "@/types/homepage";

const MeetupImage = ({
  imageSrc,
  meetTitle,
  meetLocation,
}: MeetupImageInterface) => (
  <figure className="flex items-center gap-1.5">
    <Image
      src={imageSrc}
      alt={`A logo of the organization hosting the meetup ${meetTitle}`}
      width={16}
      height={16}
      className="h-[1rem] w-[1rem] rounded-full"
    />
    <figcaption className="semibold-14 flex flex-col">
      <p className="base-10 text-sc-3">{meetLocation}</p>
    </figcaption>
  </figure>
);

export default MeetupImage;

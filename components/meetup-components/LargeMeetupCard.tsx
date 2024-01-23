import dynamic from "next/dynamic";

import { MeetupWithTags } from "@/types/meetups.index";
import { InterviewBannerImage } from "../interview-components";

const MeetupContactInfo = dynamic(() => import("./MeetupContactInfo"), {
  ssr: false,
});

const SanatizedHtml = dynamic(
  () => import("../posts/post-by-id/main-content/SanatizedHtml"),
  {
    ssr: false,
  }
);

interface LargeMeetupCardProps {
  meetupData: MeetupWithTags;
}

const LargeMeetupCard = ({ meetupData }: LargeMeetupCardProps) => {
  const { contactEmail, contactNumber, image, location, summary, title, tags } =
    meetupData;

  return (
    <article className="bg-light_dark-3 flex h-fit max-w-[49rem] flex-col rounded-2xl">
      <InterviewBannerImage
        bannerImage={image}
        className="h-[10rem] w-full overflow-hidden sm:h-[17rem]"
        height={273}
        width={785}
        roundedTop
      />
      <section className="flex w-full">
        <p className="regular-14 md:regular-18 pl-5 pt-8 text-sc-5">H1</p>
        <div className="flex w-full flex-col gap-3.5 p-5 text-sc-3 md:gap-5">
          <h1 className="text-sc-2_light-2 semibold-16 sm:semibold-26">
            {title}
          </h1>
          <div className="flex w-full flex-col justify-between gap-3.5 sm:flex-row">
            <MeetupContactInfo
              location={location}
              contactEmail={contactEmail}
              contactNumber={contactNumber}
            />
            <div className="flex gap-6">
              {tags?.map((tag: { id: number; name: string }) => (
                <span
                  className="base-12 cursor-pointer text-yellow-90 hover:text-red-60 md:text-base"
                  key={tag.id}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
          <p className="base-12 sm:text-base">
            <SanatizedHtml content={summary} />
          </p>
        </div>
      </section>
    </article>
  );
};

export default LargeMeetupCard;

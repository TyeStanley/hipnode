import Link from "next/link";

import { formatSalary } from "@/utils";
import { InterviewBannerImage, InterviewCardInfo, InterviewHeader } from ".";
import { InterviewCardProps } from "@/types/interview.index";

const InterviewCard = ({ interviewData }: InterviewCardProps) => {
  const {
    id,
    title,
    creatorId,
    bannerImage,
    websiteLink,
    salary,
    salaryPeriod,
    updates,
    createdAt,
    userCanEditMedia,
    creator: { name: username, picture: userImage },
  } = interviewData;

  const profilePage = true;

  const interviewSalary = formatSalary(salary, salaryPeriod);

  const outerDivStyles = profilePage
    ? "lg:flex-row"
    : "md:flex-row xl:flex-row";

  const firstImageStyles = profilePage ? "lg:hidden" : "md:hidden lg:flex";

  const secondImageStyles = profilePage ? "md:hidden lg:flex" : "lg:hidden";

  return (
    <article
      className={`bg-light_dark-3 text-sc-2_light-2 flex w-full flex-col justify-between gap-[1.875rem] rounded-2xl p-3.5 hover:shadow-lg hover:dark:bg-dark-4 sm:p-5 ${outerDivStyles}`}
    >
      <section className="flex w-full flex-col justify-between gap-5 sm:h-full">
        <InterviewHeader
          userImage={userImage}
          username={username}
          date={createdAt}
          id={id}
          userCanEditMedia={userCanEditMedia}
          creatorId={creatorId}
        />
        <InterviewBannerImage
          bannerImage={bannerImage}
          className={`${firstImageStyles} flex h-[12.5rem] w-full xl:hidden`}
          height={720}
          width={1120}
        />
        <h2 className="semibold-16 sm:semibold-18 ">{title}</h2>
        <div className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-4">
          <InterviewCardInfo
            interviewSalary={interviewSalary}
            updates={updates}
            websiteLink={websiteLink}
          />
          <Link
            href={`/interviews/${id}`}
            className="semibold-14 flex-center whitespace-nowrap rounded bg-blue px-3.5 py-2 text-white"
          >
            Full Details
          </Link>
        </div>
      </section>
      <div className="flex w-full lg:max-w-[17.5rem]">
        <InterviewBannerImage
          bannerImage={bannerImage}
          className={`${secondImageStyles} hidden h-[11.25rem] w-full md:flex xl:flex xl:w-full xl:max-w-[17.5rem]`}
          height={720}
          width={1120}
        />
      </div>
    </article>
  );
};

export default InterviewCard;

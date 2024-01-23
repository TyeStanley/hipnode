import dynamic from "next/dynamic";

import { formatSalary } from "@/utils";
import { InterviewBannerImage, InterviewCardInfo } from ".";
import { LargeInterviewCardProps } from "@/types/interview.index";

const SanatizedHtml = dynamic(
  () => import("../posts/post-by-id/main-content/SanatizedHtml"),
  {
    ssr: false,
  }
);

const LargeInterviewCard = ({
  interviewData,
  tags,
}: LargeInterviewCardProps) => {
  const {
    title,
    bannerImage,
    websiteLink,
    salary,
    salaryPeriod,
    updates,
    details,
  } = interviewData;
  const interviewSalary = formatSalary(salary, salaryPeriod);

  return (
    <article className="bg-light_dark-3 flex h-fit max-w-[49rem] flex-col rounded-2xl">
      <InterviewBannerImage
        bannerImage={bannerImage}
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
            <InterviewCardInfo
              interviewSalary={interviewSalary}
              updates={updates}
              websiteLink={websiteLink}
            />
            <div className="flex gap-6">
              {tags?.map((tag: string) => (
                <span
                  className="base-12 cursor-pointer text-yellow-90 hover:text-red-60 md:text-base"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <p className="base-12 sm:text-base">
            <SanatizedHtml content={details} />
          </p>
        </div>
      </section>
    </article>
  );
};

export default LargeInterviewCard;

import Link from "next/link";

import OutlineIcon from "../icons/outline-icons";
import { InterviewCardButtonsType } from "@/types/interview.index";

const InterviewCardInfo = ({
  interviewSalary,
  updates,
  websiteLink,
}: InterviewCardButtonsType) => {
  return (
    <section className="flex w-fit">
      <figure className="flex flex-col justify-between">
        <figcaption className="bold-14 text-sc-2_light-2">
          {interviewSalary}
        </figcaption>
        <p className="base-12 text-sc-3">Revenue</p>
      </figure>
      <span className="mx-[1.5625rem] h-full border-[0.5px] border-l-sc-5" />

      <figure className="flex flex-col justify-between">
        <figcaption className="bold-14 text-sc-2_light-2">{updates}</figcaption>
        <p className="base-12 text-sc-3">Updates</p>
      </figure>
      <span className="mx-[1.5625rem] h-full border-[0.5px] border-l-sc-5" />

      <figure className="flex flex-col justify-between">
        <Link href={websiteLink}>
          <OutlineIcon.Web />
        </Link>
        <figcaption className="base-12 text-sc-3">Website</figcaption>
      </figure>
    </section>
  );
};

export default InterviewCardInfo;

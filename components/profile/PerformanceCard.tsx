import Image from "next/image";

import StatisticSection from "@/components/profile/StatisticSection";

import { PerformanceCardProps } from "@/types";

const PerformanceCard = ({
  contentImg,
  views,
  likes,
  comments,
}: PerformanceCardProps) => {
  return (
    <article className="flex items-center">
      <Image
        src={contentImg}
        alt="content image of post"
        width={50}
        height={50}
        className="mr-3.5 rounded-[0.375rem] border border-contentCard shadow-contentCard"
      />

      <div className="flex justify-between gap-5">
        <StatisticSection title="Views" value={views} />
        <StatisticSection title="Likes" value={likes} />
        <StatisticSection title="Comments" value={comments} />
      </div>
    </article>
  );
};

export default PerformanceCard;

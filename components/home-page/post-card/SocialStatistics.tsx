import { SocialStatisticsProps } from "@/types/homepage";

const SocialStatistics = ({ socialCounts }: SocialStatisticsProps) => {
  return (
    <ul className="flex w-fit flex-row flex-wrap justify-between gap-10 pt-[1.25rem] text-[0.563rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 md:pt-0">
      {socialCounts?.map(([key, value]) => {
        return (
          <li
            className="regular-9 sm:regular-14 flex flex-row gap-[0.125rem]"
            key={key}
          >
            <p>{value}</p>
            <p className="capitalize">{key}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialStatistics;

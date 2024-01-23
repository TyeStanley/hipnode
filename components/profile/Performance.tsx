import PerformanceCard from "@/components/profile/PerformanceCard";

import { PerformanceProps } from "@/types";

const Performance = ({ data }: PerformanceProps) => {
  return (
    <div className="rounded-[1rem] bg-light p-5 dark:bg-dark-3">
      <h4 className="text-[1.125rem] font-semibold leading-[1.625rem] text-sc-1 dark:text-light">
        Performance
      </h4>
      <p className="text-base leading-6 text-sc-3 dark:text-sc-6">
        Showing data from the last 30 days
      </p>

      <section className="mt-7 flex flex-col gap-6">
        {data.length === 0 && (
          <div className="flex justify-center text-base text-sc-1 dark:text-light md:text-lg">
            No data
          </div>
        )}

        {data.map((card) => (
          <PerformanceCard
            key={card.id}
            contentImg={card.image}
            views={card.viewCount}
            likes={card._count.likes}
            comments={card._count.comments}
          />
        ))}
      </section>
    </div>
  );
};

export default Performance;

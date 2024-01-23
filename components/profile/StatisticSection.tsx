const StatisticSection = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => (
  <section className="flex flex-col gap-1">
    <p className="text-base leading-6 text-sc-3 dark:text-sc-6">{title}</p>
    <p className="text-sm font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-3">
      {value}
    </p>
  </section>
);

export default StatisticSection;

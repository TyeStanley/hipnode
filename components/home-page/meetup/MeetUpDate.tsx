import { formatDate } from "@/utils";

const MeetUpDate = ({ createdAt }: { createdAt: Date }) => {
  const { monthText, day } = formatDate(createdAt);

  return (
    <div className="flex h-[4.25rem] w-[2.75rem] flex-col items-center justify-center rounded-md border-[0.05rem] border-solid border-light-3 bg-light dark:border-none dark:bg-dark-4">
      <time className="semibold-14 text-sc-2 dark:text-light-2">
        {monthText}
      </time>
      <p className="bold-26 text-blue-80">{day}</p>
    </div>
  );
};

export default MeetUpDate;

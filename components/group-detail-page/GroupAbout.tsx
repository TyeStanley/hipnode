const GroupAbout = ({ description }: { description: string }) => {
  return (
    <div className="bg-light_dark-3 flex flex-col items-start gap-2.5 rounded-2xl p-2.5 text-sc-2 dark:text-light-2 lg:p-5">
      <p className="semibold-16">About</p>
      <p className="regular-12">{description}</p>
    </div>
  );
};

export default GroupAbout;

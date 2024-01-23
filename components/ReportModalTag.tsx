const ReportModalTag = ({ tag }: { tag: string }) => {
  return (
    <div
      key={tag}
      className="bg-light-3_dark-3 flex rounded-full border border-sc-5 px-5 py-2.5 dark:border-sc-2"
    >
      <span className="text-sc-2_light-2 regular-12">{tag}</span>
    </div>
  );
};

export default ReportModalTag;

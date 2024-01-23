import ExploreButton from "./ExploreButton";

const Explore = ({ groupId }: { groupId: number }) => {
  return (
    <div
      className="flex flex-row items-center justify-between rounded-2xl bg-light p-[0.625rem] 
      dark:bg-dark-3 lg:px-5 lg:py-4"
    >
      <div className="semibold-16 text-sc-2 dark:text-light-2">Explore</div>
      <div className="semibold-12 flex flex-row items-center gap-[0.88rem]">
        <ExploreButton groupId={groupId} />
      </div>
    </div>
  );
};

export default Explore;

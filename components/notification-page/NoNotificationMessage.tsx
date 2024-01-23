import pluralize from "pluralize";

export const NoNotificationMessage = ({
  selectedTab,
}: {
  selectedTab: string | null;
}) => {
  return (
    <p
      className="mt-3 text-center text-[1rem] font-bold leading-[1.5rem] text-sc-2 dark:text-light-2 
        xl:mt-5 xl:text-[1.625rem] xl:leading-[2.375rem]"
    >
      No Notifications{" "}
      {selectedTab !== "all notification" && selectedTab
        ? "For " +
          pluralize(selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1))
        : ""}
    </p>
  );
};

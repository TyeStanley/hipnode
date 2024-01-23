import PopularAndNewGroup from "@/components/group-page/mobileGroupSection/PopularAndNewGroup";
import { sectionHeadings } from "@/constants";
import { GroupPromiseProps } from "@/types";

const PopularAndNewGroups = ({
  mostPopularGroups,
  newlyLaunchedGroups,
}: {
  mostPopularGroups: GroupPromiseProps;
  newlyLaunchedGroups: GroupPromiseProps;
}) => {
  const headings = sectionHeadings(mostPopularGroups, newlyLaunchedGroups);

  return (
    <>
      {headings.map((group) => (
        <PopularAndNewGroup group={group} key={group.title} />
      ))}
    </>
  );
};

export default PopularAndNewGroups;

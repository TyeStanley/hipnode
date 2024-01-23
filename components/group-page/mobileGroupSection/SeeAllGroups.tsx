import GroupSectionListItem from "@/components/group/GroupSectionListItem";
import { GroupPromiseProps } from "@/types";

const SeeAllGroups = ({ allGroups }: { allGroups: GroupPromiseProps }) => {
  return (
    <ul className="my-2.5 flex flex-col gap-2.5 px-2.5">
      {allGroups.slice(0, 11).map((group) => (
        <GroupSectionListItem
          id={group.id}
          key={group.name}
          groupName={group.name}
          logo={group.logo ?? "/images/hipnode.svg"}
          description={group.description ?? "N/A"}
        />
      ))}
    </ul>
  );
};

export default SeeAllGroups;

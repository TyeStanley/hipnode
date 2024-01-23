import { colorVariants } from "@/components/group/GroupSectionHeader";
import GroupSectionListItem from "@/components/group/GroupSectionListItem";
import { GroupSectionHeaderProps } from "@/types";
import SeeAllButton from "@/components/group-page/mobileGroupSection/SeeAllButton";
import { GroupProps } from "@/types/models";

const PopularAndNewGroup = ({ group }: { group: GroupSectionHeaderProps }) => {
  const Icon = group.icon;

  return (
    <>
      <div
        className={`flex flex-row justify-between rounded-[0.625rem] ${
          colorVariants[group.bgColor]
        } mt-5 p-2.5`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-[0.38rem]">
            <Icon />
            <h5 className="semibold-16 text-sc-2">{group.title}</h5>
          </div>
          <p className="regular-10 text-sc-3">
            List updated daily at midnight PST.
          </p>
        </div>
      </div>
      <ul className="my-2.5 flex flex-col gap-2.5 px-2.5">
        {group.title === "Most Popular"
          ? group.groups
              .slice(0, 3)
              .map((group: GroupProps) => (
                <GroupSectionListItem
                  id={group.id}
                  key={group.name}
                  groupName={group.name}
                  logo={group.logo ?? "N/A"}
                  description={group.description ?? "N/A"}
                />
              ))
          : group.groups
              .slice(0, 3)
              .map((group: GroupProps) => (
                <GroupSectionListItem
                  id={group.id}
                  key={group.name}
                  groupName={group.name}
                  logo={group.logo ?? "N/A"}
                  description={group.description ?? "N/A"}
                />
              ))}
      </ul>
      <div className="px-2.5">
        <SeeAllButton groups={group.title} />
      </div>
    </>
  );
};

export default PopularAndNewGroup;

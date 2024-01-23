import { HeadingsType } from "@/types";
import GroupSectionHeader from "./group/GroupSectionHeader";
import GroupSectionListItem from "./group/GroupSectionListItem";
import { GroupProps } from "@/types/models";

type SectionGroupProps = {
  section: HeadingsType;
  index: number;
  expandedGroupIndex: number | null;
  setExpandedGroupIndex: (index: number | null) => void;
  setValue?: (name: string, value: string) => void;
};

const SectionGroup = ({
  section,
  index,
  expandedGroupIndex,
  setValue,
  setExpandedGroupIndex,
}: SectionGroupProps) => {
  const { title, bgColor, icon, groups } = section;

  const mappedGroups =
    expandedGroupIndex === index ? groups : groups.slice(0, 3);
  const isHidden = expandedGroupIndex !== null && expandedGroupIndex !== index;

  return (
    <section
      key={title}
      className={`flex max-w-[13.125rem] flex-col gap-2.5 ${
        isHidden && "hidden"
      }`}
    >
      <GroupSectionHeader title={title} bgColor={bgColor} icon={icon} />
      <ul className="flex flex-col gap-2.5">
        {mappedGroups.map((group: GroupProps) => (
          <GroupSectionListItem
            id={group.id}
            key={group.name}
            logo={group.logo ?? ""}
            description={group.description ?? ""}
            groupName={group.name}
            setValue={setValue}
          />
        ))}
      </ul>
      <button
        className={`semibold-9 flex h-3.5 w-fit rounded-full bg-purple-20 px-1 text-purple hover:opacity-80 hover:transition-opacity ${
          expandedGroupIndex !== null && "hidden"
        }`}
        onClick={() => setExpandedGroupIndex(index)}
      >
        See All
      </button>
    </section>
  );
};

export default SectionGroup;

import Image from "next/image";
import Link from "next/link";
import { PopoverClose } from "@radix-ui/react-popover";

const GroupSectionListItem = ({
  id,
  groupName,
  logo,
  description,
  setValue,
}: {
  id: number;
  groupName: string;
  logo: string;
  description: string;
  setValue?: any;
}) => {
  const handleSetGroupValue = () => {
    if (!groupName) return;
    setValue("group", groupName);
  };

  if (setValue) {
    return (
      <PopoverClose>
        <div
          className="group flex cursor-pointer items-center gap-2"
          onClick={handleSetGroupValue}
        >
          <ListItemContent
            logo={logo}
            groupName={groupName}
            description={description}
          />
        </div>
      </PopoverClose>
    );
  }

  return (
    <Link href={`/group/${id}`} className="group flex items-center gap-2">
      <ListItemContent
        logo={logo}
        groupName={groupName}
        description={description}
      />
    </Link>
  );
};

export default GroupSectionListItem;

type ListItemContentProps = {
  logo: string;
  groupName: string;
  description: string;
};

const ListItemContent = ({
  logo,
  groupName,
  description,
}: ListItemContentProps) => (
  <>
    <Image
      src={logo}
      height={34}
      width={34}
      style={{
        objectFit: "cover",
      }}
      alt={`logo of the group ${groupName}`}
      className="h-[2.125rem] w-[2.125rem] rounded-full border border-purple-20"
    />
    <div className="line-clamp-1 flex w-full flex-col">
      <h5 className="semibold-12 text-sc-2_light-2 truncate group-hover:text-blue">
        {groupName}
      </h5>
      <p className="base-10 truncate text-sc-3">{description}</p>
    </div>
  </>
);

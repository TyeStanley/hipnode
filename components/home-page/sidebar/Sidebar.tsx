import { sidebarItems } from "@/constants";
import { SidebarProps } from "@/types/posts";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isLoggedIn, peopleFollowed }: SidebarProps) => {
  const itemsToRender = isLoggedIn ? sidebarItems : sidebarItems.slice(0, 2);

  return (
    <aside className="flex h-fit w-full flex-row justify-between gap-[0.625rem] rounded-2xl bg-light p-[1.25rem] dark:bg-dark-3 lg:flex-col lg:justify-center lg:p-[0.625rem]">
      {itemsToRender.map((item) => (
        <SidebarItem
          key={item.title}
          item={item}
          peopleFollowed={peopleFollowed}
        />
      ))}
    </aside>
  );
};

export default Sidebar;

import { Group } from "@prisma/client";
import OutlineIcons from "@/components/icons/outline-icons";
import PinnedGroupItem from "./PinnedGroupItem";

const PinnedGroup = ({ groups }: { groups: Group[] }) => (
  <section className="bg-light_dark-3 flex min-w-[13rem] flex-col gap-5 rounded-2xl p-5">
    <header className="flex items-center gap-1">
      <h2 className="text-sc-2_light-2 semibold-16">Pinned Group</h2>
      <OutlineIcons.ArrowRight className="stroke-sc-2 dark:stroke-light-2" />
    </header>

    <ul className="flex flex-col gap-2.5">
      {groups?.map((group) => <PinnedGroupItem key={group.id} group={group} />)}
    </ul>
  </section>
);
export default PinnedGroup;

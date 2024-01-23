import { PillItemProps } from "@/types/homepage";

const PillItem = ({ pill }: PillItemProps) => (
  <li
    key={pill}
    className="rounded-full bg-sc-6 px-[0.5rem] py-[0.125rem] text-[0.563rem] font-semibold text-sc-4 dark:bg-dark-4"
  >
    {pill}
  </li>
);

export default PillItem;

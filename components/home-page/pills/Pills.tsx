import { meetUpsCardPills } from "@/constants";
import PillItem from "./PillItem";

const Pills = () => (
  <ul className="flex gap-2.5">
    {meetUpsCardPills.map((pill: string) => (
      <PillItem key={pill} pill={pill} />
    ))}
  </ul>
);

export default Pills;

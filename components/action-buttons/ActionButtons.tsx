import ActionButton from "./ActionButton";
import { routes } from "@/constants";
import { ActiveButtonsProps } from "@/types";

const ActiveButtons = ({ currentPath }: ActiveButtonsProps) => {
  return (
    <div className="flex w-fit flex-row gap-[3.25rem] rounded-xl px-[1.875rem] py-[1.188rem]">
      {routes.map((route) => (
        <ActionButton
          key={route}
          label={route}
          href={`/${route}`}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
};

export default ActiveButtons;

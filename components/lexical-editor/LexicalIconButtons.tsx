import { cn } from "@/lib/utils";
import { LexicalIconButtonsProps } from "@/types/lexical-editor";
import { IconLibrary } from "./IconLibrary";

const LexicalIconButtons = ({
  icon,
  active,
  className,
  ...props
}: LexicalIconButtonsProps) => {
  if (!icon) return null;
  return (
    <button
      type="button"
      {...props}
      className={cn(
        `p-1.5 rounded-sm dark:bg-dark-4 dark:text-light-2 ${
          active ? "dark:bg-dark-2 dark:text-light-3" : ""
        } ${
          props.disabled
            ? `bg-slate-50 text-slate-400`
            : active
            ? `bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-900 cursor-pointer`
            : `bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 cursor-pointer`
        }`,
        className
      )}
    >
      {IconLibrary[icon]}
    </button>
  );
};

export default LexicalIconButtons;

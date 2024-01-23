import { cn } from "@/lib/utils";

const Spinner = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      role="status"
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-red",
        classNames
      )}
    />
  );
};

export default Spinner;

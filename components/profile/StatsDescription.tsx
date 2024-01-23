import { StatsDescriptionProps } from "@/types";
import { cn } from "@/lib/utils";

const StatsDescription = ({
  children,
  className,
  ...props
}: StatsDescriptionProps) => (
  <p
    className={cn(
      "text-[0.5625rem] leading-[0.875rem] text-sc-3 dark:text-sc-5 lg:text-[0.875rem] lg:leading-[1.375rem]",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

export default StatsDescription;

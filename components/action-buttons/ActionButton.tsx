import Link from "next/link";

import { useTheme } from "@/context/ThemeProvider";
import { ActionButtonProps } from "@/types";
import { cn } from "@/lib/utils";

const ColorVariants: Record<string, string> = {
  "dark-active": "bg-red-80",
  "light-active": "bg-red-80",
  "dark-inactive": "bg-dark-3",
  "light-inactive": "bg-light !text-sc-3",
};

const baseStyles =
  "rounded-3xl px-5 py-2 text-[1.125rem] font-semibold leading-[1.625rem] text-light";

const ActionButton = ({ label, href, currentPath }: ActionButtonProps) => {
  const { mode } = useTheme();
  const isActive = currentPath === href;

  const variant = `${mode}-${isActive ? "active" : "inactive"}`;

  return (
    <button
      type="button"
      className={cn(baseStyles, ColorVariants[variant] || "")}
    >
      <Link href={href} passHref>
        <p className="min-w-[5.125rem] capitalize">{label}</p>
      </Link>
    </button>
  );
};

export default ActionButton;

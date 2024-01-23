import { CustomButtonProps } from "@/types";
import { cn } from "@/lib/utils";

const baseStyles = "flex items-center justify-center";

const CustomButton = ({
  label,
  onClick,
  className = "bg-red-80 text-sc-6",
  disabled = false,
  type = "button",
  icon: Icon,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={cn(baseStyles, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default CustomButton;

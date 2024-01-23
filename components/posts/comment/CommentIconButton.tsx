import { CommentIconButtonProps } from "@/types/posts";
import { cn } from "@/lib/utils";

const CommentIconButton = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}: CommentIconButtonProps) => {
  return (
    <button className={cn(isActive && "bg-red-60", color)} {...props}>
      <span className={`${children ? "mr-1" : ""} `}>
        <Icon />
      </span>
      {children}
    </button>
  );
};

export default CommentIconButton;

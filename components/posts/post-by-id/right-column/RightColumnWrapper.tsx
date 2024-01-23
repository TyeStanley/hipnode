import { ColumnWrapperType } from "@/types/posts";

const RightColumnWrapper = ({ children }: ColumnWrapperType) => {
  return (
    <aside className="flex min-w-[20.3rem] flex-col items-center justify-center rounded-2xl bg-light p-[1.875rem] dark:bg-dark-3">
      {children}
    </aside>
  );
};

export default RightColumnWrapper;

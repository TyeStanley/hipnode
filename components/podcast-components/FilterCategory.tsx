import { cn } from "@/lib/utils";
import OutlineIcon from "../icons/outline-icons";
import { FilterCategoryProps } from "@/types";

const FilterCategory = ({
  category,
  isSelected,
  toggleCategory,
}: FilterCategoryProps) => {
  return (
    <div
      key={category.id}
      className="flex w-full cursor-pointer justify-between gap-2"
      onClick={() => toggleCategory(category.id)}
    >
      <label
        className={`${
          isSelected ? "text-sc-2_light" : "text-sc-3"
        } semibold-12 cursor-pointer`}
        htmlFor={category.name}
      >
        {category.name}
      </label>
      <div
        className={cn(
          "mt-0.5 flex h-4 min-h-[1rem] w-4 min-w-[1rem] cursor-pointer items-center justify-center rounded-sm border transition duration-200",
          isSelected && "border-red bg-red",
          !isSelected && "border-sc-3"
        )}
      >
        <OutlineIcon.Success
          className={`${isSelected ? "fill-white" : "fill-none"}`}
        />
      </div>
    </div>
  );
};

export default FilterCategory;

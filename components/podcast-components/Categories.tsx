"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { capitalise } from "@/utils";
import { CategoriesProps } from "@/types";
import { FilterCategory } from ".";

const Categories = ({
  setLoading,
  filters,
  page,
  urlFilter,
  className,
}: CategoriesProps) => {
  const router = useRouter();
  const [selectFilters, setSelectFilters] = useState<number[]>([]);

  const queryString = selectFilters
    .map((filter) => `${urlFilter}=${filter}`)
    .join("&");

  useEffect(() => {
    router.push(`/${page}?${queryString}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFilters]);

  const toggleCategory = (category: number) => {
    if (selectFilters.includes(category)) {
      setSelectFilters(selectFilters.filter((item) => item !== category));
    } else {
      setSelectFilters([...selectFilters, category]);
    }
    setLoading(true);
    router.push(`/${page}?${queryString}`);
  };

  const title = capitalise(urlFilter);

  return (
    <div
      className={`bg-light_dark-3 flex h-fit w-full flex-col gap-3 rounded-2xl p-5 ${className}`}
    >
      <h2 className="semibold-18 text-sc-2_light">Filter by {title}</h2>
      {filters.map((category) => {
        const isSelected = selectFilters.includes(category.id);
        return (
          <FilterCategory
            key={category.id}
            category={category}
            isSelected={isSelected}
            toggleCategory={toggleCategory}
          />
        );
      })}
    </div>
  );
};

export default Categories;

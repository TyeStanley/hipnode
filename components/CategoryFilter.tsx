"use client";

import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OutlineIcons from "@/components/icons/outline-icons";
import { CategoryFilterData } from "@/constants";

const filterTitles = CategoryFilterData.reduce(
  (acc, category) => {
    acc[category.name] = false;
    return acc;
  },
  {} as Record<string, boolean>
);

const CategoryFilter = () => {
  const [open, setOpen] = useState(filterTitles);
  const [isChecked, setIsChecked] = useState({});

  const handleOpen = (value: string): void => {
    setOpen((prev) => ({
      ...prev,
      [value]: !prev[value as keyof typeof open],
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;

    setIsChecked((prevState) => ({ ...prevState, [id]: checked }));
  };

  return (
    <Accordion
      type="multiple"
      className="w-[300px] rounded-[1rem] bg-light p-5 dark:bg-dark-3"
    >
      {CategoryFilterData.map((category) => (
        <AccordionItem key={category.name} value={category.name}>
          <AccordionTrigger
            onClick={() => handleOpen(category.name)}
            className={`flex rounded-[0.5rem] px-[0.62rem] ${
              open[category.name as keyof typeof open]
                ? "bg-sc-6 dark:bg-dark-3"
                : ""
            }`}
          >
            <span className="text-[0.75rem] font-semibold leading-[150%] text-sc-2 dark:text-light-2">
              {category.name}
            </span>
            {open[category.name as keyof typeof open] ? (
              <OutlineIcons.ArrowLargeDown />
            ) : (
              <OutlineIcons.ArrowLargeRight />
            )}
          </AccordionTrigger>

          <AccordionContent>
            <section className="mt-[0.62rem] flex flex-col gap-[0.62rem] px-[0.62rem]">
              {category.filters.map((filter) => (
                <label
                  key={filter}
                  htmlFor={filter}
                  className="relative flex items-center justify-between"
                >
                  <span className="text-[0.75rem] font-semibold leading-[150%] text-sc-2 dark:text-light-2">
                    {filter}
                  </span>
                  <input
                    id={filter}
                    type="checkbox"
                    className="invisible h-4 w-4"
                    onChange={handleInput}
                  />

                  <div className="absolute right-0">
                    <OutlineIcons.Checkbox
                      checked={isChecked[filter as keyof typeof isChecked]}
                    />
                  </div>
                </label>
              ))}
            </section>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CategoryFilter;

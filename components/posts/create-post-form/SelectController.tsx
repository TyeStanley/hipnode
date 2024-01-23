import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { SelectControllerProps } from "@/types/posts";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { ChevronUp, ChevronDown } from "lucide-react";

const SelectController = ({
  control,
  name,
  placeholder,
  options,
  currentSelection,
}: SelectControllerProps) => {
  const [openState, setOpenState] = useState<Record<string, boolean>>({});
  const handleOpenChange = (name: string) => {
    setOpenState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormItem>
          <Select
            onOpenChange={() => handleOpenChange(name)}
            value={String(field.value)}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <FormControl>
              <SelectTrigger className="flex justify-between border-none text-blue-80 dark:bg-dark-4">
                <SelectValue
                  placeholder={
                    <p className="flex items-center justify-start text-[0.563rem] sm:text-[0.875rem] md:leading-[1.375rem]">
                      {placeholder}
                    </p>
                  }
                />
                {openState[name] ? (
                  <ChevronUp className="mx-2 h-4 w-4 text-white opacity-50" />
                ) : (
                  <ChevronDown className="mx-2 h-4 w-4 text-white opacity-50" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option, index) => {
                const selected = currentSelection === option.label;
                const IconComponent: any = option.icon;

                return (
                  <SelectItem
                    className={`flex items-center justify-between gap-2 bg-light dark:bg-dark-4  ${
                      selected ? "text-blue-80" : "dark:text-light-2"
                    }`}
                    key={index}
                    value={option.label}
                  >
                    <div className="flex flex-row justify-between gap-2 dark:bg-dark-4">
                      {option.icon && (
                        <IconComponent
                          className={`w-4 sm:w-5 ${
                            selected
                              ? "fill-blue-80"
                              : "fill-sc-2 dark:fill-light-2"
                          }`}
                        />
                      )}
                      <p
                        className={`flex items-center text-[0.563rem] sm:text-[0.875rem] md:leading-[1.375rem] ${
                          option.icon
                            ? "ml-2"
                            : `text-base font-semibold capitalize leading-6 ${
                                selected ? "text-blue-80" : "dark:text-light-2"
                              }`
                        }`}
                      >
                        {option.label}
                      </p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="absolute py-2 pl-2 capitalize text-red-80">
            {/* @ts-ignore */}
            {errors?.[name]?.message ? (errors[name].message as string) : null}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SelectController;

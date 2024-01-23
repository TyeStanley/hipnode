import { PostFormValuesType } from "@/constants/posts";

import { Control } from "react-hook-form";

import { ChangeEvent } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface GenericInputProps {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
}

const GenericInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  className,
}: GenericInputProps) => {
  const handleNumericalChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    const intValue = parseInt(value) || 0;
    return (intValue / 100).toFixed(2);
  };

  return (
    <>
      <FormField
        name={name}
        control={control as any}
        render={({ field }) => (
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel className="pb-2.5">{label}</FormLabel>
            <FormControl>
              <Input
                className={`${className} w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
                {...field}
                placeholder={
                  type === "numerical" ? "Add salary..." : placeholder
                }
                type={type}
                onFocus={(e) => {
                  if (type === "numerical") {
                    e.target.placeholder = "00.00";
                  }
                }}
                onBlur={(e) => {
                  if (type === "numerical") {
                    e.target.placeholder = "Add salary...";
                  }
                }}
                onChange={(e) => {
                  if (type === "numerical") {
                    const newValue = handleNumericalChange(e);
                    field.onChange(newValue);
                  }
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage className="py-1 pl-2 capitalize text-red-80" />
          </FormItem>
        )}
      ></FormField>
    </>
  );
};

export default GenericInput;

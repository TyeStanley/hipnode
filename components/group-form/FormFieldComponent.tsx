import { FC } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldComponentProps } from "@/types";

const FormFieldComponent: FC<FormFieldComponentProps> = ({
  control,
  name,
  label,
  placeholder,
  fieldType = "input",
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col gap-2.5">
        <FormLabel>
          {label}
          {(label === "Group Name" || label === "Description") && (
            <span className="text-red">*</span>
          )}
        </FormLabel>
        <FormControl>
          {fieldType === "input" ? (
            <Input
              placeholder={placeholder}
              {...field}
              className="placeholder:regular-12 placeholder:sm:regular-14 h-[2.625rem] rounded-lg border-2 
                border-light-2 py-3 pl-5 pr-2.5 outline-blue placeholder:text-sc-3 dark:border-dark-4 dark:bg-dark-3
                dark:outline-none dark:focus:border-blue sm:h-[2.875rem] sm:bg-light-2"
            />
          ) : (
            <textarea
              className="placeholder:regular-12 placeholder:sm:regular-14 h-[6.875rem] resize-none rounded-lg 
                border-2 border-light-2 py-3 pl-5 pr-2.5 outline-blue placeholder:text-sc-3 dark:border-dark-4 dark:bg-dark-3 
                dark:outline-none dark:focus:border-blue sm:h-36 sm:bg-light-2"
              placeholder={placeholder}
              {...field}
            />
          )}
        </FormControl>
        <FormMessage className="text-red" />
      </FormItem>
    )}
  />
);

export default FormFieldComponent;

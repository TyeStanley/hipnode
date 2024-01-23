import React from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FromFieldProps } from "@/types/posts";
import { Badge } from "@/components/ui/badge";
import { Delete } from "lucide-react";

const CreatePostTags = ({ control, form, contentType }: FromFieldProps) => {
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue.length < 2) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be between 2 and 10 characters.",
        });
      }

      if (tagValue.length > 10) {
        return form.setError("tags", {
          type: "length",
          message: "Tag must be between 1 and 10 characters.",
        });
      }

      if (field.value.includes(tagValue)) {
        return form.setError("tags", {
          type: "duplicate",
          message: "Tag already exists, add another unique tag.",
        });
      }

      if (field.value.length >= 5) {
        return form.setError("tags", {
          type: "limit",
          message: "You can only add up to 5 tags.",
        });
      }

      form.setValue("tags", [...field.value, tagValue]);
      tagInput.value = "";
      form.clearErrors("tags");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = form!
      .getValues("tags")!
      .filter((tag) => tag !== tagToDelete);

    form.setValue("tags", updatedTags);
  };

  return (
    <div className="w-full pb-[1.25rem]">
      <FormField
        name="tags"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex flex-row pb-[0.625rem] leading-[1.375rem] dark:text-light-2 md:py-[0.625rem]  md:text-[0.875rem]">
              {contentType === "Meetup" ? (
                <p>
                  Please tag your meetup (up to 5) - Cyber, Music, Web3, Design,
                  UI/UX ?
                </p>
              ) : (
                <p>
                  Add or change tags (up to 5) so readers know what your story
                  is about
                </p>
              )}
            </FormLabel>
            <FormControl>
              <>
                {field.value!.length > 0 && (
                  <div className="flex-start flex-wrap">
                    {field.value?.map((tag: any) => (
                      <div key={tag} className="flex flex-row gap-2 px-1 py-2">
                        <button
                          className=" text-sc-3 dark:text-light-2"
                          onClick={() => handleDeleteTag(tag)}
                        >
                          <Delete className="h-[1rem] w-[1.5rem]" />
                        </button>
                        <Badge className="flex items-center justify-center  rounded-md border-none  text-base capitalize leading-6 text-yellow-90">
                          #{tag}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                <Input
                  placeholder="Add a tag..."
                  type="text"
                  className="rounded-lg border border-light-2 bg-light px-[1.25rem] py-[0.75rem] text-base outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-light-2"
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
              </>
            </FormControl>
            <FormMessage className="py-1 pl-2 capitalize text-red-80" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CreatePostTags;

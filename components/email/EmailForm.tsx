"use client";

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

import { sendEmail } from "@/lib/actions/email.actions";

import { reportModalTags } from "@/constants";
import { EmailFormProps } from "@/types/posts";

const EmailForm = ({ currentUrl, setOpen, author }: EmailFormProps) => {
  const { toast } = useToast();
  const [selectedComplaintTag, setSelectedComplaintTag] = useState<string>("");

  const handleSubmit = async () => {
    if (selectedComplaintTag === "") {
      toast({
        title: "Please select your complaint",
        variant: "formFieldsFill",
      });
      return;
    }
    const res = await sendEmail({ selectedComplaintTag, currentUrl });
    res
      ? toast({
          title: "Email sent Successfully",
          variant: "formFieldsFill",
        })
      : toast({
          title: "Oops! Something went wrong. Please try again later.",
          variant: "destructive",
        });
  };

  const handleTagClick = (tag: string) => {
    setSelectedComplaintTag((prevTag) => (prevTag === tag ? "" : tag));
  };

  return (
    <section className="bg-light_dark-4 flex w-full max-w-[30rem] flex-col gap-[1.875rem] rounded-2xl p-5 md:p-[1.875rem]">
      <header>
        <h2 className="text-sc-2_light-2 semibold-18">
          Why are you reporting this post by @{author}?
        </h2>
      </header>
      <div className="flex flex-wrap gap-5">
        {reportModalTags.map((tag) => {
          const isTagCurrentlySelected = tag === selectedComplaintTag;
          const bgColor = isTagCurrentlySelected
            ? "bg-red-80"
            : "bg-light-3_dark-3";
          return (
            <button
              type="button"
              aria-label={`Report tag ${tag}`}
              key={tag}
              className={`${bgColor} flex cursor-pointer rounded-full border border-sc-5 px-5 py-2.5 hover:bg-red-80 dark:border-sc-2`}
              onClick={() => handleTagClick(tag)}
            >
              <span className="text-sc-2_light-2 regular-12">{tag}</span>
            </button>
          );
        })}
      </div>
      <footer className="flex gap-5">
        <DialogClose>
          <button
            onClick={handleSubmit}
            className="flex h-[2.875rem] w-40 items-center justify-center rounded-md bg-blue"
            disabled={selectedComplaintTag === ""}
          >
            <p className="semibold-18 text-light">Submit</p>
          </button>
        </DialogClose>
        <DialogClose>
          <button className="base-18 text-sc-3">Cancel</button>
        </DialogClose>
      </footer>
    </section>
  );
};

export default EmailForm;

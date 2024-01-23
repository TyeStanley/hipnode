"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";

import CustomButton from "../CustomButton";
import ImageWithCaption from "./shared-components/ImageWithCaption";
import { Input } from "@/components/ui/input";
import { CreatePostInputProps } from "@/types/homepage";

const CreatePostInput = ({ userImage }: CreatePostInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (): void => {
    setInputValue("");
  };

  return (
    <section className="flex w-full items-center rounded-2xl bg-light p-[0.875rem] dark:bg-dark-3 md:p-[1.25rem]">
      <div className="flex h-[1.8rem] w-[1.8rem] shrink-0 items-center justify-center rounded-full md:h-[2.5rem] md:w-[2.5rem]">
        <ImageWithCaption
          imageSrc={userImage}
          imageWidth={40}
          imageHeight={40}
          className="h-[1.8rem] w-[1.8rem] shrink-0 rounded-full md:h-[2.5rem] md:w-[2.5rem]"
          imageAlt="User Image"
        />
      </div>
      <div className="flex grow px-[0.625rem] dark:bg-dark-3 md:px-[1.25rem]">
        <Input
          type="text"
          placeholder="Share what is going on in your mind..."
          className="rounded-md bg-sc-6 px-[0.625rem] py-[0.5rem] text-[0.75rem] font-normal leading-[1.125rem] text-sc-4 focus:outline-none focus:ring-0 dark:bg-dark-4 md:p-[0.75rem] md:text-[0.875rem] md:leading-[1.375rem]"
          onChange={handleInputChange}
        />
      </div>
      <Link href={`/posts/create-post?title=${encodeURIComponent(inputValue)}`}>
        <CustomButton
          label="Create Post"
          className="w-auto shrink-0 truncate rounded-[0.375rem] bg-red-80 px-[0.875rem] py-[0.55rem] text-[0.75rem] font-medium leading-[1.25rem] text-light dark:text-sc-6 md:px-[1rem] md:py-[0.65rem] md:text-[0.875rem]"
          onClick={handleButtonClick}
        />
      </Link>
    </section>
  );
};

export default CreatePostInput;

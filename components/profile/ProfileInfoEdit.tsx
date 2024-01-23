"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { updateProfileInfo } from "@/lib/actions/user.actions";

const ProfileInfoEdit = ({
  text,
  field,
  isLoggedInUser,
  className,
}: {
  text: string;
  field: string;
  isLoggedInUser: boolean;
  className?: string;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditting, setIsEditting] = useState(false);
  const [inputText, setInputText] = useState<string>(text);

  const updateUser = async () => {
    if (inputText === "" || inputText === text) {
      setIsEditting(false);
      return;
    }

    const updatedUser = await updateProfileInfo({
      [field]: inputText,
    });

    if (updatedUser) {
      setIsEditting(false);
    }
  };

  useEffect(() => {
    if (isEditting && inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditting]);

  const handleSubmit = () => {
    updateUser();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && isEditting) {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    updateUser();
  };

  if (!isLoggedInUser)
    <p
      className={`${className} text-center text-base leading-6 text-sc-2 dark:text-sc-3`}
    >
      {text}
    </p>;

  return (
    <div className="group relative flex w-full justify-center">
      {isEditting ? (
        <>
          <textarea
            ref={inputRef}
            className={`${className} ${
              field === "bio" ? "h-auto w-[95%]" : "h-6"
            } resize-none rounded-lg border border-red-80 bg-sc-6 text-center text-base leading-6 text-sc-2 outline-none dark:bg-dark-4 dark:text-sc-3`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />

          <button
            className={`absolute right-[-15px] top-[2px] text-lg text-red-80`}
            onClick={handleSubmit}
          >
            <IoMdCheckmarkCircle />
          </button>
        </>
      ) : (
        <>
          <p
            className={`${className} w-full cursor-pointer text-center text-base leading-6 text-sc-2 dark:text-sc-3`}
            onClick={() => setIsEditting(true)}
          >
            {inputText}
          </p>

          <button
            className={`absolute right-[-15px] top-[2px] hidden text-sc-4 group-hover:block`}
            onClick={() => setIsEditting(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileInfoEdit;

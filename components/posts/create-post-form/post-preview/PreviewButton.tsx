import OutlineIcon from "@/components/icons/outline-icons";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

type PreviewButtonProps = {
  onSubmitPreview: () => void;
};

const PreviewButton = ({ onSubmitPreview }: PreviewButtonProps) => (
  <DialogTrigger asChild>
    <button
      type="button"
      onClick={() => onSubmitPreview()}
      className="flex cursor-pointer items-center gap-[0.625rem] text-[0.875rem] dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]"
    >
      <OutlineIcon.View />
      <span>Preview</span>
    </button>
  </DialogTrigger>
);

export default PreviewButton;

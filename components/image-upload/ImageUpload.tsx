import React, { useRef, useState } from "react";
import { ImageUploadProps } from "@/types/upload-image";
import OutlineIcon from "../icons/outline-icons";
import FillIcon from "@/components/icons/fill-icons";

const ImageUpload = ({ onFileSelected, label }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
      onFileSelected(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".png,.jpeg,.jpg,.mp3"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div
        className="cursor-pointer rounded-md text-[0.8rem] dark:bg-dark-4 dark:text-light-2"
        onClick={handleUploadClick}
      >
        <div className="flex h-10 w-fit cursor-pointer flex-row items-center rounded-md   px-[0.8rem] py-[0.25rem] dark:bg-dark-4">
          {label === "Cover Image" ? (
            <OutlineIcon.ImageIcon
              className={`${
                fileSelected
                  ? "stroke-blue-80"
                  : "stroke-dark-4 dark:stroke-light-2"
              } `}
            />
          ) : (
            <FillIcon.Podcasts
              className={`${
                fileSelected ? "fill-blue-80" : "fill-dark-4 dark:fill-light-2"
              } `}
            />
          )}

          <p
            className={`pl-[0.625rem] text-[0.563rem] sm:text-[0.875rem] md:leading-[1.375rem] ${
              fileSelected ? "text-blue-80" : "text-sc-2 dark:text-light-2"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

import { ChangeEvent } from "react";

export interface ImageUploadProps {
  bucketName?: string;
  folderName?: string;
  onFileSelected: (file: File) => void;
  label?: string;
}

export interface UseImageUploadReturn {
  file: File | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

export type InputChangeEvent<T = HTMLInputElement> = ChangeEvent<T>;

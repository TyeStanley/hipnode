"use client";

import React, { createContext, useContext, useState } from "react";

import { PostFormValuesType } from "@/constants/posts";
import { useUser } from "@clerk/nextjs";
import { CreatePostContextType } from "@/types/posts";

const CreatePostContext = createContext<CreatePostContextType | undefined>(
  undefined
);

export function CreatePostProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [previewValues, setPreviewValues] = useState<PostFormValuesType | null>(
    null
  );
  const [clearEditor, setClearEditor] = useState<boolean>(false);
  const [podcastPreviewUrl, setPodcastPreviewUrl] = useState<string | null>(
    null
  );

  const user = useUser();

  const contextValue: CreatePostContextType = {
    imagePreviewUrl,
    setImagePreviewUrl,
    previewValues,
    setPreviewValues,
    clearEditor,
    setClearEditor,
    podcastPreviewUrl,
    setPodcastPreviewUrl,
    username: user?.user?.username || "Christopher",
  };

  return (
    <CreatePostContext.Provider value={contextValue}>
      {children}
    </CreatePostContext.Provider>
  );
}

export function useCreatePostContext() {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error(
      "useCreatePostContext must be used within a CreatePostProvider"
    );
  }
  return context;
}

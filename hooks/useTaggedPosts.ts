"use client";
import { useEffect, useState, useTransition } from "react";

import { PostCardTypes } from "@/types";

const useTaggedPosts = <T extends { id: number }>(
  tag: string | null,
  data: T[]
) => {
  const [taggedPosts, setTaggedPosts] = useState<T[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (tag) {
      const tagged = data.filter((item) => {
        const post = (item as unknown as PostCardTypes) ?? {};
        return tag && post?.tagNames?.includes(tag);
      });
      startTransition(() => setTaggedPosts(tagged));
    } else {
      setTaggedPosts(data);
    }
  }, [tag, data]);

  return { taggedPosts, isPending };
};

export default useTaggedPosts;

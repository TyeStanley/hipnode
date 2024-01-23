"use client";

import { motion } from "framer-motion";

import { PostCard } from ".";
import { PostCardRenderProps } from "@/types/posts";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PostCardRender = ({
  postData,
  setTagged,
  authorId,
}: PostCardRenderProps) => {
  return (
    <>
      {postData.map((post, index) => {
        const adjustedIndex = index % 10;
        return (
          <motion.div
            key={post.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: adjustedIndex * 0.1,
              ease: "easeInOut",
              duration: 0.5,
            }}
            viewport={{ amount: 0 }}
          >
            <PostCard
              post={post}
              setTagged={setTagged}
              userIdFromParams={authorId}
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default PostCardRender;

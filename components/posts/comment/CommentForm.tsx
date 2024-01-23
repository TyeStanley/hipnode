"use client";

import { useState, KeyboardEvent, useTransition } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { addCommentOrReply, updateComment } from "@/lib/actions/post.action";
import { CommentFormProps } from "@/types/posts";

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment must be at least 1 characters.",
  }),
});

type EmojiData = {
  native: string;
};

const CommentForm = ({
  className,
  parentId,
  value = ``,
  isEditing = false,
  commentId,
  setIsEditing,
  setIsReplying,
  postId,
  postHeading,
  isReplying,
}: CommentFormProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const path = usePathname();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing) {
        await updateComment(Number(commentId), values.comment, path);
        startTransition(() => {
          setIsEditing?.(false);
        });
      } else {
        await addCommentOrReply(
          postId,
          values.comment,
          Number(parentId) || null,
          path,
          postHeading
        );

        startTransition(() => {
          setIsReplying?.(false);
        });
      }
    } catch (error) {
      console.error("Error processing comment:", error);
    } finally {
      form.reset();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const handleEmojiSelect = (emoji: EmojiData) => {
    const emojiNative = emoji.native;
    const currentValue = form.getValues("comment");
    const updatedValue = currentValue + emojiNative;
    form.setValue("comment", updatedValue);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        {isPending && isEditing && (
          <p className="absolute top-[-2rem] text-red-80">Editing....</p>
        )}
        {isPending && !isEditing && (
          <p
            className={`absolute animate-pulse text-red-80 ${
              isReplying ? "top-[-2rem]" : "left-3.5 translate-y-[-2rem]"
            }`}
          >
            {`${isReplying ? "Replying ..." : "Commenting ..."}`}
          </p>
        )}
        <Form {...form}>
          <form className={className}>
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <>
                          {isReplying && (
                            <div className="animate-pulse px-3 pt-3">
                              <hr />
                            </div>
                          )}

                          <TextareaAutosize
                            maxRows={5}
                            {...field}
                            onKeyDown={handleKeyDown}
                            placeholder={
                              isReplying
                                ? "Replying to comment... 🔥"
                                : "Say something cool.... 🔥"
                            }
                            className="flex h-[45px] w-full resize-none items-center whitespace-pre-line bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5 focus:outline-none"
                          />
                        </>
                      </FormControl>
                      <FormMessage className="absolute bottom-[-2rem] py-1 pl-2 capitalize text-red-80" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative flex h-6 w-6 items-center justify-center">
                <Image
                  src="/smiley.svg"
                  alt="smiley"
                  width={24}
                  height={24}
                  className="rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute right-0 top-[2.5rem] z-20 h-[2rem]">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      onClickOutside={() => setShowEmojiPicker(false)}
                      perLine={12}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CommentForm;

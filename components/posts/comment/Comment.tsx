"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  deleteCommentOrReply,
  toggleLikeComment,
} from "@/lib/actions/post.action";
import {
  AvatarJoinLine,
  AvatarJoinStraight,
  CommentActions,
  CommentHeader,
} from ".";
import CommentForm from "./CommentForm";
import { getRepliesToComments as getReplies } from "@/utils/index";
import { CommentAuthorProps } from "@/types/posts";

import { Record } from "@prisma/client/runtime/library";
import ChildComments from "./ChildComments";

const Comment = ({
  content,
  createdAt,
  isEdited,
  author,
  id,
  postId,
  likedByCurrentUser,
  likeCount,
  userId,
  depth = 0,
  isLastComment,
  postComments,
  postHeading,
}: CommentAuthorProps & {
  postComments: Record<string, CommentAuthorProps[]>;
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [totalLikes, setTotalLikes] = useState(likeCount);
  const path = usePathname();
  const canReply = depth < 1;
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      startTransition(() => {
        deleteCommentOrReply(id, path);
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleLikeHandler = async () => {
    if (!userId) return;
    setIsLiked((previous) => !previous);
    setTotalLikes((previous) => (isLiked ? previous - 1 : previous + 1));
    try {
      await toggleLikeComment(id, author?.id, postHeading, path);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const getRepliesToComments = (parentId: string) =>
    getReplies(postComments, parentId);

  const childComments = getRepliesToComments(String(id)) ?? [];

  const renderCommentForm = (isReplying: boolean, isEditing: boolean) => {
    return (
      <CommentForm
        parentId={String(id)}
        isReplying={isReplying}
        isEditing={isEditing}
        commentId={String(id)}
        value={isEditing ? content : ""}
        setIsReplying={setIsReplying}
        setIsEditing={setIsEditing}
        postId={postId}
        postHeading={postHeading}
      />
    );
  };

  return (
    <>
      <section className="flex py-[1.25rem] pr-[1.25rem]">
        <div className="flex flex-col">
          <div className="flex items-start justify-center px-[1.25rem]">
            <div className="h-10 w-10">
              <Image
                src={author?.picture ?? "/images/default-avatar.png"}
                alt="comment author image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          {childComments.length > 0 && !showChildren && <AvatarJoinLine />}
        </div>
        <div className="grow">
          {depth > 0 && !isLastComment && <AvatarJoinStraight />}
        </div>
        <div className="relative flex w-full flex-col gap-[1rem]">
          <div className="relative flex grow flex-col rounded-2xl border border-solid border-sc-5 p-[0.938rem]">
            <CommentHeader
              username={author?.username ?? "The Unknown Soldier"}
              createdAt={createdAt}
              isEdited={isEdited}
              totalLikes={totalLikes}
            />
            <div className="flex flex-wrap text-base leading-6 text-sc-3">
              {content}
            </div>
            {isReplying && renderCommentForm(true, false)}
            {isEditing && renderCommentForm(false, true)}
          </div>
          {isPending && (
            <p className="absolute left-3.5 flex h-[2rem] translate-y-[-2rem] animate-pulse justify-center text-red-80">
              {`Deleting comment ...`}
            </p>
          )}

          {isEditing ? (
            <p
              className="flex animate-pulse cursor-pointer justify-between pr-[0.5rem] text-red-80"
              onClick={() => setIsEditing(false)}
            >
              Cancel edit
            </p>
          ) : (
            <CommentActions
              userId={userId}
              authorId={author?.id}
              canReply={canReply}
              isReplying={isReplying}
              hasChildComments={childComments.length > 0}
              onReplyClick={() => setIsReplying((previous) => !previous)}
              onDeleteClick={handleDelete}
              onEditClick={() => setIsEditing((previous) => !previous)}
              onShowChildrenClick={() =>
                setShowChildren((previous) => !previous)
              }
              showChildren={showChildren}
              onToggleLike={toggleLikeHandler}
              isLiked={isLiked}
            />
          )}
        </div>
      </section>

      {childComments.length > 0 && !showChildren && (
        <ChildComments
          childComments={childComments}
          depth={depth}
          isLastComment={isLastComment}
          postComments={postComments}
          postHeading={postHeading}
        />
      )}
    </>
  );
};

export default Comment;

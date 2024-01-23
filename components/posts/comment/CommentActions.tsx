import { CommentActionsProps } from "@/types/posts";
import Reply from "@/components/icons/fill-icons/Reply";
import CommentActionPopover from "../../action-popover/CommentActionPopover";
import HeartComment from "@/components/icons/fill-icons/HeartComment";

const CommentActions = ({
  onReplyClick,
  onDeleteClick,
  onEditClick,
  onShowChildrenClick,
  isReplying,
  canReply,
  hasChildComments,
  showChildren,
  onToggleLike,
  isLiked,
  userId,
  authorId,
}: CommentActionsProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center justify-start gap-4">
        <div onClick={onToggleLike}>
          <HeartComment className="" isLiked={isLiked} isAComment={true} />
        </div>
        {canReply && (
          <div
            className="flex items-center justify-center"
            onClick={onReplyClick}
          >
            <Reply className="text-sc-3" isReplying={isReplying} />
          </div>
        )}
        {userId === authorId && (
          <CommentActionPopover
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            label="Comment"
            positionStyles="translate-x-[6rem] translate-y-[-0.2rem]"
            isComment={true}
          />
        )}
      </div>

      <div className="flex pr-[0.5rem]">
        {hasChildComments && (
          <div onClick={onShowChildrenClick}>
            <p className="cursor-pointer text-sc-3">
              {showChildren ? <p>See replies</p> : <p>Hide replies</p>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentActions;

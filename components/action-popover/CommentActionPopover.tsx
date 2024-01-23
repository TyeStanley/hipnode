import ActionPopover from "./ActionPopover";

interface CommentActionPopoverProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  label: string;
  positionStyles?: string;
  isComment?: boolean;
}

const CommentActionPopover = ({
  onEditClick,
  onDeleteClick,
  label,
  positionStyles,
  isComment,
}: CommentActionPopoverProps) => {
  return (
    <ActionPopover
      onEditClick={onEditClick}
      deletePost={onDeleteClick}
      label={label}
      positionStyles={positionStyles}
      isComment={isComment}
    />
  );
};

export default CommentActionPopover;

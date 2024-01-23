import { ChildCommentsProps } from "@/types/posts";
import { Comment } from ".";

const ChildComments = ({
  childComments,
  depth,
  postComments,
  postHeading,
}: ChildCommentsProps) => {
  return (
    <div className="flex grow flex-col pl-[2.25rem]">
      {childComments.map((comment, index) => (
        <div key={comment.id} className="mt-2 flex flex-col">
          <Comment
            {...comment}
            depth={depth + 1}
            isLastComment={index === childComments.length - 1}
            postComments={postComments}
            postHeading={postHeading}
          />
        </div>
      ))}
    </div>
  );
};

export default ChildComments;

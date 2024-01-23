import OutlineIcon from "@/components/icons/outline-icons";
import PostPreview from "@/components/posts/create-post-form/post-preview/PostPreview";
import { WritePreviewToggleProps } from "@/types/lexical-editor";

const LexicalWritePreviewToggle = ({
  autoFocus,
  setAutoFocus,
  htmlString,
  onSubmitPreview,
}: WritePreviewToggleProps) => {
  return (
    <div className="flex justify-between gap-[1.25rem] md:gap-[1.875rem]">
      <div
        onClick={() => setAutoFocus(!autoFocus)}
        className="flex cursor-pointer items-center gap-[0.625rem] text-blue-80"
      >
        <OutlineIcon.Edit
          className={autoFocus ? "fill-blue-80" : "fill-sc-3 dark:fill-light-2"}
        />
        <p
          className={`${
            autoFocus ? "text-blue-80" : "text-sc-3 dark:text-light-2"
          } text-[0.875rem]`}
        >
          Write
        </p>
      </div>
      <PostPreview htmlString={htmlString} onSubmitPreview={onSubmitPreview} />
    </div>
  );
};

export default LexicalWritePreviewToggle;

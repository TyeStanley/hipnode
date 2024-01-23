import OutlineIcon from "@/components/icons/outline-icons";
import { ShareUrlLinkProps } from "@/types/posts";

const ShareUrlLink = ({ currentUrl, handleCopyClick }: ShareUrlLinkProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="semibold-12 text-sc-3 dark:text-sc-4">Or share with link</p>
      <div className="bg-light-2_dark-4 flex h-[3.3125rem] w-full items-center justify-between gap-7 rounded-2xl px-4">
        <p className="semibold-14 line-clamp-1 text-sc-4 dark:text-sc-5">
          {currentUrl}
        </p>
        <div className="flex cursor-pointer" onClick={handleCopyClick}>
          <OutlineIcon.Copy />
        </div>
      </div>
    </div>
  );
};

export default ShareUrlLink;

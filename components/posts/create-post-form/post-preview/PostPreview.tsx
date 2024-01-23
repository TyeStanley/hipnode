import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PostPreviewProps } from "@/types/posts";
import { useCreatePostContext } from "@/app/contexts/CreatePostContext";
import { formatSalary } from "@/utils";
import {
  HtmlContent,
  ImagePreview,
  PreviewButton,
  PreviewDialogHeader,
  PreviewInterview,
  PreviewMeetup,
  PreviewTags,
} from ".";
import PodcastImagePreview from "./PodcastImagePreview";

const PostPreview = ({ htmlString, onSubmitPreview }: PostPreviewProps) => {
  const { imagePreviewUrl, previewValues, username } = useCreatePostContext();
  const interviewSalary =
    previewValues?.salary &&
    previewValues?.salaryPeriod &&
    formatSalary(previewValues?.salary, previewValues?.salaryPeriod);

  return (
    <Dialog>
      <PreviewButton onSubmitPreview={onSubmitPreview} />
      <DialogContent className="max-h-[50rem] w-full max-w-[49rem] gap-10 overflow-scroll border-0 px-[1.25rem] dark:bg-dark-3 ">
        <PreviewDialogHeader />
        <ImagePreview
          imagePreviewUrl={imagePreviewUrl}
          previewValues={previewValues}
        />

        <PodcastImagePreview
          previewValues={previewValues}
          username={username}
          imagePreviewUrl={imagePreviewUrl}
        />
        <div className="flex gap-6">
          <p
            className={`mt-3 text-lg text-sc-5 ${
              previewValues?.contentType === "Podcast" && "hidden"
            }`}
          >
            H1
          </p>
          <div className="flex w-full flex-col gap-5">
            <DialogHeader>
              <DialogTitle className="flex flex-row justify-start text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2 md:text-[1.625rem] md:font-normal md:leading-[2.375rem]">
                {previewValues?.heading || (
                  <p className="animate-pulse text-sc-2 dark:text-light-2">
                    Your title here ....
                  </p>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="flex w-full justify-between">
              <PreviewMeetup previewValues={previewValues} />
              <PreviewInterview
                previewValues={previewValues}
                interviewSalary={interviewSalary}
              />
              <PreviewTags previewValues={previewValues} />
            </div>
            <HtmlContent htmlString={htmlString} />
          </div>
        </div>
        {previewValues?.contentType === "Interview" && <div>Interview</div>}
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;

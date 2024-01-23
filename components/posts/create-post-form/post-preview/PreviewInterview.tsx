import { InterviewCardInfo } from "@/components/interview-components";
import { PreviewInterviewProps } from "@/types/posts";

const PreviewInterview = ({
  previewValues,
  interviewSalary,
}: PreviewInterviewProps) => (
  <>
    {previewValues?.contentType === "Interview" && (
      <InterviewCardInfo
        interviewSalary={interviewSalary || ""}
        updates={previewValues?.updates}
        websiteLink={previewValues?.websiteLink || ""}
      />
    )}
  </>
);

export default PreviewInterview;

import { PreviewProps } from "@/types/posts";

const PreviewMeetup = ({ previewValues }: PreviewProps) => (
  <>
    {previewValues?.contentType === "Meetup" && (
      <div className="flex flex-col gap-2">
        <p className="semibold-18 text-sc-2 dark:text-light-2">
          Email:{" "}
          <span className="text-sc-4">{previewValues?.contactEmail}</span>
        </p>
        <p className="semibold-18 text-sc-2 dark:text-light-2">
          Contact Number:{" "}
          <span className="text-sc-4">{previewValues?.contactNumber}</span>
        </p>
        <p className="semibold-18 text-sc-2 dark:text-light-2">
          Location: <span className="text-sc-4">{previewValues?.location}</span>
        </p>
      </div>
    )}
  </>
);

export default PreviewMeetup;

import { PreviewProps } from "@/types/posts";

const PreviewTags = ({ previewValues }: PreviewProps) => (
  <div
    className={`flex flex-wrap  justify-start gap-6 ${
      previewValues?.contentType === "Podcast" && "hidden"
    }`}
  >
    {previewValues?.tags?.length !== 0 ? (
      <ul className="list-inside list-disc">
        {previewValues?.tags?.map((tag: string) => (
          <li
            key={tag}
            className="text-base font-normal leading-6 text-yellow-90"
          >
            #{tag}
          </li>
        ))}
      </ul>
    ) : (
      <ul className="list-inside list-disc">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="animate-pulse text-base font-normal leading-6 text-yellow-90"
          >
            {`#tag ${index + 1}`}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default PreviewTags;

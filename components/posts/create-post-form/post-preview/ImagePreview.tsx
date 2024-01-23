import Image from "next/image";
import { ImagePreviewProps } from "@/types/posts";
import MediaPlaceholder from "./MediaPlaceholder";

const ImagePreview = ({
  previewValues,
  imagePreviewUrl,
}: ImagePreviewProps) => (
  <div
    className={`${
      previewValues?.contentType === "Podcast"
        ? "hidden"
        : "flex grow items-center justify-center"
    }`}
  >
    {imagePreviewUrl ? (
      <Image
        src={imagePreviewUrl}
        height={125}
        width={125}
        alt="image"
        className="h-[17rem] w-full rounded-t-md border-x-2 border-t-2 object-cover dark:border-sc-3"
      />
    ) : (
      <MediaPlaceholder />
    )}
  </div>
);

export default ImagePreview;

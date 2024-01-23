import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload/ImageUpload";
import { PostFormValuesType } from "@/constants/posts";

export type PodcastUploadProps = {
  control: Control<PostFormValuesType>;
  setPodcastPreviewUrl: (url: string) => void;
  setPodcastToUpload: (file: File) => void;
};

const PodcastUpload = ({
  control,
  setPodcastPreviewUrl,
  setPodcastToUpload,
}: PodcastUploadProps) => {
  const handlePodcastUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      setPodcastPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setPodcastToUpload(file);
  };

  return (
    <FormField
      control={control}
      name="podcast"
      render={() => (
        <FormItem>
          <FormControl>
            <ImageUpload onFileSelected={handlePodcastUpload} label="Podcast" />
          </FormControl>
          <FormMessage className="capitalize text-red-80" />
        </FormItem>
      )}
    />
  );
};

export default PodcastUpload;

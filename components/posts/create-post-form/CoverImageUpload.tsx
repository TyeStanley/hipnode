import ImageUpload from "@/components/image-upload/ImageUpload";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CoverImageUploadProps } from "@/types/posts";

const CoverImageUpload = ({
  control,
  setImagePreviewUrl,
  setImageToUpload,
}: CoverImageUploadProps) => {
  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setImageToUpload(file);
  };

  return (
    <FormField
      control={control}
      name="image"
      render={() => (
        <FormItem>
          <FormControl>
            <ImageUpload
              onFileSelected={handleFileSelected}
              label="Cover Image"
            />
          </FormControl>
          <FormMessage className="capitalize text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default CoverImageUpload;

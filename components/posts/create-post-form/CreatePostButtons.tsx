import CustomButton from "@/components/CustomButton";

interface CreatePostButtonsProps {
  mediaId: number | null;
}

const CreatePostButtons = ({ mediaId }: CreatePostButtonsProps) => (
  <div className="flex flex-row items-center gap-4">
    <CustomButton
      type="submit"
      label={mediaId ? "Update" : "Publish"}
      className="rounded-md bg-blue px-[2.5rem] py-[0.625rem] text-[0.875rem] text-blue-10 md:text-base md:leading-6"
    />
    <CustomButton
      type="button"
      label="Cancel"
      className="rounded-md bg-dark-3 px-[2.5rem] py-[0.625rem] text-[0.875rem] text-sc-3 md:text-base md:leading-6"
    />
  </div>
);

export default CreatePostButtons;

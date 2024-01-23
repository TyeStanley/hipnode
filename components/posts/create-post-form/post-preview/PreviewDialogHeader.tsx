import OutlineIcon from "@/components/icons/outline-icons";
import { DialogClose } from "@radix-ui/react-dialog";

const PreviewDialogHeader = () => (
  <div className="flex gap-[1.875rem]">
    <DialogClose>
      <OutlineIcon.ArrowLeft />
    </DialogClose>
    <div className="flex items-center gap-2.5">
      <OutlineIcon.View className="fill-blue-80" />
      <p className="pr-4 text-blue-80">Preview</p>
    </div>
  </div>
);

export default PreviewDialogHeader;

import { DialogContent, DialogClose } from "@/components/ui/dialog";
import CustomButton from "../CustomButton";
import CodeOfConductList from "./CodeOfConductList";

const ModalContent = () => {
  return (
    <DialogContent className="bg-light_dark-4 flex flex-col rounded-2xl border-0">
      <h2 className="text-sc-1_light-2 text-3xl font-bold">Code Of Conduct</h2>
      <CodeOfConductList />
      <DialogClose className="flex justify-center">
        <CustomButton
          className="rounded-md bg-red-80 px-4 py-2 text-sc-6"
          label="Close"
        />
      </DialogClose>
    </DialogContent>
  );
};

export default ModalContent;

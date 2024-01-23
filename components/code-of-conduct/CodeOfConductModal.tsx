"use client";

import { Dialog } from "@/components/ui/dialog";
import { ModalTrigger, ModalContent } from ".";

const CodeOfConductModal = ({
  isCreateFormPage = false,
}: {
  isCreateFormPage?: boolean;
}) => {
  return (
    <Dialog>
      <ModalTrigger isCreateFormPage={isCreateFormPage} />
      <ModalContent />
    </Dialog>
  );
};

export default CodeOfConductModal;

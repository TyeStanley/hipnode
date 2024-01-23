import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FillIcon from "@/components/icons/fill-icons";
import LeaveIcon from "@/components/icons/fill-icons/LeaveIcon";
import GroupLeaveButton from "@/components/group-detail-page/group-detail-post/GroupLeaveButton";

const GroupLeaveModal = ({
  userId,
  groupId,
}: {
  userId: number;
  groupId: number;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="semibold-12 flex items-center gap-2 rounded bg-light-2 p-2 text-sc-3 
            hover:opacity-80 hover:transition-opacity dark:bg-dark-4"
        >
          <FillIcon className="fill-sc-3">
            <LeaveIcon />
          </FillIcon>
          Leave
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="inline-flex h-[10.125rem] w-[20.875rem] flex-col items-start gap-[1.88rem] rounded-2xl border-none bg-light 
        px-[0.9375rem] py-[1.88rem] shadow-none dark:bg-dark-4 sm:w-[22.75rem] sm:px-[1.88rem]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="semibold-18 text-center text-sc-2 dark:text-light-2">
            Are You Sure to Leave From This Group?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-5">
          <GroupLeaveButton userId={userId} groupId={groupId} />
          <AlertDialogCancel className="m-0 border-none p-0 py-[0.62rem] hover:opacity-80 hover:transition-opacity dark:bg-dark-4">
            <span className="regular-18 text-sc-3">Cancel</span>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GroupLeaveModal;

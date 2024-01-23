import { PopoverTrigger } from "@/components/ui/popover";
import FillIcon from "../icons/fill-icons";

const NotificationPopoverTrigger = ({
  isNotificationPage,
  showBadge,
}: {
  isNotificationPage: boolean;
  showBadge: boolean | undefined;
}) => {
  return (
    <>
      {isNotificationPage ? (
        <div className="rounded-lg bg-red p-2">
          <FillIcon.Notification className="cursor-not-allowed fill-sc-6" />
        </div>
      ) : (
        <PopoverTrigger asChild>
          <div className="cursor-pointer xl:rounded-lg xl:bg-light-2 xl:p-2 dark:xl:bg-dark-4">
            <FillIcon.Notification
              className="fill-sc-4 dark:fill-sc-6"
              notification={showBadge}
            />
          </div>
        </PopoverTrigger>
      )}
    </>
  );
};

export default NotificationPopoverTrigger;

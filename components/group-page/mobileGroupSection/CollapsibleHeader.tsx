import { CollapsibleTrigger } from "@/components/ui/collapsible";
import OutlineIcon from "@/components/icons/outline-icons";
import { Button } from "@/components/ui/button";
import { fastestGrowingSectionHeading } from "@/constants";

const CollapsibleHeader = ({ isOpen }: { isOpen: boolean }) => {
  const { icon: Icon, title } = fastestGrowingSectionHeading;

  return (
    <div className="flex flex-row justify-between rounded-[0.625rem] bg-yellow-10 p-[0.62rem]">
      <div className="flex flex-col">
        <div className="flex flex-row gap-[0.38rem]">
          <Icon />
          <h6 className="semibold-16 text-sc-2">{title}</h6>
        </div>
        <p className="regular-10 text-sc-3">
          List updated daily at midnight PST.
        </p>
      </div>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`w-9 ${isOpen ? "rotate-180" : "rotate-0"} p-0 transition`}
        >
          <OutlineIcon.ArrowLargeDown className="stroke-sc-2 dark:stroke-sc-2" />
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
  );
};

export default CollapsibleHeader;

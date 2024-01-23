"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OutlineIcon from "@/components/icons/outline-icons";
import { TrashIcon } from "@/components/icons/outline-icons/Icon";
import { deleteGroup } from "@/lib/actions/group.actions";
import { useToast } from "@/components/ui/use-toast";

const MoreButton = ({ groupId }: { groupId: number }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup({ groupId, path: "/group" });

      router.push("/group");
      toast({
        description: "Successfully deleted group :)",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to delete a group, error: ", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer"
          src="/More-Vertical.svg"
          width={16}
          height={16}
          alt="More button"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="semibold-14 flex flex-col gap-2.5 rounded-[0.625rem] border border-sc-5 bg-light-2 p-5 shadow-none dark:border-sc-2 dark:bg-dark-4"
        side="bottom"
        sideOffset={22}
      >
        <DropdownMenuItem className="flex cursor-pointer gap-2.5 text-sc-2 dark:text-light-2">
          <OutlineIcon.Edit />
          Edit Group Info
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer gap-2.5 text-red dark:text-red-70"
          onSelect={handleDeleteGroup}
        >
          <OutlineIcon className="fill-none">
            <TrashIcon />
          </OutlineIcon>
          Delete Group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;

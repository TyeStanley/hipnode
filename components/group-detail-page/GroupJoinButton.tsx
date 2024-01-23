"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import OutlineIcon from "../icons/outline-icons";
import { joinGroup } from "@/lib/actions/group.actions";
import { toast } from "../ui/use-toast";

const GroupJoinButton = ({ groupId }: { groupId: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinGroup = async () => {
    try {
      setIsLoading(true);
      await joinGroup(groupId);
      toast({
        description: "Successfully join to group :)",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to join a group, error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleJoinGroup}
      className="semibold-12 flex items-center gap-2 rounded bg-light-2 p-2 text-sc-3 
            hover:opacity-80 hover:transition-opacity dark:bg-dark-4"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <OutlineIcon.ArrowRight className="stroke-sc-3" />
      )}
      Join
    </Button>
  );
};

export default GroupJoinButton;

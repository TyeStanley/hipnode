"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { deletePost as deletePostAction } from "@/lib/actions/post.action";
import { deletePodcast as deletePodcastAction } from "@/lib/actions/podcast.actions";
import ActionPopover from "./ActionPopover";
import { deleteMeetupAction } from "@/lib/actions/meetup.actions";
import { deleteInterviewAction } from "@/lib/actions/interview.actions";

interface PostActionPopoverProps {
  mediaId: number;
  label: string;
  positionStyles?: string;
}

const MediaEditActionPopover = ({
  mediaId,
  label,
  positionStyles,
}: PostActionPopoverProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const onEditClick = () => {
    router.push(
      `/posts/create-post?media=${label.toLocaleLowerCase()}&&id=${mediaId}`
    );
  };

  const deletePost = async () => {
    toast({
      title: `${label} deleted successfully}`,
      variant: "formFieldsFill",
    });

    try {
      switch (label) {
        case "Post":
          await deletePostAction(mediaId);
          break;
        case "Podcast":
          await deletePodcastAction(mediaId);
          break;
        case "Interview":
          await deleteInterviewAction(mediaId);
          break;
        case "Meetup":
          await deleteMeetupAction(mediaId);
          break;
        default:
          console.error("Unhandled label:", label);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <ActionPopover
      onEditClick={onEditClick}
      deletePost={deletePost}
      label={label}
      positionStyles={positionStyles}
    />
  );
};

export default MediaEditActionPopover;

import { InterviewProps } from "@/types/interview.index";
import { MeetUpExtended } from "@/types/meetups.index";
import { Podcast } from "@prisma/client";

export function isMeetUpExtended(item: {}): item is MeetUpExtended {
  return (
    item &&
    typeof item === "object" &&
    "tags" in item &&
    "contactEmail" in item &&
    "contactNumber" in item &&
    "image" in item
  );
}

export function isPodcast(item: {}): item is Podcast {
  return item && typeof item === "object" && "details" in item;
}

export function isInterview(item: {}): item is InterviewProps {
  return (
    item &&
    typeof item === "object" &&
    "creator" in item &&
    "creatorId" in item &&
    "title" in item &&
    "bannerImage" in item
  );
}

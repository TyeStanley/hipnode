import CommentIcon from "../icons/outline-icons/CommentIcon";
import HeartIcon from "../icons/outline-icons/HeartIcon";
import MentionIcon from "../icons/outline-icons/MentionIcon";
import MeetupIcon from "../icons/outline-icons/MeetupIcon";
import FollowIcon from "../icons/outline-icons/FollowIcon";

const NotificationTypeInfo = {
  COMMENT: {
    message: "commented on your post",
    icon: (
      <CommentIcon className="h-4 w-4 stroke-sc-2 dark:stroke-light-2 xl:h-5 xl:w-5" />
    ),
  },
  REPLY: {
    message: "replied to your comment",
    icon: (
      <CommentIcon className="h-4 w-4 stroke-sc-2 dark:stroke-light-2 xl:h-5 xl:w-5" />
    ),
  },
  REACTION: {
    message: "liked your post",
    icon: (
      <HeartIcon className="h-4 w-4 fill-sc-2 dark:fill-light-2 xl:h-5 xl:w-5" />
    ),
  },
  MENTION: {
    message: "mentioned you",
    icon: (
      <MentionIcon className="h-4 w-4 fill-sc-2 dark:fill-light-2 xl:h-5 xl:w-5" />
    ),
  },
  MEETUP: {
    message: "published a meetup",
    icon: <MeetupIcon className="h-4 w-4 xl:h-5 xl:w-5" />,
  },
  FOLLOWER: {
    message: "followed you",
    icon: (
      <FollowIcon className="h-4 w-4 fill-sc-2 dark:fill-light-2 xl:h-5 xl:w-5" />
    ),
  },
};

export default NotificationTypeInfo;

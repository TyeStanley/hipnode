import { ReactNode } from "react";
import HomeIcon from "./HomeIcon";
import CommentIcon from "./CommentIcon";
import RocketIcon from "./RocketIcon";
import CalendarIcon from "./CalendarIcon";
import MessageIcon from "./MessageIcon";
import ProfileIcon from "./ProfileIcon";
import ReplyIcon from "./ReplyIcon";
import NotificationIcon from "./NotificationIcon";
import GroupIcon from "./GroupIcon";
import SunIcon from "./SunIcon";
import ShareIcon from "./ShareIcon";
import GoogleIcon from "./GoogleIcon";
import FacebookIcon from "./FacebookIcon";
import TwitterIcon from "./TwitterIcon";
import TroubleIcon from "./TroubleIcon";
import SendIcon from "./SendIcon";
import SettingsIcon from "./SettingsIcon";
import LeaveIcon from "./LeaveIcon";
import MoonIcon from "./MoonIcon";
import PostIcon from "./PostIcon";
import PodcastsIcon from "./PodcastsIcon";
import FireIcon from "./FireIcon";
import HeartIcon from "./HeartIcon";
import GrowingIcon from "./GrowingIcon";
import ReportIcon from "./ReportIcon";
import FeedbackIcon from "./FeedbackIcon";
import InboxIcon from "./InboxIcon";
import InterviewsIcon from "./InterviewsIcon";
import BusinessIcon from "./BusinessIcon";
import FollowIcon from "./FollowIcon";
import MenuIcon from "./MenuIcon";
import PlayIcon from "./PlayIcon";
import MoreVerticalIcon from "./MoreVerticalIcon";
import TriangleIcon from "./TriangleIcon";

export interface FillIconProps {
  children?: ReactNode;
  className?: string;
  notification?: boolean;
}

const FillIcon = ({ children, className }: FillIconProps) => {
  const styles = className ?? "fill-[#C5D0E6] dark:fill-[#F4F6F8]";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={styles}
    >
      {children}
    </svg>
  );
};

FillIcon.Business = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#FF571A]"}>
      <BusinessIcon />
    </FillIcon>
  );
};

FillIcon.Calendar = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className}>
      <CalendarIcon />
    </FillIcon>
  );
};

FillIcon.Comment = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#97989D]"}>
      <CommentIcon />
    </FillIcon>
  );
};

FillIcon.Facebook = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <FacebookIcon />
    </FillIcon>
  );
};

FillIcon.Feedback = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <FeedbackIcon />
    </FillIcon>
  );
};

FillIcon.Fire = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <FireIcon />
    </FillIcon>
  );
};

FillIcon.Follow = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#FF6934]"}>
      <FollowIcon />
    </FillIcon>
  );
};

FillIcon.Google = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <GoogleIcon />
    </FillIcon>
  );
};

FillIcon.Group = function Icon({ className, notification }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#F4F6F8]"}>
      <GroupIcon notification={notification} />
    </FillIcon>
  );
};

FillIcon.Growing = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <GrowingIcon />
    </FillIcon>
  );
};

FillIcon.Heart = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#C5D0E6]"}>
      <HeartIcon />
    </FillIcon>
  );
};

FillIcon.Home = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className}>
      <HomeIcon />
    </FillIcon>
  );
};

FillIcon.Inbox = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <InboxIcon />
    </FillIcon>
  );
};

FillIcon.Interviews = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#F4F6F8]"}>
      <InterviewsIcon />
    </FillIcon>
  );
};

FillIcon.Leave = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <LeaveIcon />
    </FillIcon>
  );
};

FillIcon.Menu = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <MenuIcon />
    </FillIcon>
  );
};

FillIcon.Message = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#858EAD] dark:fill-[#F4F6F8]"}>
      <MessageIcon />
    </FillIcon>
  );
};

FillIcon.Moon = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#2C353D]"}>
      <MoonIcon />
    </FillIcon>
  );
};

FillIcon.MoreVertical = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#C5D0E6]"}>
      <MoreVerticalIcon />
    </FillIcon>
  );
};

FillIcon.Notification = function Icon({
  className,
  notification,
}: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#858EAD] dark:fill-[#F4F6F8]"}>
      <NotificationIcon notification={notification} />
    </FillIcon>
  );
};

FillIcon.Play = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#FFFFFF]"}>
      <PlayIcon />
    </FillIcon>
  );
};

FillIcon.Podcasts = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#F4F6F8]"}>
      <PodcastsIcon />
    </FillIcon>
  );
};

FillIcon.Post = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "stroke-[#3F4354]"}>
      <PostIcon />
    </FillIcon>
  );
};

FillIcon.Profile = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <ProfileIcon />
    </FillIcon>
  );
};

FillIcon.Reply = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <ReplyIcon />
    </FillIcon>
  );
};

FillIcon.Report = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <ReportIcon />
    </FillIcon>
  );
};

FillIcon.Rocket = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <RocketIcon />
    </FillIcon>
  );
};

FillIcon.Send = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <SendIcon />
    </FillIcon>
  );
};

FillIcon.Settings = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <SettingsIcon />
    </FillIcon>
  );
};

FillIcon.Share = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <ShareIcon />
    </FillIcon>
  );
};

FillIcon.Sun = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#C5D0E6] dark:fill-[#2C353D]"}>
      <SunIcon />
    </FillIcon>
  );
};

FillIcon.Triangle = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon
      className={className ?? "shrink-0 fill-[#858EAD] dark:fill-[#F4F6F8]"}
    >
      <TriangleIcon />
    </FillIcon>
  );
};

FillIcon.Trouble = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354]"}>
      <TroubleIcon />
    </FillIcon>
  );
};

FillIcon.Twitter = function Icon({ className }: FillIconProps) {
  return (
    <FillIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <TwitterIcon />
    </FillIcon>
  );
};

export default FillIcon;

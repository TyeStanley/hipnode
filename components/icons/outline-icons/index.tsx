import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./ArrowIcon";
import ArrowLarge from "./ArrowLargeIcon";
import BloggingIcon from "./BloggingIcon";
import CheckboxIcon from "./CheckboxIcon";
import CheckmarkIcon from "./CheckmarkIcon";
import CommentIcon from "./CommentIcon";
import DevIcon from "./DevIcon";
import FollowingIcon from "./FollowingIcon";
import { Headline, Underline, Italic, Strikethrough, Bold } from "./FormatIcon";
import FrameIcon from "./FrameIcon";
import FrameNumber from "./FrameNumber";
import HeartIcon from "./HeartIcon";
import {
  Edit,
  Follow,
  ImageIcon,
  Info,
  Link,
  NewSquare,
  Tutorial,
  Seo,
  Share,
  View,
  TrashIcon,
} from "./Icon";
import IconAlt from "./IconAlt";
import NewIcon from "./NewIcon";
import PopularIcon from "./PopularIcon";
import PostIcon from "./PostIcon";
import SearchIcon from "./SearchIcon";
import Share2Icon from "./Share2Icon";
import SocialIcon from "./SocialIcon";
import VoiceIcon from "./VoiceIcon";
import CopyIcon from "./CopyIcon";

interface OutlineIconProps {
  children?: ReactNode;
  className?: string;
  checked?: boolean;
  color?: string;
  secondaryColor?: string;
  fillColor?: string;
  strokeColor?: string;
}

const OutlineIcon = ({ children, className }: OutlineIconProps) => {
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

OutlineIcon.Trash = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <TrashIcon />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowLeft = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowLeft />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowRight = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <ArrowRight />
    </OutlineIcon>
  );
};

OutlineIcon.ArrowLargeDown = function Icon({ className }: OutlineIconProps) {
  return (
    <ArrowLarge className={className ?? "stroke-[#3F4354] dark:stroke-sc-3"}>
      <ArrowLarge.Down />
    </ArrowLarge>
  );
};

OutlineIcon.ArrowLargeRight = function Icon({ className }: OutlineIconProps) {
  return (
    <ArrowLarge className={className ?? "stroke-[#3F4354] dark:stroke-sc-3"}>
      <ArrowLarge.Right />
    </ArrowLarge>
  );
};

OutlineIcon.Blogging = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <BloggingIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Checkbox = function Icon({ checked }: OutlineIconProps) {
  return <CheckboxIcon checked={checked} />;
};

OutlineIcon.Checkmark = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className}>
      <CheckmarkIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Comment = function Icon({ className }: OutlineIconProps) {
  return (
    <CommentIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Dev = function Icon({ className }: OutlineIconProps) {
  return (
    <DevIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"} />
  );
};

OutlineIcon.Following = function Icon({ color }: OutlineIconProps) {
  return <FollowingIcon color={color ?? "#6570F7"} />;
};

OutlineIcon.Headline = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Headline />
    </OutlineIcon>
  );
};

OutlineIcon.Underline = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Underline />
    </OutlineIcon>
  );
};

OutlineIcon.Italic = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Italic />
    </OutlineIcon>
  );
};

OutlineIcon.Strikethrough = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Strikethrough />
    </OutlineIcon>
  );
};

OutlineIcon.Bold = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Bold />
    </OutlineIcon>
  );
};

OutlineIcon.FrameCenter = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Center />
    </FrameIcon>
  );
};

OutlineIcon.FrameLeft = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Left />
    </FrameIcon>
  );
};

OutlineIcon.FrameRight = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Right />
    </FrameIcon>
  );
};

OutlineIcon.FramePoint = function Icon({ className }: OutlineIconProps) {
  return (
    <FrameIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    >
      <FrameIcon.Point />
    </FrameIcon>
  );
};

OutlineIcon.FrameNumber = function Icon({
  fillColor,
  strokeColor,
}: OutlineIconProps) {
  return (
    <FrameNumber
      fillColor={fillColor ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      strokeColor={strokeColor ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Heart = function Icon({ className }: OutlineIconProps) {
  return (
    <HeartIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"} />
  );
};

OutlineIcon.Edit = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon>
      <Edit className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"} />
    </OutlineIcon>
  );
};

OutlineIcon.Follow = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Follow />
    </OutlineIcon>
  );
};

OutlineIcon.ImageIcon = function Icon({ className }: OutlineIconProps) {
  return (
    <ImageIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Info = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Info />
    </OutlineIcon>
  );
};

OutlineIcon.Link = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Link />
    </OutlineIcon>
  );
};

OutlineIcon.NewSquare = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#0ECC8D]"}>
      <NewSquare />
    </OutlineIcon>
  );
};

OutlineIcon.Tutorial = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Tutorial />
    </OutlineIcon>
  );
};

OutlineIcon.Seo = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Seo />
    </OutlineIcon>
  );
};

OutlineIcon.Share = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Share />
    </OutlineIcon>
  );
};

OutlineIcon.View = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <View />
    </OutlineIcon>
  );
};

OutlineIcon.Bitcoin = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Bitcoin />
    </IconAlt>
  );
};

OutlineIcon.Close = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Close />
    </IconAlt>
  );
};

OutlineIcon.Design = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Design />
    </IconAlt>
  );
};

OutlineIcon.Expand = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Expand />
    </IconAlt>
  );
};

OutlineIcon.Mention = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Mention />
    </IconAlt>
  );
};

OutlineIcon.More = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.More />
    </IconAlt>
  );
};

OutlineIcon.MoreVertical = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.MoreVertical />
    </IconAlt>
  );
};

OutlineIcon.Post = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Post />
    </IconAlt>
  );
};

OutlineIcon.Success = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Success />
    </IconAlt>
  );
};

OutlineIcon.Upload = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.Upload />
    </IconAlt>
  );
};

OutlineIcon.Web = function Icon({ className }: OutlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}
    >
      <IconAlt.Web />
    </svg>
  );
};

OutlineIcon.Website = function Icon({ className }: OutlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className ?? "scale-[1.1] fill-[#3F4354] dark:fill-[#F7F7F7]"}
    >
      <path
        d="M7.00049 0C3.14034 0 0 3.14019 0 7C0 10.8596 3.14039 14 7.00049 14C10.8601 14 14 10.8596 14 7C14 3.14024 10.8602 0 7.00049 0ZM12.8281 6.42882H10.771C10.6362 4.50643 9.82572 2.70745 8.5032 1.34539C10.8275 1.96413 12.5897 3.97409 12.8281 6.42882ZM7.00049 12.4772C5.48182 11.2832 4.53369 9.50278 4.37564 7.57132H9.62465C9.46661 9.50239 8.51852 11.2832 7.00039 12.4772H7.00049ZM4.37564 6.42882C4.53349 4.49776 5.48177 2.71632 7.00049 1.52335C8.51862 2.71632 9.4669 4.49776 9.62475 6.42882H4.37564ZM5.4972 1.34539C4.17447 2.7076 3.36423 4.50673 3.22944 6.42882H1.17173C1.41044 3.97399 3.17267 1.96378 5.4972 1.34539ZM1.17173 7.57118H3.22944C3.3642 9.49356 4.17447 11.2922 5.4972 12.6541C3.17267 12.0358 1.41045 10.0262 1.17173 7.57118ZM8.50339 12.6541C9.82592 11.2921 10.6364 9.49351 10.7711 7.57118H12.8283C12.59 10.0262 10.8277 12.0358 8.50339 12.6541Z"
        transform="scale(1.4)"
      />
    </svg>
  );
};

OutlineIcon.ImageWide = function Icon({ className }: OutlineIconProps) {
  return (
    <IconAlt className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <IconAlt.ImageWide />
    </IconAlt>
  );
};

OutlineIcon.New = function Icon({ color, secondaryColor }: OutlineIconProps) {
  return (
    <OutlineIcon>
      <NewIcon
        color={color ?? "fill-[#0ECC8D]"}
        secondaryColor={secondaryColor ?? "fill-light-2"}
      />
      ;
    </OutlineIcon>
  );
};

OutlineIcon.Popular = function Icon({ className }: OutlineIconProps) {
  return <PopularIcon className={className ?? "fill-[#EEA956]"} />;
};

OutlineIcon.Post = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#97989D]"}>
      <PostIcon />
    </OutlineIcon>
  );
};

OutlineIcon.Search = function Icon({ className }: OutlineIconProps) {
  return (
    <SearchIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Share2 = function Icon({ className }: OutlineIconProps) {
  return (
    <OutlineIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <Share2Icon />
    </OutlineIcon>
  );
};

OutlineIcon.Twitter = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon>
      <SocialIcon.Twitter
        className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      />
    </SocialIcon>
  );
};

OutlineIcon.Instagram = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}>
      <SocialIcon.Instagram />
    </SocialIcon>
  );
};

OutlineIcon.Facebook = function Icon({ className }: OutlineIconProps) {
  return <SocialIcon.Facebook className={className} />;
};

OutlineIcon.LinkedIn = function Icon({ className }: OutlineIconProps) {
  return (
    <SocialIcon>
      <SocialIcon.LinkedIn
        className={className ?? "fill-[#3F4354] dark:fill-[#F7F7F7]"}
      />
    </SocialIcon>
  );
};

OutlineIcon.Voice = function Icon({ className }: OutlineIconProps) {
  return (
    <VoiceIcon
      className={className ?? "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
    />
  );
};

OutlineIcon.Copy = function Icon({ className }: OutlineIconProps) {
  return <CopyIcon className="shrink-0 fill-red" />;
};

export default OutlineIcon;

import { Group, MeetUp, Podcast } from "@prisma/client";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { tags } from "@/constants";
import { ExtendedPrismaPost } from "../posts";

export interface MeetupImageInterface {
  imageSrc: string;
  meetTitle: string;
  meetLocation: string;
}

export interface PinnedGroupItemProps {
  group: Group;
}

export type RightSidebarHeaderProps = {
  heading: string;
};

export type RightSidebarWrapperProps = {
  children: ReactNode;
};

export interface SidebarSectionProps {
  imgSrc: StaticImageData;
  imgAlt: string;
  imgContainerClass: string;
  title: string;
  subTitle?: string;
  description: string;
  notification?: number;
}

export type CreatePostInputProps = {
  userImage: string;
};

export type PostCardProps = {
  post: ExtendedPrismaPost;
  likes?: number;
  clerkId?: string;
  profileSearchParams?: string;
  setTagged: (tagged: string) => void;
  userIdFromParams?: number;
  username?: string;
};

export type SocialCountTuple = [string, number];

export type SocialStatisticsProps = {
  socialCounts: SocialCountTuple[];
};

export type PostLabelProps = {
  tags: string[];
};

export interface PostImageProps {
  postImage: string;
  imageWidth: number;
  imageHeight: number;
  blurImage: string;
}

export type PostCardTextProps = {
  postContent: string;
};

export type SocialMediaIconProps = {
  authorPicture: string;
};

export interface ImageWithCaptionProps {
  imageSrc: string;
  imageTitle?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  caption?: string;
}

export type TagProps = {
  tag: (typeof tags)[0];
};

export type MeetupItemProps = {
  meet: MeetUp;
};

export type MeetupsProps = {
  meetUps: MeetUp[];
};

export type PillItemProps = {
  pill: string;
};

type PodcastWithUser = Podcast & {
  user: {
    username: string;
  };
};

export type PodcastsProps = {
  podcasts: PodcastWithUser[];
};

export type PodcastItemProps = {
  podcast: PodcastWithUser;
};

export type PostCardListProps = {
  posts: ExtendedPrismaPost[];
  authorId?: number;
};

export interface TagIconConfig {
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconFillColor: string;
}

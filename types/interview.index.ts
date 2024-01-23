import { StaticImageData } from "next/image";
import { FilterType } from ".";
import { Interview } from "@prisma/client";

export interface Creator {
  name: string;
  picture: string;
}

export interface InterviewProps extends Interview {
  creator: Creator;
  userCanEditMedia?: boolean;
}

export interface Tag {
  id: number;
  name: string;
}

export interface TagOnInterview {
  tag: Tag;
}

export interface InterviewPageFilterProps extends Interview {
  userCanEditMedia: boolean;
  creator: Creator;
  tags: TagOnInterview[];
}

export interface InterviewCardProps {
  interviewData: InterviewProps;
  tags?: string[];
  userCanEditMedia?: boolean;
}

export interface LargeInterviewCardProps {
  interviewData: Interview;
  tags?: string[];
}

export type InterviewBannerImageType = {
  bannerImage: string | StaticImageData;
  className: string;
  height: number;
  width: number;
  roundedTop?: boolean;
};

export type InterviewCardButtonsType = {
  interviewSalary: string;
  updates: number;
  websiteLink: string;
};

export interface InterviewHeaderProps {
  userImage: string | StaticImageData;
  username: string;
  date: Date;
  id: number;
  userCanEditMedia?: boolean;
  creatorId: number;
}

interface InterviewData {
  interviews: InterviewPageFilterProps[];
  page: number;
  hasMore: boolean;
}

export interface InterviewPageProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  interviewData: InterviewData;
  interviewArray: number[] | undefined;
}

export interface InterviewFilterAndContentWrapperProps {
  tags: FilterType[];
  interviewData: InterviewData;
  interviewArray: number[] | undefined;
}

import {
  ProfileMeetupResponse,
  ProfilePodcastResponse,
  ProfileInterviewsResponse,
  ProfileHistoryResponse,
} from "@/lib/actions/profile.actions";
import { MeetUp, User } from "@prisma/client";
import { ExtendedPrismaPost } from "./posts";

export type UserProfile = User & {
  following: {
    followed: {
      username: string;
      picture: string;
    };
  }[];
  _count: {
    followers: number;
    following: number;
  };
  isLoggedInUser: boolean;
};

export type ProfileMeetup = MeetUp & {
  tags: {
    id: number;
    name: string;
  }[];
  userCanEditMedia: boolean;
};

export type PostPerformance = {
  id: number;
  image: string;
  viewCount: number;
  _count: {
    likes: number;
    comments: number;
  };
};

export interface EditSocialsProps {
  website: string | null | undefined;
  twitter: string | null | undefined;
  instagram: string | null | undefined;
  facebook: string | null | undefined;
  isLoggedInUser: boolean;
}

export interface SocialLinkProps {
  website: string | readonly string[] | undefined;
  twitter: string | readonly string[] | undefined;
  instagram: string | readonly string[] | undefined;
  facebook: string | readonly string[] | undefined;
}

export type BaseUserInfo = {
  id: number;
  username: string;
  image: string;
  name: string;
};

export type ResultType =
  | ExtendedPrismaPost[]
  | ProfileMeetupResponse
  | ProfilePodcastResponse
  | ProfileInterviewsResponse
  | ProfileHistoryResponse;

export type ProfileResultType = {
  result: ResultType;
  isEmpty: boolean;
  paramId: string;
  searchParam: string;
  authorId: number;
};

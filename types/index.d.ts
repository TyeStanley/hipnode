/* eslint-disable no-unused-vars */
import { ChangeEvent, ElementType, FC, ReactNode, SetStateAction } from "react";
import { StaticImageData } from "next/image";
import { Podcast, Post, User } from "@prisma/client";
import { Control, FieldValues } from "react-hook-form";
import { TagSuggestion } from "react-tag-autocomplete";

import { onboardingQuestions } from "@/constants";
import { colorVariants } from "@/components/group/GroupSectionHeader";
import { GroupProps } from "@types/models";
import { ProfileMeetup, ProfilePost } from "./profile.index";
import { InterviewProps } from "./interview.index";
import { ExtendedPrismaPost } from "./posts";
import { ProfileMeetupResponse } from "@/lib/actions/profile.actions";

export type PostCardTypes = Post & {
  id: number;
  image: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  heading: string;
  blurImage: string;
  imageWidth: number;
  imageHeight: number;
  author: {
    username: string;
    picture: string;
    id: number;
  };
  likes: {
    userId: number;
  }[];
  comments: {
    id: number;
  }[];
  tags: {
    tag: {
      id: number;
      name: string;
    };
  }[];
  hasUserLiked: boolean;
  likesCount: number;
  commentsCount: number;
  tagNames: string[];
};

export interface AuthenticatedUser {
  userId: number;
}

export type UserSuggestion = {
  user: User;
};

export type CustomTagSuggestion = TagSuggestion & UserSuggestion;

export type Tag = {
  label: string;
  value: string | number | symbol | null;
  user?: User;
};

type FieldName = "groupName" | "description";

export type ProfileResults =
  | ExtendedPrismaPost[]
  | ProfileMeetupResponse[]
  | Podcast[]
  | InterviewProps[];

export interface FormFieldComponentProps {
  control: Control<{
    groupName: string;
    description: string;
  }>;
  name: FieldName;
  label: string;
  placeholder: string;
  fieldType?: "input" | "textarea";
}

export type FetchGroupDetailPostsProps = {
  initialNewPost: Post[];
  initialPopularPost: Post[];
  fetchNewPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  fetchPopularPost: (myCursorId?: number, groupId?: number) => Promise<Post[]>;
  groupId: number;
};

type GroupPromiseProps = {
  id: number;
  createdAt?: Date;
  description: string | null;
  name: string;
  updatedAt?: Date;
  createdBy?: number;
  coverImage?: string | null;
  logo: string | null;
}[];

export type GroupSectionProps = {
  fastestGrowingGroupsPromise: Promise<GroupPromiseProps>;
  mostPopularGroupsPromise: Promise<GroupPromiseProps>;
  newlyLaunchedGroupsPromise: Promise<GroupPromiseProps>;
};

export type ColorVariantsType = {
  [key: string]: string;
  bgYellow: string;
  bgRed: string;
  bgBlue: string;
};

export type ColorVariantKeys = keyof typeof colorVariants;

export interface GroupSectionHeaderProps {
  title: string;
  bgColor: ColorVariantKeys;
  icon: FC;
  groups?: GroupProps;
}

export type GroupData = {
  [key in "fastest-growing" | "Most Popular" | "Newly Launched"]: {
    header: { color: string; icon: FC; title: string };
    groups: {
      icon: StaticImageData;
      groupDescription: string;
      groupName: string;
    }[];
  };
};

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export type AnswersType = string | string[];

export type UserAnswersType = {
  answerQuestion1?: string;
  answerQuestion2?: string;
  answersQuestion3?: string[];
};

export type QuestionKeysMapType = {
  [key: number]: string;
};

export type PostItem = {
  title: string;
  icon: FC<{ className?: string; children? }>;
  iconBgColor: string;
  iconFillColor: string;
};

export interface ClerkUser extends User {
  username: string | null;
}

export interface CustomButtonProps {
  label: string | ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: FC;
}

export interface ActiveButtonsProps {
  currentPath: string;
}

export interface ActionButtonProps {
  label: string;
  href: string;
  currentPath: string;
}

export type ColorVariantsOnboardingType = {
  [key: string]: string;
  fillRed: string;
  fillBlue: string;
  fillYellow: string;
  fillGreen: string;
  bgRed: string;
  bgBlue: string;
  bgYellow: string;
  bgGreen: string;
};

export interface QuestionnaireFormProps {
  questions: (typeof onboardingQuestions)[number];
  animateClass: string;
  classVariants: {
    parentDivFlex: string;
    childDivWidth: string;
    buttonWidth: string;
    buttonText: string;
  };
  handleQuestionClick: (question: AnswersType) => void;
  handleNextClick: () => void;
  selectedAnswers: AnswersType[];
  questionSet: number;
  shouldOnboard: boolean;
}

export interface OnboardingSideScreenProps {
  info?: {
    title: string;
    posts: PostItem[];
  };
}

export interface IconProps {
  children: ReactNode;
  className?: string;
}

export type HeadingsType = {
  title: string;
  icon: FC;
  bgColor: string;
  groups: GroupProps;
};

export interface ChatMessageProps {
  user: string;
  message: string;
}

export const chatMessages = [
  {
    user: "you",
    message:
      "Greetings, fellow carbon-based life form! How art thou in the realm of 1s and 0s?",
  },
  {
    user: "other",
    message:
      "Salutations, my silicon-chip comrade! I'm currently doing the binary tango, how about you?",
  },
  {
    user: "you",
    message:
      "Ah, the binary tango, a classic dance of 10 steps forward and 1 step back. I'm waltzing along too, albeit with a few buffer overflows!",
  },
  {
    user: "other",
    message:
      "Buffer overflows, the dance move that keeps on giving! Let's hope we don't trip over any null pointers in this digital ballroom.",
  },
  {
    user: "you",
    message:
      "Absolutely! Null pointers are the banana peels of our digital dance floor. So, what's your next move in this grand algorithmic dance?",
  },
  {
    user: "other",
    message:
      "I'm thinking of attempting the 'Funky Function Flip.' It's got a 50% chance of impressing the virtual audience or crashing the virtual chandelier. High stakes, you know!",
  },
  {
    user: "you",
    message:
      "A daring choice! Break a virtual leg, my friend. I'll be here, debugging and providing virtual applause. Until our next debugging disco, cheerio Christopher!",
  },
  {
    user: "other",
    message: "Cheerio Christopher!",
  },
];

export interface SocialIconProps extends IconProps {
  className?: string;
}

export interface NotificationTab {
  title: string;
  icon?: ElementType;
}

export interface NotificationButtonProps {
  currentUserId: number;
  lastChecked: Date;
}

export interface NotificationProps {
  id?: number;
  userId?: number;
  createdAt: Date;
  updatedAt?: Date;
  title: string | null;
  senderName: string;
  image: string;
  date: string;
  type: "COMMENT" | "REACTION" | "MENTION" | "MEETUP" | "FOLLOWER" | "REPLY";
  isRead?: boolean | null;
  isFollowed?: boolean | null;
  commentContent?: string | null;
  commentId?: number | null;
  followerId?: number | null;
}

export interface NotificationCommentTypes {
  senderName: string;
  type: "COMMENT" | "REACTION" | "MENTION" | "MEETUP" | "FOLLOWER" | "REPLY";
  comment?: string | null;
  isRead?: boolean | null;
  title?: string | null;
  date: string;
  image: string;
  isFollowed?: boolean | null;
  commentId?: number | null;
  classNames?: string;
}

export interface ProfileInfoProps {
  user: {
    id: number;
    picture: string;
    username: string;
    bio: string | null;
    isLoggedInUser: boolean;
    title: string | null;
    _count: {
      followers: number;
      following: number;
    };
    points: number;
    website: string | null;
    twitter: string | null;
    instagram: string | null;
    facebook: string | null;
    following: {
      followed: {
        username: string;
        picture: string;
      };
    }[];
    createdAt: Date;
    isFollowing: boolean;
  };
}

export interface ProfileLinkProps {
  username: string;
  picture: string;
}

export interface SocialIconsProps {
  icon: string;
  link: string;
}

export interface UserButtonProps {
  userImg: string | undefined;
}
export interface PerformanceProps {
  data: {
    id: number;
    image: string;
    viewCount: number;
    _count: {
      likes: number;
      comments: number;
    };
  }[];
}

export interface PerformanceCardProps {
  contentImg: string;
  views: number;
  likes: number;
  comments: number;
}

export interface ContentCardProps {
  contentImg: string;
  userImg: string | undefined;
  description: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  isHeart: boolean;
  name: string | undefined;
  createdAt: string | undefined;
}

export interface StatsDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface FilterType {
  id: number;
  name: string;
}

export interface FilterCategoryProps {
  category: FilterType;
  isSelected: boolean;
  toggleCategory: (category: number) => void;
}

export interface CategoriesProps {
  setLoading: (loading: boolean) => void;
  filters: FilterType[];
  page: string;
  urlFilter: string;
  className: string;
}

export interface NotificationProviderProps {
  children: ReactNode;
  currentUserId: number;
  lastChecked: Date;
}

export interface GetNotificationQueryOptions {
  take: number;
  where: {
    userId: number;
  };
  orderBy: {
    createdAt: "desc";
  };
  skip?: number;
  cursor?: {
    id: number;
  };
}

export interface Notification extends NotificationProps {}

export interface GetNotificationsTypes {
  notifications: Notification[];
  hasMoreData?: boolean;
}

export interface FollowRelationsTypes {
  followerId: number;
  followedId: number;
}

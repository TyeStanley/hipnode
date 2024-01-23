import { Post, Prisma, User } from "@prisma/client";

// LINK - https://github.com/adrianhajdin/stack_overflow_nextjs13/blob/main/lib/actions/shared.types.d.ts#L69
export interface CreateGroupParams {
  name: string;
  description: string;
  path: string;
  members?: User[];
  createdBy: number;
  admins?: User[];
  coverImage?: string;
  logo?: string;
  post?: Post[];
}

export interface GetGroupByIdParams {
  groupId: number;
}

export interface EditGroupParams {
  groupId: number;
  name?: string;
  description?: string;
  members?: User[];
  admins?: User[];
  coverImage?: string;
  logo?: string;
  post?: Post[];
}

export interface DeleteGroupParams {
  groupId: number;
  path: string;
}

export interface GetGroupsQueryOptions {
  take: number;
  skip?: number;
  cursor?: {
    id: number;
  };
}

export interface GetPostsByGroupIdQueryOptions {
  take: number;
  skip?: number;
  cursor?: {
    id: number;
  };
  where?: {
    groupId: number | undefined;
  };
  select: {
    id: boolean;
    image: boolean;
    content: boolean;
    viewCount: boolean;
    createdAt: boolean;
    heading: boolean;
    blurImage: boolean;
    imageWidth: boolean;
    imageHeight: boolean;
    author: {
      select: {
        username: boolean;
        picture: boolean;
        id: boolean;
      };
    };
    likes: {
      select: {
        userId: boolean;
      };
    };
    comments: {
      select: {
        id: boolean;
      };
    };
    tags: {
      select: {
        tag: boolean;
      };
    };
  };
  orderBy: Prisma.PostOrderByInput;
}

export interface GetPostsFromGroupsQueryOptions {
  take: number;
  skip?: number;
  cursor?: {
    id: number;
  };
  select: {
    id: boolean;
    image: boolean;
    content: boolean;
    createdAt: boolean;
    heading: boolean;
    likes: {
      select: {
        userId: boolean;
      };
    };
    author: {
      select: {
        username: boolean;
        picture: boolean;
      };
    };
    group: {
      select: {
        name: boolean;
        id: boolean;
      };
    };
  };
}

export interface CreateNotificationsParams {
  userId: number;
  senderName: string;
  type: "COMMENT" | "REACTION" | "MENTION" | "MEETUP" | "FOLLOWER" | "REPLY";
  commentContent?: string;
  title?: string;
  image: string;
  meetupId?: number;
  commentId?: number;
  likeId?: number;
  followerId?: number;
  date: string;
  commentParentId?: number;
  isFollowed?: boolean;
}

export interface UpdateNotificationsParams {
  commentContent?: string;
  title?: string;
  meetupId?: number;
  commentId?: number;
  likeId?: number;
  followerId?: number;
  date: string;
  isFollowed?: boolean;
  isRead?: boolean;
}

export interface deleteNotificationParams {
  commentId?: number;
  meetupId?: number;
  followerId?: number;
  likeId?: number;
}

export type GroupImageProps = {
  src: string;
  name: string;
};

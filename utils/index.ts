import { v4 as uuidv4 } from "uuid";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
} from "react-icons/im";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { supabase } from "@/utils/supabaseClient";
import { homePageTags, monthNames, abbMonthNames } from "@/constants";
import { CommentAuthorProps, GetActionBarDataProps } from "@/types/posts";
import { TagIconConfig } from "@/types/homepage";
import { CustomTagSuggestion, NotificationProps } from "@/types";
import { createNotification } from "@/lib/actions/notification.actions";
import { getBlurData } from "@/lib";
import { getUsersByName } from "@/lib/actions/user.actions";
import { User } from "@prisma/client";

export function debounce(fn: (...args: any[]) => void, delay: number = 100) {
  let timeoutID: number | null = null;

  return function (...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(() => fn(...args), delay);
  };
}

export async function fetchUserSuggestions(name: string) {
  try {
    const users = await getUsersByName(name);

    if (users) {
      const usersSuggestions: CustomTagSuggestion[] = users.map((user) => {
        return {
          value: user.id,
          label: user.name,
          user,
        };
      });
      return usersSuggestions;
    } else {
      throw Error("No user found!");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function formatGroupDetailPostDate(createdAt: Date) {
  return formatDistanceToNow(createdAt, { addSuffix: true });
}

export function getFormattedDateMeetUpCard(dateString: Date) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const monthText = abbMonthNames[month];

  return {
    day,
    monthText,
  };
}

type UploadImageAndBlurImageType = {
  mainImageURL: string;
  blurImageURL: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const uploadImageToSupabase = async (
  file: File | null,
  bucketName: string,
  folderName?: string
): Promise<UploadImageAndBlurImageType | null> => {
  if (!file) {
    console.error("No file provided");

    return null;
  }

  try {
    const fileExtension = file.name.split(".").pop();
    const prefix = folderName && folderName.trim() ? `${folderName}/` : "";
    const uniqueFileName = `${prefix}image_${uuidv4()}.${fileExtension}`;
    const projectUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, file, { contentType: file.type });

    const imageURL = `${projectUrl}/storage/v1/object/public/${bucketName}/${uniqueFileName}`;
    const blur = await getBlurData(imageURL);
    const blurImageURL = blur.blurDataURL;
    const imageWidth = blur.width;
    const imageHeight = blur.height;

    if (error) {
      console.error("File upload error:", error.message);
      return null;
    } else {
      console.log("File uploaded successfully:", uniqueFileName);
      const imageAndBlurImage = {
        mainImageURL: `${projectUrl}/storage/v1/object/public/${bucketName}/${uniqueFileName}`,
        blurImageURL,
        imageWidth,
        imageHeight,
      };

      return imageAndBlurImage;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null;
  }
};

export async function getBucketUrls(bucketName: string): Promise<string[]> {
  try {
    const { data: bucketContents, error } = await supabase.storage
      .from(bucketName)
      .list();

    if (error) throw error;

    const urls = bucketContents.map((file) => {
      const url = supabase.storage.from(bucketName).getPublicUrl(file.name)
        .data.publicUrl;
      return url;
    });

    return urls;
  } catch (error) {
    console.error("Error in getBucketUrls:", error);
    return [];
  }
}

export const formatDate = (date: Date) => {
  const updatedDate = new Date(date);
  const monthText = updatedDate
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const day = updatedDate.getDate();

  return { monthText, day };
};

export const formatDateShort = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDatePostFormat = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export function extractArray(queryString: string, urlFilter: string) {
  const keyValuePairs = queryString.split("&");
  const showNumbers = [];

  for (const keyValue of keyValuePairs) {
    const [key, value] = keyValue.split("=");

    if (key === urlFilter && !isNaN(Number(value))) {
      showNumbers.push(Number(value));
    }
  }

  return showNumbers;
}

export function formatPodcastDuration(seconds: number) {
  const roundedSeconds = Math.round(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${remainingSeconds}`
      : remainingSeconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const setToLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (e) {
    console.error("Failed to set item in local storage:", e);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (e) {
    console.error("Failed to get item from local storage:", e);
    return null;
  }
};

export const getVolumeIcon = (volumeValues: number[]) => {
  const volumeValue = volumeValues[0];
  if (volumeValue === 0) {
    return ImVolumeMute2;
  } else if (volumeValue <= 33) {
    return ImVolumeLow;
  } else if (volumeValue <= 66) {
    return ImVolumeMedium;
  } else {
    return ImVolumeHigh;
  }
};

export function formatPostDate(createdAt: Date) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return date;
}

export function formatInterviewDate(inputDate: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const inputDay = inputDate.getDate();
  const inputMonth = inputDate.getMonth();
  const inputYear = inputDate.getFullYear();

  if (
    inputDay === today.getDate() &&
    inputMonth === today.getMonth() &&
    inputYear === today.getFullYear()
  ) {
    return `Today, ${inputDay} ${monthNames[inputMonth]}`;
  } else if (
    inputDay === tomorrow.getDate() &&
    inputMonth === tomorrow.getMonth() &&
    inputYear === tomorrow.getFullYear()
  ) {
    return `Tomorrow, ${inputDay} ${monthNames[inputMonth]}`;
  } else {
    return `${inputDay} ${monthNames[inputMonth]}`;
  }
}

export function formatSalary(amount: number, salaryPeriod: string): string {
  const formattedSalary =
    amount >= 1000 ? `${(amount / 1000).toFixed(0)}k` : amount.toString();
  return formattedSalary + "/" + salaryPeriod;
}

export function capitalise(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const groupCommentsByParentId = (
  comments: CommentAuthorProps[]
): Record<string, CommentAuthorProps[]> => {
  const group: Record<string, CommentAuthorProps[]> = {};
  comments?.forEach((comment) => {
    const key =
      comment.parentId === null ? "null" : comment.parentId.toString();
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(comment);
  });
  return group;
};

export const getRepliesToComments = (
  commentsByParentId: Record<string, CommentAuthorProps[]>,
  parentId: string
) => {
  return commentsByParentId[parentId];
};

export const howManyMonthsAgo = (dateStr: Date | null) => {
  if (dateStr === null) {
    return "Date not available";
  }

  const dateGiven = new Date(dateStr);
  const currentDate = new Date();

  const yearDiff = currentDate.getFullYear() - dateGiven.getFullYear();
  const monthDiff = currentDate.getMonth() - dateGiven.getMonth();

  const totalMonths = yearDiff * 12 + monthDiff;

  return totalMonths;
};

export const userHasLikedComment = (
  currentUserId: number,
  comments: { id: number; authorId: number }[]
): boolean => {
  return comments.some((comment) => comment.authorId === currentUserId);
};

export async function uploadLivechatAttachment(files: File[] | File) {
  const bucket = "livechat"; // Static bucket name
  const folder = "attachments"; // Static folder name

  // Check if files is an array and handle accordingly
  const file = Array.isArray(files) ? files[0] : files;

  const filePath = `${folder}/${Date.now()}_${file.name}`;

  const { error, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw error;
  }
  const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/livechat/${data.path}`;

  return {
    ...data,
    publicURL, // Return the public URL along with other data
  };
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getActionBarData = (postData: GetActionBarDataProps) => {
  const actionBarData = {
    likesCount: postData.likesCount,
    commentsCount: postData.commentsCount,
    sharesCount: postData.sharesCount,
  };
  return actionBarData;
};

export const getIconConfig = (tagName: string): TagIconConfig => {
  const hash = tagName
    .split("")
    .reduce(
      (acc: number, char: string) => char.charCodeAt(0) + ((acc << 5) - acc),
      0
    );
  const index = Math.abs(hash) % homePageTags.length;
  return homePageTags[index];
};

export function formatRelativeTime(dateString: Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
}

export function formatChatBoxDate(date: Date) {
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }

  const now = new Date();
  const providedDate = new Date(date);

  const moreThanADayOld =
    now.getDate() !== providedDate.getDate() ||
    now.getMonth() !== providedDate.getMonth() ||
    now.getFullYear() !== providedDate.getFullYear();

  let hours = providedDate.getHours();
  const minutes = pad(providedDate.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours || 12;

  const timeFormatted = `${hours}:${minutes}${ampm}`;

  if (moreThanADayOld) {
    const day = pad(providedDate.getDate());
    const month = pad(providedDate.getMonth() + 1);
    return `${day}/${month} ${timeFormatted}`;
  } else {
    return timeFormatted;
  }
}
export const getMediaType = (file: File | File[]) => {
  const fileType = Array.isArray(file) ? file[0].type : file.type;

  switch (true) {
    case fileType.startsWith("image"):
      return "image";
    case fileType.startsWith("video"):
      return "video";
    case fileType.startsWith("audio"):
      return "audio";
    case fileType.includes("application") || fileType.includes("text"):
      return "document";
    default:
      return "unknown";
  }
};

export const adjustHeight = (element: HTMLTextAreaElement | null) => {
  if (element === null) return;
  element.style.height = "24px";
  element.style.height = `${Math.min(element.scrollHeight, 72)}px`; // 72px is the max height
};

export const getNotificationDate = (date: Date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][dateObj.getMonth()];
  const hours = dateObj.getHours();
  const minutes =
    dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes();
  const formattedDate = `${day} ${month}, ${hours}:${minutes}${
    hours < 12 ? "am" : "pm"
  }`;
  return formattedDate;
};

export const createNotificationIfRequired = (
  userId: number | undefined,
  type: "COMMENT" | "REPLY",
  image: string,
  senderName: string,
  commentContent: string,
  title: string | undefined,
  commentId: number,
  createAt: Date,
  commentParentId?: number
) => {
  const date = getNotificationDate(createAt);
  if (!userId) throw new Error("No user id provided to create notification");
  createNotification({
    userId,
    image,
    senderName,
    type,
    commentContent,
    title: title || "No title",
    commentId,
    date,
    commentParentId,
  });
};

export const filterNotifications = (
  notifications: NotificationProps[],
  selectedTab: string | null
) => {
  if (!selectedTab || selectedTab === "all notification") {
    return notifications;
  }
  return notifications.filter(
    (notification) => notification.type.toLowerCase() === selectedTab
  );
};

export async function uploadGroupImages(
  file: File,
  bucket: string,
  folder: string
) {
  const fileExtension = file.name.split(".").pop();
  const prefix = folder && folder.trim() ? `${folder}/` : "";
  const uniqueFileName = `${prefix}image_${uuidv4()}.${fileExtension}`;

  const { error, data } = await supabase.storage
    .from(bucket)
    .upload(uniqueFileName, file);

  if (error) {
    throw new Error("Error uploading image");
  }
  const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`;
  return publicURL;
}

const getSortedNotificationDate = (date: Date | string) => {
  return date instanceof Date ? date : new Date(date);
};

export const sortedNotifications = (notifications: NotificationProps[]) => {
  return notifications.sort((a, b) => {
    const dateA = getSortedNotificationDate(a.createdAt);
    const dateB = getSortedNotificationDate(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
};

export const shuffle = (array: User[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

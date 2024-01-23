import { User } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  RefObject,
} from "react";
import { Types } from "ably";

export type ChatroomType = {
  userId: number;
  chatroomId: number;
};

export type CreateMessageType = {
  text?: string | null;
  userId: number;
  chatroomId: number;
  attachment: string | null;
  attachmentType: string | null;
  messageUUID: string;
  receiverUserId: number;
};

export type EditMessageType = {
  messageUUID: string;
  text: string;
};

export interface MessageToSend {
  text?: string;
  userId: number | null;
  chatroomId: number | null;
  attachment?: string;
}

export interface ChatProps extends User {
  online?: boolean;
}

export interface AttachmentPreviewProps {
  droppedFile: File | File[];
  setDroppedFile: (value: File | null) => void;
  chatPage?: boolean;
}

export interface LiveChatAudioPlayerProps {
  audioUrl: string;
  messageId?: number;
  isMessageFromCurrentUser?: boolean;
}

export interface ChatroomUser {
  id: number;
  username: string | undefined;
  image: string;
  name?: string;
}

export interface ChatroomMap {
  [chatroomId: number]: Set<number>;
}

export interface UserInfo {
  id: number;
  username: string;
  image: string;
  name?: string;
}

export interface ChatMessage {
  connectionId?: string;
  id?: number | string;
  data: {
    user: ChatroomUser;
    messageId: number;
    messageUUID: string;
    attachment?: string | null;
    attachmentType?: string | null;
    chatroomId?: number;
    text: string | null;
    createdAt?: Date;
  };
}
export interface loadMessagesProps {
  chatroomId: number | null;
  chatroomUsers: ChatroomUser[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

export interface useDropzoneHandlerProps {
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
}

export interface RenderPreviewProps {
  mediaType: string;
  attachmentPreview: string;
  chatPage?: boolean;
}

export interface CurrentUser {
  id: number | null;
  username: string | undefined;
  image: string;
}

export interface LiveChatSubmissionProps {
  messageText: string;
  droppedFile: File | File[] | null;
  channel: Types.RealtimeChannelPromise;
  chatroomId: number | null;
  currentUser: CurrentUser;
  receiverUserId: number;
}

interface RecentMessage {
  id: number;
  text: string | null;
  createdAt: Date;
  userId: number;
  chatroomId: number;
  attachment: string | null;
  attachmentType: string | null;
}

interface OtherUser {
  id: number;
  name: string;
  username: string;
  picture: string;
}

export interface ChatroomDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  recentMessage: RecentMessage;
  otherUser: OtherUser;
}

// type HandleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => void;

export type NotificationType = {
  chatNotificationId: number;
  chatroomId: number;
  userId: number;
  receiverUserId: number;
  count: number;
};

export interface ChatPageProps {
  chatrooms: ChatroomDetail[];
  userInfo: UserInfo;
}

export interface ChatroomListItemProps {
  chatroom: ChatroomDetail;
  setShowChatRoomList: Dispatch<SetStateAction<boolean>>;
  notification: NotificationType;
}

export interface ChatPageContextType {
  chatrooms: ChatroomDetail[];
  messages: ChatMessage[];
  userInfo: UserInfo;
  defaultChatroomId: number | undefined;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  otherUser: ChatroomUser | undefined;
  showChatRoomList: boolean;
  setShowChatRoomList: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isInputDisabled: boolean;
  setIsInputDisabled: Dispatch<SetStateAction<boolean>>;
}

export interface ChatPageInputContextType {
  getInputProps: object;
  open: () => void;
  droppedFile: File | File[] | null;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
}

export interface MessageAttachmentProps {
  message: ChatMessage;
  chatPage?: boolean;
  isMessageFromCurrentUser?: boolean;
}

export interface UserTyping {
  isTyping: boolean;
  userId: number;
  username: string;
  chatroomId: number;
}

export interface LiveChatMessageListProps {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setDroppedFile: Dispatch<SetStateAction<File | File[] | null>>;
}

export interface LiveChatMessageProps {
  message: ChatMessage;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}

export interface LiveChatVideoPlayerProps {
  videoUrl: string;
  height: number;
  width: number;
  additionalClasses: string;
  messageId?: number | undefined;
}

export interface LiveChatAudioPlayerAnimationProps {
  isPlaying: boolean;
  isMessageFromCurrentUser: boolean;
}

export interface ChatBoxInputContentProps {
  messageText: string;
  setMessageText: (messageText: string) => void;
  isChatroomUserTyping: boolean;
  userTypingUsername: string | undefined;
  handleFormLogic: () => void;
  handleFormSubmission: (e: FormEvent<HTMLFormElement>) => void;
  // handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputBox: RefObject<HTMLTextAreaElement>;
  handleTyping: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  showEmojiPicker: boolean;
  data: object;
}

export interface LiveChatInputProps {
  open: () => void;
  inputBox: RefObject<HTMLTextAreaElement>;
  messageText: string;
  handleTyping: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  isInputDisabled: boolean;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (showEmojiPicker: boolean) => void;
  setMessageText: (messageText: string) => void;
  droppedFile: File | File[] | null;
  setDroppedFile: (value: File | File[] | null) => void;
}

export type EmojiData = {
  native: string;
};

export interface handleEmojiSelectProps {
  emoji: EmojiData;
  messageText: string;
  setMessageText: (messageText: string) => void;
}

export interface MessageContentProps {
  additionalStyles: string;
  text: string | null;
  fontSize: string;
  inView: boolean;
}

export interface LinkPreviewProps {
  url: string;
  smallChatBox?: boolean;
}

export interface LinkPreviewMetadata {
  title: string | null;
  image: string | null;
  description: string | null;
}

export interface ChatAudioRecorderProps {
  setRecordingAudio: (value: boolean) => void;
  droppedFile: File | File[] | null;
  setDroppedFile: (value: File | File[] | null) => void;
  isSmallChatBox?: boolean;
}

export interface LiveChatFormProps {
  droppedFile: File | File[] | null;
  setDroppedFile: (value: File | File[] | null) => void;
  channel: Types.RealtimeChannelPromise;
  open: () => void;
}

export interface EditDeleteButtonProps {
  isStringSingleEmoji: boolean;
  displayText: string | null;
  setTextareaValue: Dispatch<SetStateAction<string | null>>;
  textareaValue: string | null;
  handleDelete: () => void;
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleEdit: () => void;
  smallChatBox?: boolean;
}

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  useCallback,
} from "react";
import { useChannel } from "ably/react";

import FillIcon from "../icons/fill-icons";
import { LiveChatFormProps, UserTyping } from "@/types/chatroom.index";
import useChatStore from "@/app/chatStore";
import {
  API_RESULT,
  liveChatSubmission,
  userTypingChange,
} from "../../utils/chat-functions";
import { adjustHeight } from "@/utils";
import { AttachmentPreview, LiveChatInput } from ".";

const LiveChatForm = ({
  droppedFile,
  setDroppedFile,
  channel,
  open,
}: LiveChatFormProps) => {
  const { chatroomId, chatroomUsers } = useChatStore();
  const [messageText, setMessageText] = useState("");
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const inputBox = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel: typingChannel } = useChannel(
    "hipnode-livechat-typing-status",
    (message) => {
      setUserTyping(message.data);
    }
  );

  useEffect(() => {
    setMessageText("");
  }, [chatroomId]);

  useEffect(() => {
    if (!isInputDisabled) {
      inputBox.current?.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    adjustHeight(inputBox.current);
  }, [messageText]);

  const userInfo = useMemo(() => {
    return chatroomUsers[0] ?? null;
  }, [chatroomUsers]);

  const isChatroomUserTyping = useMemo(() => {
    if (!userTyping) return false;
    return (
      userTyping.isTyping &&
      userTyping.chatroomId === chatroomId &&
      userTyping.userId !== userInfo.id
    );
  }, [userTyping, chatroomId, userInfo]);

  const userTypingUsername = userTyping?.username;

  const currentUser = chatroomUsers?.[0] ?? {
    id: null,
    username: "",
    image: "",
  };

  const receiverUserId = chatroomUsers[1]?.id;

  const handleFormSubmission = async (
    event:
      | FormEvent<HTMLFormElement>
      | KeyboardEvent<HTMLInputElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (messageTextIsEmpty && !droppedFile) return;
    setIsInputDisabled(true);
    try {
      const result = await liveChatSubmission({
        messageText,
        droppedFile,
        channel,
        chatroomId,
        currentUser,
        receiverUserId,
      });

      if (result === API_RESULT.SUCCESS) {
        setMessageText("");
        setDroppedFile(null);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsInputDisabled(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  const handleTyping = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      userTypingChange({
        e,
        setMessageText,
        typingChannel,
        userInfo,
        chatroomId,
        typingTimeoutRef,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo, chatroomId, typingTimeoutRef]
  );

  return (
    <form
      onSubmit={handleFormSubmission}
      className="relative flex w-full gap-5 border-t border-sc-6 p-5
      dark:border-dark-4"
    >
      {isChatroomUserTyping && (
        <p className=" semibold-14 absolute flex translate-y-[-1.3rem] px-2 text-sc-3">
          {userTypingUsername} is typing...
        </p>
      )}
      <div className=" flex w-full flex-col gap-3 rounded-2xl border border-sc-5 p-3.5 dark:border-sc-2">
        {droppedFile && (
          <AttachmentPreview
            droppedFile={droppedFile}
            setDroppedFile={setDroppedFile}
          />
        )}
        <LiveChatInput
          open={open}
          inputBox={inputBox}
          messageText={messageText}
          handleTyping={handleTyping}
          handleKeyDown={handleKeyDown}
          isInputDisabled={isInputDisabled}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          setMessageText={setMessageText}
          droppedFile={droppedFile}
          setDroppedFile={setDroppedFile}
        />
      </div>
      <button
        type="submit"
        disabled={
          (messageTextIsEmpty && chatroomId === null) || isInputDisabled
        }
        className="h-fit cursor-pointer self-center"
      >
        <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
      </button>
    </form>
  );
};

export default LiveChatForm;

import {
  FormEvent,
  useState,
  useEffect,
  useRef,
  useMemo,
  ChangeEvent,
} from "react";
import data from "@emoji-mart/data";
import { useChannel } from "ably/react";

import useChatStore from "@/app/chatStore";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { useChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import { adjustHeight } from "@/utils";
import { UserTyping } from "@/types/chatroom.index";
import ChatBoxInputContent from "./ChatBoxInputContent";
import {
  API_RESULT,
  liveChatSubmission,
  userTypingChange,
} from "../../utils/chat-functions";

const ChatPageInput = () => {
  const { chatroomId, chatroomUsers } = useChatStore();
  const { isInputDisabled, userInfo, isLoading, setIsInputDisabled } =
    useChatPageContext();
  const { droppedFile, setDroppedFile } = useChatPageInputContext();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);
  const [messageText, setMessageText] = useState("");
  const messageTextIsEmpty = messageText.trim().length === 0;

  const typingTimeoutRef = useRef<number | null>(null);
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const { channel: typingChannel } = useChannel(
    "hipnode-livechat-typing-status"
  );

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
    userTypingChange({
      e,
      setMessageText,
      typingChannel,
      userInfo,
      chatroomId,
      typingTimeoutRef,
    });
  };

  const currentUser = userInfo;

  const { channel } = useChannel("hipnode-livechat");

  const receiverUserId = chatroomUsers[1]?.id;

  const handleFormLogic = async () => {
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

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormLogic();
  };

  useEffect(() => {
    if (!isInputDisabled) {
      inputBox.current?.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    adjustHeight(inputBox.current);
  }, [messageText]);

  const isChatroomUserTyping = useMemo(() => {
    if (!userTyping) return false;
    return (
      userTyping.isTyping &&
      userTyping.chatroomId === chatroomId &&
      userTyping.userId !== userInfo.id
    );
  }, [userTyping, chatroomId, userInfo.id]);

  const userTypingUsername = userTyping?.username;

  useChannel("hipnode-livechat-typing-status", (message) => {
    setUserTyping(message.data);
  });

  if (!chatroomId || isLoading) return null;

  return (
    <ChatBoxInputContent
      messageText={messageText}
      setMessageText={setMessageText}
      isChatroomUserTyping={isChatroomUserTyping}
      userTypingUsername={userTypingUsername}
      handleFormLogic={handleFormLogic}
      handleFormSubmission={handleFormSubmission}
      inputBox={inputBox}
      handleTyping={handleTyping}
      setShowEmojiPicker={setShowEmojiPicker}
      showEmojiPicker={showEmojiPicker}
      data={data}
    />
  );
};

export default ChatPageInput;

import DOMPurify from "dompurify";

import { handleEmojiSelectProps } from "@/types/chatroom.index";

export const isOnlyEmoji = (string: string) => {
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+$/u;
  return emojiRegex.test(string);
};

export const isUrl = (str: string) => {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/;
  return urlRegex.test(str);
};

export const extractUrls = (text: string) => {
  if (typeof text !== "string" || text.length === 0) {
    return [];
  }
  const urlRegex = /https?:\/\/[^\s]+/g;
  let match;
  let lastIndex = 0;
  const segments = [];

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, match.index),
        isUrl: false,
      });
    }
    segments.push({ text: match[0], isUrl: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.substring(lastIndex), isUrl: false });
  }

  return segments;
};

export const formatTextWithLineBreaks = (text: string) => {
  const lineBreaksHtml = text.replace(/\n/g, "<br>");
  const sanitizedHtml = DOMPurify.sanitize(lineBreaksHtml);
  return { __html: sanitizedHtml };
};

export const handleEmojiSelect = ({
  emoji,
  messageText,
  setMessageText,
}: handleEmojiSelectProps) => {
  const emojiCharacter = emoji.native;
  const currentValue = messageText;
  const updatedValue = currentValue + emojiCharacter;
  setMessageText(updatedValue);
};

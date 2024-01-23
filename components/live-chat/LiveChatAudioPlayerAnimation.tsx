import { LiveChatAudioPlayerAnimationProps } from "@/types/chatroom.index";

const animationLineHeights = [
  "h-1.5",
  "h-3",
  "h-[1.125rem]",
  "h-6",
  "h-3",
  "h-1.5",
  "h-3.5",
  "h-6",
  "h-3.5",
  "h-1.5",
];

const LiveChatAudioPlayerAnimation = ({
  isPlaying,
  isMessageFromCurrentUser,
}: LiveChatAudioPlayerAnimationProps) => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <span
          key={index}
          className={`${
            isPlaying ? "liveChatAudioAnimation" : animationLineHeights[index]
          }  w-0.5 max-w-[2px] rounded-[1px]  ${
            isMessageFromCurrentUser ? "bg-white" : "bg-red-80"
          }`}
        />
      ))}
    </>
  );
};

export default LiveChatAudioPlayerAnimation;

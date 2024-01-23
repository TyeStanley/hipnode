import { useState } from "react";
import Image from "next/image";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import OutlineIcon from "../icons/outline-icons";
import { EmojiData, LiveChatInputProps } from "@/types/chatroom.index";
import { ChatAudioRecorder } from "../chat-page";
import { handleEmojiSelect } from "@/utils/chat-page-styling";

const LiveChatInput = ({
  open,
  inputBox,
  messageText,
  handleTyping,
  handleKeyDown,
  isInputDisabled,
  showEmojiPicker,
  setShowEmojiPicker,
  setMessageText,
  droppedFile,
  setDroppedFile,
}: LiveChatInputProps) => {
  const [recordingAudio, setRecordingAudio] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      {recordingAudio && (
        <p className="animate-pulse self-start text-red-80">Recording...</p>
      )}
      <div className="flex justify-between gap-2">
        <div className="flex w-full gap-1">
          <button className="flex-center" type="button" onClick={open}>
            <OutlineIcon.Link className="fill-sc-4" />
          </button>
          <textarea
            ref={inputBox}
            value={messageText}
            placeholder="Type here your message..."
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            disabled={isInputDisabled}
            className="bg-light_dark-4 z-10 flex h-6 w-full resize-none text-sc-4 outline-none placeholder:text-sc-4"
          />
        </div>
        <figure className="relative flex cursor-pointer items-center justify-center gap-2">
          <Image
            src="/smiley.svg"
            alt="smiley"
            width={24}
            height={24}
            className="rounded-full"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <ChatAudioRecorder
            setRecordingAudio={setRecordingAudio}
            droppedFile={droppedFile}
            setDroppedFile={setDroppedFile}
            isSmallChatBox
          />

          {showEmojiPicker && (
            <div className="absolute bottom-[2.5rem] right-[-5.5rem]">
              <Picker
                data={data}
                onEmojiSelect={(emoji: EmojiData) =>
                  handleEmojiSelect({
                    emoji,
                    messageText,
                    setMessageText,
                  })
                }
                onClickOutside={() => setShowEmojiPicker(false)}
                perLine={7}
              />
            </div>
          )}
        </figure>
      </div>
    </div>
  );
};

export default LiveChatInput;

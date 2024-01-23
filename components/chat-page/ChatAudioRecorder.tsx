import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";

import OutlineIcon from "../icons/outline-icons";
import { formatTime } from "@/utils";
import useMediaPlayerStore from "@/app/mediaPlayerStore";
import { ChatAudioRecorderProps } from "@/types/chatroom.index";

const ChatAudioRecorder = ({
  setRecordingAudio,
  droppedFile,
  setDroppedFile,
  isSmallChatBox = false,
}: ChatAudioRecorderProps) => {
  const { setLiveRecordingDuration } = useMediaPlayerStore();
  const [duration, setDuration] = useState(0);
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const handleRecord = () => {
    if (droppedFile) return;
    if (!isRecording) {
      startRecording();
      setRecordingAudio(true);
    } else {
      setDuration(recordingTime);
      stopRecording();
      setRecordingAudio(false);
    }
  };

  const time = formatTime(recordingTime);

  useEffect(() => {
    if (!recordingBlob) return;
    const audioFile = new File([recordingBlob], `duration-${duration}`, {
      type: "audio/mpeg",
    });
    setLiveRecordingDuration(duration);
    setDuration(0);
    setDroppedFile(audioFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingBlob]);

  useEffect(() => {
    if (droppedFile) {
      stopRecording();
      setRecordingAudio(false);
    }
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droppedFile]);

  return (
    <button
      className={`flex justify-center ${droppedFile && "cursor-not-allowed"}`}
      type="button"
      onClick={handleRecord}
    >
      {isRecording && (
        <p
          className={`absolute top-4 justify-self-center px-1 py-0.5 text-red-80 ${
            isSmallChatBox && "translate-x-[-0.1rem] translate-y-[-3.2rem]"
          }`}
        >
          {time}
        </p>
      )}
      <OutlineIcon.Voice
        className={`${
          isRecording ? "animate-pulse stroke-red-80" : "stroke-sc-4"
        }`}
      />
    </button>
  );
};

export default ChatAudioRecorder;

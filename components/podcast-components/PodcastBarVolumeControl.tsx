"use client";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { Slider } from "../ui/slider";
import { ImCross } from "react-icons/im";

import { PodcastBarVolumeControlProps } from "@/types/podcast.index";
import { getVolumeIcon } from "@/utils";

const PodcastBarVolumeControl = ({
  handleVolumeChange,
  handleVolumeIconClick,
  handleCloseClick,
  volume,
  audioRef,
  dispatch,
}: PodcastBarVolumeControlProps) => {
  const VolumeSymbol = getVolumeIcon(volume);

  const onVolumeChanged = (newVolumeValue: number[]) => {
    handleVolumeChange({
      newVolume: newVolumeValue,
      audioRef,
      dispatch,
    });
  };

  return (
    <div className="flex cursor-pointer gap-3">
      <HoverCard openDelay={100} closeDelay={500}>
        <HoverCardTrigger>
          <div
            className="text-sc-1_light-2 text-lg md:text-2xl"
            onClick={handleVolumeIconClick}
          >
            <VolumeSymbol />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="-translate-y-4">
          <Slider
            orientation="vertical"
            defaultValue={volume}
            max={100}
            step={1}
            onValueChange={onVolumeChanged}
          />{" "}
        </HoverCardContent>
      </HoverCard>
      <div
        className="text-sc-1_light-2 flex items-center"
        onClick={handleCloseClick}
      >
        <p className="text-sm md:text-lg">
          <ImCross />
        </p>
      </div>
    </div>
  );
};

export default PodcastBarVolumeControl;

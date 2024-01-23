import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import CustomButton from "./CustomButton";
import FillIcon from "./icons/fill-icons";
import { Button } from "./ui/button";
import OutlineIcons from "./icons/outline-icons";

const AudioPlayer = () => {
  return (
    <section className="flex justify-between gap-[1.875rem] rounded-2xl bg-light p-5 dark:bg-dark-3">
      <div className="flex">
        <Image
          src="/images/get-shit-done.png"
          alt="Podcast Image"
          height={150}
          width={150}
          className="z-10"
        />
        <Image
          src="/images/record-player.svg"
          alt="Podcast Image"
          height={130}
          width={130}
          className="-ml-9"
        />
      </div>
      <div className="flex-1 flex-col">
        <h3 className="regular-12 text-sc-2 dark:text-light-2">
          Hipnode &bull; Episode 243
        </h3>
        <h2 className="semibold-18 mb-4 text-sc-2 dark:text-light-2">
          by Courtland Allen
        </h2>
        <div className="mb-4 flex w-full items-center gap-5">
          <Progress value={33} className="flex-1" />
          <p className="semibold-14 text-sc-2 dark:text-light-2">
            00:00 | 63:37
          </p>
        </div>
        <div className="flex w-full items-center gap-5">
          <CustomButton
            label="Play now"
            icon={FillIcon.Play}
            className="regular-16 items-end rounded-[1.25rem] bg-blue px-4 py-2 text-light"
          />
          <Button
            size="icon"
            className="rounded-full border border-sc-2 dark:border-sc-3"
          >
            <OutlineIcons.Share2 />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;

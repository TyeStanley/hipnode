import { StraightLine } from "@/components/icons/outline-icons/LineIcons";

const AvatarJoinStraight = () => {
  return (
    <div className="relative z-20 flex h-full flex-col items-center">
      <StraightLine className="absolute h-full w-10 translate-x-[-2.55rem] translate-y-[2.5rem]" />
      <StraightLine className="absolute h-full w-10 translate-x-[-2.55rem] translate-y-[3rem]" />
    </div>
  );
};

export default AvatarJoinStraight;

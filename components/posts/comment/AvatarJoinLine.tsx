import {
  StraightLine,
  CurveLine,
} from "@/components/icons/outline-icons/LineIcons";

const AvatarJoinLine = () => {
  return (
    <div className="relative flex h-full flex-col items-center">
      <StraightLine className="h-full w-10 grow basis-0" />
      <StraightLine className="absolute h-full w-10 grow basis-0 translate-y-[3.2rem]" />
      <div className="flex translate-y-[4.45rem]">
        <div className="w-10">
          <CurveLine />
        </div>
      </div>
    </div>
  );
};

export default AvatarJoinLine;

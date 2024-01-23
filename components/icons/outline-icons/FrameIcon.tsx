import { IconProps } from "@/types";

const FrameIcon = ({ children, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="11"
    viewBox="0 0 15 11"
    fill="none"
    className={className || "stroke-[#3F4354] dark:stroke-[#F7F7F7]"}
  >
    {children}
  </svg>
);

FrameIcon.Center = function FrameIconCenter() {
  return (
    <>
      <path d="M3 4H12" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M1 1H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M1 7H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M3 10H12" strokeLinecap="square" strokeLinejoin="round" />
    </>
  );
};

FrameIcon.Left = function FrameIconLeft() {
  return (
    <>
      <path d="M10 4H1" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M13 1H1" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M13 7H1" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M10 10H1" strokeLinecap="square" strokeLinejoin="round" />
    </>
  );
};

FrameIcon.Right = function FrameIconRight() {
  return (
    <>
      <path d="M5 4H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 1H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 7H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 10H14" strokeLinecap="square" strokeLinejoin="round" />
    </>
  );
};

FrameIcon.Point = function FrameIconPoint() {
  return (
    <>
      <path d="M5 4H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 4H3" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 1H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 1H3" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 7H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 7H3" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 10H14" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M2 10H3" strokeLinecap="square" strokeLinejoin="round" />
    </>
  );
};

export default FrameIcon;

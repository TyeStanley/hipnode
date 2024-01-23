import React from "react";

export default function ArrowLarge({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      className={className}
    >
      {children}
    </svg>
  );
}
ArrowLarge.Down = function ArrowLargeDown() {
  return (
    <path
      d="M19 5.5L10 14.5L1 5.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

ArrowLarge.Right = function ArrowLargeRight() {
  return (
    <path
      d="M5.5 1L14.5 10L5.5 19"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

"use client";

import { cn } from "@/lib/utils";

type HeartProps = {
  isLiked: boolean;
};

const Heart = ({ isLiked }: HeartProps) => {
  return (
    <svg
      width="30"
      height="32"
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 cursor-pointer")}
    >
      <rect
        width="30"
        height="30"
        rx="15"
        className={isLiked ? "fill-red-10" : "fill-[#F4F6F8] dark:fill-dark-4"}
      />

      <g filter={`${isLiked ? "url(#filter0_d_15412_138)" : ""}`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z"
          className={isLiked ? "fill-red-80" : "fill-[#C5D0E6]"}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_15412_138"
          x="1"
          y="5"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.411765 0 0 0 0 0.203922 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15412_138"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_15412_138"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Heart;

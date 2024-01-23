import { cn } from "@/lib/utils";

interface HipnodeHeaderLogoProps {
  clerkForm?: boolean;
  styles?: string;
}

const HipnodeHeaderLogo = ({ clerkForm = false, styles }: HipnodeHeaderLogoProps) => {
  const divStyles = clerkForm
    ? "h-[0.87rem] w-[0.87rem] sm:h-[1.2rem] sm:w-[1.2rem] bg-light-3"
    : "h-[1.625rem] w-[1.625rem] md:h-[1.875rem] md:w-[1.875rem] dark:bg-light bg-dark-2";

  const fillColor = clerkForm ? "fill-sc-2" : "fill-light dark:fill-dark-1";

  const strokeColor = clerkForm ? "stroke-sc-2" : "stroke-light dark:stroke-dark-1";

  const textStyles = clerkForm ? "text-xs sm:text-base font-bold text-red-90" : "bold-18 md:bold-26 text-red-90";

  const dotStyles = clerkForm ? "text-light-3" : "text-sc-1 dark:text-light";

  const divGap = clerkForm ? "gap-2 sm:gap-2.5 " : "gap-2.5";

  return (
    <div className={cn("flex items-center self-start", divGap, styles)}>
      <div className={cn("flex rounded-md p-1", divStyles)}>
        <svg
          className="h-full w-full"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Icon">
            <g id="Icon_2">
              <path
                id="h"
                d="M5.55866 14.0086C5.39479 14.0086 5.26071 13.9626 5.15642 13.8705C5.05214 13.7784 5 13.66 5 13.5154V0.493261C5 0.348571 5.05214 0.230189 5.15642 0.138113C5.26071 0.0460377 5.39479 0 5.55866 0H8.41899C8.58287 0 8.71695 0.0460377 8.82123 0.138113C8.92551 0.230189 8.97765 0.348571 8.97765 0.493261V4.89315C9.37989 4.48539 9.87151 4.16313 10.4525 3.92636C11.0484 3.67644 11.7337 3.55148 12.5084 3.55148C13.3724 3.55148 14.1397 3.72248 14.8101 4.06447C15.4953 4.40647 16.0317 4.91288 16.419 5.58372C16.8063 6.2414 17 7.05035 17 8.01056V13.5154C17 13.66 16.9479 13.7784 16.8436 13.8705C16.7393 13.9626 16.6052 14.0086 16.4413 14.0086H13.5587C13.4097 14.0086 13.2756 13.9626 13.1564 13.8705C13.0521 13.7784 13 13.66 13 13.5154V8.12895C13 7.51073 12.8287 7.0372 12.486 6.70835C12.1583 6.36636 11.6667 6.19536 11.0112 6.19536C10.4004 6.19536 9.90875 6.36636 9.53631 6.70835C9.16387 7.0372 8.97765 7.51073 8.97765 8.12895V13.5154C8.97765 13.66 8.92551 13.7784 8.82123 13.8705C8.71695 13.9626 8.58287 14.0086 8.41899 14.0086H5.55866Z"
                className={fillColor}
              />
              <path
                id="Vector 5"
                d="M19 16.5103C16.6988 18.7292 14.5 20.0001 11 20.0001C7.71377 20.0001 5.08988 18.5254 3 16.5103"
                className={strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      </div>
      <h1 className={cn(textStyles)}>
        Hipnode
        <span className={cn(dotStyles)}>.</span>
      </h1>
    </div>
  );
};

export default HipnodeHeaderLogo;

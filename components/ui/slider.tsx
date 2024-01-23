"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    orientation="vertical"
    ref={ref}
    className={cn(
      "relative flex w-2 h-40 touch-none select-none items-center justify-center -translate-x-1 -translate-y-3",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-40 w-2 grow overflow-hidden rounded-full bg-sc-5 dark:bg-dark-4">
      <SliderPrimitive.Range className="absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-red-60 hover:bg-red-80 focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50 " />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

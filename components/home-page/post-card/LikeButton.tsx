"use client";

import { useState } from "react";

import FillIcon from "@/components/icons/fill-icons";
import { LikeButtonProps } from "@/types/posts";

const LikeButton = ({ toggleLike, additionalClasses }: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleLike();

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button type="button" onClick={handleClick} className="mr-2.5 flex">
      <FillIcon.Heart
        className={`${
          isAnimating ? "animate-heartBeat" : ""
        } hidden cursor-pointer md:flex ${additionalClasses}`}
      />
    </button>
  );
};

export default LikeButton;

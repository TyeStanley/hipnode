"use client";

import React from "react";
import FillIcon from "../icons/fill-icons";
import { useTheme } from "@/context/ThemeProvider";

const Theme = () => {
  const { mode, setMode } = useTheme();

  const setTheme = () => {
    if (mode === "light") {
      setMode("dark");
      localStorage.theme = "dark";
    } else {
      setMode("light");
      localStorage.theme = "light";
    }
  };

  return (
    <section
      className="flex scale-90 cursor-pointer items-center gap-1 rounded-full bg-light-2 p-1 dark:bg-dark-2"
      onClick={setTheme}
    >
      <div className="rounded-full bg-light p-1.5 dark:bg-dark-1">
        <FillIcon.Sun className="fill-red-80 dark:fill-dark-4" />
      </div>

      <div className="rounded-full bg-light-2 p-1.5 dark:bg-dark-4">
        <FillIcon.Moon className="fill-sc-5" />
      </div>
    </section>
  );
};

export default Theme;

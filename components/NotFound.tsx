"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = ({
  isErrorPage = false,
  isProfilePage = false,
}: {
  isErrorPage?: boolean;
  isProfilePage?: boolean;
}) => {
  let buttonText;

  if (isErrorPage) {
    buttonText = "Something went wrong";
  } else if (isProfilePage) {
    buttonText = "404. User was not found";
  } else {
    buttonText = "404. Page was not found";
  }

  return (
    <main
      className={`flex-center w-screen ${
        isProfilePage ? "mt-[-12rem] h-screen" : "h-screen"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-center">
          <p className="text-7xl font-bold text-red-80">Hipno</p>
          <motion.p
            className="text-7xl font-bold text-red-80"
            animate={{
              rotate: [0, 0, 200, 160, 195, 165, 190, 170, 180],
              y: [0, 8],
              x: [0, -1],
            }}
            transition={{
              rotate: {
                duration: 5,
                ease: "easeInOut",
                times: [0, 0.15, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
              },
              x: {
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.6,
              },
              y: {
                duration: 0.1,
                ease: "easeInOut",
                delay: 0.6,
              },
            }}
          >
            d
          </motion.p>
          <p className="text-7xl font-bold text-red-80">e</p>

          <motion.p
            className="text-7xl font-bold text-white"
            animate={{
              x: [0, 0, 30],
              y: [0, 0, 46, 40, 46, 46, 600],
              opacity: [1, 1, 0],
            }}
            transition={{
              x: {
                duration: 3,
                delay: 0.3,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              },
              y: {
                duration: 3,
                ease: "easeInOut",
                delay: 0.3,
                times: [0, 0.5, 0.55, 0.6, 0.65, 0.8, 1],
              },
              opacity: {
                duration: 3,
                ease: "easeInOut",
                delay: 0.3,
                times: [0, 1, 1],
              },
            }}
          >
            .
          </motion.p>
        </div>
        <p className="text-3xl text-sc-4">{buttonText}</p>
        <Link
          href="/"
          className="rounded bg-red-80 px-4 py-2 text-xl font-semibold text-white"
        >
          Let&apos;s go home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

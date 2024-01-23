"use client";

import React, { useReducer, useMemo } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import HipnodeIcon from "../icons/HipnodeIcon";
import OutlineIcon from "../icons/outline-icons";
import { NavbarContentProps } from "@/types/searchbar.index";
import { reducer, initialState } from "./globalSearchReducer";
import { NavLinks, GlobalSearchBar, NotificationButton, UserButton } from ".";
import { ChatPageLink } from "../live-chat";

const NavbarContent = ({
  userInfo,
  currentUserId,
  lastChecked,
  userChatrooms,
}: NavbarContentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenClose = () => {
    dispatch({ type: state.showSearch ? "HANDLE_CLOSE" : "HANDLE_OPEN" });
  };

  const additionalStyles = useMemo(() => {
    return state.showSearch
      ? "flex fixed inset-x-4 lg:inset-x-0 lg:w-full z-20 top-5 lg:top-0"
      : "hidden lg:flex";
  }, [state.showSearch]);

  return (
    <>
      <div className="flex-between mx-auto flex max-w-[90rem] flex-1 px-5 py-3 md:py-5 lg:gap-5 lg:px-10">
        <section className="flex  items-center gap-5 lg:w-[10.75rem]">
          <Link href="/">
            <HipnodeIcon styles="lg:hidden" />
            <HipnodeHeaderLogo styles="hidden lg:flex" />
          </Link>
          <div className="flex" onClick={handleOpenClose}>
            <OutlineIcon.Search className="cursor-pointer stroke-sc-5 dark:stroke-sc-4 lg:hidden" />
          </div>
        </section>

        <section className="relative flex max-w-[49rem] flex-1 gap-5 md:justify-center lg:justify-between">
          <NavLinks />
          <GlobalSearchBar
            additionalStyles={additionalStyles}
            state={state}
            dispatch={dispatch}
          />
        </section>

        <section className="flex max-w-[17.9375rem] items-center gap-5 md:gap-[1.56rem]">
          <SignedIn>
            <ChatPageLink userInfo={userInfo} userChatrooms={userChatrooms} />
            <NotificationButton
              currentUserId={currentUserId}
              lastChecked={lastChecked ?? new Date()}
            />
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-up"
              className="text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2"
            >
              Signup
            </Link>

            <Link
              href="/sign-in"
              className="rounded-lg bg-red-80 px-6 py-2 text-[0.875rem] font-semibold leading-[1.375rem] text-white hover:bg-red-80/80"
            >
              Login
            </Link>
          </SignedOut>
        </section>
      </div>
      {state.showSearch && (
        <div className="fixed inset-0 z-10" onClick={handleOpenClose} />
      )}
    </>
  );
};

export default NavbarContent;

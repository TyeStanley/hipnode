import Link from "next/link";

import Message from "@/components/messagePopover/Message";

const MessagesPopover = () => {
  return (
    <div className="relative w-[21rem]">
      {/* NOTE - To make the triangle */}
      <div
        className="absolute bottom-[14.94rem] z-10 h-[11.6875rem] w-[21rem] bg-message-popover bg-top bg-no-repeat
          dark:bg-dark-message-popover"
      />

      {/* NOTE - To make the message box */}
      <div
        className="relative z-10 flex h-[26.125rem] flex-col items-stretch 
          justify-between rounded-lg bg-light pb-5 dark:bg-dark-4"
      >
        <div className="flex flex-col">
          <p className="semibold-18 pb-[0.625rem] pl-5 pt-5 text-sc-2 dark:text-light-2">
            Messages
          </p>
          <Message />
        </div>
        <Link
          href="/chat"
          className="semibold-14 font-feature inline-flex justify-center py-0 text-blue hover:underline"
        >
          See all in Messenger
        </Link>
      </div>

      {/* NOTE - To make the blur effect */}
      <div
        className="absolute left-[1.44rem] top-[3.81rem] h-[22.9375rem] w-[18rem] shrink-0 bg-sc-3 
          opacity-50 blur-[3.125rem] dark:bg-dark-1"
      />
    </div>
  );
};

export default MessagesPopover;

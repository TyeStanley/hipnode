import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// NOTE - Delete this dummy data when we have real data
import { dummyMessages } from "@/constants";

const Message = () => {
  return (
    <div className="flex flex-col">
      {dummyMessages.slice(0, 5).map((message) => (
        <Link
          // TODO - Change this to the real link
          href="/"
          key={message.name}
          className="mx-2 flex flex-row items-center justify-between px-3 py-[0.625rem] hover:rounded-[0.375rem] 
            hover:bg-sc-6 dark:hover:bg-dark-3"
        >
          <div className="flex flex-row items-center gap-[0.62rem]">
            <Avatar>
              <AvatarImage src={message.avatar} />
              <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex w-[11.125rem] flex-row items-baseline">
                <p className="semibold-16 mr-1 truncate text-sc-2 dark:text-light-2">
                  {message.name}
                </p>
                <p className="regular-12 line-clamp-1 text-sc-3">
                  {message.date}
                </p>
              </div>
              <p className="regular-12 line-clamp-1 text-sc-3">
                {message.message}
              </p>
            </div>
          </div>
          {message.newMessageCounts === 0 ? (
            <div className="pl-6" />
          ) : (
            <div
              className="semibold-14 font-feature flex h-[1.125rem] w-[1.125rem] shrink-0 items-center 
                    justify-center gap-[0.625rem] rounded-[0.875rem] bg-red-80 p-1 text-light"
            >
              {message.newMessageCounts}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Message;

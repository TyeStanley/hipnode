import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import useChatStore from "@/app/chatStore";

const ChatBoxHeader = () => {
  const { otherUser, showChatRoomList, setShowChatRoomList } =
    useChatPageContext();
  const { chatroomUsers, onlineUsers } = useChatStore();
  const otherUserInfo = chatroomUsers[1] ?? otherUser;

  const isOtherUserOnline = onlineUsers
    ? onlineUsers.includes(otherUserInfo.id)
    : false;

  const userOnlineStatus = isOtherUserOnline ? (
    <span className="semibold-12 text-green">Online</span>
  ) : (
    <span className="semibold-12 text-sc-4">Offline</span>
  );

  if (!otherUserInfo && !otherUser) return null;

  return (
    <header className="flex w-full items-center justify-between gap-2 bg-light-2 px-4 py-3 dark:bg-dark-2 md:px-6 md:py-5">
      <figure className="relative flex items-center gap-4 md:gap-4">
        <button
          onClick={() => setShowChatRoomList(!showChatRoomList)}
          className="bg-light_dark-4 flex-center h-[1.875rem] w-[1.875rem] shrink-0 rounded-lg text-lg text-sc-4 md:hidden"
        >
          <IoIosArrowBack />
        </button>
        <Link href={`/profile/${otherUserInfo.id}`}>
          <Image
            src={otherUserInfo.image}
            alt={`profile image for ${otherUserInfo.name}`}
            height={56}
            width={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        </Link>
        <figcaption className="flex flex-col justify-between truncate whitespace-nowrap">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:gap-2">
            <span className="bold-14 md:bold-18 text-sc-2_light truncate">
              {otherUserInfo.name}
            </span>
            {userOnlineStatus}
          </div>
          <p className="regular-12 md:regular-14 text-sc-4 dark:text-light-2">
            @{otherUserInfo.username}
          </p>
        </figcaption>
      </figure>
      <Link
        href={`/profile/${otherUserInfo.id}`}
        className="semibold-14 md:flex-center hidden shrink-0 rounded-md bg-red-80 px-3 py-2 text-light md:px-4 md:py-3"
      >
        View Profile
      </Link>
    </header>
  );
};

export default ChatBoxHeader;

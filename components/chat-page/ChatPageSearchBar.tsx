import { useState, useEffect, useMemo } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

import OutlineIcon from "../icons/outline-icons";
import { getAllUsers } from "@/lib/actions/user.actions";
import useChatStore from "@/app/chatStore";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";

const ChatPageSearchBar = () => {
  const { setChatroomUsers, createNewChatroom } = useChatStore();
  const { userInfo, setIsLoading, setMessages, setShowChatRoomList } =
    useChatPageContext();

  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // temporary solution. Will update to fetch following users with this is integrated. For now will fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  const displayUsers = useMemo(() => {
    if (!searchText.length) return [];

    const filteredUsers = allUsers.filter(
      (user) =>
        (user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.name.toLowerCase().includes(searchText.toLowerCase())) &&
        user.id !== userInfo.id
    );

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleUserClick = async (user: User) => {
    if (window.innerWidth < 768) {
      setShowChatRoomList(false);
    }
    setIsLoading(true);
    setMessages([]);
    const { id, name, username, picture: image } = user;
    setChatroomUsers([
      userInfo,
      {
        id,
        username,
        image,
        name,
      },
    ]);

    try {
      createNewChatroom();
      setSearchText("");
    } catch (error) {
      console.error("Failed to create new chatroom:", error);
    }
  };

  return (
    <section
      className="relative flex border-b border-sc-6 bg-light px-4 pb-3 dark:border-dark-4
    dark:bg-dark-2"
    >
      {displayUsers.length > 0 && (
        <ul className="absolute left-0 z-10 flex h-fit max-h-[25rem] w-full translate-y-16 flex-col overflow-scroll border border-sc-6 dark:border-dark-4">
          {displayUsers.map((user) => (
            <li
              onClick={() => handleUserClick(user)}
              key={user.id}
              className="flex cursor-pointer justify-between border border-sc-6 bg-light px-4 py-6 hover:bg-light-2 dark:border-dark-4 dark:bg-dark-2
                hover:dark:bg-dark-4"
            >
              <div className="flex h-12 w-12">
                <Image
                  src={user.picture}
                  alt={`profile image for ${user.username}`}
                  height={48}
                  width={48}
                  className="shrink-0 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-between">
                <span className="bold-14 text-sc-2_light text-right">
                  @{user.username}
                </span>
                <span className="regular-14 text-right text-sc-4 dark:text-light-2">
                  {user.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex w-full justify-between gap-3 rounded-lg bg-sc-6 px-5 py-3 dark:bg-dark-4">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-sc-6 text-sc-4 outline-none dark:bg-dark-4"
          placeholder="Type here to search..."
        />
        <OutlineIcon.Search className="cursor-pointer stroke-sc-4" />
      </div>
    </section>
  );
};

export default ChatPageSearchBar;

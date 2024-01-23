import { create } from "zustand";

import {
  createChatroom,
  isExistingChatroom,
} from "@/lib/actions/chatroom.actions";
import { ChatroomUser, UserInfo } from "@/types/chatroom.index";
import { API_RESULT } from "@/utils/chat-functions";
interface ChatStoreState {
  userId: number | null;
  setUserId: (id: number | null) => void;
  chatroomUsers: ChatroomUser[];
  setChatroomUsers: (users: ChatroomUser[]) => void;
  createNewChatroom: () => Promise<API_RESULT.SUCCESS | undefined>;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  chatroomId: number | null;
  setChatroomId: (id: number | null) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  onlineUsers: number[] | null;
  setOnlineUsers: (users: number[] | null) => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  userId: null,
  setUserId: (id: number | null) => set({ userId: id }),
  chatroomUsers: [],
  setChatroomUsers: (users: ChatroomUser[]) => set({ chatroomUsers: users }),
  createNewChatroom: async () => {
    const { chatroomUsers } = useChatStore.getState();
    if (chatroomUsers.length > 0) {
      const userIds = chatroomUsers.map((user) => user.id);
      const currentChatroom = await isExistingChatroom(userIds);

      if (currentChatroom !== null) {
        set({ chatroomId: currentChatroom });
        return API_RESULT.SUCCESS;
      } else {
        const newChatroomId = await createChatroom(userIds);
        set({ chatroomId: newChatroomId.id });
        return API_RESULT.SUCCESS;
      }
    }
  },

  showChat: false,
  setShowChat: (show: boolean) => set({ showChat: show }),
  chatroomId: null,
  setChatroomId: (id: number | null) => set({ chatroomId: id }),
  userInfo: { id: 0, username: "", image: "" },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  onlineUsers: null,
  setOnlineUsers: (users: number[] | null) => set({ onlineUsers: users }),
}));

export default useChatStore;

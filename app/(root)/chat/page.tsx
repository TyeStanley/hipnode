import { auth } from "@clerk/nextjs";

import ChatPageWrapper from "@/components/chat-page/ChatPageWrapper";
import { getUserChatrooms } from "@/lib/actions/chatroom.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";

const Chat = async () => {
  const { userId: clerkUserId } = auth();
  let userInfo;
  if (clerkUserId) {
    const user = await getUserByClerkId(clerkUserId);
    if (user) {
      userInfo = {
        id: user.id,
        username: user.username,
        image: user.picture,
        name: user.name,
      };
    }
  }
  if (!userInfo || !clerkUserId) return null;

  const chatrooms = (await getUserChatrooms()) ?? [];
  return <ChatPageWrapper chatrooms={chatrooms} userInfo={userInfo} />;
};

export default Chat;

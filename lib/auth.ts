import { auth, currentUser } from "@clerk/nextjs/server";

export const verifyAuth = async (
  message = "You must be logged in to perform this action.",
  canCallFunction = true
) => {
  if (canCallFunction) {
    const user = auth();
    if (!user) throw new Error(message);
  }

  const userData = await currentUser();
  const userId = userData?.publicMetadata?.userId as number;
  const clerkId = userData?.id;
  const loggedInUserImage = userData?.imageUrl;
  const userName = userData?.username;
  const fullName = [userData?.firstName, userData?.lastName]
    .filter(Boolean)
    .join(" ");

  return {
    clerkId,
    userId,
    loggedInUserImage,
    userName,
    fullName,
  };
};

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getUserByClerkId } from "@/lib/actions/user.actions";
import { NotificationProvider } from "../contexts/NotificationContext";
import Navbar from "@/components/navbar/Navbar";
import PodcastPlayer from "@/components/podcast-components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import LiveChatWrapper from "@/components/live-chat/LiveChatWrapper";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let user;
  const { userId } = auth();
  if (userId) {
    user = await getUserByClerkId(userId);
    if (!user?.onboarding) redirect("/onboarding");
  }

  return (
    <main className="lg:h-[100vh]">
      {/* NOTE - when a user is logged in, use NotificationProvider */}
      {user ? (
        <NotificationProvider
          currentUserId={user.id}
          lastChecked={user.notificationLastChecked}
        >
          <Navbar />
          {children}
        </NotificationProvider>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
      <LiveChatWrapper />
      <PodcastPlayer />
      <Toaster />
    </main>
  );
}

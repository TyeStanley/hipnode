"use server";

import { type User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { UserAnswersType } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUserType } from "@/types/posts";
import { verifyAuth } from "../auth";

export async function getUsersByName(name: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching user by name:", error);
    throw error;
  }
}

export async function getUserByClerkId(
  clerkId: string,
  includeOnboarding = true
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        onboarding: includeOnboarding,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function createUser(data: createUserType) {
  try {
    const existingUsers = await prisma.user.findMany({
      where: {
        username: data.username,
      },
    });

    if (existingUsers.length > 0) {
      return null;
    }

    const user = await prisma.user.create({
      data,
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

interface checkUserByClerkIdProps {
  clerkId: string;
}

export async function checkUserForClerkId({
  clerkId,
}: checkUserByClerkIdProps) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user by Clerk ID:", error);
    return false;
  }
}

export async function checkUserForBio({ clerkId }: checkUserByClerkIdProps) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (user && user.bio) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user by Clerk ID:", error);
    return false;
  }
}

export async function updateUser(clerkId: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: {
        clerkId,
      },
      data,
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function updateProfileInfo(data: Partial<User>) {
  const { userId } = await verifyAuth(
    "You must be logged in to edit profile.",
    false
  );

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return "Successfully updated profile info.";
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function getOnboardingByUserId(userId: number) {
  try {
    const onboarding = await prisma.onboarding.findUnique({
      where: {
        userId,
      },
    });

    return onboarding;
  } catch (error) {
    console.error("Error fetching onboarding by userId:", error);
    throw error;
  }
}

export async function createOnboarding(data: UserAnswersType) {
  try {
    const { clerkId } = await verifyAuth(
      "You must have a valid session to create an onboarding.",
      false
    );
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      throw new Error(`No user found for clerkId: ${clerkId}`);
    }

    const onboardingData = {
      businessStage: data.answerQuestion1 || "",
      codeAbility: data.answerQuestion2 || "",
      interests: data.answersQuestion3,
      userId: user.id,
      isOnboarded: true,
    };

    await prisma.onboarding.create({
      data: onboardingData,
    });

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Error creating Onboarding:", error);
    throw error;
  }
}

export async function getAllOnboarding() {
  try {
    const onboardings = await prisma.onboarding.findMany();

    return onboardings;
  } catch (error) {
    console.error("Error fetching all onboardings:", error);
    throw error;
  }
}

export async function isLoggedInUserOnboarded(
  clerkId: string
): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      throw new Error(`No user found for clerkId: ${clerkId}`);
    }

    const onboarding = await prisma.onboarding.findUnique({
      where: {
        userId: user.id,
      },
    });

    return !!onboarding;
  } catch (error) {
    console.error("Error checking if user is onboarded:", error);
    throw error;
  }
}

export async function updateNotificationLastChecked(id: number): Promise<void> {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        notificationLastChecked: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating notification last checked:", error);
    throw error;
  }
}

export async function getNotificationLastChecked(
  id: number
): Promise<{ notificationLastChecked: Date | null }> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        notificationLastChecked: true,
      },
    });

    if (!user) throw new Error(`No user found for id: ${id}`);

    return user;
  } catch (error) {
    console.error("Error finding user", error);
    throw error;
  }
}

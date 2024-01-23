"use server";

import prisma from "@/lib/prisma";
import { verifyAuth } from "../auth";
import { CreateShowsType } from "@/types/shows.index";

export async function getAllShows() {
  try {
    const shows = await prisma.shows.findMany();

    return shows;
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
}

export async function getAllUsersShows() {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content."
    );

    const subscribedShows = await prisma.usersSubscribedToShows.findMany({
      where: {
        userId,
      },
      include: {
        show: true,
      },
    });

    const shows = subscribedShows.map((subscription) => subscription.show);

    return shows;
  } catch (error) {
    console.error(`Error fetching user's subscribed shows:`, error);
    throw error;
  }
}

export async function getTopFiveShows(showIds: number[]) {
  try {
    if (!showIds || showIds.length !== 5) {
      throw new Error(`Exactly five show IDs must be provided`);
    }

    const shows = await prisma.shows.findMany({
      where: {
        id: {
          in: showIds,
        },
      },
    });

    return shows;
  } catch (error) {
    console.error(`Error fetching top five shows:`, error);
    throw error;
  }
}

export async function createShow(showData: CreateShowsType) {
  try {
    const { userId } = await verifyAuth(
      "You must be logged in to get Post Content."
    );
    const existingShow = await prisma.shows.findFirst({
      where: {
        name: showData.name,
      },
    });

    if (existingShow) {
      throw new Error(`Show with the name '${showData.name}' already exists`);
    }

    const newShow = await prisma.shows.create({
      data: { ...showData, userId },
    });

    return newShow;
  } catch (error) {
    console.error(`Error in creating show:`, error);
    throw error;
  }
}

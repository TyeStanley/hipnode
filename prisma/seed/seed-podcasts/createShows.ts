import prisma from "../../../lib/prisma";
import { faker } from "@faker-js/faker";
import { Shows, User } from "@prisma/client";

export async function createShows(users: User[]): Promise<Shows[]> {
  try {
    const showCount = 12;
    const minSubscriptionsPerUser = 3;

    const showsPromises = Array.from({ length: showCount }).map(async () => {
      const showName = faker.lorem.words(4);
      const show = await prisma.shows.create({
        data: {
          name: showName,
          userId: users[Math.floor(Math.random() * users.length)].id,
        },
      });

      const userSubscriptions: User[] = [];
      while (userSubscriptions.length < minSubscriptionsPerUser) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (!userSubscriptions.includes(randomUser)) {
          userSubscriptions.push(randomUser);
        }
      }

      const subscriptionPromises = userSubscriptions.map(async (user) => {
        await prisma.usersSubscribedToShows.create({
          data: {
            userId: user.id,
            showId: show.id,
          },
        });
      });

      await Promise.all(subscriptionPromises);

      return show;
    });

    return Promise.all(showsPromises);
  } catch (error) {
    console.error(`Failed to create shows:`, error);
    return [];
  }
}

import { faker } from "@faker-js/faker";
import { Shows } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function createPodcastsForShows(show: Shows) {
  const podcastCount = faker.number.int({ min: 4, max: 10 });
  const podcastPromises = Array.from({ length: podcastCount }).map(
    async (_, index) => {
      const podcast = await prisma.podcast.create({
        data: {
          title: faker.lorem.words(4),
          episodeNumber: faker.number.int({ min: 1, max: 100 }),
          details: faker.lorem.paragraph(),
          url: faker.internet.url(),
          image: faker.image.avatar(),
          userId: show.userId,
          showId: show.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          clerkId: String(show.userId),
          contentType: "Podcast",
        },
      });
      return podcast;
    }
  );
  await Promise.all(podcastPromises);
}

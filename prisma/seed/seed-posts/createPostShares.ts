import { faker } from "@faker-js/faker";
import { Post, User } from "@prisma/client";
import prisma from "../../../lib/prisma";

export async function createShares(users: User[], posts: Post[]) {
  try {
    const sharePromises = users.flatMap((user) => {
      const sharesCount = faker.number.int({ min: 1, max: 5 });

      return Array.from({ length: sharesCount }).map(() => {
        const randomPost =
          posts[faker.number.int({ min: 1, max: posts.length - 1 })];

        return prisma.share.create({
          data: {
            userId: user.id,
            postId: randomPost.id,
            createdAt: faker.date.past(),
          },
        });
      });
    });

    await Promise.all(sharePromises);
  } catch (error) {
    console.error("Failed to create shares:", error);
  }
}

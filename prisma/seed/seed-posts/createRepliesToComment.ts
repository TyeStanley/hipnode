import { faker } from "@faker-js/faker";
import { Comment, User } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function createRepliesToComment(
  comment: Comment,
  user: User,
  repliesCount: number
) {
  try {
    const repliesPromises = Array.from({ length: repliesCount }).map(() => {
      return prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: user.id,
          postId: comment.postId,
          parentId: comment.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          isEdited: faker.datatype.boolean(),
        },
      });
    });
    return await Promise.all(repliesPromises);
  } catch (error) {
    console.error(`Failed to create replies for comment ${comment.id}:`, error);
  }
}

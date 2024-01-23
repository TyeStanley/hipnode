import { faker } from "@faker-js/faker";
import { Comment, User } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function createLikesForComment(comment: Comment, user: User) {
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: user.id,
          commentId: comment.id,
        },
      },
    });

    if (existingLike) {
      return existingLike;
    }

    return await prisma.like.create({
      data: {
        userId: user.id,
        commentId: comment.id,
        liked: faker.datatype.boolean(),
      },
    });
  } catch (error) {
    console.error(`Failed to create likes for comment ${comment.id}:`, error);
  }
}

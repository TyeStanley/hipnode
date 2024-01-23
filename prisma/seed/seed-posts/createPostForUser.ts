import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";
import { getBlurData } from "../../../lib";

export async function createPostForUser(user: User, groupId: number) {
  try {
    const postImage = faker.image.urlLoremFlickr({ category: "nature" });
    const blurPostImage = await getBlurData(postImage);

    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        heading: faker.lorem.sentence(),
        authorId: user.id,
        groupId,
        viewCount: faker.number.int({ min: 0, max: 10 }),
        isEdited: faker.datatype.boolean(),
        image: postImage,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        clerkId: user.clerkId,
        contentType: "Post",
        blurImage: blurPostImage.blurDataURL,
        imageWidth: blurPostImage.width || 700,
        imageHeight: blurPostImage.height || 700,
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to create post for user ${user.id}:`, error);
  }
}

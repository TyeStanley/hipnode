import { Group, Post, Tag, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import {
  createCommentsForPost,
  createLikesForComment,
  createPostForUser,
  createRepliesToComment,
  assignTagsToPost,
} from "./index";

async function handleInteractionsForPost(post: Post, user: User) {
  const comments = await createCommentsForPost(post, user);

  try {
    if (comments) {
      for (const comment of comments) {
        await createLikesForComment(comment, user);

        const repliesCount = faker.number.int({ min: 1, max: 2 });
        const replies = await createRepliesToComment(
          comment,
          user,
          repliesCount
        );

        if (!replies) {
          return;
        }

        for (const reply of replies) {
          await createLikesForComment(reply, user);
        }
      }
    }
  } catch (error) {
    console.error(`Failed to handle interactions for post ${post.id}:`, error);
  }
}

export async function createPosts(users: User[], tags: Tag[], groups: Group[]) {
  try {
    const allPosts = [];

    for (const user of users) {
      const postCount = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < postCount; i++) {
        const randomGroup = groups[Math.floor(Math.random() * groups.length)];
        const post = await createPostForUser(user, randomGroup.id);
        if (!post) {
          console.error(`Failed to create post for user ${user.id}`);
          continue;
        }

        await assignTagsToPost(post, tags);
        await handleInteractionsForPost(post, user);

        allPosts.push(post);
      }
    }

    return allPosts;
  } catch (error) {
    console.error(`Failed to create posts:`, error);
  }
}

import { Follower, User } from "@prisma/client";

import prisma from "../../../lib/prisma";

export async function createFollowings(users: User[]) {
  const followers: Follower[] = [];

  for (let follower = 1; follower <= users.length; follower++) {
    const numberOfFollowings = Math.floor(Math.random() * (9 - 2 + 1)) + 2;

    let followingsAdded = 0;
    while (followingsAdded < numberOfFollowings) {
      const followed = Math.floor(Math.random() * users.length) + 1;
      if (follower === followed) continue;

      followers.push({
        followerId: follower,
        followedId: followed,
      } as Follower);

      followingsAdded++;
    }
  }

  await prisma.follower.createMany({
    data: followers,
    skipDuplicates: true,
  });
}

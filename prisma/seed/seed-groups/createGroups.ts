import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createGroups() {
  const groupCount = 50;
  const users = await prisma.user.findMany();

  const membersToConnect = [users[0], users[1], users[2]];

  const groupPromises = users.slice(0, groupCount).map(async (user) => {
    const group = await prisma.group.create({
      data: {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        createdBy: user.id,
        coverImage: faker.image.urlLoremFlickr({ category: "nature" }),
        logo: faker.image.urlLoremFlickr({ category: "business" }),
        admins: {
          connect: user,
        },
        members: {
          connect: [user, ...membersToConnect],
        },
      },
    });
    return group;
  });
  const groups = await Promise.all(groupPromises);
  return groups;
}

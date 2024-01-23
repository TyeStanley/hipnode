import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";
export async function createUsers() {
  const userPromises = Array.from({ length: 10 }).map(async (_, index) => {
    const username = `${faker.internet.userName()}${index}`;

    return prisma.user.create({
      data: {
        clerkId: faker.string.uuid(),
        name: faker.internet.userName(),
        username,
        email: `${faker.internet.email()}${index}`,
        password: `${faker.internet.password()}${index}`,
        role: "USER",
        bio: faker.lorem.sentence(),
        picture: faker.image.avatar(),
        location: faker.location.state(),
        website: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        points: Math.floor(Math.random() * 991) + 10,
        title: faker.person.jobTitle(),
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
      },
    });
  });
  return await Promise.all(userPromises);
}

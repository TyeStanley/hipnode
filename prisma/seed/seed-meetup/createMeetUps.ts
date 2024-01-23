import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createMeetUps(users: User[]) {
  const meetUpPromises = users.map(async (user) => {
    const meetUpCount = faker.number.int({ min: 1, max: 5 });
    const userMeetUps = Array.from({ length: meetUpCount }).map(async () => {
      const meetUp = await prisma.meetUp.create({
        data: {
          title: faker.lorem.words(3),
          summary: faker.lorem.sentence(),
          contactNumber: faker.phone.imei(),
          contactEmail: faker.internet.email(),
          location: faker.location.streetAddress(),
          responsiblePersonId: user.id,
          image: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          clerkId: String(user.id),
          contentType: "Meetup",
        },
      });
      return meetUp;
    });
    return Promise.all(userMeetUps);
  });

  const allMeetUps = await Promise.all(meetUpPromises);
  return allMeetUps.flat();
}

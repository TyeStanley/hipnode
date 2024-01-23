import { User } from "@prisma/client";
import { faker } from "@faker-js/faker";

import prisma from "../../../lib/prisma";

export async function createInterviews(users: User[]) {
  const salaryPeriodArray = ["monthly", "yearly"];
  const interviewPromises = users.map(async (user) => {
    const interviewCount = faker.number.int({ min: 1, max: 5 });
    const userInterviews = Array.from({ length: interviewCount }).map(
      async () => {
        const randomSalaryPeriod =
          salaryPeriodArray[
            Math.floor(Math.random() * salaryPeriodArray.length)
          ];
        const interview = await prisma.interview.create({
          data: {
            creatorId: user.id,
            title: faker.lorem.words(3),
            bannerImage: faker.image.avatar(),
            details: faker.lorem.paragraph(),
            websiteLink: faker.internet.url(),
            salary: faker.number.int({ min: 10000, max: 50000 }),
            salaryPeriod: randomSalaryPeriod,
            updates: faker.number.int({ min: 0, max: 10 }),
            clerkId: String(user.id),
            contentType: "Interview",
          },
        });
        return interview;
      }
    );
    return Promise.all(userInterviews);
  });

  const allInterviews = await Promise.all(interviewPromises);
  return allInterviews.flat();
}

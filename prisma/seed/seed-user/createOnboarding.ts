import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

import prisma from "../../../lib/prisma";

const businessStageOptions = [
  "Considering or planning to start a business",
  "Actively getting started on something new",
  "No interest in starting a business",
  "Earnings from my business fully support me",
  "Working on a business, no revenue yet",
];

const codeAbilityOptions = [
  "No, and coding is totally unfamiliar",
  "Not, but I understand a few concepts",
  "Yes, and I'm a beginner",
  "Yes, and I'm intermediate or a professional",
];

const interestsOptions = [
  "Advertising",
  "Task Management",
  "Email Marketing",
  "Crypto",
  "Design",
  "Finance",
  "Outdoors",
  "Health & Fitness",
  "Investing",
  "Home Automation",
  "Sports",
];

export async function createOnboarding(users: User[]) {
  const onboardingPromises = [];

  for (const user of users) {
    const businessStage = faker.helpers.shuffle(businessStageOptions)[0];
    const codeAbility = faker.helpers.shuffle(codeAbilityOptions)[0];
    const shuffledInterests = faker.helpers.shuffle(interestsOptions);
    const isOnboarded = faker.helpers.shuffle([false, true])[0];
    const interests = shuffledInterests.slice(
      0,
      faker.number.int({ min: 2, max: 11 })
    );

    const onboardingPromise = prisma.onboarding.create({
      data: {
        userId: user.id,
        businessStage,
        codeAbility,
        interests,
        isOnboarded,
        updatedAt: faker.date.recent(),
      },
    });

    onboardingPromises.push(onboardingPromise);
  }

  await Promise.all(onboardingPromises);
}

import prisma from "../../../lib/prisma";

const meetupsTagSeed = [
  "Full Time",
  "Part Time",
  "Internship",
  "Remote",
  "Contract",
];

export async function seedMeetupsTags() {
  for (const tagName of meetupsTagSeed) {
    await prisma.meetupTag.create({
      data: { name: tagName },
    });
  }
}

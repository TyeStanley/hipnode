import prisma from "../../../lib/prisma";

interface MeetupTag {
  id: number;
  name: string;
}

export async function seedTagOnMeetup() {
  const meetups = await prisma.meetUp.findMany();
  const tags = await prisma.meetupTag.findMany({
    take: 10, // Adjust the number based on your requirement
  });

  for (const meetup of meetups) {
    // Randomly decide the number of tags to assign (either 2 or 3)
    const tagCount = Math.random() > 0.5 ? 3 : 2;
    const assignedTags = selectRandomTags(tags, tagCount);

    for (const tag of assignedTags) {
      await prisma.tagOnMeetup.create({
        data: {
          meetupId: meetup.id,
          tagId: tag.id,
        },
      });
    }
  }
}

function selectRandomTags(tags: MeetupTag[], count: number): MeetupTag[] {
  const shuffled = tags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

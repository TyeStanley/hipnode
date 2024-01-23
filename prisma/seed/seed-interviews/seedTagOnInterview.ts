import prisma from "../../../lib/prisma";
import { InterviewTag } from "@prisma/client";

export async function seedTagOnInterview() {
  const interviews = await prisma.interview.findMany();

  const tags = await prisma.interviewTag.findMany({
    take: 10,
  });

  for (const interview of interviews) {
    const tagCount = Math.random() > 0.5 ? 3 : 2;
    const assignedTags = selectRandomTags(tags, tagCount);

    for (const tag of assignedTags) {
      await prisma.tagOnInterview.create({
        data: {
          interviewId: interview.id,
          tagId: tag.id,
        },
      });
    }
  }
}

function selectRandomTags(tags: InterviewTag[], count: number) {
  const shuffled = tags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

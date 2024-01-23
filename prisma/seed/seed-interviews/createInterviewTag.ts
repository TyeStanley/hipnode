import prisma from "../../../lib/prisma";

const interviewTagsSeed = [
  "Innovation",
  "Tech",
  "Startup",
  "Venture",
  "Code",
  "Data",
  "Design",
  "Product",
  "Growth",
  "Strategy",
];

export async function seedInterviewTags() {
  for (const tagName of interviewTagsSeed) {
    await prisma.interviewTag.create({
      data: { name: tagName },
    });
  }
}

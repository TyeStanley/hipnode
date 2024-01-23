import prisma from "../../../lib/prisma";

export async function createTags() {
  const tagNames = ["dev", "music", "sport", "blog"];

  const existingTags = await prisma.tag.findMany({
    where: {
      name: {
        in: tagNames,
      },
    },
  });

  if (existingTags.length) {
    return existingTags;
  }

  const tagPromises = tagNames.map((tagName) => {
    return prisma.tag.create({
      data: { name: tagName },
    });
  });
  return Promise.all(tagPromises);
}

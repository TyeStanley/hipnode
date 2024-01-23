/*
  Warnings:

  - Made the column `groupId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageHeight` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageWidth` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "groupId" SET NOT NULL,
ALTER COLUMN "imageHeight" SET NOT NULL,
ALTER COLUMN "imageWidth" SET NOT NULL;

-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "View_postId_userId_key" ON "View"("postId", "userId");

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

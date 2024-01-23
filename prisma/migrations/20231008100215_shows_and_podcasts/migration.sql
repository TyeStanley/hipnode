/*
  Warnings:

  - Added the required column `details` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showId` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "episodeNumber" SERIAL NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "showId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Shows" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shows_name_key" ON "Shows"("name");

-- AddForeignKey
ALTER TABLE "Shows" ADD CONSTRAINT "Shows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

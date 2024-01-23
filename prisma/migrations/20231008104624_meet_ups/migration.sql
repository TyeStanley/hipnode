/*
  Warnings:

  - Added the required column `contactEmail` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsiblePersonId` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MeetUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MeetUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MeetUp" ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "responsiblePersonId" INTEGER NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "MeetUp" ADD CONSTRAINT "MeetUp_responsiblePersonId_fkey" FOREIGN KEY ("responsiblePersonId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

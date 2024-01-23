/*
  Warnings:

  - You are about to drop the column `attachment` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentType` on the `Message` table. All the data in the column will be lost.
  - Made the column `text` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "attachment",
DROP COLUMN "attachmentType",
ALTER COLUMN "text" SET NOT NULL;

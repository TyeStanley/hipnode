/*
  Warnings:

  - Added the required column `receiverUserId` to the `ChatNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverUserId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatNotification" ADD COLUMN     "receiverUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "receiverUserId" INTEGER NOT NULL;

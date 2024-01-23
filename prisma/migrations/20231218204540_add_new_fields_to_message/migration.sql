/*
  Warnings:

  - Added the required column `messageUUID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageUUID" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[messageUUID]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_messageUUID_key" ON "Message"("messageUUID");

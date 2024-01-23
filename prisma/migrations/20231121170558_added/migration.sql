/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_clerkId_key" ON "Post"("clerkId");

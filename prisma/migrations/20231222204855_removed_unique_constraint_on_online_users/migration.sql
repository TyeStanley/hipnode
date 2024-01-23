/*
  Warnings:

  - Made the column `groupId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageHeight` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageWidth` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OnlineUser" DROP CONSTRAINT "OnlineUser_userId_fkey";

-- DropForeignKey
-- ALTER TABLE "Post" DROP CONSTRAINT "Post_groupId_fkey";

-- DropIndex
DROP INDEX "OnlineUser_userId_key";

-- AlterTable
-- ALTER TABLE "Post" ALTER COLUMN "groupId" SET NOT NULL,
-- ALTER COLUMN "imageHeight" SET NOT NULL,
-- ALTER COLUMN "imageWidth" SET NOT NULL;

-- -- AddForeignKey
-- ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

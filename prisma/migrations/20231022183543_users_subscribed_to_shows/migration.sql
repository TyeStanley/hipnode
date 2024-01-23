-- DropForeignKey
ALTER TABLE "UsersSubscribedToShows" DROP CONSTRAINT "UsersSubscribedToShows_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersSubscribedToShows" ADD CONSTRAINT "UsersSubscribedToShows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

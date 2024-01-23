-- CreateTable
CREATE TABLE "UsersSubscribedToShows" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "showId" INTEGER NOT NULL,

    CONSTRAINT "UsersSubscribedToShows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersSubscribedToShows_userId_showId_key" ON "UsersSubscribedToShows"("userId", "showId");

-- AddForeignKey
ALTER TABLE "UsersSubscribedToShows" ADD CONSTRAINT "UsersSubscribedToShows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubscribedToShows" ADD CONSTRAINT "UsersSubscribedToShows_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

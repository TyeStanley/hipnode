-- CreateTable
CREATE TABLE "MeetupTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MeetupTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnMeetup" (
    "id" SERIAL NOT NULL,
    "meetupId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagOnMeetup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetupTag_name_key" ON "MeetupTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TagOnMeetup_meetupId_tagId_key" ON "TagOnMeetup"("meetupId", "tagId");

-- AddForeignKey
ALTER TABLE "TagOnMeetup" ADD CONSTRAINT "TagOnMeetup_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "MeetUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnMeetup" ADD CONSTRAINT "TagOnMeetup_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "MeetupTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

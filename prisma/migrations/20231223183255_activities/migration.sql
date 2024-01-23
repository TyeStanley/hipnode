-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER,
    "interviewId" INTEGER,
    "meetupId" INTEGER,
    "podcastId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "MeetUp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Trigger for Post
CREATE OR REPLACE FUNCTION create_post_activity() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Activities"("userId", "postId", "createdAt", "updatedAt")
  VALUES (NEW."authorId", NEW.id, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_activity_trigger
AFTER INSERT ON "Post"
FOR EACH ROW EXECUTE FUNCTION create_post_activity();

-- Trigger for Interview
CREATE OR REPLACE FUNCTION create_interview_activity() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Activities"("userId", "interviewId", "createdAt", "updatedAt")
  VALUES (NEW."creatorId", NEW.id, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER interview_activity_trigger
AFTER INSERT ON "Interview"
FOR EACH ROW EXECUTE FUNCTION create_interview_activity();

-- Trigger for MeetUp
CREATE OR REPLACE FUNCTION create_meetup_activity() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Activities"("userId", "meetupId", "createdAt", "updatedAt")
  VALUES (NEW."responsiblePersonId", NEW.id, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER meetup_activity_trigger
AFTER INSERT ON "MeetUp"
FOR EACH ROW EXECUTE FUNCTION create_meetup_activity();

-- Trigger for Podcast
CREATE OR REPLACE FUNCTION create_podcast_activity() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Activities"("userId", "podcastId", "createdAt", "updatedAt")
  VALUES (NEW."userId", NEW.id, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER podcast_activity_trigger
AFTER INSERT ON "Podcast"
FOR EACH ROW EXECUTE FUNCTION create_podcast_activity();
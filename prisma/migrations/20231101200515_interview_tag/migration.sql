-- CreateTable
CREATE TABLE "InterviewTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InterviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnInterview" (
    "id" SERIAL NOT NULL,
    "interviewId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagOnInterview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "bannerImage" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "websiteLink" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "salaryPeriod" TEXT NOT NULL,
    "updates" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewTag_name_key" ON "InterviewTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TagOnInterview_interviewId_tagId_key" ON "TagOnInterview"("interviewId", "tagId");

-- AddForeignKey
ALTER TABLE "TagOnInterview" ADD CONSTRAINT "TagOnInterview_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnInterview" ADD CONSTRAINT "TagOnInterview_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "InterviewTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

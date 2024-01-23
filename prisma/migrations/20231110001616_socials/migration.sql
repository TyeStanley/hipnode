-- AlterTable
ALTER TABLE "User" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" VARCHAR(100),
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "Socials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "twitter" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Socials_userId_key" ON "Socials"("userId");

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

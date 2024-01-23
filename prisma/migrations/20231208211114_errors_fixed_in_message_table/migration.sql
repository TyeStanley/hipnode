-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "attachment" TEXT,
ADD COLUMN     "attachmentType" TEXT,
ALTER COLUMN "text" DROP NOT NULL;

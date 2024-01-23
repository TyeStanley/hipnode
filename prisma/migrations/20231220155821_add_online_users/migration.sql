-- CreateTable
CREATE TABLE "OnlineUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "enteredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnlineUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnlineUser_userId_key" ON "OnlineUser"("userId");

-- AddForeignKey
ALTER TABLE "OnlineUser" ADD CONSTRAINT "OnlineUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

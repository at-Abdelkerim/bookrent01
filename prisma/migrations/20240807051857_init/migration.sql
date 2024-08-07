/*
  Warnings:

  - You are about to drop the `brUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "brUser";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'customer',
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

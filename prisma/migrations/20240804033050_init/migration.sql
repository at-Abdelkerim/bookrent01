/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `brUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `brUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `brUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brUser" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "brUser_phoneNumber_key" ON "brUser"("phoneNumber");

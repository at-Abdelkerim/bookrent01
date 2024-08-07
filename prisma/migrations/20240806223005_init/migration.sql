-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'owner', 'customer');

-- AlterTable
ALTER TABLE "brUser" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'customer';

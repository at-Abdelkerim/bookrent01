/*
  Warnings:

  - The values [customer] on the enum `role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('admin', 'owner');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "role_new" USING ("role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'owner';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'owner';

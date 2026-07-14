-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'BUSINESS', 'DEVELOPER', 'CONSUMER');

-- AlterTable
ALTER TABLE "users"
  ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'CONSUMER',
  ADD COLUMN "display_name" TEXT,
  ADD COLUMN "password_hash" TEXT;

-- CreateEnum
CREATE TYPE "VerificationFlowKind" AS ENUM ('KYB', 'KYC');

-- CreateTable
CREATE TABLE "verification_flows" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kind" "VerificationFlowKind" NOT NULL,
    "target_business" BOOLEAN NOT NULL DEFAULT false,
    "target_developer" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_flows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_flows_slug_key" ON "verification_flows"("slug");

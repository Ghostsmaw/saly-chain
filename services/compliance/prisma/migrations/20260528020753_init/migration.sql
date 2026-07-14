-- CreateEnum
CREATE TYPE "SubjectKind" AS ENUM ('USER', 'BUSINESS', 'COUNTERPARTY', 'AGENT');

-- CreateEnum
CREATE TYPE "VerificationTier" AS ENUM ('TIER_0', 'TIER_1', 'TIER_2', 'TIER_3', 'TIER_REJECTED');

-- CreateEnum
CREATE TYPE "ScreeningDecision" AS ENUM ('ALLOW', 'REVIEW', 'BLOCK');

-- CreateEnum
CREATE TYPE "ScreeningCategory" AS ENUM ('SANCTIONS', 'PEP', 'ADVERSE_MEDIA', 'ADDRESS_RISK', 'COUNTRY_RISK');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('OPEN', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "CasePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "compliance_subjects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "external_ref" TEXT NOT NULL,
    "kind" "SubjectKind" NOT NULL,
    "display_name" TEXT,
    "country_code" CHAR(2),
    "tier" "VerificationTier" NOT NULL DEFAULT 'TIER_0',
    "tier_updated_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_results" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subject_id" UUID,
    "target_identifier" TEXT NOT NULL,
    "category" "ScreeningCategory" NOT NULL,
    "decision" "ScreeningDecision" NOT NULL,
    "provider" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "matched_list_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screening_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_cases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subject_id" UUID,
    "intent_id" TEXT,
    "transaction_id" TEXT,
    "status" "CaseStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "CasePriority" NOT NULL DEFAULT 'MEDIUM',
    "summary" TEXT NOT NULL,
    "notes" JSONB NOT NULL DEFAULT '[]',
    "assigned_to" TEXT,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_cases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "compliance_subjects_external_ref_key" ON "compliance_subjects"("external_ref");

-- CreateIndex
CREATE INDEX "compliance_subjects_kind_tier_idx" ON "compliance_subjects"("kind", "tier");

-- CreateIndex
CREATE INDEX "screening_results_subject_id_created_at_idx" ON "screening_results"("subject_id", "created_at");

-- CreateIndex
CREATE INDEX "screening_results_category_decision_idx" ON "screening_results"("category", "decision");

-- CreateIndex
CREATE INDEX "compliance_cases_status_priority_created_at_idx" ON "compliance_cases"("status", "priority", "created_at");

-- AddForeignKey
ALTER TABLE "screening_results" ADD CONSTRAINT "screening_results_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "compliance_subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_cases" ADD CONSTRAINT "compliance_cases_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "compliance_subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;


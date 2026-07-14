-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "DisbursementStatus" AS ENUM ('PENDING', 'BATCHED', 'SETTLED', 'FAILED');

-- CreateEnum
CREATE TYPE "ProcurementStatus" AS ENUM ('OPEN', 'AWARDED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "event_outbox" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "OutboxStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "event_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "budget_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "eligibility" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiaries" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "external_ref" TEXT NOT NULL,
    "kyc_status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disbursements" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "program_id" TEXT NOT NULL,
    "beneficiary_id" TEXT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "DisbursementStatus" NOT NULL DEFAULT 'PENDING',
    "batch_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disbursements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procurements" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "tender_ref" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "budget_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "ProcurementStatus" NOT NULL DEFAULT 'OPEN',
    "award_ref" TEXT,
    "escrow_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "procurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_records" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "program_id" TEXT,
    "record_type" TEXT NOT NULL,
    "subject_hash" TEXT NOT NULL,
    "data_hash" TEXT NOT NULL,
    "attestation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_outbox_event_id_key" ON "event_outbox"("event_id");

-- CreateIndex
CREATE INDEX "event_outbox_status_created_at_idx" ON "event_outbox"("status", "created_at");

-- CreateIndex
CREATE INDEX "programs_org_id_idx" ON "programs"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiaries_org_id_program_id_external_ref_key" ON "beneficiaries"("org_id", "program_id", "external_ref");

-- CreateIndex
CREATE INDEX "disbursements_org_id_program_id_status_idx" ON "disbursements"("org_id", "program_id", "status");

-- CreateIndex
CREATE INDEX "procurements_org_id_status_idx" ON "procurements"("org_id", "status");

-- CreateIndex
CREATE INDEX "public_records_org_id_program_id_idx" ON "public_records"("org_id", "program_id");

-- AddForeignKey
ALTER TABLE "disbursements" ADD CONSTRAINT "disbursements_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


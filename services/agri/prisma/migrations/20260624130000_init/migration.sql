-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'REPAID', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CLAIMED');

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
CREATE TABLE "farmers" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "external_ref" TEXT NOT NULL,
    "kyc_lite" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    "geo" JSONB,
    "crop" TEXT,
    "season" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_loans" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "payout_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "input_loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_policies" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    "trigger_metric" TEXT NOT NULL,
    "threshold" TEXT NOT NULL,
    "premium_minor" BIGINT NOT NULL,
    "payout_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insurance_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produce_lots" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "farm_id" TEXT NOT NULL,
    "lot_code" TEXT NOT NULL,
    "origin" TEXT,
    "attestation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produce_lots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custody_handoffs" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "actor_ref" TEXT NOT NULL,
    "geo" JSONB,
    "attestation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custody_handoffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offtake_contracts" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "lot_id" TEXT NOT NULL,
    "buyer_ref" TEXT NOT NULL,
    "price_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "escrow_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offtake_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_outbox_event_id_key" ON "event_outbox"("event_id");

-- CreateIndex
CREATE INDEX "event_outbox_status_created_at_idx" ON "event_outbox"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "farmers_org_id_external_ref_key" ON "farmers"("org_id", "external_ref");

-- CreateIndex
CREATE INDEX "farms_org_id_farmer_id_idx" ON "farms"("org_id", "farmer_id");

-- CreateIndex
CREATE INDEX "input_loans_org_id_farmer_id_idx" ON "input_loans"("org_id", "farmer_id");

-- CreateIndex
CREATE INDEX "insurance_policies_org_id_status_idx" ON "insurance_policies"("org_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "produce_lots_org_id_lot_code_key" ON "produce_lots"("org_id", "lot_code");

-- CreateIndex
CREATE INDEX "custody_handoffs_lot_id_idx" ON "custody_handoffs"("lot_id");

-- CreateIndex
CREATE INDEX "offtake_contracts_org_id_lot_id_idx" ON "offtake_contracts"("org_id", "lot_id");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produce_lots" ADD CONSTRAINT "produce_lots_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custody_handoffs" ADD CONSTRAINT "custody_handoffs_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "produce_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


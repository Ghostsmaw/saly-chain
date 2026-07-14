-- CreateEnum
CREATE TYPE "RiskDecision" AS ENUM ('ALLOW', 'REVIEW', 'BLOCK');

-- CreateTable
CREATE TABLE "actor_profiles" (
    "external_ref" TEXT NOT NULL,
    "rolling_24h_usd_minor" BIGINT NOT NULL DEFAULT 0,
    "rolling_24h_count" INTEGER NOT NULL DEFAULT 0,
    "lifetime_count" INTEGER NOT NULL DEFAULT 0,
    "mean_ticket_usd_minor" BIGINT NOT NULL DEFAULT 0,
    "stddev_ticket_usd_minor" BIGINT NOT NULL DEFAULT 0,
    "last_seen_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actor_profiles_pkey" PRIMARY KEY ("external_ref")
);

-- CreateTable
CREATE TABLE "counterparty_edges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_external_ref" TEXT NOT NULL,
    "counterparty_ref" TEXT NOT NULL,
    "first_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3) NOT NULL,
    "tx_count" INTEGER NOT NULL DEFAULT 0,
    "total_usd_minor" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "counterparty_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_assessments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intent_id" TEXT,
    "transaction_id" TEXT,
    "actor_external_ref" TEXT NOT NULL,
    "counterparty_ref" TEXT,
    "amount_usd_minor" BIGINT NOT NULL,
    "components" JSONB NOT NULL,
    "final_score" INTEGER NOT NULL,
    "decision" "RiskDecision" NOT NULL,
    "reasons" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "risk_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "counterparty_edges_actor_external_ref_counterparty_ref_key" ON "counterparty_edges"("actor_external_ref", "counterparty_ref");

-- CreateIndex
CREATE INDEX "risk_assessments_actor_external_ref_created_at_idx" ON "risk_assessments"("actor_external_ref", "created_at");

-- CreateIndex
CREATE INDEX "risk_assessments_decision_created_at_idx" ON "risk_assessments"("decision", "created_at");


-- Escrow deal audit tables (Tier 2 — release/refund admin API + indexing)

CREATE TYPE "EscrowDealStatus" AS ENUM ('FUNDING', 'FUNDED', 'RELEASED', 'REFUNDED');
CREATE TYPE "EscrowResolution" AS ENUM ('RELEASE', 'REFUND');

CREATE TABLE "escrow_deals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deal_id" VARCHAR(66) NOT NULL,
    "transaction_id" UUID,
    "status" "EscrowDealStatus" NOT NULL DEFAULT 'FUNDING',
    "payer" VARCHAR(42) NOT NULL,
    "payee" VARCHAR(42) NOT NULL,
    "token" VARCHAR(42) NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "deadline" BIGINT NOT NULL,
    "escrow_contract" VARCHAR(42) NOT NULL,
    "fund_tx_hash" TEXT,
    "resolve_tx_hash" TEXT,
    "resolution" "EscrowResolution",
    "condition" JSONB,
    "funded_at" TIMESTAMP(3),
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "escrow_deals_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "escrow_deals_deal_id_key" ON "escrow_deals"("deal_id");
CREATE INDEX "escrow_deals_status_created_at_idx" ON "escrow_deals"("status", "created_at");
CREATE INDEX "escrow_deals_transaction_id_idx" ON "escrow_deals"("transaction_id");

CREATE TABLE "escrow_deal_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deal_row_id" UUID NOT NULL,
    "type" VARCHAR(32) NOT NULL,
    "detail" JSONB,
    "tx_hash" TEXT,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "escrow_deal_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "escrow_deal_events_deal_row_id_occurred_at_idx" ON "escrow_deal_events"("deal_row_id", "occurred_at");

ALTER TABLE "escrow_deal_events" ADD CONSTRAINT "escrow_deal_events_deal_row_id_fkey" FOREIGN KEY ("deal_row_id") REFERENCES "escrow_deals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

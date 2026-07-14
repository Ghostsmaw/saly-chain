-- Milestone D5: stablecoin service initial schema

CREATE TYPE "StablecoinChain" AS ENUM ('SALY_L3', 'BASE');
CREATE TYPE "MintRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'MINTING', 'COMPLETED', 'REJECTED', 'FAILED');
CREATE TYPE "RedeemRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'BURNING', 'PAYOUT', 'COMPLETED', 'REJECTED', 'FAILED');

CREATE TABLE "reserve_accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "custodian" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SALYSD',
    "balance_minor" BIGINT NOT NULL,
    "authorized_ceiling_minor" BIGINT NOT NULL,
    "attestation_hash" TEXT,
    "attestation_url" TEXT,
    "as_of" TIMESTAMP(3),
    "chain" "StablecoinChain" NOT NULL DEFAULT 'SALY_L3',
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserve_accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "mint_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" TEXT NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "status" "MintRequestStatus" NOT NULL DEFAULT 'PENDING',
    "amount_minor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SALYSD',
    "chain" "StablecoinChain" NOT NULL DEFAULT 'SALY_L3',
    "reserve_account_id" UUID NOT NULL,
    "destination_wallet_id" TEXT,
    "destination_address" TEXT,
    "execution_transaction_id" TEXT,
    "tx_hash" TEXT,
    "ledger_entry_id" TEXT,
    "failure_reason" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mint_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "redeem_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" TEXT NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "status" "RedeemRequestStatus" NOT NULL DEFAULT 'PENDING',
    "amount_minor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'SALYSD',
    "chain" "StablecoinChain" NOT NULL DEFAULT 'SALY_L3',
    "source_wallet_id" TEXT NOT NULL,
    "payout_rail" TEXT NOT NULL,
    "execution_transaction_id" TEXT,
    "tx_hash" TEXT,
    "ledger_entry_id" TEXT,
    "failure_reason" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redeem_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "supply_snapshots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chain" "StablecoinChain" NOT NULL,
    "on_chain_supply_minor" BIGINT NOT NULL,
    "reserve_total_minor" BIGINT NOT NULL,
    "reserve_ratio_bps" INTEGER NOT NULL,
    "captured_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supply_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "reserve_attestations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reserve_account_id" UUID NOT NULL,
    "attestation_hash" TEXT NOT NULL,
    "balance_minor" BIGINT NOT NULL,
    "authorized_ceiling_minor" BIGINT NOT NULL,
    "attestation_url" TEXT,
    "as_of" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reserve_attestations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "mint_requests_idempotency_key_key" ON "mint_requests"("idempotency_key");
CREATE INDEX "mint_requests_org_id_created_at_idx" ON "mint_requests"("org_id", "created_at");
CREATE INDEX "mint_requests_status_idx" ON "mint_requests"("status");

CREATE UNIQUE INDEX "redeem_requests_idempotency_key_key" ON "redeem_requests"("idempotency_key");
CREATE INDEX "redeem_requests_org_id_created_at_idx" ON "redeem_requests"("org_id", "created_at");
CREATE INDEX "redeem_requests_status_idx" ON "redeem_requests"("status");

CREATE INDEX "reserve_accounts_chain_custodian_idx" ON "reserve_accounts"("chain", "custodian");
CREATE INDEX "supply_snapshots_chain_captured_at_idx" ON "supply_snapshots"("chain", "captured_at");
CREATE INDEX "reserve_attestations_reserve_account_id_as_of_idx" ON "reserve_attestations"("reserve_account_id", "as_of");

ALTER TABLE "mint_requests" ADD CONSTRAINT "mint_requests_reserve_account_id_fkey"
    FOREIGN KEY ("reserve_account_id") REFERENCES "reserve_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

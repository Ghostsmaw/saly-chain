-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('BASE', 'XRPL', 'ETHEREUM', 'POLYGON', 'INTERNAL');

-- CreateEnum
CREATE TYPE "WalletStatus" AS ENUM ('PROVISIONING', 'ACTIVE', 'FROZEN', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "WalletKind" AS ENUM ('USER_CUSTODIAL', 'BUSINESS_CUSTODIAL', 'AGENT_CUSTODIAL', 'TREASURY', 'HOT_OPERATIONAL', 'FEE_COLLECTION');

-- CreateEnum
CREATE TYPE "BroadcastJobStatus" AS ENUM ('PENDING', 'SUBMITTED', 'CONFIRMED', 'FAILED');

-- CreateTable
CREATE TABLE "wallets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chain" "Chain" NOT NULL,
    "address" TEXT NOT NULL,
    "kind" "WalletKind" NOT NULL,
    "status" "WalletStatus" NOT NULL DEFAULT 'PROVISIONING',
    "owner_id" TEXT,
    "owner_kind" TEXT,
    "label" TEXT,
    "signer_key_ref" TEXT NOT NULL,
    "ledger_account_id" UUID,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_policies" (
    "wallet_id" UUID NOT NULL,
    "destination_allowlist" JSONB NOT NULL,
    "per_tx_cap_minor" BIGINT NOT NULL,
    "daily_cap_minor" BIGINT NOT NULL,
    "approval_threshold_minor" BIGINT NOT NULL,
    "required_approvers" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_policies_pkey" PRIMARY KEY ("wallet_id")
);

-- CreateTable
CREATE TABLE "broadcast_jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idempotency_key" TEXT NOT NULL,
    "wallet_id" UUID NOT NULL,
    "chain" "Chain" NOT NULL,
    "destination_address" TEXT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "asset" VARCHAR(16) NOT NULL,
    "memo" TEXT,
    "raw_tx" TEXT,
    "tx_hash" TEXT,
    "confirmed_at_block" BIGINT,
    "status" "BroadcastJobStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "broadcast_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wallets_owner_kind_owner_id_idx" ON "wallets"("owner_kind", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_chain_address_key" ON "wallets"("chain", "address");

-- CreateIndex
CREATE UNIQUE INDEX "broadcast_jobs_tx_hash_key" ON "broadcast_jobs"("tx_hash");

-- CreateIndex
CREATE INDEX "broadcast_jobs_wallet_id_created_at_idx" ON "broadcast_jobs"("wallet_id", "created_at");

-- CreateIndex
CREATE INDEX "broadcast_jobs_status_idx" ON "broadcast_jobs"("status");

-- CreateIndex
CREATE UNIQUE INDEX "broadcast_jobs_wallet_id_idempotency_key_key" ON "broadcast_jobs"("wallet_id", "idempotency_key");

-- AddForeignKey
ALTER TABLE "wallet_policies" ADD CONSTRAINT "wallet_policies_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

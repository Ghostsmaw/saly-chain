-- CreateEnum
CREATE TYPE "SignerChain" AS ENUM ('BASE', 'XRPL', 'ETHEREUM', 'POLYGON');

-- CreateEnum
CREATE TYPE "SignerKeyStatus" AS ENUM ('ACTIVE', 'ROTATING', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SignRequestOutcome" AS ENUM ('SIGNED', 'POLICY_DENIED', 'ERROR');

-- CreateTable
CREATE TABLE "signer_keys" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key_ref" TEXT NOT NULL,
    "chain" "SignerChain" NOT NULL,
    "public_address" TEXT NOT NULL,
    "wrapped_private_key" BYTEA NOT NULL,
    "wrapping_key_ref" TEXT NOT NULL,
    "status" "SignerKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "label" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rotated_at" TIMESTAMP(3),

    CONSTRAINT "signer_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sign_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idempotency_key" TEXT NOT NULL,
    "signer_key_id" UUID NOT NULL,
    "chain" "SignerChain" NOT NULL,
    "wallet_id" TEXT,
    "policy_context" JSONB NOT NULL,
    "unsigned_tx_hash" TEXT NOT NULL,
    "outcome" "SignRequestOutcome" NOT NULL,
    "reason_code" TEXT,
    "reason_message" TEXT,
    "signed_tx_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sign_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signer_keys_key_ref_key" ON "signer_keys"("key_ref");

-- CreateIndex
CREATE INDEX "signer_keys_status_idx" ON "signer_keys"("status");

-- CreateIndex
CREATE UNIQUE INDEX "signer_keys_chain_public_address_key" ON "signer_keys"("chain", "public_address");

-- CreateIndex
CREATE UNIQUE INDEX "sign_requests_idempotency_key_key" ON "sign_requests"("idempotency_key");

-- CreateIndex
CREATE INDEX "sign_requests_signer_key_id_created_at_idx" ON "sign_requests"("signer_key_id", "created_at");

-- CreateIndex
CREATE INDEX "sign_requests_outcome_created_at_idx" ON "sign_requests"("outcome", "created_at");

-- AddForeignKey
ALTER TABLE "sign_requests" ADD CONSTRAINT "sign_requests_signer_key_id_fkey" FOREIGN KEY ("signer_key_id") REFERENCES "signer_keys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

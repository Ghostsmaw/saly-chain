-- CreateEnum
CREATE TYPE "ExecutionTransactionKind" AS ENUM ('INTERNAL_TRANSFER', 'BASE_PAYOUT', 'XRPL_PAYOUT');

-- CreateEnum
CREATE TYPE "ExecutionTransactionState" AS ENUM ('CREATED', 'SCREENED', 'ROUTED', 'QUOTED', 'RESERVED', 'EXECUTING', 'AWAITING_CONFIRMATION', 'SETTLED', 'FAILED', 'REVERSING', 'REVERSED', 'REJECTED');

-- CreateTable
CREATE TABLE "execution_transactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idempotency_key" TEXT NOT NULL,
    "kind" "ExecutionTransactionKind" NOT NULL,
    "state" "ExecutionTransactionState" NOT NULL DEFAULT 'CREATED',
    "source_wallet_id" TEXT,
    "source_account_id" TEXT,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "destination_wallet_id" TEXT,
    "destination_account_id" TEXT,
    "destination_address" TEXT,
    "destination_chain" TEXT,
    "asset" VARCHAR(16),
    "ledger_transaction_id" TEXT,
    "ledger_entry_id" TEXT,
    "reversal_entry_id" TEXT,
    "broadcast_job_id" TEXT,
    "tx_hash" TEXT,
    "intent_id" TEXT,
    "memo" TEXT,
    "metadata" JSONB,
    "error" TEXT,
    "route_decision_id" TEXT,
    "selected_rail" TEXT,
    "quote_id" TEXT,
    "quote_signature" TEXT,
    "risk_assessment_id" TEXT,
    "risk_score" INTEGER,
    "compliance_run_id" TEXT,
    "compliance_case_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "settled_at" TIMESTAMP(3),

    CONSTRAINT "execution_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execution_transaction_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "transaction_id" UUID NOT NULL,
    "from_state" "ExecutionTransactionState",
    "to_state" "ExecutionTransactionState" NOT NULL,
    "reason" TEXT,
    "detail" JSONB,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "execution_transaction_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execution_consumer_cursors" (
    "consumer_name" TEXT NOT NULL,
    "last_event_id" TEXT,
    "last_seen_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "execution_consumer_cursors_pkey" PRIMARY KEY ("consumer_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "execution_transactions_idempotency_key_key" ON "execution_transactions"("idempotency_key");

-- CreateIndex
CREATE INDEX "execution_transactions_state_created_at_idx" ON "execution_transactions"("state", "created_at");

-- CreateIndex
CREATE INDEX "execution_transactions_kind_created_at_idx" ON "execution_transactions"("kind", "created_at");

-- CreateIndex
CREATE INDEX "execution_transactions_tx_hash_idx" ON "execution_transactions"("tx_hash");

-- CreateIndex
CREATE INDEX "execution_transaction_events_transaction_id_occurred_at_idx" ON "execution_transaction_events"("transaction_id", "occurred_at");

-- AddForeignKey
ALTER TABLE "execution_transaction_events" ADD CONSTRAINT "execution_transaction_events_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "execution_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

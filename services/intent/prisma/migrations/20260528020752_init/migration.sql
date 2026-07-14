-- CreateEnum
CREATE TYPE "IntentState" AS ENUM ('RECEIVED', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "intent_records" (
    "intent_id" TEXT NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "actor_ref" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "state" "IntentState" NOT NULL DEFAULT 'RECEIVED',
    "execution_transaction_id" TEXT,
    "rejection_code" TEXT,
    "rejection_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intent_records_pkey" PRIMARY KEY ("intent_id")
);

-- CreateIndex
CREATE INDEX "intent_records_state_created_at_idx" ON "intent_records"("state", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "intent_records_actor_ref_idempotency_key_key" ON "intent_records"("actor_ref", "idempotency_key");

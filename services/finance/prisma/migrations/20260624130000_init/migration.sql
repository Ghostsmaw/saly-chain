-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('BOND', 'FUND', 'RWA');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'REPAID', 'DEFAULTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CashflowType" AS ENUM ('COUPON', 'DIVIDEND', 'REDEMPTION');

-- CreateEnum
CREATE TYPE "DvpStatus" AS ENUM ('PENDING', 'ESCROW_FUNDED', 'SETTLED', 'CANCELLED');

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
CREATE TABLE "instruments" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "type" "InstrumentType" NOT NULL,
    "name" TEXT NOT NULL,
    "issuer_ref" TEXT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "terms" JSONB,
    "token_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instruments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holdings" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "account_ref" TEXT NOT NULL,
    "instrument_id" TEXT NOT NULL,
    "units_minor" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holdings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "instrument_id" TEXT,
    "borrower_ref" TEXT NOT NULL,
    "principal_minor" BIGINT NOT NULL,
    "rate_bps" INTEGER NOT NULL,
    "collateral_ref" TEXT,
    "currency" VARCHAR(8) NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cashflows" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "instrument_id" TEXT NOT NULL,
    "type" "CashflowType" NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "executed_at" TIMESTAMP(3),
    "batch_intent_id" TEXT,

    CONSTRAINT "cashflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dvp_trades" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "buyer_ref" TEXT NOT NULL,
    "seller_ref" TEXT NOT NULL,
    "instrument_id" TEXT NOT NULL,
    "units_minor" BIGINT NOT NULL,
    "price_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "DvpStatus" NOT NULL DEFAULT 'PENDING',
    "escrow_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dvp_trades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_outbox_event_id_key" ON "event_outbox"("event_id");

-- CreateIndex
CREATE INDEX "event_outbox_status_created_at_idx" ON "event_outbox"("status", "created_at");

-- CreateIndex
CREATE INDEX "instruments_org_id_idx" ON "instruments"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "holdings_org_id_account_ref_instrument_id_key" ON "holdings"("org_id", "account_ref", "instrument_id");

-- CreateIndex
CREATE INDEX "loans_org_id_status_idx" ON "loans"("org_id", "status");

-- CreateIndex
CREATE INDEX "cashflows_org_id_scheduled_at_idx" ON "cashflows"("org_id", "scheduled_at");

-- CreateIndex
CREATE INDEX "dvp_trades_org_id_status_idx" ON "dvp_trades"("org_id", "status");

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cashflows" ADD CONSTRAINT "cashflows_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instruments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


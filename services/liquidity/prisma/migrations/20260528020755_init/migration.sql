-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('ISSUED', 'CONSUMED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "fx_rate_snapshots" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider" TEXT NOT NULL,
    "base_currency" CHAR(3) NOT NULL,
    "quote_currency" CHAR(3) NOT NULL,
    "mid_rate_1e8" BIGINT NOT NULL,
    "captured_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fx_rate_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intent_id" TEXT,
    "from_currency" CHAR(3) NOT NULL,
    "to_currency" CHAR(3) NOT NULL,
    "from_amount_minor" BIGINT NOT NULL,
    "to_amount_minor" BIGINT NOT NULL,
    "quoted_rate_1e8" BIGINT NOT NULL,
    "mid_rate_1e8" BIGINT NOT NULL,
    "spread_bps" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'ISSUED',
    "signature" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "consumed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fx_rate_snapshots_base_currency_quote_currency_captured_at_idx" ON "fx_rate_snapshots"("base_currency", "quote_currency", "captured_at");

-- CreateIndex
CREATE INDEX "quotes_status_expires_at_idx" ON "quotes"("status", "expires_at");


-- CreateEnum
CREATE TYPE "PaymentLinkStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CheckoutSessionStatus" AS ENUM ('OPEN', 'AWAITING_PAYMENT', 'COMPLETED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SettlementReportStatus" AS ENUM ('PENDING', 'READY', 'FAILED');

-- CreateTable
CREATE TABLE "payment_links" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount_minor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "country" CHAR(2) NOT NULL,
    "actor_id" TEXT NOT NULL,
    "destination_account_ref" TEXT NOT NULL,
    "status" "PaymentLinkStatus" NOT NULL DEFAULT 'ACTIVE',
    "success_redirect_url" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" TEXT NOT NULL,
    "payment_link_id" UUID,
    "idempotency_key" TEXT NOT NULL,
    "status" "CheckoutSessionStatus" NOT NULL DEFAULT 'OPEN',
    "amount_minor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "country" CHAR(2) NOT NULL,
    "destination_account_ref" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT,
    "intent_id" TEXT,
    "execution_transaction_id" TEXT,
    "instruction" JSONB,
    "expires_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "failure_reason" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settlement_reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" TEXT NOT NULL,
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "currency" TEXT,
    "status" "SettlementReportStatus" NOT NULL DEFAULT 'PENDING',
    "total_settled_minor" BIGINT,
    "transaction_count" INTEGER,
    "lines" JSONB,
    "error" TEXT,
    "generated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settlement_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_links_slug_key" ON "payment_links"("slug");

-- CreateIndex
CREATE INDEX "payment_links_org_id_created_at_idx" ON "payment_links"("org_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "checkout_sessions_idempotency_key_key" ON "checkout_sessions"("idempotency_key");

-- CreateIndex
CREATE INDEX "checkout_sessions_org_id_created_at_idx" ON "checkout_sessions"("org_id", "created_at");

-- CreateIndex
CREATE INDEX "checkout_sessions_status_created_at_idx" ON "checkout_sessions"("status", "created_at");

-- CreateIndex
CREATE INDEX "checkout_sessions_execution_transaction_id_idx" ON "checkout_sessions"("execution_transaction_id");

-- CreateIndex
CREATE INDEX "settlement_reports_org_id_created_at_idx" ON "settlement_reports"("org_id", "created_at");

-- AddForeignKey
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_payment_link_id_fkey" FOREIGN KEY ("payment_link_id") REFERENCES "payment_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

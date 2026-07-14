-- Milestone E3: agent marketplace models
CREATE TYPE "AgentServiceStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED');
CREATE TYPE "AgentInvoiceStatus" AS ENUM ('OPEN', 'PAID', 'VOID');

CREATE TABLE "agent_services" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL DEFAULT 'USD',
    "capability" JSONB,
    "status" "AgentServiceStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "agent_services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "agent_subscriptions" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "subscriber_agent_id" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "renew_at" TIMESTAMP(3),
    "intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "agent_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "agent_marketplace_listings" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "tags" JSONB,
    "rating_bps" INTEGER,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "on_chain_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "agent_marketplace_listings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "agent_invoices" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "payer_agent_id" TEXT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "AgentInvoiceStatus" NOT NULL DEFAULT 'OPEN',
    "intent_id" TEXT,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "agent_invoices_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "usage_meters" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "service_id" TEXT,
    "units" BIGINT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "settled" BOOLEAN NOT NULL DEFAULT false,
    "intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usage_meters_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "agent_services_agent_id_status_idx" ON "agent_services"("agent_id", "status");
CREATE INDEX "agent_subscriptions_subscriber_agent_id_status_idx" ON "agent_subscriptions"("subscriber_agent_id", "status");
CREATE INDEX "agent_marketplace_listings_visible_idx" ON "agent_marketplace_listings"("visible");
CREATE INDEX "agent_invoices_agent_id_status_idx" ON "agent_invoices"("agent_id", "status");
CREATE INDEX "usage_meters_agent_id_settled_idx" ON "usage_meters"("agent_id", "settled");

ALTER TABLE "agent_services" ADD CONSTRAINT "agent_services_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agent_subscriptions" ADD CONSTRAINT "agent_subscriptions_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "agent_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agent_marketplace_listings" ADD CONSTRAINT "agent_marketplace_listings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "agent_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agent_invoices" ADD CONSTRAINT "agent_invoices_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

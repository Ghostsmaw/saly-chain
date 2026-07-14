-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DISABLED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'IN_FLIGHT', 'SUCCEEDED', 'RETRYABLE', 'FAILED', 'DEAD');

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "subjects" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "signing_secret" TEXT NOT NULL,
    "signing_key_id" TEXT NOT NULL,
    "consecutive_failures" INTEGER NOT NULL DEFAULT 0,
    "disabled_at" TIMESTAMP(3),
    "last_succeeded_at" TIMESTAMP(3),
    "last_attempted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "last_status_code" INTEGER,
    "last_response_excerpt" TEXT,
    "last_latency_ms" INTEGER,
    "last_error" TEXT,
    "next_attempt_at" TIMESTAMP(3),
    "succeeded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dead_letters" (
    "id" TEXT NOT NULL,
    "delivery_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL,
    "last_status_code" INTEGER,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dead_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "subscriptions_org_id_status_idx" ON "subscriptions"("org_id", "status");

-- CreateIndex
CREATE INDEX "deliveries_status_next_attempt_at_idx" ON "deliveries"("status", "next_attempt_at");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_subscription_id_event_id_key" ON "deliveries"("subscription_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "dead_letters_delivery_id_key" ON "dead_letters"("delivery_id");

-- CreateIndex
CREATE INDEX "dead_letters_subscription_id_created_at_idx" ON "dead_letters"("subscription_id", "created_at");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DISABLED');

-- CreateEnum
CREATE TYPE "StreamSink" AS ENUM ('WEBHOOK', 'KAFKA');

-- CreateEnum
CREATE TYPE "StreamDeliveryStatus" AS ENUM ('PENDING', 'IN_FLIGHT', 'SUCCEEDED', 'RETRYABLE', 'FAILED', 'DEAD');

-- CreateTable
CREATE TABLE "streams" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "StreamStatus" NOT NULL DEFAULT 'ACTIVE',
    "sink" "StreamSink" NOT NULL DEFAULT 'WEBHOOK',
    "filter" JSONB NOT NULL DEFAULT '{}',
    "url" TEXT,
    "signing_secret" TEXT NOT NULL,
    "signing_key_id" TEXT NOT NULL,
    "kafka_topic" TEXT,
    "consecutive_failures" INTEGER NOT NULL DEFAULT 0,
    "disabled_at" TIMESTAMP(3),
    "matched_total" BIGINT NOT NULL DEFAULT 0,
    "last_matched_at" TIMESTAMP(3),
    "last_delivered_at" TIMESTAMP(3),
    "last_attempted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "streams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stream_deliveries" (
    "id" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "status" "StreamDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "last_status_code" INTEGER,
    "last_response_excerpt" TEXT,
    "last_latency_ms" INTEGER,
    "last_error" TEXT,
    "next_attempt_at" TIMESTAMP(3),
    "succeeded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stream_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stream_dead_letters" (
    "id" TEXT NOT NULL,
    "delivery_id" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL,
    "last_status_code" INTEGER,
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stream_dead_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "streams_org_id_status_idx" ON "streams"("org_id", "status");

-- CreateIndex
CREATE INDEX "streams_status_idx" ON "streams"("status");

-- CreateIndex
CREATE INDEX "stream_deliveries_status_next_attempt_at_idx" ON "stream_deliveries"("status", "next_attempt_at");

-- CreateIndex
CREATE INDEX "stream_deliveries_stream_id_created_at_idx" ON "stream_deliveries"("stream_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "stream_deliveries_stream_id_event_id_key" ON "stream_deliveries"("stream_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "stream_dead_letters_delivery_id_key" ON "stream_dead_letters"("delivery_id");

-- CreateIndex
CREATE INDEX "stream_dead_letters_stream_id_created_at_idx" ON "stream_dead_letters"("stream_id", "created_at");

-- AddForeignKey
ALTER TABLE "stream_deliveries" ADD CONSTRAINT "stream_deliveries_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "streams"("id") ON DELETE CASCADE ON UPDATE CASCADE;


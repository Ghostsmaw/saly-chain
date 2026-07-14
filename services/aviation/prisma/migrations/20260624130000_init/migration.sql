-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "PartLifecycle" AS ENUM ('NEW', 'INSTALLED', 'REMOVED', 'SCRAPPED');

-- CreateEnum
CREATE TYPE "AviationSettlementStatus" AS ENUM ('PENDING', 'ESCROW_FUNDED', 'SETTLED', 'CANCELLED');

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
CREATE TABLE "aircraft" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "tail" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "owner_ref" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "aircraft_id" TEXT,
    "serial" TEXT NOT NULL,
    "part_type" TEXT NOT NULL,
    "lifecycle_status" "PartLifecycle" NOT NULL DEFAULT 'NEW',
    "token_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_events" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "technician_ref" TEXT NOT NULL,
    "attestation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maintenance_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airworthiness_certs" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "aircraft_id" TEXT NOT NULL,
    "attestation_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airworthiness_certs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aviation_settlements" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,
    "buyer_ref" TEXT NOT NULL,
    "seller_ref" TEXT NOT NULL,
    "amount_minor" BIGINT NOT NULL,
    "currency" VARCHAR(8) NOT NULL,
    "status" "AviationSettlementStatus" NOT NULL DEFAULT 'PENDING',
    "escrow_intent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aviation_settlements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_outbox_event_id_key" ON "event_outbox"("event_id");

-- CreateIndex
CREATE INDEX "event_outbox_status_created_at_idx" ON "event_outbox"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_org_id_tail_key" ON "aircraft"("org_id", "tail");

-- CreateIndex
CREATE UNIQUE INDEX "parts_org_id_serial_key" ON "parts"("org_id", "serial");

-- CreateIndex
CREATE INDEX "maintenance_events_part_id_idx" ON "maintenance_events"("part_id");

-- CreateIndex
CREATE INDEX "airworthiness_certs_org_id_aircraft_id_idx" ON "airworthiness_certs"("org_id", "aircraft_id");

-- CreateIndex
CREATE INDEX "aviation_settlements_org_id_status_idx" ON "aviation_settlements"("org_id", "status");

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_aircraft_id_fkey" FOREIGN KEY ("aircraft_id") REFERENCES "aircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_events" ADD CONSTRAINT "maintenance_events_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


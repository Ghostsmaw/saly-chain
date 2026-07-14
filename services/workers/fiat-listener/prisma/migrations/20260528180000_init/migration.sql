-- CreateTable
CREATE TABLE "fiat_webhook_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "provider" TEXT NOT NULL,
    "external_event_id" TEXT NOT NULL,
    "tx_id" TEXT NOT NULL,
    "psp_id" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_result" JSONB,

    CONSTRAINT "fiat_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fiat_webhook_events_provider_external_event_id_key" ON "fiat_webhook_events"("provider", "external_event_id");

-- CreateIndex
CREATE INDEX "fiat_webhook_events_tx_id_idx" ON "fiat_webhook_events"("tx_id");

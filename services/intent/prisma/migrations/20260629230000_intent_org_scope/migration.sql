-- Milestone C1: tenant (org) scoping for intent records.
ALTER TABLE "intent_records" ADD COLUMN "org_id" TEXT;

CREATE INDEX "intent_records_org_id_created_at_idx" ON "intent_records" ("org_id", "created_at");

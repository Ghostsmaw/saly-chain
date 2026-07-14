-- Reconciliation status enum
CREATE TYPE "ReconciliationStatus" AS ENUM ('OK', 'BREAKS_FOUND', 'ERROR');

-- Reconciliation runs (audit trail for ledger↔rail sweeps)
CREATE TABLE "reconciliation_runs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "scope" VARCHAR(48) NOT NULL,
  "status" "ReconciliationStatus" NOT NULL DEFAULT 'OK',
  "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finished_at" TIMESTAMP(3),
  "checked_count" INTEGER NOT NULL DEFAULT 0,
  "break_count" INTEGER NOT NULL DEFAULT 0,
  "summary" JSONB,
  CONSTRAINT "reconciliation_runs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "reconciliation_runs_scope_started_at_idx"
  ON "reconciliation_runs" ("scope", "started_at");

-- Reconciliation breaks (individual discrepancies)
CREATE TABLE "reconciliation_breaks" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "run_id" UUID NOT NULL,
  "kind" VARCHAR(48) NOT NULL,
  "reference" TEXT,
  "currency" VARCHAR(8),
  "expected_minor" TEXT,
  "actual_minor" TEXT,
  "detail" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "reconciliation_breaks_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "reconciliation_breaks_run_id_idx" ON "reconciliation_breaks" ("run_id");
CREATE INDEX "reconciliation_breaks_kind_created_at_idx"
  ON "reconciliation_breaks" ("kind", "created_at");

ALTER TABLE "reconciliation_breaks"
  ADD CONSTRAINT "reconciliation_breaks_run_id_fkey"
  FOREIGN KEY ("run_id") REFERENCES "reconciliation_runs" ("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

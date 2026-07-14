-- Milestone C1: tenant (org) scoping for execution transactions.
ALTER TABLE "execution_transactions" ADD COLUMN "org_id" TEXT;

CREATE INDEX "execution_transactions_org_id_created_at_idx" ON "execution_transactions" ("org_id", "created_at");

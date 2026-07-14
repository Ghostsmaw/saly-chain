-- Milestone E1: generic contract calls for governance pause / attestation admin.
ALTER TYPE "BroadcastJobKind" ADD VALUE IF NOT EXISTS 'CONTRACT_CALL';

ALTER TABLE "broadcast_jobs" ADD COLUMN IF NOT EXISTS "contract_call_payload" JSONB;

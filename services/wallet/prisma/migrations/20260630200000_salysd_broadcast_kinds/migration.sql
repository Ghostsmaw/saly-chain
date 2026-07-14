-- SalySD mint/redeem broadcast kinds (Milestone D5)
ALTER TYPE "BroadcastJobKind" ADD VALUE IF NOT EXISTS 'SALYSD_MINT';
ALTER TYPE "BroadcastJobKind" ADD VALUE IF NOT EXISTS 'SALYSD_REDEEM';
ALTER TYPE "BroadcastJobKind" ADD VALUE IF NOT EXISTS 'SALYSD_APPROVE';

ALTER TABLE "broadcast_jobs" ADD COLUMN IF NOT EXISTS "salysd_payload" JSONB;

-- Broadcast job `kind` + escrow/intent fields.
--
-- These belong with the S3 escrow work but were missing from the migration
-- history (the schema and the later `dex_swap_kind` / `xrpl_iou` migrations
-- assume the `BroadcastJobKind` enum and these columns already exist). This
-- migration backfills them and is ordered to run before `dex_swap_kind`
-- (which only ADDs the `DEX_SWAP` enum value).

-- CreateEnum
CREATE TYPE "BroadcastJobKind" AS ENUM ('TRANSFER', 'ESCROW_FUND');

-- AlterTable
ALTER TABLE "broadcast_jobs"
  ADD COLUMN "kind" "BroadcastJobKind" NOT NULL DEFAULT 'TRANSFER',
  ADD COLUMN "intent_id" TEXT,
  ADD COLUMN "deal_id" VARCHAR(66),
  ADD COLUMN "escrow_contract" TEXT,
  ADD COLUMN "escrow_deadline" BIGINT;

-- CreateIndex
CREATE INDEX "broadcast_jobs_deal_id_idx" ON "broadcast_jobs"("deal_id");

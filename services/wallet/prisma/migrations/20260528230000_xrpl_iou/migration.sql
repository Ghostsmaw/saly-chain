-- XRPL IOU: trust-line policy + broadcast job issuer/tag fields

ALTER TABLE "wallet_policies"
  ADD COLUMN "trusted_issuer_allowlist" JSONB NOT NULL DEFAULT '[]';

ALTER TABLE "broadcast_jobs"
  ADD COLUMN "iou_issuer" VARCHAR(42),
  ADD COLUMN "destination_tag" INTEGER;

-- CreateTable
CREATE TABLE "analytics_indexer_checkpoints" (
    "chain_key" TEXT NOT NULL,
    "last_position" BIGINT NOT NULL,
    "last_block_hash" TEXT NOT NULL,
    "backfill_complete" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_indexer_checkpoints_pkey" PRIMARY KEY ("chain_key")
);

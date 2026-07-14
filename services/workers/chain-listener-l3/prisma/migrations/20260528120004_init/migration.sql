-- CreateTable
-- The Base and L3 EVM listeners share a single `salychain_wallet` database and
-- this checkpoint table, partitioned by `chain_key` (e.g. "BASE:8453" vs
-- "SALY_L3:..."). Whichever listener migrates first creates the table; the other
-- finds it already present. IF NOT EXISTS keeps both migration histories valid.
CREATE TABLE IF NOT EXISTS "chain_listener_checkpoints" (
    "chain_key" TEXT NOT NULL,
    "last_block_number" BIGINT NOT NULL,
    "last_block_hash" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chain_listener_checkpoints_pkey" PRIMARY KEY ("chain_key")
);

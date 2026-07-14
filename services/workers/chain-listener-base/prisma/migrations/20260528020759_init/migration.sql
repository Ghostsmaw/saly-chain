-- CreateTable
CREATE TABLE "chain_listener_checkpoints" (
    "chain_key" TEXT NOT NULL,
    "last_block_number" BIGINT NOT NULL,
    "last_block_hash" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chain_listener_checkpoints_pkey" PRIMARY KEY ("chain_key")
);


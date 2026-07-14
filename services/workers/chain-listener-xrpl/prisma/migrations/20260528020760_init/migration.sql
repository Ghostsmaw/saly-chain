-- CreateTable
CREATE TABLE "xrpl_listener_checkpoints" (
    "chain_key" TEXT NOT NULL,
    "last_ledger_index" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "xrpl_listener_checkpoints_pkey" PRIMARY KEY ("chain_key")
);


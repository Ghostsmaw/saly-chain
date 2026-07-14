-- CreateEnum
CREATE TYPE "EntityStatus" AS ENUM ('ACTIVE', 'MERGED');

-- CreateEnum
CREATE TYPE "ResolutionStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED');

-- CreateEnum
CREATE TYPE "RunTrigger" AS ENUM ('MANUAL', 'SCHEDULE');

-- CreateEnum
CREATE TYPE "NlQueryStatus" AS ENUM ('PLANNED', 'EXECUTED', 'UNSUPPORTED', 'FAILED');

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "label" TEXT,
    "category" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'ACTIVE',
    "address_count" INTEGER NOT NULL DEFAULT 0,
    "risk_score" INTEGER NOT NULL DEFAULT 0,
    "sanctioned" BOOLEAN NOT NULL DEFAULT false,
    "first_seen_at" TIMESTAMP(3),
    "last_seen_at" TIMESTAMP(3),
    "resolved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_members" (
    "id" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "transfer_events" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entity_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resolution_runs" (
    "id" TEXT NOT NULL,
    "status" "ResolutionStatus" NOT NULL DEFAULT 'PENDING',
    "trigger" "RunTrigger" NOT NULL DEFAULT 'MANUAL',
    "chain" TEXT,
    "lookback_days" INTEGER NOT NULL,
    "address_count" INTEGER,
    "entity_count" INTEGER,
    "link_count" INTEGER,
    "duration_ms" INTEGER,
    "error" TEXT,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resolution_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_embeddings" (
    "id" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dim" INTEGER NOT NULL,
    "vector" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nl_queries" (
    "id" TEXT NOT NULL,
    "org_id" TEXT,
    "question" TEXT NOT NULL,
    "status" "NlQueryStatus" NOT NULL,
    "metric" TEXT,
    "plan" JSONB NOT NULL,
    "row_count" INTEGER,
    "latency_ms" INTEGER,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nl_queries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "entities_chain_status_idx" ON "entities"("chain", "status");

-- CreateIndex
CREATE INDEX "entities_sanctioned_idx" ON "entities"("sanctioned");

-- CreateIndex
CREATE INDEX "entity_members_entity_id_idx" ON "entity_members"("entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "entity_members_chain_address_key" ON "entity_members"("chain", "address");

-- CreateIndex
CREATE INDEX "resolution_runs_status_created_at_idx" ON "resolution_runs"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "address_embeddings_chain_address_key" ON "address_embeddings"("chain", "address");

-- CreateIndex
CREATE INDEX "nl_queries_org_id_created_at_idx" ON "nl_queries"("org_id", "created_at");

-- AddForeignKey
ALTER TABLE "entity_members" ADD CONSTRAINT "entity_members_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;


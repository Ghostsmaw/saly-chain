-- CreateEnum
CREATE TYPE "DatashareStatus" AS ENUM ('ACTIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "DatashareDestination" AS ENUM ('S3', 'SNOWFLAKE', 'BIGQUERY', 'DATABRICKS');

-- CreateEnum
CREATE TYPE "DatashareFormat" AS ENUM ('CSV', 'JSON', 'PARQUET');

-- CreateEnum
CREATE TYPE "ShareRunStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED');

-- CreateEnum
CREATE TYPE "RunTrigger" AS ENUM ('MANUAL', 'SCHEDULE');

-- CreateTable
CREATE TABLE "datashares" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "DatashareStatus" NOT NULL DEFAULT 'ACTIVE',
    "dataset_id" TEXT NOT NULL,
    "params" JSONB NOT NULL DEFAULT '{}',
    "policy" JSONB NOT NULL DEFAULT '{}',
    "destination" "DatashareDestination" NOT NULL DEFAULT 'S3',
    "destination_config" JSONB NOT NULL DEFAULT '{}',
    "format" "DatashareFormat" NOT NULL DEFAULT 'JSON',
    "schedule" TEXT,
    "run_count" BIGINT NOT NULL DEFAULT 0,
    "last_run_at" TIMESTAMP(3),
    "last_success_at" TIMESTAMP(3),
    "last_run_status" "ShareRunStatus",
    "last_row_count" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datashares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "share_runs" (
    "id" TEXT NOT NULL,
    "share_id" TEXT NOT NULL,
    "status" "ShareRunStatus" NOT NULL DEFAULT 'PENDING',
    "trigger" "RunTrigger" NOT NULL DEFAULT 'MANUAL',
    "row_count" INTEGER,
    "byte_count" INTEGER,
    "location" TEXT,
    "format" "DatashareFormat" NOT NULL,
    "duration_ms" INTEGER,
    "error" TEXT,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "share_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "datashares_org_id_status_idx" ON "datashares"("org_id", "status");

-- CreateIndex
CREATE INDEX "datashares_status_schedule_idx" ON "datashares"("status", "schedule");

-- CreateIndex
CREATE INDEX "share_runs_share_id_created_at_idx" ON "share_runs"("share_id", "created_at");

-- CreateIndex
CREATE INDEX "share_runs_status_idx" ON "share_runs"("status");

-- AddForeignKey
ALTER TABLE "share_runs" ADD CONSTRAINT "share_runs_share_id_fkey" FOREIGN KEY ("share_id") REFERENCES "datashares"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- CreateEnum
CREATE TYPE "AgentStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OwnerKind" AS ENUM ('USER', 'BUSINESS');

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "owner_kind" "OwnerKind" NOT NULL,
    "org_id" TEXT,
    "name" TEXT NOT NULL,
    "status" "AgentStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_spending_policies" (
    "id" UUID NOT NULL,
    "agent_id" TEXT NOT NULL,
    "per_tx_cap_minor" BIGINT NOT NULL,
    "daily_cap_minor" BIGINT NOT NULL,
    "monthly_cap_minor" BIGINT,
    "destination_allowlist" JSONB NOT NULL,
    "approval_threshold_minor" BIGINT NOT NULL,
    "required_approvers" INTEGER NOT NULL DEFAULT 0,
    "currency" VARCHAR(8) NOT NULL DEFAULT 'USD',
    "version" INTEGER NOT NULL DEFAULT 1,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_spending_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_reasoning_logs" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "intent_id" TEXT,
    "trace_id" TEXT,
    "summary" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_reasoning_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "agents_owner_id_status_idx" ON "agents"("owner_id", "status");

-- CreateIndex
CREATE INDEX "agents_org_id_idx" ON "agents"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "agent_spending_policies_agent_id_key" ON "agent_spending_policies"("agent_id");

-- CreateIndex
CREATE INDEX "agent_reasoning_logs_agent_id_created_at_idx" ON "agent_reasoning_logs"("agent_id", "created_at");

-- CreateIndex
CREATE INDEX "agent_reasoning_logs_intent_id_idx" ON "agent_reasoning_logs"("intent_id");

-- AddForeignKey
ALTER TABLE "agent_spending_policies" ADD CONSTRAINT "agent_spending_policies_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_reasoning_logs" ADD CONSTRAINT "agent_reasoning_logs_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

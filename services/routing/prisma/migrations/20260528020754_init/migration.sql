-- CreateEnum
CREATE TYPE "Rail" AS ENUM ('INTERNAL', 'BASE', 'XRPL', 'FIAT', 'ESCROW');

-- CreateTable
CREATE TABLE "route_decisions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intent_id" TEXT,
    "correlation_key" TEXT,
    "input" JSONB NOT NULL,
    "candidates" JSONB NOT NULL,
    "selected_rail" "Rail" NOT NULL,
    "selected_score" INTEGER NOT NULL,
    "rationale" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "route_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "route_decisions_selected_rail_created_at_idx" ON "route_decisions"("selected_rail", "created_at");


-- Milestone E1: on-chain governance execution + attestation registry metadata

CREATE TYPE "ControlKind" AS ENUM ('NONE', 'PAUSABLE');
CREATE TYPE "ExecutionMode" AS ENUM ('DB_ONLY', 'ON_CHAIN');
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING', 'SUBMITTED', 'EXECUTED', 'FAILED', 'CANCELLED');

ALTER TABLE "deployed_contracts"
  ADD COLUMN "chain_id" INTEGER,
  ADD COLUMN "control_kind" "ControlKind" NOT NULL DEFAULT 'NONE',
  ADD COLUMN "execution_mode" "ExecutionMode" NOT NULL DEFAULT 'DB_ONLY',
  ADD COLUMN "timelock_address" TEXT,
  ADD COLUMN "governor_address" TEXT;

ALTER TABLE "status_proposals"
  ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "status_proposals"
  ALTER COLUMN "status" TYPE "ProposalStatus" USING (
    CASE UPPER("status")
      WHEN 'EXECUTED' THEN 'EXECUTED'::"ProposalStatus"
      WHEN 'PENDING' THEN 'PENDING'::"ProposalStatus"
      WHEN 'FAILED' THEN 'FAILED'::"ProposalStatus"
      ELSE 'EXECUTED'::"ProposalStatus"
    END
  );

ALTER TABLE "status_proposals"
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

ALTER TABLE "status_proposals"
  ADD COLUMN "tx_hash" TEXT,
  ADD COLUMN "calldata" TEXT,
  ADD COLUMN "broadcast_job_id" TEXT,
  ADD COLUMN "error" TEXT;

CREATE TABLE "governance_deployments" (
  "id" TEXT NOT NULL,
  "network" TEXT NOT NULL,
  "chain_id" INTEGER NOT NULL,
  "token_address" TEXT NOT NULL,
  "timelock_address" TEXT NOT NULL,
  "governor_address" TEXT NOT NULL,
  "deployed_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "governance_deployments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "attestation_issuers" (
  "id" TEXT NOT NULL,
  "registry_contract_id" TEXT NOT NULL,
  "issuer_address" TEXT NOT NULL,
  "vertical" TEXT NOT NULL,
  "accredited" BOOLEAN NOT NULL DEFAULT false,
  "on_chain_tx_hash" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "attestation_issuers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "attestation_issuers_registry_contract_id_issuer_address_key"
  ON "attestation_issuers"("registry_contract_id", "issuer_address");

ALTER TABLE "attestation_issuers"
  ADD CONSTRAINT "attestation_issuers_registry_contract_id_fkey"
  FOREIGN KEY ("registry_contract_id") REFERENCES "deployed_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

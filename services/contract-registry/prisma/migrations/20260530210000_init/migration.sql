-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DEPRECATED');

-- CreateTable
CREATE TABLE "deployed_contracts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'ACTIVE',
    "tvl_usd" INTEGER NOT NULL DEFAULT 0,
    "audited" BOOLEAN NOT NULL DEFAULT false,
    "deployed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deployed_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_upgrades" (
    "id" TEXT NOT NULL,
    "contract_id" TEXT,
    "contract_name" TEXT NOT NULL,
    "from_version" TEXT NOT NULL,
    "to_version" TEXT NOT NULL,
    "upgraded_at" TIMESTAMP(3) NOT NULL,
    "approved_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contract_upgrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_proposals" (
    "id" TEXT NOT NULL,
    "contract_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'EXECUTED',
    "actor_ref" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executed_at" TIMESTAMP(3),

    CONSTRAINT "status_proposals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contract_upgrades" ADD CONSTRAINT "contract_upgrades_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "deployed_contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_proposals" ADD CONSTRAINT "status_proposals_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "deployed_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

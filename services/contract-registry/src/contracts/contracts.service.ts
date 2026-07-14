import { Injectable } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { ulid } from 'ulid';
import {
  ContractStatus,
  ControlKind,
  ExecutionMode,
  ProposalStatus,
} from '../generated/prisma/index.js';
import { contractRegistryEnvSchema } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GovernanceExecutorService } from '../governance/governance-executor.service.js';

function toDisplayStatus(status: ContractStatus): string {
  switch (status) {
    case ContractStatus.ACTIVE:
      return 'Active';
    case ContractStatus.PAUSED:
      return 'Paused';
    case ContractStatus.DEPRECATED:
      return 'Deprecated';
    default:
      return status;
  }
}

function toDbStatus(status: string): ContractStatus {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return ContractStatus.ACTIVE;
    case 'PAUSED':
      return ContractStatus.PAUSED;
    case 'DEPRECATED':
      return ContractStatus.DEPRECATED;
    default:
      return ContractStatus.ACTIVE;
  }
}

export function toContractDto(row: {
  id: string;
  name: string;
  purpose: string;
  network: string;
  address: string;
  version: string;
  status: ContractStatus;
  tvlUsd: number;
  audited: boolean;
  deployedAt: Date;
  controlKind?: string;
  executionMode?: string;
  chainId?: number | null;
  timelockAddress?: string | null;
  governorAddress?: string | null;
}) {
  return {
    id: row.id,
    name: row.name,
    purpose: row.purpose,
    network: row.network,
    address: row.address,
    version: row.version,
    status: toDisplayStatus(row.status),
    tvl_usd: row.tvlUsd,
    audited: row.audited,
    deployed: row.deployedAt.toISOString().slice(0, 10),
    control_kind: row.controlKind ?? 'NONE',
    execution_mode: row.executionMode ?? 'DB_ONLY',
    chain_id: row.chainId ?? null,
    timelock_address: row.timelockAddress ?? null,
    governor_address: row.governorAddress ?? null,
  };
}

export function toUpgradeDto(row: {
  id: string;
  contractName: string;
  fromVersion: string;
  toVersion: string;
  upgradedAt: Date;
  approvedBy: string;
}) {
  return {
    id: row.id,
    contract: row.contractName,
    from: row.fromVersion,
    to: row.toVersion,
    when: row.upgradedAt.toISOString().slice(0, 10),
    by: row.approvedBy,
  };
}

@Injectable()
export class ContractsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly executor: GovernanceExecutorService,
  ) {}

  async list() {
    const rows = await this.prisma.deployedContract.findMany({ orderBy: { deployedAt: 'desc' } });
    return { data: rows.map(toContractDto) };
  }

  async getById(id: string) {
    const row = await this.prisma.deployedContract.findUnique({ where: { id } });
    if (!row) throw NotFoundError('contract.not_found', `Contract ${id} not found`);
    return toContractDto(row);
  }

  async listUpgrades() {
    const rows = await this.prisma.contractUpgrade.findMany({ orderBy: { upgradedAt: 'desc' } });
    return { data: rows.map(toUpgradeDto) };
  }

  async proposeStatus(contractId: string, action: 'pause' | 'resume', actorRef?: string) {
    const contract = await this.prisma.deployedContract.findUnique({ where: { id: contractId } });
    if (!contract) throw NotFoundError('contract.not_found', `Contract ${contractId} not found`);
    if (contract.status === ContractStatus.DEPRECATED) {
      throw ValidationError('contract.deprecated', `Contract ${contractId} is deprecated and cannot be modified`);
    }

    const env = loadEnv(contractRegistryEnvSchema);
    const proposalId = `prop_${ulid()}`;

    if (contract.executionMode === ExecutionMode.ON_CHAIN && contract.controlKind === ControlKind.PAUSABLE) {
      if (!env.GOVERNANCE_EXECUTOR_WALLET_ID) {
        throw ValidationError(
          'governance.executor_unconfigured',
          'On-chain pause requires GOVERNANCE_EXECUTOR_WALLET_ID',
        );
      }

      await this.prisma.statusProposal.create({
        data: {
          id: proposalId,
          contractId,
          action: action.toUpperCase(),
          status: ProposalStatus.PENDING,
          actorRef: actorRef ?? null,
        },
      });

      const { broadcastJobId } = await this.executor.submitOnChainPause(contract, proposalId, action);

      return {
        proposal_id: proposalId,
        contract_id: contractId,
        action,
        status: 'Pending',
        execution_mode: 'ON_CHAIN',
        broadcast_job_id: broadcastJobId,
        message: `${contract.name} ${action} submitted for on-chain execution`,
      };
    }

    const nextStatus = action === 'pause' ? ContractStatus.PAUSED : ContractStatus.ACTIVE;
    const now = new Date();

    const [updated] = await this.prisma.$transaction([
      this.prisma.deployedContract.update({
        where: { id: contractId },
        data: { status: nextStatus },
      }),
      this.prisma.statusProposal.create({
        data: {
          id: proposalId,
          contractId,
          action: action.toUpperCase(),
          status: ProposalStatus.EXECUTED,
          actorRef: actorRef ?? null,
          executedAt: now,
        },
      }),
    ]);

    return {
      proposal_id: proposalId,
      contract_id: contractId,
      action,
      status: toDisplayStatus(updated.status),
      execution_mode: 'DB_ONLY',
      message: `${updated.name} ${action === 'pause' ? 'paused' : 'resumed'} — registry updated (no on-chain control)`,
    };
  }
}

export { toDbStatus, toDisplayStatus };

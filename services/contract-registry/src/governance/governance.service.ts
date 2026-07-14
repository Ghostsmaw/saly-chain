import { Injectable } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { L3ChainAdapter, attestationIdFromString, encodeSetAccreditedIssuer, type L3Network } from '@salychain/chain-l3';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { ulid } from 'ulid';
import type { Address, Hex } from 'viem';
import { ExecutionMode } from '../generated/prisma/index.js';
import { contractRegistryEnvSchema } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GovernanceExecutorService } from './governance-executor.service.js';

@Injectable()
export class GovernanceService {
  private readonly l3?: L3ChainAdapter;
  private readonly attestationRegistry?: Address;

  constructor(
    private readonly prisma: PrismaService,
    private readonly executor: GovernanceExecutorService,
  ) {
    const env = loadEnv(contractRegistryEnvSchema);
    if (env.L3_L3_RPC_URL) {
      this.l3 = new L3ChainAdapter({ l3Network: env.L3_NETWORK as L3Network, rpcUrl: env.L3_L3_RPC_URL });
    }
    if (env.L3_ATTESTATION_REGISTRY_ADDRESS) {
      this.attestationRegistry = env.L3_ATTESTATION_REGISTRY_ADDRESS as Address;
    }
  }

  async listDeployments() {
    const rows = await this.prisma.governanceDeployment.findMany({ orderBy: { deployedAt: 'desc' } });
    return {
      data: rows.map((r) => ({
        id: r.id,
        network: r.network,
        chain_id: r.chainId,
        token_address: r.tokenAddress,
        timelock_address: r.timelockAddress,
        governor_address: r.governorAddress,
        deployed_at: r.deployedAt.toISOString(),
      })),
    };
  }

  async registerDeployment(input: {
    id: string;
    network: string;
    token_address: string;
    timelock_address: string;
    governor_address: string;
    chain_id?: number;
  }) {
    const row = await this.prisma.governanceDeployment.upsert({
      where: { id: input.id },
      create: {
        id: input.id,
        network: input.network,
        chainId: input.chain_id ?? 0,
        tokenAddress: input.token_address,
        timelockAddress: input.timelock_address,
        governorAddress: input.governor_address,
        deployedAt: new Date(),
      },
      update: {
        network: input.network,
        chainId: input.chain_id ?? 0,
        tokenAddress: input.token_address,
        timelockAddress: input.timelock_address,
        governorAddress: input.governor_address,
      },
    });
    return { id: row.id, governor_address: row.governorAddress };
  }

  async listProposals() {
    const rows = await this.prisma.statusProposal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { contract: true },
    });
    return {
      data: rows.map((p) => ({
        id: p.id,
        contract_id: p.contractId,
        contract_name: p.contract.name,
        action: p.action.toLowerCase(),
        status: p.status,
        tx_hash: p.txHash,
        broadcast_job_id: p.broadcastJobId,
        error: p.error,
        created_at: p.createdAt.toISOString(),
        executed_at: p.executedAt?.toISOString() ?? null,
      })),
    };
  }

  async listIssuers() {
    const rows = await this.prisma.attestationIssuer.findMany({ orderBy: { createdAt: 'desc' } });
    return {
      data: rows.map((r) => ({
        id: r.id,
        registry_contract_id: r.registryContractId,
        issuer_address: r.issuerAddress,
        vertical: r.vertical,
        accredited: r.accredited,
        on_chain_tx_hash: r.onChainTxHash,
      })),
    };
  }

  async verifyAttestation(id: string) {
    if (!this.l3 || !this.attestationRegistry) {
      throw ValidationError(
        'attestation.registry_unconfigured',
        'L3_ATTESTATION_REGISTRY_ADDRESS and L3_L3_RPC_URL required',
      );
    }
    const attestationId = attestationIdFromString(id) as Hex;
    const { valid, record } = await this.l3.readAttestationVerify(this.attestationRegistry, attestationId);

    return {
      attestation_id: attestationId,
      valid,
      record: {
        schema_id: record.schemaId,
        issuer: record.issuer,
        subject: record.subject,
        data_hash: record.dataHash,
        issued_at: Number(record.issuedAt),
        expires_at: Number(record.expiresAt),
        revoked: record.revoked,
      },
    };
  }

  async accreditIssuer(
    registryContractId: string,
    input: { issuer_address: string; vertical: string; accredited: boolean; actor_ref?: string },
  ) {
    const contract = await this.prisma.deployedContract.findUnique({ where: { id: registryContractId } });
    if (!contract) throw NotFoundError('contract.not_found', `Contract ${registryContractId} not found`);

    const issuerId = `iss_${ulid()}`;
    const row = await this.prisma.attestationIssuer.upsert({
      where: {
        registryContractId_issuerAddress: {
          registryContractId,
          issuerAddress: input.issuer_address,
        },
      },
      create: {
        id: issuerId,
        registryContractId,
        issuerAddress: input.issuer_address,
        vertical: input.vertical,
        accredited: input.accredited,
      },
      update: {
        vertical: input.vertical,
        accredited: input.accredited,
      },
    });

    let broadcastJobId: string | undefined;
    if (contract.executionMode === ExecutionMode.ON_CHAIN) {
      const calldata = encodeSetAccreditedIssuer({
        issuer: input.issuer_address as Address,
        accredited: input.accredited,
      });
      const result = await this.executor.submitRawCall({
        contract,
        idempotencyKey: `issuer:${row.id}:${input.accredited}`,
        calldata,
      });
      broadcastJobId = result.broadcastJobId;
      await this.prisma.attestationIssuer.update({
        where: { id: row.id },
        data: { onChainTxHash: null },
      });
    }

    return {
      issuer_id: row.id,
      issuer_address: row.issuerAddress,
      accredited: row.accredited,
      broadcast_job_id: broadcastJobId ?? null,
    };
  }
}

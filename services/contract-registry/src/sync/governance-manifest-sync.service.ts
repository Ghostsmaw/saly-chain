import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { loadDeploymentManifest, type L3Network } from '@salychain/chain-l3';
import { ContractStatus, ControlKind, ExecutionMode } from '../generated/prisma/index.js';
import { contractRegistryEnvSchema } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';

/** Upserts Milestone E contracts from the L3 deployment manifest. */
@Injectable()
export class GovernanceManifestSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(GovernanceManifestSyncService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    const env = loadEnv(contractRegistryEnvSchema);
    const network = env.L3_NETWORK as L3Network;
    const manifest = loadDeploymentManifest(process.cwd(), network);
    if (!manifest) {
      this.logger.debug('no L3 manifest — skipping governance contract sync');
      return;
    }

    const deployedAt = manifest.deployed_at ? new Date(manifest.deployed_at) : new Date();
    const chainId = manifest.l3_chain_id ?? null;
    const l3NetworkLabel = `Saly L3 (${manifest.network})`;

    if (manifest.assets?.SalySD) {
      await this.upsertContract({
        id: 'c_salysd',
        name: 'SalySD',
        purpose: 'Native L3 stablecoin (pausable)',
        network: l3NetworkLabel,
        address: manifest.assets.SalySD,
        version: 'v1.0.0',
        chainId,
        controlKind: ControlKind.PAUSABLE,
        executionMode: ExecutionMode.ON_CHAIN,
        deployedAt,
        audited: true,
      });
    }

    if (manifest.assets?.SalyAttestationRegistry) {
      await this.upsertContract({
        id: 'c_attest',
        name: 'SalyAttestationRegistry',
        purpose: 'Cross-vertical attestation anchor',
        network: l3NetworkLabel,
        address: manifest.assets.SalyAttestationRegistry,
        version: 'v1.0.0',
        chainId,
        controlKind: ControlKind.NONE,
        executionMode: ExecutionMode.ON_CHAIN,
        deployedAt,
        audited: true,
      });
    }

    if (manifest.assets?.SalyAssetToken) {
      await this.upsertContract({
        id: 'c_asset_token',
        name: 'SalyAssetToken',
        purpose: 'ERC-1155 RWA tokenization template',
        network: l3NetworkLabel,
        address: manifest.assets.SalyAssetToken,
        version: 'v1.0.0',
        chainId,
        controlKind: ControlKind.NONE,
        executionMode: ExecutionMode.ON_CHAIN,
        deployedAt,
        audited: true,
      });
    }

    if (manifest.governance?.token && manifest.governance.timelock && manifest.governance.governor) {
      const govId = `gov_${manifest.network.replace(/-/g, '_')}`;
      await this.prisma.governanceDeployment.upsert({
        where: { id: govId },
        create: {
          id: govId,
          network: manifest.settlement,
          chainId: manifest.settlement === 'base-mainnet' ? 8453 : 84532,
          tokenAddress: manifest.governance.token,
          timelockAddress: manifest.governance.timelock,
          governorAddress: manifest.governance.governor,
          deployedAt,
        },
        update: {
          tokenAddress: manifest.governance.token,
          timelockAddress: manifest.governance.timelock,
          governorAddress: manifest.governance.governor,
        },
      });
      this.logger.log(`synced governance deployment ${govId}`);
    }
  }

  private async upsertContract(input: {
    id: string;
    name: string;
    purpose: string;
    network: string;
    address: string;
    version: string;
    chainId: number | null;
    controlKind: ControlKind;
    executionMode: ExecutionMode;
    deployedAt: Date;
    audited: boolean;
  }): Promise<void> {
    await this.prisma.deployedContract.upsert({
      where: { id: input.id },
      create: {
        id: input.id,
        name: input.name,
        purpose: input.purpose,
        network: input.network,
        address: input.address,
        version: input.version,
        status: ContractStatus.ACTIVE,
        tvlUsd: 0,
        audited: input.audited,
        deployedAt: input.deployedAt,
        chainId: input.chainId,
        controlKind: input.controlKind,
        executionMode: input.executionMode,
      },
      update: {
        address: input.address,
        network: input.network,
        version: input.version,
        chainId: input.chainId,
        controlKind: input.controlKind,
        executionMode: input.executionMode,
        status: ContractStatus.ACTIVE,
      },
    });
    this.logger.log(`synced ${input.name} → ${input.address}`);
  }
}

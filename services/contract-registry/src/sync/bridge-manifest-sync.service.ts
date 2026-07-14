import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { loadDeploymentManifest, resolveBridgeContracts } from '@salychain/chain-l3';
import { ContractStatus } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

const MOCK_BRIDGE_ID = 'c_l3bridge';

/** Upserts canonical OP-Stack bridge contracts from the L3 deployment manifest. */
@Injectable()
export class BridgeManifestSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BridgeManifestSyncService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    const manifest = loadDeploymentManifest(process.cwd());
    const bridge = resolveBridgeContracts(process.cwd());
    if (!manifest && !bridge.optimismPortal) {
      this.logger.debug('no L3 manifest — skipping bridge contract sync');
      return;
    }

    const networkLabel = `Base ↔ ${bridge.network}`;
    const deployedAt = manifest?.deployed_at
      ? new Date(manifest.deployed_at)
      : new Date();

    const entries: Array<{
      id: string;
      name: string;
      purpose: string;
      address: string;
    }> = [];

    if (bridge.optimismPortal) {
      entries.push({
        id: 'c_l3_portal',
        name: 'OptimismPortal',
        purpose: 'L3 bedrock deposit portal on Base',
        address: bridge.optimismPortal,
      });
    }
    if (bridge.l1StandardBridge) {
      entries.push({
        id: 'c_l1_standard_bridge',
        name: 'L1StandardBridge',
        purpose: 'ERC-20 deposits Base → L3',
        address: bridge.l1StandardBridge,
      });
    }
    if (bridge.l2StandardBridge) {
      entries.push({
        id: 'c_l2_standard_bridge',
        name: 'L2StandardBridge',
        purpose: 'Withdrawals L3 → Base',
        address: bridge.l2StandardBridge,
      });
    }

    for (const entry of entries) {
      await this.prisma.deployedContract.upsert({
        where: { id: entry.id },
        create: {
          id: entry.id,
          name: entry.name,
          purpose: entry.purpose,
          network: networkLabel,
          address: entry.address,
          version: manifest?.op_deployer_version ?? 'bedrock',
          status: ContractStatus.ACTIVE,
          tvlUsd: 0,
          audited: false,
          deployedAt,
        },
        update: {
          address: entry.address,
          network: networkLabel,
          status: ContractStatus.ACTIVE,
          version: manifest?.op_deployer_version ?? 'bedrock',
        },
      });
      this.logger.log(`synced ${entry.name} → ${entry.address}`);
    }

    const mock = await this.prisma.deployedContract.findUnique({ where: { id: MOCK_BRIDGE_ID } });
    if (mock && entries.length > 0) {
      await this.prisma.deployedContract.update({
        where: { id: MOCK_BRIDGE_ID },
        data: { status: ContractStatus.DEPRECATED },
      });
      this.logger.log(`deprecated mock bridge row ${MOCK_BRIDGE_ID}`);
    }
  }
}

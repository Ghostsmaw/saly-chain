import { Module } from '@nestjs/common';
import { ContractsController } from './contracts/contracts.controller.js';
import { ContractsService } from './contracts/contracts.service.js';
import { GovernanceModule } from './governance/governance.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SeedService } from './seed/seed.service.js';
import { BridgeManifestSyncService } from './sync/bridge-manifest-sync.service.js';
import { GovernanceManifestSyncService } from './sync/governance-manifest-sync.service.js';

@Module({
  imports: [PrismaModule, GovernanceModule],
  controllers: [ContractsController],
  providers: [ContractsService, SeedService, BridgeManifestSyncService, GovernanceManifestSyncService],
})
export class ContractRegistryModule {}

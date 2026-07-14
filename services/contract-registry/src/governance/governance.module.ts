import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { contractRegistryEnvSchema } from '../config/env.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GovernanceController, AttestationsController } from './governance.controller.js';
import { GovernanceExecutorService } from './governance-executor.service.js';
import { GovernanceReconcilerService } from './governance-reconciler.service.js';
import { GovernanceService } from './governance.service.js';

const env = loadEnv(contractRegistryEnvSchema);

@Module({
  imports: [PrismaModule],
  controllers: [GovernanceController, AttestationsController],
  providers: [
    {
      provide: GovernanceExecutorService,
      useFactory: (prisma: PrismaService) =>
        new GovernanceExecutorService(prisma, env.WALLET_BASE_URL, env.GOVERNANCE_EXECUTOR_WALLET_ID),
      inject: [PrismaService],
    },
    GovernanceService,
    GovernanceReconcilerService,
  ],
  exports: [GovernanceExecutorService, GovernanceService],
})
export class GovernanceModule {}

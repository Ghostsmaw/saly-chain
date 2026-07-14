import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller.js';
import { AgentsService } from './agents.service.js';
import { WalletClientModule } from '../clients/wallet.client.module.js';
import { ExecutionClientModule } from '../clients/execution.client.module.js';
import { loadEnv } from '@salychain/config';
import { agentsEnvSchema } from '../config/env.js';
import { AGENTS_ENV } from '../config/env.runtime.js';

@Module({
  imports: [WalletClientModule, ExecutionClientModule],
  controllers: [AgentsController],
  providers: [
    AgentsService,
    { provide: AGENTS_ENV, useFactory: () => loadEnv(agentsEnvSchema) },
  ],
  exports: [AgentsService],
})
export class AgentsModule {}

import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller.js';
import { PolicyController } from './policy.controller.js';
import { WalletsService } from './wallets.service.js';
import { PolicyService } from './policy.service.js';
import { SpendApprovalService } from './spend-approval.service.js';
import { AgentsClientModule } from '../clients/agents.client.module.js';
import { LedgerClientModule } from '../clients/ledger.client.module.js';

@Module({
  imports: [AgentsClientModule, LedgerClientModule],
  controllers: [WalletsController, PolicyController],
  providers: [WalletsService, PolicyService, SpendApprovalService],
  exports: [WalletsService, PolicyService, SpendApprovalService],
})
export class WalletsModule {}

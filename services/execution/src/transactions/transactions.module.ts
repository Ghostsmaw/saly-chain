import { Module } from '@nestjs/common';
import { ClearingController } from './clearing.controller.js';
import { FiatWebhookController } from './fiat-webhook.controller.js';
import { TransactionsController } from './transactions.controller.js';
import { TransactionsService } from './transactions.service.js';
import { LedgerModule } from '../ledger/ledger.module.js';
import { FiatModule } from '../fiat/fiat.module.js';
import { EscrowModule } from '../escrow/escrow.module.js';

@Module({
  imports: [LedgerModule, FiatModule, EscrowModule],
  controllers: [TransactionsController, ClearingController, FiatWebhookController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}

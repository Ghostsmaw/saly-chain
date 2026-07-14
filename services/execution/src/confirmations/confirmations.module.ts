import { Module } from '@nestjs/common';
import { ConfirmationsService } from './confirmations.service.js';
import { FiatConfirmationsService } from './fiat-confirmations.service.js';
import { FiatPayinConfirmationsService } from './fiat-payin-confirmations.service.js';
import { TransactionsModule } from '../transactions/transactions.module.js';
import { FiatModule } from '../fiat/fiat.module.js';

import { EscrowModule } from '../escrow/escrow.module.js';

@Module({
  imports: [TransactionsModule, FiatModule, EscrowModule],
  providers: [ConfirmationsService, FiatConfirmationsService, FiatPayinConfirmationsService],
  exports: [ConfirmationsService],
})
export class ConfirmationsModule {}

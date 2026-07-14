import { Module } from '@nestjs/common';
import { SalysdController } from './salysd.controller.js';
import { SalysdService } from './salysd.service.js';
import { SalysdConfirmationsService } from './salysd-confirmations.service.js';
import { LedgerModule } from '../ledger/ledger.module.js';
import { ClientsModule } from '../clients/clients.module.js';
import { EventsModule } from '../events/events.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { FiatModule } from '../fiat/fiat.module.js';

@Module({
  imports: [LedgerModule, ClientsModule, EventsModule, PrismaModule, FiatModule],
  controllers: [SalysdController],
  providers: [SalysdService, SalysdConfirmationsService],
  exports: [SalysdService],
})
export class SalysdModule {}

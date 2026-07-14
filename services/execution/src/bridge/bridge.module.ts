import { Module } from '@nestjs/common';
import { BridgeController } from './bridge.controller.js';
import { BridgeService } from './bridge.service.js';
import { BridgeConfirmationsService } from './bridge-confirmations.service.js';
import { LedgerModule } from '../ledger/ledger.module.js';
import { ClientsModule } from '../clients/clients.module.js';
import { EventsModule } from '../events/events.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [LedgerModule, ClientsModule, EventsModule, PrismaModule],
  controllers: [BridgeController],
  providers: [BridgeService, BridgeConfirmationsService],
  exports: [BridgeService],
})
export class BridgeModule {}

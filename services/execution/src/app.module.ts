import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { EventsModule } from './events/events.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { TransactionsModule } from './transactions/transactions.module.js';
import { ConfirmationsModule } from './confirmations/confirmations.module.js';
import { ReconciliationModule } from './reconciliation/reconciliation.module.js';
import { EscrowModule } from './escrow/escrow.module.js';
import { BridgeModule } from './bridge/bridge.module.js';
import { SalysdModule } from './salysd/salysd.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    EventsModule,
    OutboxModule,
    ClientsModule,
    TransactionsModule,
    EscrowModule,
    ConfirmationsModule,
    ReconciliationModule,
    BridgeModule,
    SalysdModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}

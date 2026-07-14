import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { WalletsModule } from './wallets/wallets.module.js';
import { SignerModule } from './signer/signer.module.js';
import { TransfersModule } from './transfers/transfers.module.js';
import { EscrowModule } from './escrow/escrow.module.js';
import { ChainsModule } from './chains/chains.module.js';
import { QueuesModule } from './queues/queues.module.js';
import { EventsModule } from './events/events.module.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    QueuesModule,
    ChainsModule,
    EventsModule,
    SignerModule,
    WalletsModule,
    TransfersModule,
    EscrowModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}

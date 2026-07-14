import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { AgentsModule } from './agents/agents.module.js';
import { MarketplaceModule } from './marketplace/marketplace.module.js';
import { EventsModule } from './events/events.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, PrismaModule, EventsModule, OutboxModule, AgentsModule, MarketplaceModule],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { QueueModule } from './delivery/queue.module.js';
import { SubscriptionsModule } from './subscriptions/subscriptions.module.js';
import { EventsModule } from './events/events.module.js';
import { DeliveryWorker } from './delivery/delivery.worker.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, PrismaModule, QueueModule, SubscriptionsModule, EventsModule],
  controllers: [HealthController],
  providers: [
    DeliveryWorker,
    { provide: APP_FILTER, useClass: DomainErrorFilter },
  ],
})
export class AppModule {}

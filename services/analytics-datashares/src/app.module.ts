import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClickHouseModule } from './clickhouse/clickhouse.module.js';
import { QueueModule } from './runs/queue.module.js';
import { SharesModule } from './shares/shares.module.js';
import { ProvidersModule } from './providers/providers.module.js';
import { RunWorker } from './runs/run.worker.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    ClickHouseModule,
    QueueModule,
    ProvidersModule,
    SharesModule,
  ],
  controllers: [HealthController],
  providers: [RunWorker, { provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}

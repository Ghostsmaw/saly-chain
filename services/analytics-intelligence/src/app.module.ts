import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClickHouseModule } from './clickhouse/clickhouse.module.js';
import { QueueModule } from './runs/queue.module.js';
import { IntelligenceModule } from './intelligence/intelligence.module.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [TerminusModule, PrismaModule, ClickHouseModule, QueueModule, IntelligenceModule],
  controllers: [HealthController],
  providers: [{ provide: APP_FILTER, useClass: DomainErrorFilter }],
})
export class AppModule {}

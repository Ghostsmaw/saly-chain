import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module.js';
import { ClickHouseModule } from './clickhouse/clickhouse.module.js';
import { IngestModule } from './ingest/ingest.module.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [EventsModule, ClickHouseModule, IngestModule],
  controllers: [HealthController],
})
export class AppModule {}

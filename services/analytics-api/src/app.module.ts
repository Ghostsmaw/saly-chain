import { Module } from '@nestjs/common';
import { ClickHouseModule } from './clickhouse/clickhouse.module.js';
import { DataModule } from './data/data.module.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [ClickHouseModule, DataModule],
  controllers: [HealthController],
})
export class AppModule {}

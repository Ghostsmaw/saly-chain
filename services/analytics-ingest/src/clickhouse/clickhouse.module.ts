import { Global, Module } from '@nestjs/common';
import { ClickHouseService } from './clickhouse.service.js';

@Global()
@Module({
  providers: [ClickHouseService],
  exports: [ClickHouseService],
})
export class ClickHouseModule {}

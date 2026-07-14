import { Global, Module } from '@nestjs/common';
import { ClickHouseReadService } from './clickhouse.read.service.js';

@Global()
@Module({ providers: [ClickHouseReadService], exports: [ClickHouseReadService] })
export class ClickHouseModule {}

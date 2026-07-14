import { Controller, Get } from '@nestjs/common';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly clickhouse: ClickHouseReadService) {}

  @Get()
  async check(): Promise<{ status: string; clickhouse: boolean }> {
    const ok = await this.clickhouse.ping().catch(() => false);
    return { status: ok ? 'ok' : 'degraded', clickhouse: ok };
  }
}

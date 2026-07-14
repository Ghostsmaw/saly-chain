import { Controller, Get } from '@nestjs/common';
import { ClickHouseService } from '../clickhouse/clickhouse.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly clickhouse: ClickHouseService) {}

  @Get()
  async check(): Promise<{ status: string; clickhouse: boolean }> {
    const ok = await this.clickhouse.ping().catch(() => false);
    return { status: ok ? 'ok' : 'degraded', clickhouse: ok };
  }
}

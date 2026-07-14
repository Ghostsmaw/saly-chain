import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service.js';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
    private readonly clickhouse: ClickHouseReadService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
      async () => {
        const ok = await this.clickhouse.ping().catch(() => false);
        return { clickhouse: { status: ok ? 'up' : 'down' } };
      },
    ]);
  }
}

import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RequestLogService {
  constructor(private readonly prisma: PrismaService) {}

  log(input: {
    apiKeyId?: string;
    orgId?: string;
    method: string;
    path: string;
    status: number;
    latencyMs: number;
    ip?: string;
    userAgent?: string;
    correlationId: string;
  }): Promise<void> {
    return this.prisma.requestLog
      .create({
        data: {
          id: `req_${ulid()}`,
          apiKeyId: input.apiKeyId ?? null,
          orgId: input.orgId ?? null,
          method: input.method,
          path: input.path,
          status: input.status,
          latencyMs: input.latencyMs,
          ip: input.ip ?? null,
          userAgent: input.userAgent ?? null,
          correlationId: input.correlationId,
        },
      })
      .then(() => undefined)
      // Logging must NEVER fail a request.
      .catch(() => undefined);
  }

  list(orgId: string, limit = 100) {
    return this.prisma.requestLog.findMany({
      where: { orgId },
      orderBy: { occurredAt: 'desc' },
      take: Math.min(limit, 500),
    });
  }

  async summarize(orgId: string, windowHours = 24) {
    const since = new Date(Date.now() - windowHours * 60 * 60 * 1_000);
    const rows = await this.prisma.requestLog.findMany({
      where: { orgId, occurredAt: { gte: since } },
      select: { status: true, latencyMs: true, path: true, method: true },
    });

    const total = rows.length;
    const errors = rows.filter((r) => r.status >= 400).length;
    const latencies = rows.map((r) => r.latencyMs).sort((a, b) => a - b);
    const p95 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.95)] ?? latencies.at(-1)! : 0;

    const byPath = new Map<string, number>();
    for (const row of rows) {
      const key = `${row.method} ${row.path}`;
      byPath.set(key, (byPath.get(key) ?? 0) + 1);
    }
    const top_paths = [...byPath.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    return {
      window_hours: windowHours,
      total_requests: total,
      error_count: errors,
      error_rate_pct: total > 0 ? Math.round((errors / total) * 10_000) / 100 : 0,
      latency_p95_ms: p95,
      top_paths,
    };
  }
}

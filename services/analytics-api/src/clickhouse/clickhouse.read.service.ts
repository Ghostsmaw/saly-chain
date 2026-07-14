import {
  Injectable,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { createClient, type ClickHouseClient } from '@clickhouse/client';
import { loadEnv } from '@salychain/config';
import { analyticsApiEnvSchema } from '../config/env.js';

export type QueryParams = Record<string, string | number | boolean>;

/**
 * Read-only ClickHouse access for the Saly Realtime APIs.
 *
 * Safety model (defense in depth):
 *   - Every SQL string is built by THIS service (no user-supplied SQL); the
 *     public `POST /query` endpoint only selects from an allowlist of named,
 *     parameterized queries.
 *   - All dynamic values are bound via ClickHouse `{name:Type}` query params —
 *     never string-interpolated — so injection is structurally impossible.
 *   - Hard server-side caps on rows + execution time (and `result_overflow_mode
 *     = break`, so an over-large result truncates instead of erroring).
 *   - Production should additionally point CLICKHOUSE_USER at a CH user whose
 *     profile is `readonly = 1`.
 */
@Injectable()
export class ClickHouseReadService implements OnApplicationShutdown {
  private readonly client: ClickHouseClient;

  constructor() {
    const env = loadEnv(analyticsApiEnvSchema);
    this.client = createClient({
      url: env.CLICKHOUSE_URL,
      username: env.CLICKHOUSE_USER,
      password: env.CLICKHOUSE_PASSWORD,
      database: env.CLICKHOUSE_DATABASE,
      clickhouse_settings: {
        max_execution_time: env.QUERY_TIMEOUT_SECONDS,
        max_result_rows: String(env.QUERY_MAX_ROWS),
        result_overflow_mode: 'break',
      },
    });
  }

  async onApplicationShutdown(): Promise<void> {
    await this.client.close();
  }

  async query<T = Record<string, unknown>>(
    query: string,
    query_params: QueryParams = {},
  ): Promise<T[]> {
    const result = await this.client.query({
      query,
      query_params,
      format: 'JSONEachRow',
    });
    return result.json<T>();
  }

  async ping(): Promise<boolean> {
    const result = await this.client.ping();
    return result.success;
  }
}

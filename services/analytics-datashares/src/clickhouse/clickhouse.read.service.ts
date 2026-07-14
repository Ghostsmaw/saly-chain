import { Injectable, type OnApplicationShutdown } from '@nestjs/common';
import { createClient, type ClickHouseClient } from '@clickhouse/client';
import { loadEnv } from '@salychain/config';
import { datasharesEnvSchema } from '../config/env.js';

export type QueryParams = Record<string, string | number | boolean>;

/**
 * Read-only ClickHouse access for curated datashare exports.
 *
 * Safety model (defense in depth), identical to the Realtime APIs service:
 *   - Every SQL string is built by THIS service from an allowlist of named
 *     datasets — customers never supply SQL.
 *   - All dynamic values are bound via ClickHouse `{name:Type}` params, never
 *     string-interpolated, so injection is structurally impossible.
 *   - Hard server-side caps on rows + execution time; over-large results break
 *     (truncate) rather than error.
 *   - Production should point CLICKHOUSE_USER at a `readonly = 1` profile.
 */
@Injectable()
export class ClickHouseReadService implements OnApplicationShutdown {
  private readonly client: ClickHouseClient;

  constructor() {
    const env = loadEnv(datasharesEnvSchema);
    this.client = createClient({
      url: env.CLICKHOUSE_URL,
      username: env.CLICKHOUSE_USER,
      password: env.CLICKHOUSE_PASSWORD,
      database: env.CLICKHOUSE_DATABASE,
      clickhouse_settings: {
        max_execution_time: env.QUERY_TIMEOUT_SECONDS,
        max_result_rows: String(env.SHARE_RUN_MAX_ROWS),
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
    const result = await this.client.query({ query, query_params, format: 'JSONEachRow' });
    return result.json<T>();
  }

  async ping(): Promise<boolean> {
    const result = await this.client.ping();
    return result.success;
  }
}

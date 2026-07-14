import { Injectable, type OnApplicationShutdown } from '@nestjs/common';
import { createClient, type ClickHouseClient } from '@clickhouse/client';
import { loadEnv } from '@salychain/config';
import { intelligenceEnvSchema } from '../config/env.js';

export type QueryParams = Record<string, string | number | boolean>;

/**
 * Read-only ClickHouse access for intelligence (entity resolution inputs,
 * feature engineering, semantic-layer queries).
 *
 * Safety model is identical to the other analytics services: SQL is built here
 * (no user SQL), dynamic values are bound as `{name:Type}` params, hard caps on
 * rows + execution time, and production should use a `readonly = 1` CH profile.
 */
@Injectable()
export class ClickHouseReadService implements OnApplicationShutdown {
  private readonly client: ClickHouseClient;

  constructor() {
    const env = loadEnv(intelligenceEnvSchema);
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
    const result = await this.client.query({ query, query_params, format: 'JSONEachRow' });
    return result.json<T>();
  }

  async ping(): Promise<boolean> {
    const result = await this.client.ping();
    return result.success;
  }
}

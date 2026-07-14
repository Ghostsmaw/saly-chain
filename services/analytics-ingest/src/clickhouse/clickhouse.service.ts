import {
  Injectable,
  type OnApplicationShutdown,
  type OnModuleInit,
} from '@nestjs/common';
import { createClient, type ClickHouseClient } from '@clickhouse/client';
import { loadEnv } from '@salychain/config';
import { createLogger, type Logger } from '@salychain/logger';
import { analyticsIngestEnvSchema } from '../config/env.js';
import { ANALYTICS_DATABASE, SCHEMA_STATEMENTS } from './schema.js';

/**
 * Thin ClickHouse client wrapper. Inserts use server-side async batching
 * (`async_insert`) with `wait_for_async_insert` so a returned insert is durable
 * before we ack the source event — preserving at-least-once semantics.
 */
@Injectable()
export class ClickHouseService implements OnModuleInit, OnApplicationShutdown {
  private readonly client: ClickHouseClient;
  private readonly logger: Logger = createLogger({ service: 'analytics-ingest.clickhouse' });
  private readonly database = ANALYTICS_DATABASE;

  constructor() {
    const env = loadEnv(analyticsIngestEnvSchema);
    this.client = createClient({
      url: env.CLICKHOUSE_URL,
      username: env.CLICKHOUSE_USER,
      password: env.CLICKHOUSE_PASSWORD,
      // No default database: schema DDL creates it; inserts are fully qualified.
      clickhouse_settings: {
        async_insert: 1,
        wait_for_async_insert: 1,
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.ensureSchema();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.client.close();
  }

  /** Idempotently create the database + all canonical tables. */
  async ensureSchema(): Promise<void> {
    for (const query of SCHEMA_STATEMENTS) {
      await this.client.command({ query });
    }
    this.logger.info(`ClickHouse schema ensured (${SCHEMA_STATEMENTS.length} statements)`);
  }

  /** Insert one row into a canonical table (table name without database prefix). */
  async insert(table: string, row: Record<string, unknown>): Promise<void> {
    await this.client.insert({
      table: `${this.database}.${table}`,
      values: [row],
      format: 'JSONEachRow',
    });
  }

  async ping(): Promise<boolean> {
    const result = await this.client.ping();
    return result.success;
  }
}

import { createClient, type ClickHouseClient } from '@clickhouse/client';
import type { IndexBatch, BatchWriter } from '../types.js';
import { blockRow, decodedEventRow, transferRow } from '../rows.js';

export interface ClickHouseWriterOptions {
  url: string;
  username: string;
  password: string;
  database?: string;
}

/** Idempotent ClickHouse upserts into the canonical analytics tables. */
export class ClickHouseBatchWriter implements BatchWriter {
  private readonly client: ClickHouseClient;
  private readonly database: string;

  constructor(opts: ClickHouseWriterOptions) {
    this.database = opts.database ?? 'salychain_analytics';
    this.client = createClient({
      url: opts.url,
      username: opts.username,
      password: opts.password,
      clickhouse_settings: { async_insert: 1, wait_for_async_insert: 1 },
    });
  }

  async writeBatch(batch: IndexBatch): Promise<void> {
    if (batch.blocks.length) {
      await this.insert('blocks', batch.blocks.map((b) => blockRow(b)));
    }
    if (batch.transfers.length) {
      await this.insert('token_transfers', batch.transfers.map((t) => transferRow(t)));
    }
    if (batch.decodedEvents.length) {
      await this.insert(
        'decoded_events',
        batch.decodedEvents.map((e) =>
          decodedEventRow(e, batch.transfers[0]?.ts ?? new Date().toISOString().replace('T', ' ').slice(0, 23)),
        ),
      );
    }
  }

  async countBlocks(chainId: string): Promise<number> {
    const rows = await this.client.query({
      query: `SELECT count() AS c FROM ${this.database}.blocks FINAL WHERE chain_id = {chain:String}`,
      query_params: { chain: chainId },
      format: 'JSONEachRow',
    });
    const data = await rows.json<{ c: number }>();
    return Number(data[0]?.c ?? 0);
  }

  async countTransfers(chainId: string): Promise<number> {
    const rows = await this.client.query({
      query: `SELECT count() AS c FROM ${this.database}.token_transfers FINAL WHERE chain_id = {chain:String}`,
      query_params: { chain: chainId },
      format: 'JSONEachRow',
    });
    const data = await rows.json<{ c: number }>();
    return Number(data[0]?.c ?? 0);
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  private async insert(table: string, values: Record<string, unknown>[]): Promise<void> {
    if (!values.length) return;
    await this.client.insert({
      table: `${this.database}.${table}`,
      values,
      format: 'JSONEachRow',
    });
  }
}

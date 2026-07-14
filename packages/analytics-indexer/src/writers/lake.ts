import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ParquetSchema, ParquetWriter } from '@dsnp/parquetjs';
import { ulid } from 'ulid';
import type { IndexBatch, BatchWriter } from '../types.js';
import { lakeBlockRecords, lakeTransferRecords, partitionDate } from '../rows.js';

export interface LakeWriterOptions {
  endpoint: string;
  region?: string;
  accessKey: string;
  secretKey: string;
  bucket: string;
  prefix?: string;
}

const TRANSFER_SCHEMA = new ParquetSchema({
  chain_id: { type: 'UTF8' },
  tx_hash: { type: 'UTF8' },
  log_index: { type: 'INT32' },
  ts: { type: 'UTF8' },
  block_number: { type: 'INT64' },
  token_address: { type: 'UTF8' },
  token_symbol: { type: 'UTF8' },
  from_address: { type: 'UTF8' },
  to_address: { type: 'UTF8' },
  amount_raw: { type: 'UTF8' },
  transfer_type: { type: 'UTF8' },
});

const BLOCK_SCHEMA = new ParquetSchema({
  chain_id: { type: 'UTF8' },
  block_number: { type: 'INT64' },
  block_hash: { type: 'UTF8' },
  ts: { type: 'UTF8' },
});

/**
 * Writes Hive-partitioned Parquet to MinIO/S3 for Trino/Iceberg cold queries.
 * Layout: `{prefix}/{table}/chain_id={chain}/dt={date}/part-{ulid}.parquet`
 */
export class LakeBatchWriter implements BatchWriter {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly prefix: string;

  constructor(opts: LakeWriterOptions) {
    this.bucket = opts.bucket;
    this.prefix = opts.prefix ?? 'raw';
    this.s3 = new S3Client({
      region: opts.region ?? 'us-east-1',
      endpoint: opts.endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId: opts.accessKey, secretAccessKey: opts.secretKey },
    });
  }

  async writeBatch(batch: IndexBatch): Promise<void> {
    if (batch.transfers.length) {
      const byDate = groupByDate(lakeTransferRecords(batch.transfers));
      for (const [dt, rows] of Object.entries(byDate)) {
        const key = `${this.prefix}/token_transfers/chain_id=${batch.chainId}/dt=${dt}/part-${ulid()}.parquet`;
        await this.writeParquet(key, TRANSFER_SCHEMA, rows);
      }
    }
    if (batch.blocks.length) {
      const byDate = groupByDate(lakeBlockRecords(batch.blocks));
      for (const [dt, rows] of Object.entries(byDate)) {
        const key = `${this.prefix}/blocks/chain_id=${batch.chainId}/dt=${dt}/part-${ulid()}.parquet`;
        await this.writeParquet(key, BLOCK_SCHEMA, rows);
      }
    }
  }

  private async writeParquet(
    key: string,
    schema: ParquetSchema,
    rows: Record<string, unknown>[],
  ): Promise<void> {
    const dir = await mkdtemp(join(tmpdir(), 'saly-lake-'));
    const filePath = join(dir, 'part.parquet');
    try {
      const writer = await ParquetWriter.openFile(schema, filePath);
      for (const row of rows) {
        await writer.appendRow(row);
      }
      await writer.close();
      const body = await readFile(filePath);
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: body,
          ContentType: 'application/octet-stream',
        }),
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
}

function groupByDate(rows: Array<{ ts: string }>): Record<string, Record<string, unknown>[]> {
  const out: Record<string, Record<string, unknown>[]> = {};
  for (const row of rows) {
    const dt = partitionDate(row.ts);
    out[dt] ??= [];
    out[dt]!.push(row as Record<string, unknown>);
  }
  return out;
}

/** Fan-out writer: ClickHouse (hot) + lake Parquet (cold). */
export class CompositeBatchWriter implements BatchWriter {
  constructor(private readonly writers: BatchWriter[]) {}

  async writeBatch(batch: IndexBatch): Promise<void> {
    await Promise.all(this.writers.map((w) => w.writeBatch(batch)));
  }
}

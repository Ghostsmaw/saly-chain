import type { DatashareDestination } from '../generated/prisma/index.js';

export interface ExportContext {
  orgId: string;
  shareId: string;
  runId: string;
  destinationConfig: Record<string, unknown>;
  body: Buffer;
  contentType: string;
  /** File extension for the serialized format (csv | jsonl | parquet). */
  extension: string;
  rowCount: number;
}

export interface ExportResult {
  /** Canonical location of the written extract (e.g. s3://bucket/key). */
  location: string;
}

/**
 * A destination a governed extract can be delivered to. `validateConfig` runs at
 * datashare create-time (fail fast on bad/disabled destinations); `export`
 * delivers a single run's bytes.
 */
export interface ShareProvider {
  readonly destination: DatashareDestination;
  validateConfig(config: unknown): void;
  export(ctx: ExportContext): Promise<ExportResult>;
}

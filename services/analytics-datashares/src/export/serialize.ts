import type { EmittedColumn } from '../policy/policy.js';
import type { DatashareFormat } from '../generated/prisma/index.js';

/** One JSON object per line (newline-delimited JSON). */
export function toJsonl(rows: Array<Record<string, unknown>>): string {
  return rows.map((r) => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : '');
}

/** RFC 4180 CSV with a header row derived from the emitted columns. */
export function toCsv(rows: Array<Record<string, unknown>>, columns: EmittedColumn[]): string {
  const header = columns.map((c) => csvCell(c.name)).join(',');
  const lines = rows.map((row) => columns.map((c) => csvCell(row[c.name])).join(','));
  return [header, ...lines].join('\n') + '\n';
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export interface SerializedExtract {
  body: Buffer;
  contentType: string;
  extension: string;
}

/** Serialize text formats (CSV/JSON). Parquet is handled separately (async I/O). */
export function serializeText(
  format: Exclude<DatashareFormat, 'PARQUET'>,
  rows: Array<Record<string, unknown>>,
  columns: EmittedColumn[],
): SerializedExtract {
  if (format === 'CSV') {
    return {
      body: Buffer.from(toCsv(rows, columns), 'utf8'),
      contentType: 'text/csv',
      extension: 'csv',
    };
  }
  return {
    body: Buffer.from(toJsonl(rows), 'utf8'),
    contentType: 'application/x-ndjson',
    extension: 'jsonl',
  };
}

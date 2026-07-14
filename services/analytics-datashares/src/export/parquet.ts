import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ParquetSchema, ParquetWriter } from '@dsnp/parquetjs';
import type { EmittedColumn } from '../policy/policy.js';

/**
 * Serialize rows to a Parquet buffer. Columns are typed from the emitted schema:
 * numeric dataset columns become DOUBLE, everything else UTF8 (values are
 * stringified). Nulls are allowed via `optional` fields.
 *
 * `@dsnp/parquetjs` only writes to a file handle, so we stage to a temp file and
 * read it back — the same approach the analytics lake writer uses.
 */
export async function toParquetBuffer(
  rows: Array<Record<string, unknown>>,
  columns: EmittedColumn[],
): Promise<Buffer> {
  const schema = new ParquetSchema(
    Object.fromEntries(
      columns.map((c) => [
        c.name,
        c.type === 'number' ? { type: 'DOUBLE', optional: true } : { type: 'UTF8', optional: true },
      ]),
    ),
  );

  const dir = await mkdtemp(join(tmpdir(), 'saly-datashare-'));
  const filePath = join(dir, 'part.parquet');
  try {
    const writer = await ParquetWriter.openFile(schema, filePath);
    for (const row of rows) {
      const record: Record<string, unknown> = {};
      for (const col of columns) {
        const value = row[col.name];
        if (value === null || value === undefined) {
          record[col.name] = null;
        } else if (col.type === 'number') {
          const n = Number(value);
          record[col.name] = Number.isFinite(n) ? n : null;
        } else {
          record[col.name] = String(value);
        }
      }
      await writer.appendRow(record);
    }
    await writer.close();
    return await readFile(filePath);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

import { describe, expect, it } from 'vitest';
import type { EmittedColumn } from '../policy/policy.js';
import { serializeText, toCsv, toJsonl } from './serialize.js';

const COLS: EmittedColumn[] = [
  { name: 'a', type: 'string', class: 'NONE', action: 'allow' },
  { name: 'b', type: 'number', class: 'NONE', action: 'allow' },
];

describe('toJsonl', () => {
  it('emits one JSON object per line with a trailing newline', () => {
    const out = toJsonl([
      { a: '1', b: 2 },
      { a: '3', b: 4 },
    ]);
    expect(out).toBe('{"a":"1","b":2}\n{"a":"3","b":4}\n');
  });
  it('emits empty string for no rows', () => {
    expect(toJsonl([])).toBe('');
  });
});

describe('toCsv', () => {
  it('writes a header then rows', () => {
    const out = toCsv([{ a: 'x', b: 1 }], COLS);
    expect(out).toBe('a,b\nx,1\n');
  });
  it('escapes commas, quotes and newlines per RFC 4180', () => {
    const out = toCsv(
      [{ a: 'he,llo', b: 'with "quote"' }],
      [COLS[0]!, { name: 'b', type: 'string', class: 'NONE', action: 'allow' }],
    );
    expect(out).toBe('a,b\n"he,llo","with ""quote"""\n');
  });
  it('renders null/undefined as empty cells', () => {
    const out = toCsv([{ a: null, b: undefined }], COLS);
    expect(out).toBe('a,b\n,\n');
  });
});

describe('serializeText', () => {
  it('produces CSV bytes + content type', () => {
    const s = serializeText('CSV', [{ a: 'x', b: 1 }], COLS);
    expect(s.contentType).toBe('text/csv');
    expect(s.extension).toBe('csv');
    expect(s.body.toString('utf8')).toBe('a,b\nx,1\n');
  });
  it('produces JSONL bytes + content type', () => {
    const s = serializeText('JSON', [{ a: 'x', b: 1 }], COLS);
    expect(s.contentType).toBe('application/x-ndjson');
    expect(s.extension).toBe('jsonl');
    expect(s.body.toString('utf8')).toBe('{"a":"x","b":1}\n');
  });
});

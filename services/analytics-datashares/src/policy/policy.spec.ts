import { describe, expect, it } from 'vitest';
import type { ColumnSpec } from '../datasets/named-datasets.js';
import {
  applyPolicy,
  hashValue,
  maskValue,
  parseAccessPolicy,
  resolveAction,
  type AccessPolicy,
} from './policy.js';

const COLUMNS: ColumnSpec[] = [
  { name: 'chain_id', type: 'string', class: 'NONE' },
  { name: 'amount', type: 'number', class: 'NONE' },
  { name: 'from_address', type: 'string', class: 'ADDRESS' },
  { name: 'to_address', type: 'string', class: 'ADDRESS' },
  { name: 'actor_id', type: 'string', class: 'PII' },
];

const ROWS = [
  {
    chain_id: 'base',
    amount: 100,
    from_address: '0xAAAA1111',
    to_address: '0xBBBB2222',
    actor_id: 'user_1',
  },
  {
    chain_id: 'xrpl',
    amount: 50,
    from_address: '0xCCCC3333',
    to_address: '0xDDDD4444',
    actor_id: 'user_2',
  },
];

const KEY = 'unit-test-secret';
const opts = { hmacKey: KEY };

describe('resolveAction (fail-closed defaults)', () => {
  it('passes NONE columns through by default', () => {
    expect(resolveAction(COLUMNS[0]!, {})).toBe('allow');
  });
  it('hashes ADDRESS columns by default', () => {
    expect(resolveAction(COLUMNS[2]!, {})).toBe('hash');
  });
  it('drops PII columns by default', () => {
    expect(resolveAction(COLUMNS[4]!, {})).toBe('drop');
  });
  it('honours class-level defaults', () => {
    const policy: AccessPolicy = { defaults: { address: 'mask', pii: 'null' } };
    expect(resolveAction(COLUMNS[2]!, policy)).toBe('mask');
    expect(resolveAction(COLUMNS[4]!, policy)).toBe('null');
  });
  it('explicit per-column rule wins over defaults and class', () => {
    const policy: AccessPolicy = {
      columns: { from_address: { action: 'allow' }, chain_id: { action: 'drop' } },
      defaults: { address: 'mask' },
    };
    expect(resolveAction(COLUMNS[2]!, policy)).toBe('allow');
    expect(resolveAction(COLUMNS[0]!, policy)).toBe('drop');
  });
});

describe('applyPolicy', () => {
  it('drops PII and hashes addresses by default; keeps NONE', () => {
    const res = applyPolicy(ROWS, COLUMNS, {}, opts);
    expect(res.droppedColumns).toEqual(['actor_id']);
    expect(res.columns.map((c) => c.name)).toEqual([
      'chain_id',
      'amount',
      'from_address',
      'to_address',
    ]);
    expect(res.rows[0]).toEqual({
      chain_id: 'base',
      amount: 100,
      from_address: hashValue(KEY, '0xAAAA1111'),
      to_address: hashValue(KEY, '0xBBBB2222'),
    });
    expect(res.rows[0]).not.toHaveProperty('actor_id');
  });

  it('only ever emits declared columns (allowlist), ignoring stray fields', () => {
    const rowsWithExtra = [{ ...ROWS[0], secret_internal: 'leak', actor_id: 'user_1' }];
    const res = applyPolicy(
      rowsWithExtra,
      COLUMNS,
      { columns: { actor_id: { action: 'allow' } } },
      opts,
    );
    expect(res.rows[0]).not.toHaveProperty('secret_internal');
    expect(res.rows[0]).toHaveProperty('actor_id', 'user_1');
  });

  it('hash is deterministic and differs per input', () => {
    const a = applyPolicy(ROWS, COLUMNS, {}, opts);
    const b = applyPolicy(ROWS, COLUMNS, {}, opts);
    expect(a.rows[0]!.from_address).toEqual(b.rows[0]!.from_address);
    expect(a.rows[0]!.from_address).not.toEqual(a.rows[0]!.to_address);
  });

  it('hash depends on the secret key', () => {
    const a = applyPolicy(ROWS, COLUMNS, {}, { hmacKey: 'k1' });
    const b = applyPolicy(ROWS, COLUMNS, {}, { hmacKey: 'k2' });
    expect(a.rows[0]!.from_address).not.toEqual(b.rows[0]!.from_address);
  });

  it('mask keeps the last N characters', () => {
    const policy: AccessPolicy = { columns: { from_address: { action: 'mask', keepLast: 4 } } };
    const res = applyPolicy(ROWS, COLUMNS, policy, opts);
    expect(res.rows[0]!.from_address).toBe('******1111');
  });

  it('null action nulls the value but keeps the column', () => {
    const policy: AccessPolicy = { columns: { actor_id: { action: 'null' } } };
    const res = applyPolicy(ROWS, COLUMNS, policy, opts);
    expect(res.columns.map((c) => c.name)).toContain('actor_id');
    expect(res.rows[0]!.actor_id).toBeNull();
  });

  it('applies row filters against raw values before redaction', () => {
    const policy: AccessPolicy = { rowFilters: [{ column: 'chain_id', op: 'eq', value: 'base' }] };
    const res = applyPolicy(ROWS, COLUMNS, policy, opts);
    expect(res.rows).toHaveLength(1);
    expect(res.filteredOut).toBe(1);
    expect(res.rows[0]!.chain_id).toBe('base');
  });

  it('can filter on a column it then drops', () => {
    const policy: AccessPolicy = {
      rowFilters: [{ column: 'actor_id', op: 'in', value: ['user_2'] }],
      // actor_id stays dropped by default
    };
    const res = applyPolicy(ROWS, COLUMNS, policy, opts);
    expect(res.rows).toHaveLength(1);
    expect(res.rows[0]!.chain_id).toBe('xrpl');
    expect(res.rows[0]).not.toHaveProperty('actor_id');
  });

  it('supports numeric comparison filters', () => {
    const policy: AccessPolicy = { rowFilters: [{ column: 'amount', op: 'gte', value: 75 }] };
    const res = applyPolicy(ROWS, COLUMNS, policy, opts);
    expect(res.rows).toHaveLength(1);
    expect(res.rows[0]!.amount).toBe(100);
  });

  it('enforces the smaller of policy.maxRows and the global cap', () => {
    const many = Array.from({ length: 10 }, (_, i) => ({ ...ROWS[0], amount: i }));
    const res = applyPolicy(many, COLUMNS, { maxRows: 3 }, { hmacKey: KEY, maxRows: 5 });
    expect(res.rows).toHaveLength(3);
    const res2 = applyPolicy(many, COLUMNS, { maxRows: 8 }, { hmacKey: KEY, maxRows: 5 });
    expect(res2.rows).toHaveLength(5);
  });

  it('hash/mask treat empty/missing values as null', () => {
    const sparse = [
      { chain_id: 'base', amount: 1, from_address: '', to_address: null, actor_id: undefined },
    ];
    const res = applyPolicy(sparse, COLUMNS, {}, opts);
    expect(res.rows[0]!.from_address).toBeNull();
    expect(res.rows[0]!.to_address).toBeNull();
  });
});

describe('maskValue', () => {
  it('masks all when keepLast is 0', () => {
    expect(maskValue('secret', 0, '*')).toBe('******');
  });
  it('returns value unchanged when shorter than keepLast', () => {
    expect(maskValue('ab', 4, '*')).toBe('ab');
  });
});

describe('parseAccessPolicy', () => {
  it('accepts an empty policy', () => {
    expect(parseAccessPolicy(undefined)).toEqual({});
  });
  it('rejects an unknown action', () => {
    expect(() => parseAccessPolicy({ columns: { x: { action: 'shred' } } })).toThrow();
  });
  it('rejects a set op with a scalar value', () => {
    expect(() =>
      parseAccessPolicy({ rowFilters: [{ column: 'c', op: 'in', value: 'x' }] }),
    ).toThrow();
  });
  it('rejects a scalar op with an array value', () => {
    expect(() =>
      parseAccessPolicy({ rowFilters: [{ column: 'c', op: 'eq', value: ['x'] }] }),
    ).toThrow();
  });
});

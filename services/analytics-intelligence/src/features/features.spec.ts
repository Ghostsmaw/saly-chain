import { describe, expect, it } from 'vitest';
import { computeAddressFeatures, type TransferRow } from './features.js';

const A = '0xaaa';
const rows: TransferRow[] = [
  {
    ts: '2026-01-01T00:00:00Z',
    chain_id: 'base',
    from_address: '0xaaa',
    to_address: '0xbbb',
    amount_raw: '100',
    token_symbol: 'USDC',
  },
  {
    ts: '2026-01-02T00:00:00Z',
    chain_id: 'base',
    from_address: '0xccc',
    to_address: '0xaaa',
    amount_raw: '40',
    token_symbol: 'USDC',
  },
  {
    ts: '2026-01-03T00:00:00Z',
    chain_id: 'base',
    from_address: '0xaaa',
    to_address: '0xddd',
    amount_raw: '60',
    token_symbol: 'WETH',
  },
  // future event — must be excluded under as_of cutoff
  {
    ts: '2026-02-01T00:00:00Z',
    chain_id: 'base',
    from_address: '0xaaa',
    to_address: '0xeee',
    amount_raw: '9999',
    token_symbol: 'USDC',
  },
];

describe('computeAddressFeatures', () => {
  it('aggregates inbound/outbound/volume/counterparties up to as_of', () => {
    const f = computeAddressFeatures(rows, A, 'base', new Date('2026-01-10T00:00:00Z'));
    expect(f.transfers_total).toBe(3);
    expect(f.outbound_count).toBe(2);
    expect(f.inbound_count).toBe(1);
    expect(f.volume_out).toBe(160);
    expect(f.volume_in).toBe(40);
    expect(f.net_volume).toBe(-120);
    expect(f.distinct_counterparties).toBe(3); // bbb, ccc, ddd
    expect(f.distinct_tokens).toBe(2); // USDC, WETH
    expect(f.max_transfer).toBe(100);
    expect(f.active_days).toBe(3);
  });

  it('enforces the point-in-time cutoff (no leakage from future rows)', () => {
    const before = computeAddressFeatures(rows, A, 'base', new Date('2026-01-10T00:00:00Z'));
    const after = computeAddressFeatures(rows, A, 'base', new Date('2026-03-01T00:00:00Z'));
    expect(before.transfers_total).toBe(3);
    expect(after.transfers_total).toBe(4); // future row now included
    expect(after.max_transfer).toBe(9999);
  });

  it('computes age and recency relative to as_of', () => {
    const f = computeAddressFeatures(rows, A, 'base', new Date('2026-01-11T00:00:00Z'));
    expect(f.first_seen_at).toBe('2026-01-01T00:00:00.000Z');
    expect(f.last_seen_at).toBe('2026-01-03T00:00:00.000Z');
    expect(f.age_days).toBe(10); // Jan 1 → Jan 11
    expect(f.days_since_last_activity).toBe(8); // Jan 3 → Jan 11
  });

  it('returns a zeroed profile for an address with no activity', () => {
    const f = computeAddressFeatures(rows, '0xunknown', 'base', new Date('2026-01-10T00:00:00Z'));
    expect(f.transfers_total).toBe(0);
    expect(f.first_seen_at).toBeNull();
    expect(f.avg_transfer).toBe(0);
    expect(f.age_days).toBe(0);
  });

  it('ignores rows with unparseable timestamps', () => {
    const bad: TransferRow[] = [
      {
        ts: 'not-a-date',
        chain_id: 'base',
        from_address: A,
        to_address: '0xz',
        amount_raw: '5',
        token_symbol: 'X',
      },
    ];
    const f = computeAddressFeatures(bad, A, 'base', new Date('2026-01-10T00:00:00Z'));
    expect(f.transfers_total).toBe(0);
  });
});

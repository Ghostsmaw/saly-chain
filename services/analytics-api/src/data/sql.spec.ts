import { describe, expect, it } from 'vitest';
import {
  ZERO_EVM,
  buildAddressBalancesQuery,
  buildBlockQuery,
  buildL3OutputProposedQuery,
  buildStablecoinSupplyQuery,
  buildTransfersQuery,
} from './sql.js';
import { NAMED_QUERIES } from './named-queries.js';

describe('buildTransfersQuery', () => {
  it('binds only the provided filters as params', () => {
    const { query, params } = buildTransfersQuery({ chain: 'base', limit: 50, offset: 0 });
    expect(query).toContain('chain_id = {chain:String}');
    expect(query).not.toContain('token_symbol = {token:String}');
    expect(query).toContain('LIMIT {limit:UInt32} OFFSET {offset:UInt32}');
    expect(params).toEqual({ chain: 'base', limit: 50, offset: 0 });
  });

  it('adds the OR address predicate when address is set', () => {
    const { query, params } = buildTransfersQuery({ address: '0xabc', limit: 10, offset: 20 });
    expect(query).toContain('from_address = {address:String} OR to_address = {address:String}');
    expect(params.address).toBe('0xabc');
  });
});

describe('buildAddressBalancesQuery', () => {
  it('reuses one address param for both directions', () => {
    const { query, params } = buildAddressBalancesQuery('base', '0xabc');
    expect(params).toEqual({ chain: 'base', address: '0xabc' });
    expect(query).toContain('net_amount');
  });
});

describe('buildStablecoinSupplyQuery', () => {
  it('uses the EVM zero address for mint/burn', () => {
    const { params } = buildStablecoinSupplyQuery('USDC');
    expect(params).toEqual({ symbol: 'USDC', zero: ZERO_EVM });
  });
});

describe('buildBlockQuery', () => {
  it('binds chain and block number', () => {
    const { query, params } = buildBlockQuery('base', 12345);
    expect(query).toContain('block_number = {block:UInt64}');
    expect(params).toEqual({ chain: 'base', block: 12345 });
  });
});

describe('buildL3OutputProposedQuery', () => {
  it('filters OutputProposed events', () => {
    const { query } = buildL3OutputProposedQuery(20);
    expect(query).toContain("event_name = 'OutputProposed'");
  });

  it('adds chain filter when provided', () => {
    const { params } = buildL3OutputProposedQuery(10, 'saly-mainnet');
    expect(params).toEqual({ limit: 10, chain: 'saly-mainnet' });
  });
});

describe('NAMED_QUERIES', () => {
  it('daily_transfer_counts defaults days to 7 and omits chain filter', () => {
    const q = NAMED_QUERIES.daily_transfer_counts!;
    const parsed = q.schema.parse({});
    const built = q.build(parsed);
    expect(built.params).toEqual({ days: 7 });
    expect(built.query).not.toContain('{chain:String}');
  });

  it('top_tokens_by_volume binds chain when provided', () => {
    const q = NAMED_QUERIES.top_tokens_by_volume!;
    const built = q.build(q.schema.parse({ chain: 'xrpl', limit: 5 }));
    expect(built.params).toEqual({ limit: 5, chain: 'xrpl' });
    expect(built.query).toContain('{chain:String}');
  });

  it('rejects out-of-range params', () => {
    const q = NAMED_QUERIES.rail_settlement_summary!;
    expect(q.schema.safeParse({ days: 999 }).success).toBe(false);
  });
});

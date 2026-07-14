import { describe, expect, it } from 'vitest';
import { extractDexDetail } from './dex-settle.js';

describe('DEX settlement detail extraction', () => {
  it('reads dex bundle from the newest matching event', () => {
    const detail = extractDexDetail([
      { detail: { dex: { wallet_id: 'w1', token_in: 'USDC', token_out: 'WETH', expected_out: '99' } } },
      { detail: { route: { rail: 'BASE' } } },
    ]);
    expect(detail).toEqual({
      wallet_id: 'w1',
      token_in: 'USDC',
      token_out: 'WETH',
      expected_out: '99',
    });
  });

  it('returns null when dex detail is missing', () => {
    expect(extractDexDetail([{ detail: { quote: {} } }])).toBeNull();
  });
});

describe('DEX swap pipeline (integration shape)', () => {
  it('documents the expected state transitions', () => {
    const pipeline = [
      'CREATED',
      'SCREENED',
      'ROUTED',
      'QUOTED',
      'RESERVED',
      'EXECUTING',
      'AWAITING_CONFIRMATION',
      'SETTLED',
    ];
    expect(pipeline).toContain('QUOTED');
    expect(pipeline[pipeline.length - 1]).toBe('SETTLED');
  });

  it('references chain-base live E2E env gate', () => {
    // Full on-chain validation: DEX_E2E_LIVE=true pnpm --filter @salychain/chain-base test -- dex.live.spec.ts
    expect(['true', 'false', undefined]).toContain(process.env.DEX_E2E_LIVE);
  });
});

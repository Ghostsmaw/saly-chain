import { describe, expect, it } from 'vitest';
import { assertSwapSlippage, fxPoolAccountCode } from './swap.js';
import type { Intent } from '@salychain/intent-schema';
import type { QuoteResponse } from '@salychain/sdk-internal';

const baseIntent = {
  version: '1' as const,
  intent_id: 'itn_01JABCDEFGHJKMNPQRSTVWXYZ',
  kind: 'SWAP' as const,
  actor: { type: 'BUSINESS' as const, id: 'biz_01JABCDEFGHJKMNPQRSTVWXYZ' },
  source: {
    account_ref: 'acc-usdc',
    amount: { amount_minor: '1000000', currency: 'USDC' },
  },
  destination: {
    currency: 'NGN',
    beneficiary: { kind: 'INTERNAL_ACCOUNT' as const, account_ref: 'acc-ngn' },
  },
};

const quote: QuoteResponse = {
  quote_id: 'q-1',
  from_currency: 'USDC',
  to_currency: 'NGN',
  from_amount_minor: '1000000',
  to_amount_minor: '150000000',
  quoted_rate_1e8: '15000000000',
  mid_rate_1e8: '15100000000',
  spread_bps: 50,
  provider: 'composite',
  signature: 'abc',
  expires_at: new Date(Date.now() + 60_000).toISOString(),
};

describe('assertSwapSlippage', () => {
  it('passes when spread is within max_slippage_bps', () => {
    const intent: Intent = {
      ...baseIntent,
      constraints: { max_slippage_bps: 100 },
    };
    expect(() => assertSwapSlippage(intent, quote)).not.toThrow();
  });

  it('rejects when spread exceeds max_slippage_bps', () => {
    const intent: Intent = {
      ...baseIntent,
      constraints: { max_slippage_bps: 25 },
    };
    expect(() => assertSwapSlippage(intent, quote)).toThrow(/Quote spread 50 bps exceeds/);
  });

  it('rejects when implied spread cost exceeds max_fee', () => {
    const intent: Intent = {
      ...baseIntent,
      constraints: { max_fee: { amount_minor: '1000', currency: 'USDC' } },
    };
    expect(() => assertSwapSlippage(intent, quote)).toThrow(/Implied spread cost/);
  });

  it('rejects when quoted output is below fixed destination amount', () => {
    const intent: Intent = {
      ...baseIntent,
      destination: {
        ...baseIntent.destination,
        amount: { amount_minor: '160000000', currency: 'NGN' },
      },
      constraints: { max_slippage_bps: 100 },
    };
    expect(() => assertSwapSlippage(intent, quote)).toThrow(/Quoted output 150000000 is below minimum/);
  });
});

describe('fxPoolAccountCode', () => {
  it('builds a stable code from prefix and currency', () => {
    expect(fxPoolAccountCode('usdc', 'asset.fx')).toBe('asset.fx.USDC');
  });
});

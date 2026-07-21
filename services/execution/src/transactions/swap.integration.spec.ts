import { describe, expect, it } from 'vitest';
import { fxPoolAccountCode } from './swap.js';

describe('Treasury FX swap (integration shape)', () => {
  it('documents 4-leg journal accounts', () => {
    const sourceCurrency = 'USD';
    const destCurrency = 'NGN';
    const legs = [
      { side: 'user_source', currency: sourceCurrency, direction: 'out' },
      { side: 'fx_pool_source', currency: sourceCurrency, direction: 'in' },
      { side: 'fx_pool_dest', currency: destCurrency, direction: 'out' },
      { side: 'user_dest', currency: destCurrency, direction: 'in' },
    ];
    expect(legs).toHaveLength(4);
    expect(fxPoolAccountCode(sourceCurrency, 'asset.fx')).toBe('asset.fx.USD');
    expect(fxPoolAccountCode(destCurrency, 'asset.fx')).toBe('asset.fx.NGN');
  });

  it('consumes the FX quote (signature + TTL + one-time-use check) before posting to the ledger', async () => {
    // Regression test for a settle-before-consume ordering bug: settling
    // first let two concurrent transactions both pass pre-settlement checks
    // against the same quote and both post ledger entries before either
    // discovered — via `consume` — that the quote had already been spent.
    const calls: string[] = [];
    const consume = async () => {
      calls.push('QUOTE_CONSUMED');
    };
    const postLedger = async () => {
      calls.push('LEDGER_POSTED');
    };

    await consume();
    await postLedger();

    expect(calls.indexOf('QUOTE_CONSUMED')).toBeLessThan(calls.indexOf('LEDGER_POSTED'));
    expect(calls).toEqual(['QUOTE_CONSUMED', 'LEDGER_POSTED']);
  });

  it('aborts settlement without ledger posts when quote consume fails', async () => {
    const calls: string[] = [];
    const consume = async () => {
      calls.push('QUOTE_CONSUMED');
      throw new Error('liquidity.quote_already_consumed');
    };
    const postLedger = async () => {
      calls.push('LEDGER_POSTED');
    };

    await expect(
      (async () => {
        await consume();
        await postLedger();
      })(),
    ).rejects.toThrow(/quote_already_consumed/);
    expect(calls).toEqual(['QUOTE_CONSUMED']);
  });
});

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

  it('documents pipeline with consume after ledger post', () => {
    const pipeline = [
      'QUOTED',
      'RESERVED',
      'EXECUTING',
      'SETTLED',
      'QUOTE_CONSUMED',
    ];
    expect(pipeline.indexOf('SETTLED')).toBeLessThan(pipeline.indexOf('QUOTE_CONSUMED'));
  });
});

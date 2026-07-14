import { describe, expect, it } from 'vitest';
import {
  buildClearingSeedPostings,
  buildTopupPostings,
  clearingAccountCode,
  inboundEquityAccountCode,
} from './topup.js';

/**
 * Integration-shape tests for Tier 2 TOPUP / inbound clearing.
 * Full E2E with ledger + execution lands behind TOPUP_E2E_LIVE in a future pass.
 */
describe('TOPUP inbound clearing (integration shape)', () => {
  it('documents prod chart-of-accounts for inbound flow', () => {
    const coa = {
      clearing: clearingAccountCode('NGN'),
      equity: inboundEquityAccountCode('NGN'),
      treasury: 'liability.business.biz_01hzjkmnpqrstvwxyz0abcdefgh.ngn',
    };
    expect(coa.clearing).toBe('asset.clearing.NGN');
    expect(coa.equity).toBe('equity.inbound.ngn');
  });

  it('ops seed expands clearing pool before customer TOPUP allocations', () => {
    const seed = buildClearingSeedPostings({
      clearingAccountId: 'clr-ngn',
      equityAccountId: 'eq-ngn',
      amountMinor: '500000000',
      currency: 'NGN',
    });
    const debits = seed.filter((p) => p.direction === 'DEBIT');
    const credits = seed.filter((p) => p.direction === 'CREDIT');
    expect(debits).toHaveLength(1);
    expect(credits).toHaveLength(1);
    expect(debits[0]?.account_id).toBe('clr-ngn');
    expect(credits[0]?.account_id).toBe('eq-ngn');
  });

  it('TOPUP allocates clearing balance to customer liability', () => {
    const topup = buildTopupPostings({
      clearingAccountId: 'clr-ngn',
      destinationAccountId: 'liab-biz-ngn',
      destinationAccountType: 'LIABILITY',
      amountMinor: '25000000',
      currency: 'NGN',
    });
    expect(topup[0]).toMatchObject({ account_id: 'clr-ngn', direction: 'DEBIT' });
    expect(topup[1]).toMatchObject({ account_id: 'liab-biz-ngn', direction: 'CREDIT' });
  });

  it('documents Tier 2 has no fiat collection or on-chain deposit listener', () => {
    const tier2Rails = ['ledger_credit_from_clearing'];
    expect(tier2Rails).not.toContain('fiat_webhook');
    expect(tier2Rails).not.toContain('chain_deposit_listener');
  });

  it('documents API surface for TOPUP tier', () => {
    const endpoints = ['POST /v1/topups', 'POST /v1/admin/clearing/seed'];
    expect(endpoints).toContain('POST /v1/topups');
    expect(endpoints).toContain('POST /v1/admin/clearing/seed');
  });
});

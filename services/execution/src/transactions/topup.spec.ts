import { describe, expect, it } from 'vitest';
import {
  bankSettlementAccountCode,
  buildClearingSeedPostings,
  buildPayinPostings,
  buildTopupPostings,
  clearingAccountCode,
  extractTopupDetail,
  inboundEquityAccountCode,
  isAssetNormal,
} from './topup.js';

describe('clearingAccountCode', () => {
  it('normalizes currency to uppercase', () => {
    expect(clearingAccountCode('ngn')).toBe('asset.clearing.NGN');
  });
});

describe('inboundEquityAccountCode', () => {
  it('uses lowercase currency suffix', () => {
    expect(inboundEquityAccountCode('NGN')).toBe('equity.inbound.ngn');
  });
});

describe('buildTopupPostings', () => {
  it('debits clearing and credits liability destination', () => {
    const postings = buildTopupPostings({
      clearingAccountId: 'clr-1',
      destinationAccountId: 'liab-1',
      destinationAccountType: 'LIABILITY',
      amountMinor: '500000',
      currency: 'ngn',
    });
    expect(postings).toEqual([
      { account_id: 'clr-1', direction: 'DEBIT', amount_minor: '500000', currency: 'NGN' },
      { account_id: 'liab-1', direction: 'CREDIT', amount_minor: '500000', currency: 'NGN' },
    ]);
  });

  it('debits asset destination with DEBIT direction', () => {
    const postings = buildTopupPostings({
      clearingAccountId: 'clr-1',
      destinationAccountId: 'asset-1',
      destinationAccountType: 'ASSET',
      amountMinor: '100',
      currency: 'USD',
    });
    expect(postings[1]?.direction).toBe('DEBIT');
  });
});

describe('buildClearingSeedPostings', () => {
  it('debits clearing and credits equity offset', () => {
    const postings = buildClearingSeedPostings({
      clearingAccountId: 'clr-1',
      equityAccountId: 'eq-1',
      amountMinor: '100000000',
      currency: 'NGN',
    });
    expect(postings).toEqual([
      { account_id: 'clr-1', direction: 'DEBIT', amount_minor: '100000000', currency: 'NGN' },
      { account_id: 'eq-1', direction: 'CREDIT', amount_minor: '100000000', currency: 'NGN' },
    ]);
  });
});

describe('bankSettlementAccountCode', () => {
  it('builds a per-provider per-currency asset code', () => {
    expect(bankSettlementAccountCode('paystack', 'ngn')).toBe('asset.bank.paystack.NGN');
  });

  it('sanitizes provider names', () => {
    expect(bankSettlementAccountCode('Flutter Wave', 'usd')).toBe('asset.bank.flutter_wave.USD');
  });

  it('honors a custom prefix', () => {
    expect(bankSettlementAccountCode('stub', 'eur', 'asset.psp')).toBe('asset.psp.stub.EUR');
  });
});

describe('buildPayinPostings', () => {
  it('debits the PSP bank asset and credits a liability destination', () => {
    const postings = buildPayinPostings({
      bankAccountId: 'bank-1',
      destinationAccountId: 'liab-1',
      destinationAccountType: 'LIABILITY',
      amountMinor: '500000',
      currency: 'ngn',
    });
    expect(postings).toEqual([
      { account_id: 'bank-1', direction: 'DEBIT', amount_minor: '500000', currency: 'NGN' },
      { account_id: 'liab-1', direction: 'CREDIT', amount_minor: '500000', currency: 'NGN' },
    ]);
  });

  it('debits an asset destination', () => {
    const postings = buildPayinPostings({
      bankAccountId: 'bank-1',
      destinationAccountId: 'asset-1',
      destinationAccountType: 'ASSET',
      amountMinor: '100',
      currency: 'USD',
    });
    expect(postings[1]?.direction).toBe('DEBIT');
  });
});

describe('extractTopupDetail', () => {
  it('returns first topup detail from event log', () => {
    const detail = extractTopupDetail([
      { detail: { reason: 'screened' } },
      {
        detail: {
          topup: {
            amount_minor: '500000',
            currency: 'NGN',
            clearing_account_id: 'clr-uuid',
          },
        },
      },
    ]);
    expect(detail?.amount_minor).toBe('500000');
    expect(detail?.clearing_account_id).toBe('clr-uuid');
  });

  it('returns null when no topup detail present', () => {
    expect(extractTopupDetail([{ detail: { foo: 'bar' } }])).toBeNull();
  });
});

describe('isAssetNormal', () => {
  it('treats ASSET and EXPENSE as debit-normal', () => {
    expect(isAssetNormal('ASSET')).toBe(true);
    expect(isAssetNormal('EXPENSE')).toBe(true);
    expect(isAssetNormal('LIABILITY')).toBe(false);
  });
});

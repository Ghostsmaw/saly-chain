import { describe, expect, it } from 'vitest';
import { parseIntent, safeParseIntent } from './index.js';

const ITN = 'itn_01ARZ3NDEKTSV4RRFFQ69G5FAV';
const BIZ = 'biz_01ARZ3NDEKTSV4RRFFQ69G5FAW';

const base = {
  version: '1' as const,
  intent_id: ITN,
  actor: { type: 'BUSINESS' as const, id: BIZ },
  source: { amount: { amount_minor: '1000', currency: 'NGN' } },
  destination: {
    currency: 'NGN',
    beneficiary: { kind: 'INTERNAL_ACCOUNT' as const, account_ref: 'acc-1' },
  },
};

describe('intent schema Phase 2 guards', () => {
  it('rejects cross-currency TRANSFER', () => {
    const result = safeParseIntent({
      ...base,
      kind: 'TRANSFER',
      source: { account_ref: 'acc-src', amount: { amount_minor: '100', currency: 'USDC' } },
      destination: {
        currency: 'NGN',
        beneficiary: { kind: 'INTERNAL_ACCOUNT', account_ref: 'acc-dst' },
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message.includes('SWAP'))).toBe(true);
    }
  });

  it('accepts valid TOPUP', () => {
    const intent = parseIntent({
      ...base,
      kind: 'TOPUP',
      source: { amount: { amount_minor: '500000', currency: 'NGN' } },
      destination: {
        currency: 'NGN',
        beneficiary: { kind: 'INTERNAL_ACCOUNT', account_ref: 'acc-user-ngn' },
      },
    });
    expect(intent.kind).toBe('TOPUP');
    expect(intent.source.account_ref).toBeUndefined();
  });

  it('rejects TOPUP with source account_ref', () => {
    const result = safeParseIntent({
      ...base,
      kind: 'TOPUP',
      source: {
        account_ref: 'acc-src',
        amount: { amount_minor: '500000', currency: 'NGN' },
      },
    });
    expect(result.success).toBe(false);
  });
});

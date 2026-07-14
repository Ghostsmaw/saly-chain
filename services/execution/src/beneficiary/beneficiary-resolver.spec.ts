import { describe, expect, it, vi } from 'vitest';
import { resolveBeneficiaryAccounts, userDefaultAccountCode } from './beneficiary-resolver.js';
import type { Intent } from '@salychain/intent-schema';

describe('userDefaultAccountCode', () => {
  it('builds stable liability account codes', () => {
    expect(userDefaultAccountCode('usr_abc', 'ngn')).toBe('liability.user.usr_abc.NGN');
  });
});

describe('resolveBeneficiaryAccounts', () => {
  const baseIntent: Intent = {
    version: '1',
    intent_id: 'itn_01JABCDEFGHJKMNPQRSTVWXYZ',
    kind: 'TRANSFER',
    actor: { type: 'BUSINESS', id: 'biz_01JABCDEFGHJKMNPQRSTVWXYZ' },
    source: { account_ref: 'acc-src', amount: { amount_minor: '100', currency: 'NGN' } },
    destination: {
      currency: 'NGN',
      beneficiary: { kind: 'EMAIL', value: 'payee@example.com' },
    },
  };

  it('resolves EMAIL to INTERNAL_ACCOUNT via identity + ledger', async () => {
    const identity = {
      resolveBeneficiary: vi.fn().mockResolvedValue({ user_id: 'usr_payee', verified: true }),
    };
    const ledger = {
      getAccountByCode: vi.fn().mockResolvedValue({ id: 'acc-payee-ngn' }),
    };

    const resolved = await resolveBeneficiaryAccounts(baseIntent, {
      identity: identity as never,
      ledger: ledger as never,
    });

    expect(identity.resolveBeneficiary).toHaveBeenCalledWith({
      kind: 'EMAIL',
      value: 'payee@example.com',
    });
    expect(ledger.getAccountByCode).toHaveBeenCalledWith(userDefaultAccountCode('usr_payee', 'NGN'));
    expect(resolved.destination.beneficiary).toEqual({
      kind: 'INTERNAL_ACCOUNT',
      account_ref: 'acc-payee-ngn',
    });
  });
});

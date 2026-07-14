import { describe, expect, it } from 'vitest';
import { diffPayinReconciliation, type PayinRecord } from './reconciliation.diff.js';

function rec(partial: Partial<PayinRecord> & { txId: string }): PayinRecord {
  return {
    provider: 'stub',
    currency: 'NGN',
    requestedMinor: '1000',
    confirmedMinor: '1000',
    hasLedgerEntry: true,
    ageMinutes: 1,
    ...partial,
  };
}

describe('diffPayinReconciliation', () => {
  it('reports no breaks when execution and ledger agree', () => {
    const result = diffPayinReconciliation({
      settled: [
        rec({ txId: 't1', requestedMinor: '1000', confirmedMinor: '1000' }),
        rec({ txId: 't2', requestedMinor: '500', confirmedMinor: '500' }),
      ],
      pending: [],
      balances: [{ provider: 'stub', currency: 'NGN', balanceMinor: '1500' }],
      expiryMinutes: 60,
    });
    expect(result.checked).toBe(2);
    expect(result.breaks).toHaveLength(0);
  });

  it('flags ledger drift when balance != settled sum', () => {
    const result = diffPayinReconciliation({
      settled: [rec({ txId: 't1', confirmedMinor: '1000' })],
      pending: [],
      balances: [{ provider: 'stub', currency: 'NGN', balanceMinor: '900' }],
      expiryMinutes: 60,
    });
    const drift = result.breaks.find((b) => b.kind === 'LEDGER_DRIFT');
    expect(drift).toBeDefined();
    expect(drift?.expectedMinor).toBe('1000');
    expect(drift?.actualMinor).toBe('900');
    expect(drift?.detail?.drift_minor).toBe('-100');
  });

  it('flags a settled pay-in missing its ledger entry', () => {
    const result = diffPayinReconciliation({
      settled: [rec({ txId: 't1', hasLedgerEntry: false })],
      pending: [],
      balances: [{ provider: 'stub', currency: 'NGN', balanceMinor: '0' }],
      expiryMinutes: 60,
    });
    // missing ledger entry (and the resulting drift since balance is 0)
    expect(
      result.breaks.some((b) => b.kind === 'MISSING_LEDGER_ENTRY' && b.reference === 't1'),
    ).toBe(true);
  });

  it('flags an amount mismatch between requested and confirmed', () => {
    const result = diffPayinReconciliation({
      settled: [rec({ txId: 't1', requestedMinor: '1000', confirmedMinor: '800' })],
      pending: [],
      balances: [{ provider: 'stub', currency: 'NGN', balanceMinor: '800' }],
      expiryMinutes: 60,
    });
    const mismatch = result.breaks.find((b) => b.kind === 'AMOUNT_MISMATCH');
    expect(mismatch?.expectedMinor).toBe('1000');
    expect(mismatch?.actualMinor).toBe('800');
  });

  it('flags stale pending pay-ins past the expiry window', () => {
    const result = diffPayinReconciliation({
      settled: [],
      pending: [rec({ txId: 'p1', ageMinutes: 5000 })],
      balances: [],
      expiryMinutes: 1440,
    });
    expect(result.breaks).toHaveLength(1);
    expect(result.breaks[0]?.kind).toBe('STALE_PENDING');
    expect(result.breaks[0]?.reference).toBe('p1');
  });
});

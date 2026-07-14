/**
 * Pure ledger↔rail reconciliation logic for fiat pay-ins.
 *
 * The execution database (transaction lifecycle) and the ledger service
 * (authoritative double-entry balances) are independent systems. This compares
 * them and surfaces every discrepancy as a typed break so finance ops can
 * triage without re-running the sweep. Kept side-effect free for unit testing.
 */

export type ReconBreakKind =
  | 'LEDGER_DRIFT' // sum of execution-settled pay-ins != ledger bank balance
  | 'MISSING_LEDGER_ENTRY' // settled tx with no ledger entry posted
  | 'AMOUNT_MISMATCH' // PSP-confirmed amount != requested amount
  | 'STALE_PENDING'; // pay-in still unfunded past its expiry window

export interface PayinRecord {
  txId: string;
  provider: string;
  currency: string;
  /** Amount the org requested. */
  requestedMinor: string;
  /** Amount the PSP actually confirmed (defaults to requested when settled cleanly). */
  confirmedMinor: string;
  hasLedgerEntry: boolean;
  ageMinutes: number;
}

export interface LedgerBankBalance {
  provider: string;
  currency: string;
  balanceMinor: string;
}

export interface ReconBreak {
  kind: ReconBreakKind;
  reference?: string;
  currency?: string;
  expectedMinor?: string;
  actualMinor?: string;
  detail?: Record<string, unknown>;
}

export interface ReconDiffInput {
  settled: PayinRecord[];
  pending: PayinRecord[];
  balances: LedgerBankBalance[];
  expiryMinutes: number;
}

export interface ReconDiffResult {
  checked: number;
  breaks: ReconBreak[];
}

function key(provider: string, currency: string): string {
  return `${provider.toLowerCase()}:${currency.toUpperCase()}`;
}

export function diffPayinReconciliation(input: ReconDiffInput): ReconDiffResult {
  const breaks: ReconBreak[] = [];

  // Per-record integrity checks on settled pay-ins.
  const settledSums = new Map<string, bigint>();
  for (const rec of input.settled) {
    const k = key(rec.provider, rec.currency);
    settledSums.set(k, (settledSums.get(k) ?? 0n) + BigInt(rec.confirmedMinor));

    if (!rec.hasLedgerEntry) {
      breaks.push({
        kind: 'MISSING_LEDGER_ENTRY',
        reference: rec.txId,
        currency: rec.currency,
        expectedMinor: rec.confirmedMinor,
        detail: { provider: rec.provider },
      });
    }
    if (rec.confirmedMinor !== rec.requestedMinor) {
      breaks.push({
        kind: 'AMOUNT_MISMATCH',
        reference: rec.txId,
        currency: rec.currency,
        expectedMinor: rec.requestedMinor,
        actualMinor: rec.confirmedMinor,
        detail: { provider: rec.provider },
      });
    }
  }

  // Cross-system drift: execution-recorded settled total vs ledger bank balance.
  const balanceByKey = new Map<string, bigint>();
  for (const b of input.balances) {
    balanceByKey.set(key(b.provider, b.currency), BigInt(b.balanceMinor));
  }
  const allKeys = new Set<string>([...settledSums.keys(), ...balanceByKey.keys()]);
  for (const k of allKeys) {
    const expected = settledSums.get(k) ?? 0n;
    const actual = balanceByKey.get(k) ?? 0n;
    if (expected !== actual) {
      const [provider, currency] = k.split(':');
      breaks.push({
        kind: 'LEDGER_DRIFT',
        reference: `${provider}.${currency}`,
        currency,
        expectedMinor: expected.toString(),
        actualMinor: actual.toString(),
        detail: { provider, drift_minor: (actual - expected).toString() },
      });
    }
  }

  // Stale pending pay-ins past their expiry window.
  for (const rec of input.pending) {
    if (rec.ageMinutes > input.expiryMinutes) {
      breaks.push({
        kind: 'STALE_PENDING',
        reference: rec.txId,
        currency: rec.currency,
        expectedMinor: rec.requestedMinor,
        detail: { provider: rec.provider, age_minutes: rec.ageMinutes },
      });
    }
  }

  return { checked: input.settled.length + input.pending.length, breaks };
}

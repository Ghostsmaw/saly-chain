import { describe, expect, it } from 'vitest';
import { ulid } from 'ulid';
import {
  assertPayrollTotals,
  buildPayrollLineIntent,
  parsePayrollBatch,
  payrollBatchSchema,
  type Intent,
} from '@salychain/intent-schema';
import {
  resolvePayrollParentState,
  summarizePayrollLines,
  childTransactionToPayrollLineResult,
  type PayrollLineResult,
} from './payroll.js';

const basePayrollIntent = (): Intent => ({
  version: '1',
  intent_id: `itn_${ulid()}`,
  kind: 'PAYROLL',
  actor: { type: 'BUSINESS', id: `biz_${ulid()}` },
  source: {
    amount: { amount_minor: '150000', currency: 'NGN' },
  },
  destination: {
    currency: 'NGN',
    beneficiary: {
      kind: 'INTERNAL_ACCOUNT',
      account_ref: '00000000-0000-4000-8000-000000000099',
    },
  },
  metadata: {
    payroll: {
      batch_id: `prl_${ulid()}`,
      name: 'March 2026',
      items: [
        {
          line_id: 'emp-001',
          label: 'Jane Doe',
          amount: { amount_minor: '100000', currency: 'NGN' },
          beneficiary: {
            kind: 'BANK',
            country: 'NG',
            bank_code: '058',
            account_number: '0123456789',
            account_name: 'Jane Doe',
          },
        },
        {
          line_id: 'emp-002',
          label: 'John Smith',
          amount: { amount_minor: '50000', currency: 'NGN' },
          beneficiary: {
            kind: 'BANK',
            country: 'NG',
            bank_code: '058',
            account_number: '9876543210',
            account_name: 'John Smith',
          },
        },
      ],
    },
  },
});

describe('payroll intent schema', () => {
  it('parses valid payroll batch metadata', () => {
    const intent = basePayrollIntent();
    const batch = parsePayrollBatch(intent.metadata);
    expect(batch.items).toHaveLength(2);
    expect(payrollBatchSchema.safeParse(batch).success).toBe(true);
  });

  it('rejects when line totals do not match source amount', () => {
    const intent = basePayrollIntent();
    const batch = parsePayrollBatch(intent.metadata);
    expect(() =>
      assertPayrollTotals(
        { source: { amount: { amount_minor: '99999', currency: 'NGN' } } },
        batch,
      ),
    ).toThrow(/must equal source/);
  });

  it('builds per-line payout intents with valid intent_id', () => {
    const intent = basePayrollIntent();
    const batch = parsePayrollBatch(intent.metadata);
    const lineIntent = buildPayrollLineIntent(
      intent,
      batch.items[0]!,
      `itn_${ulid()}`,
    );
    expect(lineIntent.kind).toBe('PAYOUT');
    expect(lineIntent.source.amount.amount_minor).toBe('100000');
    expect(lineIntent.metadata?.parent_intent_id).toBe(intent.intent_id);
  });
});

describe('payroll batch state resolution', () => {
  it('settles parent when all lines settled', () => {
    const lines: PayrollLineResult[] = [
      { line_id: 'a', state: 'SETTLED' },
      { line_id: 'b', state: 'SETTLED' },
    ];
    expect(resolvePayrollParentState(lines)).toBe('SETTLED');
  });

  it('keeps parent executing when any line is pending confirmation', () => {
    const lines: PayrollLineResult[] = [
      { line_id: 'a', state: 'SETTLED' },
      { line_id: 'b', state: 'AWAITING_CONFIRMATION' },
    ];
    expect(resolvePayrollParentState(lines)).toBe('EXECUTING');
  });

  it('fails parent when all lines terminal and none pending', () => {
    const lines: PayrollLineResult[] = [
      { line_id: 'a', state: 'SETTLED' },
      { line_id: 'b', state: 'FAILED', error: 'insufficient funds' },
    ];
    expect(resolvePayrollParentState(lines)).toBe('FAILED');
  });

  it('summarizes line counts', () => {
    const summary = summarizePayrollLines([
      { line_id: 'a', state: 'SETTLED' },
      { line_id: 'b', state: 'FAILED' },
      { line_id: 'c', state: 'EXECUTING' },
    ]);
    expect(summary.lines_settled).toBe(1);
    expect(summary.lines_failed).toBe(1);
    expect(summary.lines_pending).toBe(1);
  });

  it('maps child transactions to payroll line results', () => {
    const line = childTransactionToPayrollLineResult({
      id: 'child-uuid',
      intentId: 'itn_line',
      state: 'AWAITING_CONFIRMATION',
      error: null,
      metadata: {
        payroll_line_id: 'emp-001',
        intent: { metadata: { payroll_label: 'Jane Doe' } },
      },
    });
    expect(line.line_id).toBe('emp-001');
    expect(line.label).toBe('Jane Doe');
    expect(line.transaction_id).toBe('child-uuid');
  });
});

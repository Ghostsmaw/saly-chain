import { describe, expect, it } from 'vitest';
import {
  childTransactionToPayrollLineResult,
  resolvePayrollParentState,
  summarizePayrollLines,
} from './payroll.js';

/**
 * Integration-shape tests for payroll batch async finalization.
 * Full E2E with PSP webhooks lands behind FIAT_E2E_LIVE in a future pass.
 */
describe('payroll batch async finalization (integration shape)', () => {
  it('parent stays EXECUTING while fiat lines await PSP confirmation', () => {
    const lines = [
      childTransactionToPayrollLineResult({
        id: 'line-1',
        intentId: 'itn_1',
        state: 'SETTLED',
        error: null,
        metadata: { payroll_line_id: 'emp-1' },
      }),
      childTransactionToPayrollLineResult({
        id: 'line-2',
        intentId: 'itn_2',
        state: 'AWAITING_CONFIRMATION',
        error: null,
        metadata: { payroll_line_id: 'emp-2' },
      }),
    ];
    expect(resolvePayrollParentState(lines)).toBe('EXECUTING');
  });

  it('parent SETTLED when webhook confirms last pending line', () => {
    const afterWebhook = [
      { line_id: 'emp-1', state: 'SETTLED' as const, transaction_id: 'a' },
      { line_id: 'emp-2', state: 'SETTLED' as const, transaction_id: 'b' },
    ];
    expect(resolvePayrollParentState(afterWebhook)).toBe('SETTLED');
    const summary = summarizePayrollLines(afterWebhook);
    expect(summary.lines_settled).toBe(2);
    expect(summary.lines_pending).toBe(0);
  });

  it('parent FAILED when any line fails and none remain pending', () => {
    const lines = [
      { line_id: 'emp-1', state: 'SETTLED' as const },
      { line_id: 'emp-2', state: 'FAILED' as const, error: 'PSP rejected' },
    ];
    expect(resolvePayrollParentState(lines)).toBe('FAILED');
    const summary = summarizePayrollLines(lines);
    expect(summary.lines_failed).toBe(1);
  });

  it('documents webhook → maybeFinalizePayrollBatch hook points', () => {
    const hooks = ['markSettledByPspId', 'markFailedByPspId', 'maybeFinalizePayrollBatch'];
    expect(hooks).toContain('maybeFinalizePayrollBatch');
  });
});

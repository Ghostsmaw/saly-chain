import type { ExecutionTransactionState } from '../generated/prisma/index.js';

export interface PayrollLineResult {
  line_id: string;
  transaction_id?: string;
  intent_id?: string;
  state: ExecutionTransactionState | 'SKIPPED';
  error?: string;
  label?: string;
}

export interface PayrollBatchSummary {
  batch_id: string;
  name?: string;
  pay_period?: string;
  total_lines: number;
  lines_settled: number;
  lines_failed: number;
  lines_pending: number;
  lines: PayrollLineResult[];
}

const TERMINAL_FAILURE: ReadonlySet<ExecutionTransactionState> = new Set([
  'FAILED',
  'REJECTED',
  'REVERSED',
]);

const PENDING: ReadonlySet<ExecutionTransactionState> = new Set([
  'CREATED',
  'SCREENED',
  'ROUTED',
  'QUOTED',
  'RESERVED',
  'EXECUTING',
  'AWAITING_APPROVAL',
  'AWAITING_CONFIRMATION',
  'REVERSING',
]);

export function summarizePayrollLines(lines: PayrollLineResult[]): PayrollBatchSummary {
  let lines_settled = 0;
  let lines_failed = 0;
  let lines_pending = 0;

  for (const line of lines) {
    if (line.state === 'SETTLED') lines_settled += 1;
    else if (line.state === 'SKIPPED' || TERMINAL_FAILURE.has(line.state as ExecutionTransactionState)) {
      lines_failed += 1;
    } else if (PENDING.has(line.state as ExecutionTransactionState)) {
      lines_pending += 1;
    }
  }

  return {
    batch_id: '',
    total_lines: lines.length,
    lines_settled,
    lines_failed,
    lines_pending,
    lines,
  };
}

export type PayrollParentOutcome = 'SETTLED' | 'FAILED' | 'EXECUTING';

/** Map a child execution transaction to a payroll line result for batch reconciliation. */
export function childTransactionToPayrollLineResult(child: {
  id: string;
  intentId: string | null;
  state: ExecutionTransactionState;
  error: string | null;
  metadata: unknown;
}): PayrollLineResult {
  const meta = child.metadata as {
    payroll_line_id?: string;
    intent?: { metadata?: { payroll_label?: string } };
  } | null;

  return {
    line_id: meta?.payroll_line_id ?? child.id,
    transaction_id: child.id,
    intent_id: child.intentId ?? undefined,
    state: child.state,
    error: child.error ?? undefined,
    label: meta?.intent?.metadata?.payroll_label,
  };
}

/** Decide parent batch state after all line attempts complete. */
export function resolvePayrollParentState(lines: PayrollLineResult[]): PayrollParentOutcome {
  if (lines.length === 0) return 'FAILED';
  const allSettled = lines.every((l) => l.state === 'SETTLED');
  if (allSettled) return 'SETTLED';

  const anyPending = lines.some(
    (l) => l.state !== 'SKIPPED' && PENDING.has(l.state as ExecutionTransactionState),
  );
  if (anyPending) return 'EXECUTING';

  const anyFailed = lines.some(
    (l) =>
      l.state === 'SKIPPED' ||
      TERMINAL_FAILURE.has(l.state as ExecutionTransactionState),
  );
  return anyFailed ? 'FAILED' : 'EXECUTING';
}

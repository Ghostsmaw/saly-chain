import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { PayrollBatchSummary, PayrollLineResult, TransactionDto } from '@salychain/sdk-internal';
import { formatMinor } from '@/lib/format';

export function PayrollBatchPanel({
  tx,
  lines,
}: {
  tx: TransactionDto;
  lines?: TransactionDto[];
}) {
  if (tx.kind !== 'PAYROLL_BATCH') return null;

  const summary = resolvePayrollSummary(tx, lines);
  const progress =
    summary.total_lines > 0 ? Math.round((summary.lines_settled / summary.total_lines) * 100) : 0;

  const tone =
    tx.state === 'SETTLED'
      ? 'success'
      : tx.state === 'FAILED' || tx.state === 'REJECTED'
        ? 'danger'
        : 'warning';

  return (
    <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
      <CardHeader
        title={summary.name ?? 'Payroll batch'}
        subtitle={
          summary.pay_period
            ? `Pay period ${summary.pay_period} · ${summary.batch_id}`
            : summary.batch_id
        }
        right={<Chip tone={tone as 'success' | 'danger' | 'warning'}>{tx.state}</Chip>}
      />

      <div className="px-4 pb-2">
        <div className="mb-1 flex justify-between text-xs text-text-muted">
          <span>
            {summary.lines_settled} settled · {summary.lines_pending} pending · {summary.lines_failed}{' '}
            failed
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-cardHover">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {tx.error ? (
        <div className="mx-4 mb-3 rounded-lg border border-danger-500/30 bg-danger-500/10 px-3 py-2 text-sm text-danger-200">
          {tx.error}
        </div>
      ) : null}

      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-text-tertiary">
            <tr>
              <th className="py-2 font-medium">Employee</th>
              <th className="py-2 font-medium">Amount</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Details</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {summary.lines.map((line) => {
              const child = lines?.find((l) => l.id === line.transaction_id);
              return (
                <PayrollLineRow
                  key={line.line_id}
                  line={line}
                  currency={tx.source.currency}
                  child={child}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {tx.state === 'EXECUTING' || tx.state === 'AWAITING_CONFIRMATION' ? (
        <p className="px-4 pb-4 text-xs text-text-muted">
          <Clock className="mr-1 inline h-3.5 w-3.5" />
          Batch finalizes automatically when all employee payouts confirm via PSP webhook.
        </p>
      ) : null}
    </Card>
  );
}

function PayrollLineRow({
  line,
  currency,
  child,
}: {
  line: PayrollLineResult;
  currency: string;
  child?: TransactionDto;
}) {
  return (
    <tr className="border-t border-surface-divider">
      <td className="py-2.5">
        <p className="font-medium text-text-primary">{line.label ?? line.line_id}</p>
        <p className="font-mono text-[10px] text-text-muted">{line.line_id}</p>
      </td>
      <td className="py-2.5 text-text-secondary">
        {child ? formatMinor(child.source.amount_minor, currency) : '—'}
      </td>
      <td className="py-2.5">
        <LineStateChip state={line.state} />
      </td>
      <td className="max-w-xs py-2.5 text-xs text-text-muted">
        {line.error ? (
          <span className="text-danger-300">{line.error}</span>
        ) : child?.reversal_entry_id ? (
          <span className="inline-flex items-center gap-1 text-amber-200">
            <RotateCcw className="h-3 w-3" />
            Reversed · {child.reversal_entry_id.slice(0, 8)}…
          </span>
        ) : child?.state === 'AWAITING_CONFIRMATION' ? (
          'Awaiting bank confirmation'
        ) : child?.state === 'SETTLED' ? (
          'Paid'
        ) : (
          '—'
        )}
      </td>
      <td className="py-2.5 text-right">
        {line.transaction_id ? (
          <Link
            href={`/transactions/${line.transaction_id}`}
            className="inline-flex items-center gap-0.5 text-xs text-brand-300 hover:text-brand-200"
          >
            View <ArrowRight className="h-3 w-3" />
          </Link>
        ) : null}
      </td>
    </tr>
  );
}

function LineStateChip({ state }: { state: PayrollLineResult['state'] }) {
  const config = lineStateConfig(state);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${config.className}`}
    >
      {config.icon}
      {state}
    </span>
  );
}

function lineStateConfig(state: PayrollLineResult['state']) {
  switch (state) {
    case 'SETTLED':
      return {
        className: 'bg-success-500/15 text-success-300',
        icon: <CheckCircle2 className="h-3 w-3" />,
      };
    case 'FAILED':
    case 'REJECTED':
    case 'REVERSED':
    case 'SKIPPED':
      return {
        className: 'bg-danger-500/15 text-danger-300',
        icon: <XCircle className="h-3 w-3" />,
      };
    case 'REVERSING':
      return {
        className: 'bg-amber-500/15 text-amber-200',
        icon: <RotateCcw className="h-3 w-3" />,
      };
    default:
      return {
        className: 'bg-warning-500/15 text-warning-300',
        icon: <Clock className="h-3 w-3" />,
      };
  }
}

function resolvePayrollSummary(
  tx: TransactionDto,
  lines?: TransactionDto[],
): PayrollBatchSummary {
  if (tx.payroll && tx.payroll.lines?.length) {
    return tx.payroll;
  }

  if (lines?.length) {
    const settled = lines.filter((l) => l.state === 'SETTLED').length;
    const failed = lines.filter((l) =>
      ['FAILED', 'REJECTED', 'REVERSED'].includes(l.state),
    ).length;
    const pending = lines.length - settled - failed;
    return {
      batch_id: tx.intent_id ?? tx.id,
      total_lines: lines.length,
      lines_settled: settled,
      lines_failed: failed,
      lines_pending: pending,
      lines: lines.map((l) => ({
        line_id: (l.intent_id ?? l.id).slice(0, 12),
        transaction_id: l.id,
        intent_id: l.intent_id,
        state: l.state,
        error: l.error,
        label: l.intent_id,
      })),
    };
  }

  return {
    batch_id: tx.intent_id ?? tx.id,
    total_lines: 0,
    lines_settled: 0,
    lines_failed: 0,
    lines_pending: 0,
    lines: [],
  };
}

export function PayrollRailBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[11px] font-medium text-violet-200 ring-1 ring-violet-500/30">
      <Banknote className="h-3 w-3" />
      PAYROLL
    </span>
  );
}

export function PayrollFailureBanner({ tx }: { tx: TransactionDto }) {
  if (tx.kind !== 'PAYROLL_BATCH' || tx.state !== 'FAILED') return null;
  const failed = tx.payroll?.lines_failed ?? 0;
  const total = tx.payroll?.total_lines ?? 0;

  return (
    <div className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-100">
      <p className="flex items-center gap-2 font-medium">
        <AlertTriangle className="h-4 w-4" />
        Payroll batch incomplete
      </p>
      <p className="mt-1 text-danger-200/90">
        {failed} of {total} employee payouts failed. Failed lines release reserved funds back to your
        treasury (check reversal entries on line details). Retry failed employees as individual bank
        transfers or submit a new batch with corrected details.
      </p>
    </div>
  );
}

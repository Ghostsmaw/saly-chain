import { Chip } from '@salychain/ui';
import { formatTimestamp, shortHash, statusTone, timeAgo } from '@/lib/format';

export type IntentTraceEvent = {
  event_type: string;
  ts: string;
  kind?: string;
  source?: string;
  compliance_decision?: string;
  risk_decision?: string;
  risk_score?: number;
  rail?: string;
  expected_cost_minor?: string;
  expected_seconds?: number;
  reason_code?: string;
};

export type TxStateRow = {
  state: string;
  ts: string;
  rail?: string;
  tx_hash?: string;
  reason_code?: string;
};

export type LineageTransaction = {
  transaction_id: string;
  states: TxStateRow[];
};

function eventDetail(e: IntentTraceEvent): string {
  switch (e.event_type) {
    case 'screened':
      return `compliance=${e.compliance_decision ?? '—'} · risk=${e.risk_decision ?? '—'} (${e.risk_score ?? 0})`;
    case 'routed':
      return `rail=${e.rail ?? '—'} · ~${e.expected_seconds ?? 0}s`;
    case 'rejected':
      return e.reason_code ?? 'rejected';
    case 'received':
      return e.source ? `via ${e.source}` : '';
    default:
      return '';
  }
}

export function LineageView({
  intentTrace,
  transactions,
}: {
  intentTrace: IntentTraceEvent[];
  transactions: LineageTransaction[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Intent timeline</h4>
        {intentTrace.length === 0 ? (
          <p className="text-sm text-text-muted">No intent events recorded.</p>
        ) : (
          <ol className="relative space-y-3 border-l border-surface-border pl-5">
            {intentTrace.map((e, i) => (
              <li key={`${e.event_type}-${i}`} className="relative">
                <span className="absolute -left-[1.42rem] top-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={statusTone(e.event_type)}>{e.event_type}</Chip>
                  <span className="text-xs text-text-muted">{timeAgo(e.ts)}</span>
                  {eventDetail(e) && <span className="text-sm text-text-secondary">{eventDetail(e)}</span>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Settlement</h4>
        {transactions.length === 0 ? (
          <p className="text-sm text-text-muted">No settlement transaction linked yet.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.transaction_id} className="rounded-lg border border-surface-border p-3">
                <div className="mb-2 font-mono text-xs text-text-tertiary">{tx.transaction_id}</div>
                <ol className="relative space-y-2 border-l border-surface-border pl-5">
                  {tx.states.map((s, i) => (
                    <li key={`${s.state}-${i}`} className="relative">
                      <span className="absolute -left-[1.42rem] top-1 h-2.5 w-2.5 rounded-full bg-accent-500" />
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip tone={statusTone(s.state)}>{s.state}</Chip>
                        <span className="text-xs text-text-muted">{formatTimestamp(s.ts)}</span>
                        {s.rail && <span className="text-sm text-text-secondary">rail={s.rail}</span>}
                        {s.tx_hash && <span className="font-mono text-xs text-text-muted">{shortHash(s.tx_hash)}</span>}
                        {s.reason_code && <span className="text-sm text-danger-300">{s.reason_code}</span>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

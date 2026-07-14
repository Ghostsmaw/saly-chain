import { Chip } from '@salychain/ui';
import { chainLabel, formatTimestamp, shortHash } from '@/lib/format';

export type DecodedEvent = {
  event_name: string;
  contract_address: string;
  args: string;
  ts?: string;
};

function parseArgs(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** Renders L3 OutputProposed settlement details when present on a tx page. */
export function L3OutputCard({ events }: { events: DecodedEvent[] }) {
  const outputs = events.filter((e) => e.event_name === 'OutputProposed');
  if (outputs.length === 0) return null;

  return (
    <div className="space-y-3">
      {outputs.map((e, i) => {
        const args = parseArgs(e.args);
        return (
          <div key={i} className="rounded-lg border border-success-500/30 bg-success-500/5 p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Chip tone="success">OutputProposed</Chip>
              <span className="text-xs text-text-muted">L3 → L1 settlement</span>
            </div>
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-text-muted">L2 block</dt>
                <dd className="font-mono text-text-primary">{String(args.l2_block_number ?? '—')}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-text-muted">Settlement network</dt>
                <dd className="text-text-primary">{String(args.settlement_network ?? '—')}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase text-text-muted">Output root</dt>
                <dd className="break-all font-mono text-xs text-text-secondary">{String(args.output_root ?? '—')}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-text-muted">L1 block</dt>
                <dd className="font-mono text-text-primary">{String(args.l1_block_number ?? '—')}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-text-muted">Oracle</dt>
                <dd className="font-mono text-xs text-text-muted">{shortHash(e.contract_address)}</dd>
              </div>
              {e.ts && (
                <div>
                  <dt className="text-xs uppercase text-text-muted">Proposed at</dt>
                  <dd className="text-text-secondary">{formatTimestamp(e.ts)}</dd>
                </div>
              )}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

/** Renders escrow deal events (DealFunded / Released / Refunded). */
export function EscrowEventsCard({ events }: { events: DecodedEvent[] }) {
  const deals = events.filter((e) =>
    ['DealFunded', 'DealReleased', 'DealRefunded'].includes(e.event_name),
  );
  if (deals.length === 0) return null;

  return (
    <div className="space-y-3">
      {deals.map((e, i) => {
        const args = parseArgs(e.args);
        const tone = e.event_name === 'DealFunded' ? 'info' : e.event_name === 'DealReleased' ? 'success' : 'warning';
        return (
          <div key={i} className="rounded-lg border border-surface-border p-3">
            <div className="mb-2 flex items-center gap-2">
              <Chip tone={tone}>{e.event_name}</Chip>
              <span className="font-mono text-xs text-text-muted">deal {String(args.deal_id ?? '—')}</span>
            </div>
            <pre className="overflow-x-auto rounded bg-surface-base/60 p-2 text-xs text-text-secondary">
              {JSON.stringify(args, null, 2)}
            </pre>
          </div>
        );
      })}
    </div>
  );
}

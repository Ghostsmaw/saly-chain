import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { Field } from '@/components/Field';
import { TransfersTable, type TransferRow } from '@/components/TransfersTable';
import { EscrowEventsCard, L3OutputCard } from '@/components/DecodedEvents';
import { LineageView, type IntentTraceEvent, type LineageTransaction } from '@/components/LineageView';
import { chainLabel, chainTone, shortHash } from '@/lib/format';

export const dynamic = 'force-dynamic';

interface TxLineage {
  transaction_id: string;
  intent_id: string | null;
  states: LineageTransaction['states'];
  intent_trace: IntentTraceEvent[];
}

export default async function TxPage({
  params,
}: {
  params: Promise<{ chain: string; hash: string }>;
}) {
  const { chain, hash } = await params;
  const tx = await safe(data().tx(chain, hash), {
    chain,
    tx_hash: hash,
    transfers: [],
    decoded_events: [],
    salychain_originated: false,
    lineage: null as TxLineage | null,
  });

  const decoded = tx.decoded_events as Array<{ event_name: string; contract_address: string; args: string }>;
  const lineage = tx.lineage as TxLineage | null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Chip tone={chainTone(chain)}>{chainLabel(chain)}</Chip>
        <h1 className="font-mono text-lg text-text-primary">{shortHash(hash, 12, 10)}</h1>
        {tx.salychain_originated && <Chip tone="brand">SalyChain originated</Chip>}
      </div>

      <Card>
        <CardHeader title="Transaction" />
        <Field label="Hash" mono>
          {hash}
        </Field>
        <Field label="Chain">{chainLabel(chain)}</Field>
        <Field label="Transfers">{tx.transfers.length}</Field>
        <Field label="Decoded events">{decoded.length}</Field>
        {lineage?.intent_id && (
          <Field label="Intent">
            <Link href={`/intent/${lineage.intent_id}`} className="text-brand-300 hover:underline">
              {lineage.intent_id}
            </Link>
          </Field>
        )}
      </Card>

      <Card>
        <CardHeader title="Token transfers" />
        <TransfersTable rows={tx.transfers as TransferRow[]} />
      </Card>

      {decoded.length > 0 && (
        <Card>
          <CardHeader title="Decoded events" />
          <L3OutputCard events={decoded} />
          <EscrowEventsCard events={decoded} />
          <div className="mt-3 space-y-3">
            {decoded
              .filter(
                (e) =>
                  e.event_name !== 'OutputProposed' &&
                  !['DealFunded', 'DealReleased', 'DealRefunded'].includes(e.event_name),
              )
              .map((e, i) => (
                <div key={i} className="rounded-lg border border-surface-border p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Chip tone="info">{e.event_name}</Chip>
                    <span className="font-mono text-xs text-text-muted">{shortHash(e.contract_address)}</span>
                  </div>
                  <pre className="overflow-x-auto rounded bg-surface-base/60 p-2 text-xs text-text-secondary">
                    {safeJson(e.args)}
                  </pre>
                </div>
              ))}
          </div>
        </Card>
      )}

      {tx.salychain_originated && lineage && (
        <Card>
          <CardHeader
            title="Settlement lineage"
            subtitle="Why this payment took its rail, and how it settled"
          />
          <LineageView
            intentTrace={lineage.intent_trace}
            transactions={[{ transaction_id: lineage.transaction_id, states: lineage.states }]}
          />
        </Card>
      )}
    </div>
  );
}

function safeJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

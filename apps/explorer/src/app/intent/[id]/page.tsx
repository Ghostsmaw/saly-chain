import { Card, CardHeader, Chip } from '@salychain/ui';
import { data, safe } from '@/lib/api';
import { Field } from '@/components/Field';
import { LineageView, type IntentTraceEvent, type LineageTransaction } from '@/components/LineageView';

export const dynamic = 'force-dynamic';

export default async function IntentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lineage = await safe(data().intentLineage(id), {
    intent_id: id,
    found: false,
    intent_trace: [] as IntentTraceEvent[],
    transactions: [] as Array<LineageTransaction & { latest_state: string; settle_tx_hash: string; rail: string }>,
  });

  const received = lineage.intent_trace.find((e) => (e as IntentTraceEvent).event_type === 'received') as
    | IntentTraceEvent
    | undefined;
  const routed = lineage.intent_trace.find((e) => (e as IntentTraceEvent).event_type === 'routed') as
    | IntentTraceEvent
    | undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="font-mono text-lg text-text-primary">{id}</h1>
        {lineage.found ? <Chip tone="brand">Intent</Chip> : <Chip tone="neutral">Not found</Chip>}
      </div>

      {!lineage.found ? (
        <Card>
          <p className="py-6 text-center text-sm text-text-muted">
            No lineage found for this intent id. It may not exist or has not been ingested yet.
          </p>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader title="Intent" />
            <Field label="Intent id" mono>
              {id}
            </Field>
            {received?.kind && <Field label="Kind">{received.kind}</Field>}
            {received?.source && <Field label="Source">{received.source}</Field>}
            {routed?.rail && <Field label="Routed rail">{routed.rail}</Field>}
            <Field label="Transactions">{lineage.transactions.length}</Field>
          </Card>

          <Card>
            <CardHeader
              title="Settlement lineage"
              subtitle="Intent → screening → rail decision → cross-chain settlement"
            />
            <LineageView
              intentTrace={lineage.intent_trace as IntentTraceEvent[]}
              transactions={lineage.transactions as unknown as LineageTransaction[]}
            />
          </Card>
        </>
      )}
    </div>
  );
}

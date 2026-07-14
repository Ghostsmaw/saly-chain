import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { createScmShipmentAction } from '@/app/verticals/actions';
import { fetchScmSettlements, fetchScmShipments, formatMinorAmount } from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalScmPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [shipmentsRes, settlementsRes] = await Promise.all([fetchScmShipments(), fetchScmSettlements()]);
  const shipments = shipmentsRes.data;
  const settlements = settlementsRes.data;

  return (
    <PortalShell title="Supply chain" subtitle="Shipments and settlement activity for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Create shipment" />
        <form action={createScmShipmentAction} className="grid gap-3 p-4 pt-0 md:grid-cols-4">
          <input name="origin" required placeholder="Origin" className={verticalInputClass} />
          <input name="destination" required placeholder="Destination" className={verticalInputClass} />
          <VerticalSubmitButton label="Create" />
        </form>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Shipments" right={<Chip tone={shipmentsRes.source === 'live' ? 'success' : 'neutral'}>{shipmentsRes.source}</Chip>} />
          {shipmentsRes.source !== 'live' ? (
            <VerticalEmptyState message="SCM service offline (port 4026)." />
          ) : shipments.length === 0 ? (
            <VerticalEmptyState message="No shipments yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {shipments.map((s) => (
                <li key={s.id} className="py-2">{s.origin} → {s.destination} ({s.status})</li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Settlements" subtitle={`${settlements.length} recorded`} />
          {settlements.length === 0 ? (
            <VerticalEmptyState message="No settlements yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {settlements.map((s) => (
                <li key={s.id} className="py-2">{formatMinorAmount(s.amountMinor, s.currency)} — {s.status}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </PortalShell>
  );
}

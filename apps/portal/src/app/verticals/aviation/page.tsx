import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { registerAviationAircraftAction } from '@/app/verticals/actions';
import { fetchAviationAircraft, fetchAviationParts, fetchAviationSettlements, formatMinorAmount } from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalAviationPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [aircraftRes, partsRes, settlementsRes] = await Promise.all([
    fetchAviationAircraft(),
    fetchAviationParts(),
    fetchAviationSettlements(),
  ]);
  const aircraft = aircraftRes.data;
  const parts = partsRes.data;
  const settlements = settlementsRes.data;

  return (
    <PortalShell title="Aviation" subtitle="Aircraft registry and MRO settlements for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Register aircraft" />
        <form action={registerAviationAircraftAction} className="grid gap-3 p-4 pt-0 md:grid-cols-5">
          <input name="tail" required placeholder="Tail" className={verticalInputClass} />
          <input name="model" required placeholder="Model" className={verticalInputClass} />
          <input name="owner_ref" required placeholder="Owner ref" className={verticalInputClass} />
          <VerticalSubmitButton label="Register" />
        </form>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Aircraft" right={<Chip tone={aircraftRes.source === 'live' ? 'success' : 'neutral'}>{aircraftRes.source}</Chip>} />
          {aircraftRes.source !== 'live' ? (
            <VerticalEmptyState message="Aviation service offline (port 4027)." />
          ) : aircraft.length === 0 ? (
            <VerticalEmptyState message="No aircraft yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {aircraft.map((a) => (
                <li key={a.id} className="py-2">{a.tail} — {a.model}</li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Parts" subtitle={`${parts.length} minted`} />
          {parts.length === 0 ? (
            <VerticalEmptyState message="No parts yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {parts.map((p) => (
                <li key={p.id} className="py-2">{p.serial} ({p.partType})</li>
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

import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { registerAgriFarmAction, registerAgriFarmerAction } from '@/app/verticals/actions';
import { fetchAgriFarmers, fetchAgriFarms, fetchAgriLoans, formatMinorAmount } from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalAgriPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [farmersRes, farmsRes, loansRes] = await Promise.all([
    fetchAgriFarmers(),
    fetchAgriFarms(),
    fetchAgriLoans(),
  ]);
  const farmers = farmersRes.data;
  const farms = farmsRes.data;
  const loans = loansRes.data;

  return (
    <PortalShell title="Agriculture" subtitle="Farmer registry, farms, and input financing for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Register farmer" />
        <form action={registerAgriFarmerAction} className="grid gap-3 p-4 pt-0 md:grid-cols-3">
          <input name="external_ref" required placeholder="External ref" className={verticalInputClass} />
          <VerticalSubmitButton label="Register" />
        </form>
      </Card>
      <Card className="mb-6">
        <CardHeader title="Register farm" />
        <form action={registerAgriFarmAction} className="grid gap-3 p-4 pt-0 md:grid-cols-4">
          <select name="farmer_id" required className={verticalInputClass} defaultValue="">
            <option value="" disabled>Farmer</option>
            {farmers.map((f) => (
              <option key={f.id} value={f.id}>{f.externalRef}</option>
            ))}
          </select>
          <input name="crop" placeholder="Crop" className={verticalInputClass} />
          <input name="season" placeholder="Season" className={verticalInputClass} />
          <VerticalSubmitButton label="Register farm" />
        </form>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Farmers" right={<Chip tone={farmersRes.source === 'live' ? 'success' : 'neutral'}>{farmersRes.source}</Chip>} />
          {farmersRes.source !== 'live' ? (
            <VerticalEmptyState message="Agri service offline (port 4025)." />
          ) : farmers.length === 0 ? (
            <VerticalEmptyState message="No farmers yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {farmers.map((f) => (
                <li key={f.id} className="py-2">{f.externalRef}</li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Farms" subtitle={`${farms.length} registered`} />
          {farms.length === 0 ? (
            <VerticalEmptyState message="No farms yet." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {farms.map((f) => (
                <li key={f.id} className="py-2">{f.crop ?? 'Farm'} — {f.season ?? '—'}</li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Input loans" subtitle={`${loans.length} active`} />
          {loans.length === 0 ? (
            <VerticalEmptyState message="No input loans." />
          ) : (
            <ul className="divide-y divide-surface-divider px-4 pb-4 text-sm">
              {loans.map((l) => (
                <li key={l.id} className="py-2">{formatMinorAmount(l.amountMinor, l.currency)} — {l.status}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </PortalShell>
  );
}

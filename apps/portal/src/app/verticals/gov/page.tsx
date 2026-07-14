import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { createGovProgramAction } from '@/app/verticals/actions';
import {
  fetchGovDisbursements,
  fetchGovPrograms,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalGovPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [programsRes, disbursementsRes] = await Promise.all([
    fetchGovPrograms(),
    fetchGovDisbursements(),
  ]);

  const programs = programsRes.data;
  const disbursements = disbursementsRes.data;

  return (
    <PortalShell title="Government" subtitle="Programs and disbursement activity for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Create program" subtitle="Enroll a new social program." />
        <form action={createGovProgramAction} className="grid gap-3 p-4 pt-0 md:grid-cols-4">
          <input name="name" required placeholder="Program name" className={verticalInputClass} />
          <input name="budget_minor" required placeholder="Budget minor" className={verticalInputClass} />
          <input name="currency" defaultValue="USD" className={verticalInputClass} />
          <VerticalSubmitButton label="Create" />
        </form>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader
            title="Programs"
            subtitle={programsRes.source === 'live' ? `${programs.length} enrolled` : 'Gov service offline'}
          />
          {programsRes.source !== 'live' ? (
            <VerticalEmptyState message="Start the gov service (pnpm --filter @salychain/service-gov dev)." />
          ) : programs.length === 0 ? (
            <VerticalEmptyState message="No programs enrolled. Create via POST /v1/gov/programs." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Program</th>
                  <th className="pb-2 font-medium">Budget</th>
                  <th className="pb-2 font-medium">Disbursements</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-medium">{row.name}</td>
                    <td className="py-3">{formatMinorAmount(row.budgetMinor, row.currency)}</td>
                    <td className="py-3">{row.disbursementCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <CardHeader title="Recent disbursements" subtitle={`${disbursements.length} records`} />
          {disbursementsRes.source !== 'live' ? (
            <VerticalEmptyState message="Disbursements unavailable." />
          ) : disbursements.length === 0 ? (
            <VerticalEmptyState message="No disbursements yet." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Program</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {disbursements.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3">{row.programName}</td>
                    <td className="py-3">{formatMinorAmount(row.amountMinor, row.currency)}</td>
                    <td className="py-3"><Chip tone="neutral">{row.status}</Chip></td>
                    <td className="py-3 text-text-tertiary">{formatDate(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </PortalShell>
  );
}

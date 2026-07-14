import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass, verticalLabelClass } from '@/components/verticals/form-styles';
import {
  createFinanceInstrumentAction,
  originateFinanceLoanAction,
  upsertFinanceHoldingAction,
} from '@/app/verticals/actions';
import {
  fetchFinanceHoldings,
  fetchFinanceInstruments,
  fetchFinanceLoans,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalFinancePage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [instrumentsRes, holdingsRes, loansRes] = await Promise.all([
    fetchFinanceInstruments(),
    fetchFinanceHoldings(),
    fetchFinanceLoans(),
  ]);

  const instruments = instrumentsRes.data;
  const holdings = holdingsRes.data;
  const loans = loansRes.data;

  return (
    <PortalShell title="Finance" subtitle="Your organization's instruments, holdings, and loan book.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Create" subtitle="Register instruments and positions for your org." />
        <div className="grid gap-4 p-4 pt-0 md:grid-cols-3">
          <form action={createFinanceInstrumentAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="name" required placeholder="Instrument name" className={verticalInputClass} />
            <input name="issuer_ref" required placeholder="Issuer ref" className={verticalInputClass} />
            <select name="type" className={verticalInputClass}><option value="BOND">BOND</option><option value="FUND">FUND</option></select>
            <input name="currency" defaultValue="USD" className={verticalInputClass} />
            <VerticalSubmitButton label="Register" />
          </form>
          <form action={upsertFinanceHoldingAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="account_ref" required placeholder="Account ref" className={verticalInputClass} />
            <select name="instrument_id" required className={verticalInputClass} defaultValue="">
              <option value="" disabled>Instrument</option>
              {instruments.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
            <input name="units_minor" required placeholder="Units minor" className={verticalInputClass} />
            <VerticalSubmitButton label="Save holding" />
          </form>
          <form action={originateFinanceLoanAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="borrower_ref" required placeholder="Borrower ref" className={verticalInputClass} />
            <input name="principal_minor" required placeholder="Principal minor" className={verticalInputClass} />
            <input name="rate_bps" type="number" defaultValue={500} className={verticalInputClass} />
            <input name="currency" defaultValue="USD" className={verticalInputClass} />
            <VerticalSubmitButton label="Originate loan" />
          </form>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader
            title="Instruments"
            subtitle={instrumentsRes.source === 'live' ? `${instruments.length} registered` : 'Finance service offline'}
          />
          {instrumentsRes.source !== 'live' ? (
            <VerticalEmptyState message="Start the finance service (pnpm --filter @salychain/service-finance dev)." />
          ) : instruments.length === 0 ? (
            <VerticalEmptyState message="No instruments yet. Register via POST /v1/finance/instruments." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Currency</th>
                  <th className="pb-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {instruments.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-medium text-text-primary">{row.name}</td>
                    <td className="py-3"><Chip tone="neutral">{row.type}</Chip></td>
                    <td className="py-3 font-mono text-xs">{row.currency}</td>
                    <td className="py-3 text-text-tertiary">{formatDate(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <CardHeader title="Holdings" subtitle={`${holdings.length} positions`} />
          {holdingsRes.source !== 'live' ? (
            <VerticalEmptyState message="Holdings unavailable." />
          ) : holdings.length === 0 ? (
            <VerticalEmptyState message="No holdings recorded." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Account</th>
                  <th className="pb-2 font-medium">Instrument</th>
                  <th className="pb-2 font-medium">Units</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-mono text-xs">{row.accountRef}</td>
                    <td className="py-3">{row.instrument?.name ?? row.instrumentId}</td>
                    <td className="py-3 font-mono text-xs">{row.unitsMinor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <CardHeader title="Loans" subtitle={`${loans.length} in book`} />
          {loansRes.source !== 'live' ? (
            <VerticalEmptyState message="Loans unavailable." />
          ) : loans.length === 0 ? (
            <VerticalEmptyState message="No loans originated." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Borrower</th>
                  <th className="pb-2 font-medium">Principal</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-mono text-xs">{row.borrowerRef}</td>
                    <td className="py-3">{formatMinorAmount(row.principalMinor, row.currency)}</td>
                    <td className="py-3"><Chip tone="neutral">{row.status}</Chip></td>
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

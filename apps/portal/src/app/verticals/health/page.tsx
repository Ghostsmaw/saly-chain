import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { AdjudicateClaimButtons } from '@/components/verticals/AdjudicateClaimButtons';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import {
  grantHealthConsentAction,
  registerHealthPayerAction,
  registerHealthProviderAction,
  submitHealthClaimAction,
} from '@/app/verticals/actions';
import {
  fetchHealthClaims,
  fetchHealthConsents,
  fetchHealthPayers,
  fetchHealthProviders,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalHealthPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [consentsRes, claimsRes, providersRes, payersRes] = await Promise.all([
    fetchHealthConsents(),
    fetchHealthClaims(),
    fetchHealthProviders(),
    fetchHealthPayers(),
  ]);

  const consents = consentsRes.data;
  const claims = claimsRes.data;
  const providers = providersRes.data;
  const payers = payersRes.data;

  return (
    <PortalShell title="Healthcare" subtitle="Consent registry and claims for your organization.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Create" subtitle="Register providers, payers, consents, and claims." />
        <div className="grid gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-4">
          <form action={registerHealthProviderAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="name" required placeholder="Provider name" className={verticalInputClass} />
            <VerticalSubmitButton label="Add provider" />
          </form>
          <form action={registerHealthPayerAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="name" required placeholder="Payer name" className={verticalInputClass} />
            <VerticalSubmitButton label="Add payer" />
          </form>
          <form action={grantHealthConsentAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="patient_ref" required placeholder="Patient ref" className={verticalInputClass} />
            <input name="scope" required placeholder="Scope" className={verticalInputClass} />
            <VerticalSubmitButton label="Grant consent" />
          </form>
          <form action={submitHealthClaimAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <select name="provider_id" required className={verticalInputClass} defaultValue="">
              <option value="" disabled>Provider</option>
              {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select name="payer_id" required className={verticalInputClass} defaultValue="">
              <option value="" disabled>Payer</option>
              {payers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input name="procedure_code" required placeholder="99213" className={verticalInputClass} />
            <input name="amount_minor" required placeholder="Amount minor" className={verticalInputClass} />
            <input name="currency" defaultValue="USD" className={verticalInputClass} />
            <VerticalSubmitButton label="Submit claim" />
          </form>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader
            title="Consents"
            subtitle={consentsRes.source === 'live' ? `${consents.length} on file` : 'Health service offline'}
          />
          {consentsRes.source !== 'live' ? (
            <VerticalEmptyState message="Start the health service (pnpm --filter @salychain/service-health dev)." />
          ) : consents.length === 0 ? (
            <VerticalEmptyState message="No consents granted. POST /v1/health/consent to add one." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Scope</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {consents.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3">{row.scope}</td>
                    <td className="py-3"><Chip tone={row.status === 'ACTIVE' ? 'success' : 'neutral'}>{row.status}</Chip></td>
                    <td className="py-3 text-text-tertiary">{row.expiresAt ? formatDate(row.expiresAt) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <CardHeader title="Claims" subtitle={`${claims.length} submitted`} />
          {claimsRes.source !== 'live' ? (
            <VerticalEmptyState message="Claims unavailable." />
          ) : claims.length === 0 ? (
            <VerticalEmptyState message="No claims submitted." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Procedure</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-mono text-xs">{row.procedureCode}</td>
                    <td className="py-3">{formatMinorAmount(row.amountMinor, row.currency)}</td>
                    <td className="py-3"><Chip tone="neutral">{row.status}</Chip></td>
                    <td className="py-3">
                      {(row.status === 'SUBMITTED' || row.status === 'DISPUTED') && (
                        <AdjudicateClaimButtons claimId={row.id} />
                      )}
                    </td>
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

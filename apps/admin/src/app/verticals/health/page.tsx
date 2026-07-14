import { AdminShell } from '@/components/AdminShell';
import { AdjudicateClaimButtons } from '@/components/verticals/AdjudicateClaimButtons';
import { VerticalFlash } from '@/components/saly/verticals/VerticalFlash';
import { VerticalHero } from '@/components/saly/verticals/VerticalHero';
import {
  VerticalFormCard,
  VerticalFormField,
  VerticalFormSection,
  VerticalInput,
  VerticalSelect,
  VerticalSubmitButton,
} from '@/components/saly/verticals/VerticalForms';
import {
  VerticalTable,
  VerticalTableBody,
  VerticalTableCell,
  VerticalTableHeadCell,
  VerticalTableHeadRow,
  VerticalTableRow,
  VerticalTableSection,
} from '@/components/saly/verticals/VerticalTable';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge } from '@/components/saly/ui';
import {
  grantHealthConsentAction,
  registerHealthPayerAction,
  registerHealthProviderAction,
  submitHealthClaimAction,
} from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchHealthClaims,
  fetchHealthConsents,
  fetchHealthPayers,
  fetchHealthProviders,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HealthVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [consentsRes, claimsRes, providersRes, payersRes] = await Promise.all([
    fetchHealthConsents(orgId),
    fetchHealthClaims(orgId),
    fetchHealthProviders(orgId),
    fetchHealthPayers(orgId),
  ]);

  const consents = consentsRes.data;
  const claims = claimsRes.data;
  const providers = providersRes.data;
  const payers = payersRes.data;
  const live = consentsRes.source === 'live';
  const activeConsents = consents.filter((c) => c.status === 'ACTIVE').length;
  const pendingClaims = claims.filter((c) => c.status === 'SUBMITTED' || c.status === 'DISPUTED').length;

  return (
    <AdminShell
      title="Healthcare"
      subtitle="HIPAA-aware consent registry and claims adjudication"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${activeConsents} active consents` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Healthcare"
          badges={pendingClaims > 0 ? [{ label: `${pendingClaims} pending claims`, variant: 'warning' }] : undefined}
          stats={[
            { label: 'Consents', value: live ? consents.length.toLocaleString() : '—' },
            { label: 'Active consents', value: live ? activeConsents.toLocaleString() : '—' },
            { label: 'Claims', value: claimsRes.source === 'live' ? claims.length.toLocaleString() : '—' },
            { label: 'Providers', value: providersRes.source === 'live' ? providers.length.toLocaleString() : '—' },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Providers, payers, consents, and claims" columns={4}>
            <form action={registerHealthProviderAction}>
              <VerticalFormCard title="Provider">
                <VerticalInput name="name" required placeholder="General Hospital" />
                <VerticalSubmitButton label="Register" />
              </VerticalFormCard>
            </form>
            <form action={registerHealthPayerAction}>
              <VerticalFormCard title="Payer">
                <VerticalInput name="name" required placeholder="Health Plan Inc" />
                <VerticalSubmitButton label="Register" />
              </VerticalFormCard>
            </form>
            <form action={grantHealthConsentAction}>
              <VerticalFormCard title="Grant consent">
                <VerticalInput name="patient_ref" required placeholder="patient_ref (hashed at rest)" />
                <VerticalInput name="scope" required placeholder="claims.adjudication" />
                <VerticalSubmitButton label="Grant" />
              </VerticalFormCard>
            </form>
            <form action={submitHealthClaimAction}>
              <VerticalFormCard title="Submit claim">
                <VerticalSelect name="provider_id" required defaultValue="">
                  <option value="" disabled>
                    Provider
                  </option>
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </VerticalSelect>
                <VerticalSelect name="payer_id" required defaultValue="">
                  <option value="" disabled>
                    Payer
                  </option>
                  {payers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </VerticalSelect>
                <VerticalInput name="procedure_code" required placeholder="99213" />
                <VerticalInput name="amount_minor" required placeholder="18500" />
                <VerticalInput name="currency" defaultValue="USD" />
                <VerticalSubmitButton label="Submit claim" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Consent registry"
            description="Scoped patient data-sharing agreements — patient refs hashed at rest"
            source={consentsRes.source}
            rowCount={consents.length}
            offlineDescription="Start with pnpm --filter @salychain/service-health dev (port 4028)."
            emptyDescription="POST /v1/health/consent to grant the first consent."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Consent ID</VerticalTableHeadCell>
                <VerticalTableHeadCell>Patient ID</VerticalTableHeadCell>
                <VerticalTableHeadCell>Scope</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Expires</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {consents.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell mono>{row.id}</VerticalTableCell>
                    <VerticalTableCell mono>{row.patientId}</VerticalTableCell>
                    <VerticalTableCell>{row.scope}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)} dot>
                        {row.status}
                      </SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {row.expiresAt ? formatDate(row.expiresAt) : '—'}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Claims pipeline"
            description="Submitted claims awaiting or completed adjudication"
            source={claimsRes.source}
            rowCount={claims.length}
            offlineDescription="Claims unavailable while health service is offline."
            emptyDescription="POST /v1/health/claims to file a claim."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Procedure</VerticalTableHeadCell>
                <VerticalTableHeadCell>Provider</VerticalTableHeadCell>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Submitted</VerticalTableHeadCell>
                <VerticalTableHeadCell>Actions</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {claims.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell mono>{row.procedureCode}</VerticalTableCell>
                    <VerticalTableCell mono>{row.providerId}</VerticalTableCell>
                    <VerticalTableCell>{formatMinorAmount(row.amountMinor, row.currency)}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)} dot>
                        {row.status}
                      </SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
                    </VerticalTableCell>
                    <VerticalTableCell>
                      {(row.status === 'SUBMITTED' || row.status === 'DISPUTED') && (
                        <AdjudicateClaimButtons claimId={row.id} />
                      )}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

import { AdminShell } from '@/components/AdminShell';
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
  createFinanceInstrumentAction,
  originateFinanceLoanAction,
  upsertFinanceHoldingAction,
} from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchFinanceHoldings,
  fetchFinanceInstruments,
  fetchFinanceLoans,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FinanceVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [instrumentsRes, holdingsRes, loansRes] = await Promise.all([
    fetchFinanceInstruments(orgId),
    fetchFinanceHoldings(orgId),
    fetchFinanceLoans(orgId),
  ]);

  const live = instrumentsRes.source === 'live';
  const instruments = instrumentsRes.data;
  const holdings = holdingsRes.data;
  const loans = loansRes.data;

  return (
    <AdminShell
      title="Finance"
      subtitle="Capital markets — instruments, holdings, and loan book"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${instruments.length} instruments` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Finance"
          stats={[
            { label: 'Instruments', value: live ? instruments.length.toLocaleString() : '—' },
            { label: 'Holdings', value: holdingsRes.source === 'live' ? holdings.length.toLocaleString() : '—' },
            { label: 'Loans', value: loansRes.source === 'live' ? loans.length.toLocaleString() : '—' },
            { label: 'Org', value: orgId, hint: 'Demo tenant' },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Register instruments, holdings, and loans" columns={3}>
            <form action={createFinanceInstrumentAction}>
              <VerticalFormCard title="New instrument">
                <VerticalFormField label="Type">
                  <VerticalSelect name="type" defaultValue="BOND">
                    <option value="BOND">BOND</option>
                    <option value="FUND">FUND</option>
                    <option value="RWA">RWA</option>
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Name">
                  <VerticalInput name="name" required placeholder="Acme Bond 2028" />
                </VerticalFormField>
                <VerticalFormField label="Issuer ref">
                  <VerticalInput name="issuer_ref" required placeholder="issuer_acme" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" maxLength={8} />
                </VerticalFormField>
                <VerticalSubmitButton label="Register instrument" />
              </VerticalFormCard>
            </form>

            <form action={upsertFinanceHoldingAction}>
              <VerticalFormCard title="Upsert holding">
                <VerticalFormField label="Account ref">
                  <VerticalInput name="account_ref" required placeholder="treasury_main" />
                </VerticalFormField>
                <VerticalFormField label="Instrument">
                  <VerticalSelect name="instrument_id" required defaultValue="">
                    <option value="" disabled>
                      Select instrument
                    </option>
                    {instruments.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Units (minor)">
                  <VerticalInput name="units_minor" required placeholder="100000" />
                </VerticalFormField>
                <VerticalSubmitButton label="Save holding" />
              </VerticalFormCard>
            </form>

            <form action={originateFinanceLoanAction}>
              <VerticalFormCard title="Originate loan">
                <VerticalFormField label="Borrower ref">
                  <VerticalInput name="borrower_ref" required />
                </VerticalFormField>
                <VerticalFormField label="Principal (minor)">
                  <VerticalInput name="principal_minor" required placeholder="1000000" />
                </VerticalFormField>
                <VerticalFormField label="Rate (bps)">
                  <VerticalInput name="rate_bps" type="number" min={0} defaultValue={500} />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" />
                </VerticalFormField>
                <VerticalSubmitButton label="Originate loan" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Registered instruments"
            description="Bonds, funds, and tokenized RWAs"
            source={instrumentsRes.source}
            rowCount={instruments.length}
            offlineDescription="Start with pnpm --filter @salychain/service-finance dev (port 4023)."
            emptyDescription="POST /v1/finance/instruments to register the first instrument."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Name</VerticalTableHeadCell>
                <VerticalTableHeadCell>Type</VerticalTableHeadCell>
                <VerticalTableHeadCell>Currency</VerticalTableHeadCell>
                <VerticalTableHeadCell>Issuer ref</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {instruments.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>{row.name}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant="neutral">{row.type}</SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell mono>{row.currency}</VerticalTableCell>
                    <VerticalTableCell mono>{row.issuerRef}</VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Holdings"
            description="Custodial positions by account"
            source={holdingsRes.source}
            rowCount={holdings.length}
            offlineDescription="Holdings unavailable while finance service is offline."
            emptyDescription="No holdings recorded for this organization."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Account</VerticalTableHeadCell>
                <VerticalTableHeadCell>Instrument</VerticalTableHeadCell>
                <VerticalTableHeadCell>Units (minor)</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {holdings.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell mono>{row.accountRef}</VerticalTableCell>
                    <VerticalTableCell>{row.instrument?.name ?? row.instrumentId}</VerticalTableCell>
                    <VerticalTableCell mono>{row.unitsMinor}</VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Loan book"
            description="Originated loans and repayment status"
            source={loansRes.source}
            rowCount={loans.length}
            offlineDescription="Loans unavailable while finance service is offline."
            emptyDescription="No loans originated for this organization."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Borrower</VerticalTableHeadCell>
                <VerticalTableHeadCell>Principal</VerticalTableHeadCell>
                <VerticalTableHeadCell>Rate (bps)</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {loans.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell mono>{row.borrowerRef}</VerticalTableCell>
                    <VerticalTableCell>{formatMinorAmount(row.principalMinor, row.currency)}</VerticalTableCell>
                    <VerticalTableCell mono>{row.rateBps}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)} dot>
                        {row.status}
                      </SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
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

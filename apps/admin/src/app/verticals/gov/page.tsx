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
import { createGovProgramAction, registerGovBeneficiaryAction } from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchGovDisbursements,
  fetchGovPrograms,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GovVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [programsRes, disbursementsRes] = await Promise.all([
    fetchGovPrograms(orgId),
    fetchGovDisbursements(orgId),
  ]);

  const programs = programsRes.data;
  const disbursements = disbursementsRes.data;
  const live = programsRes.source === 'live';
  const totalBudget = programs.reduce((sum, p) => sum + Number(p.budgetMinor), 0);

  return (
    <AdminShell
      title="Governance"
      subtitle="Public-sector programs and disbursement transparency"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${programs.length} programs` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Government"
          stats={[
            { label: 'Programs', value: live ? programs.length.toLocaleString() : '—' },
            {
              label: 'Disbursements',
              value: disbursementsRes.source === 'live' ? disbursements.length.toLocaleString() : '—',
            },
            {
              label: 'Budget enrolled',
              value: live ? formatMinorAmount(String(totalBudget), programs[0]?.currency ?? 'USD') : '—',
              hint: 'Minor units',
            },
            { label: 'Org', value: orgId },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Enroll programs and register beneficiaries">
            <form action={createGovProgramAction}>
              <VerticalFormCard title="New program">
                <VerticalFormField label="Name">
                  <VerticalInput name="name" required placeholder="Small Business Relief" />
                </VerticalFormField>
                <VerticalFormField label="Budget (minor)">
                  <VerticalInput name="budget_minor" required placeholder="500000000" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" />
                </VerticalFormField>
                <VerticalSubmitButton label="Create program" />
              </VerticalFormCard>
            </form>

            <form action={registerGovBeneficiaryAction}>
              <VerticalFormCard title="Register beneficiary">
                <VerticalFormField label="Program">
                  <VerticalSelect name="program_id" required defaultValue="">
                    <option value="" disabled>
                      Select program
                    </option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="External ref">
                  <VerticalInput name="external_ref" required placeholder="beneficiary_003" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register beneficiary" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Social programs"
            description="Budget-enrolled government benefit programs"
            source={programsRes.source}
            rowCount={programs.length}
            offlineDescription="Start with pnpm --filter @salychain/service-gov dev (port 4024)."
            emptyDescription="POST /v1/gov/programs to enroll the first program."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Program</VerticalTableHeadCell>
                <VerticalTableHeadCell>Budget</VerticalTableHeadCell>
                <VerticalTableHeadCell>Disbursements</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {programs.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>
                      <p className="font-medium text-saly-text-primary">{row.name}</p>
                      <p className="font-mono text-[10px] text-saly-text-faint">{row.id}</p>
                    </VerticalTableCell>
                    <VerticalTableCell>{formatMinorAmount(row.budgetMinor, row.currency)}</VerticalTableCell>
                    <VerticalTableCell>{row.disbursementCount}</VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Recent disbursements"
            description="Beneficiary payout batches and settlement status"
            source={disbursementsRes.source}
            rowCount={disbursements.length}
            offlineDescription="Disbursements unavailable while gov service is offline."
            emptyDescription="Batch via POST /v1/gov/disbursements/batch."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Program</VerticalTableHeadCell>
                <VerticalTableHeadCell>Beneficiary</VerticalTableHeadCell>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {disbursements.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>{row.programName}</VerticalTableCell>
                    <VerticalTableCell mono>{row.beneficiaryId}</VerticalTableCell>
                    <VerticalTableCell>{formatMinorAmount(row.amountMinor, row.currency)}</VerticalTableCell>
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

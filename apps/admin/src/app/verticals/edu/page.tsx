import { AdminShell } from '@/components/AdminShell';
import { DisburseScholarshipButton } from '@/components/verticals/DisburseScholarshipButton';
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
  createEduScholarshipAction,
  createEduTuitionInvoiceAction,
  issueEduCredentialAction,
  registerEduInstitutionAction,
} from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchEduCredentials,
  fetchEduInstitutions,
  fetchEduScholarships,
  fetchEduTuitionInvoices,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EduVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [institutionsRes, credentialsRes, invoicesRes, scholarshipsRes] = await Promise.all([
    fetchEduInstitutions(orgId),
    fetchEduCredentials(orgId),
    fetchEduTuitionInvoices(orgId),
    fetchEduScholarships(orgId),
  ]);

  const institutions = institutionsRes.data;
  const credentials = credentialsRes.data;
  const invoices = invoicesRes.data;
  const scholarships = scholarshipsRes.data;
  const live = institutionsRes.source === 'live';

  return (
    <AdminShell
      title="Education"
      subtitle="Institutions, verifiable credentials, tuition, and scholarships"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${institutions.length} institutions` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Education"
          stats={[
            { label: 'Institutions', value: live ? institutions.length.toLocaleString() : '—' },
            { label: 'Credentials', value: live ? credentials.length.toLocaleString() : '—' },
            { label: 'Invoices', value: live ? invoices.length.toLocaleString() : '—' },
            { label: 'Scholarships', value: live ? scholarships.length.toLocaleString() : '—' },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Register institutions and learner records">
            <form action={registerEduInstitutionAction}>
              <VerticalFormCard title="Register institution">
                <VerticalFormField label="Name">
                  <VerticalInput name="name" required placeholder="Saly Academy" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register institution" />
              </VerticalFormCard>
            </form>

            <form action={issueEduCredentialAction}>
              <VerticalFormCard title="Issue credential">
                <VerticalFormField label="Institution">
                  <VerticalSelect name="institution_id" required defaultValue="">
                    <option value="" disabled>
                      Select institution
                    </option>
                    {institutions.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Learner ref">
                  <VerticalInput name="learner_ref" required placeholder="learner_demo_001" />
                </VerticalFormField>
                <VerticalFormField label="Type">
                  <VerticalSelect name="type" defaultValue="CERTIFICATE">
                    <option value="DEGREE">DEGREE</option>
                    <option value="CERTIFICATE">CERTIFICATE</option>
                    <option value="BADGE">BADGE</option>
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Program">
                  <VerticalInput name="program" required placeholder="Blockchain Engineering" />
                </VerticalFormField>
                <VerticalSubmitButton label="Issue credential" />
              </VerticalFormCard>
            </form>

            <form action={createEduTuitionInvoiceAction}>
              <VerticalFormCard title="Tuition invoice">
                <VerticalFormField label="Learner ref">
                  <VerticalInput name="learner_ref" required placeholder="learner_demo_001" />
                </VerticalFormField>
                <VerticalFormField label="Amount (minor)">
                  <VerticalInput name="amount_minor" required placeholder="1200000" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" />
                </VerticalFormField>
                <VerticalFormField label="Due at (ISO)">
                  <VerticalInput name="due_at" required placeholder="2026-08-01T00:00:00.000Z" />
                </VerticalFormField>
                <VerticalSubmitButton label="Create invoice" />
              </VerticalFormCard>
            </form>

            <form action={createEduScholarshipAction}>
              <VerticalFormCard title="Scholarship grant">
                <VerticalFormField label="Learner ref">
                  <VerticalInput name="learner_ref" required placeholder="learner_demo_001" />
                </VerticalFormField>
                <VerticalFormField label="Amount (minor)">
                  <VerticalInput name="amount_minor" required placeholder="300000" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" />
                </VerticalFormField>
                <VerticalFormField label="Milestone">
                  <VerticalInput name="milestone" required placeholder="semester_1_complete" />
                </VerticalFormField>
                <VerticalSubmitButton label="Create scholarship" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Credentials"
            description="Verifiable learner credentials issued by institutions"
            source={institutionsRes.source}
            rowCount={credentials.length}
            offlineDescription="Start with pnpm --filter @salychain/service-edu dev (port 4029)."
            emptyDescription="No credentials issued yet."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Institution</VerticalTableHeadCell>
                <VerticalTableHeadCell>Type</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Issued</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {credentials.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>{row.institutionName}</VerticalTableCell>
                    <VerticalTableCell>{row.type}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant="neutral">{row.status}</SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.issuedAt)}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Scholarships"
            description="Milestone-based grants — disburse when milestone is met"
            source={institutionsRes.source}
            rowCount={scholarships.length}
            offlineDescription="Scholarships unavailable while edu service is offline."
            emptyDescription="No scholarship grants yet."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Milestone</VerticalTableHeadCell>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Action</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {scholarships.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>{row.milestone}</VerticalTableCell>
                    <VerticalTableCell>{formatMinorAmount(row.amountMinor, row.currency)}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)} dot>
                        {row.status}
                      </SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell>
                      {row.status !== 'DISBURSED' ? <DisburseScholarshipButton grantId={row.id} /> : '—'}
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

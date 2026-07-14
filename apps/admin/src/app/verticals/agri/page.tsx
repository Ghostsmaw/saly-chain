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
  agriInputLoanAction,
  registerAgriFarmAction,
  registerAgriFarmerAction,
  registerAgriLotAction,
} from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchAgriFarmers,
  fetchAgriFarms,
  fetchAgriLoans,
  fetchAgriLots,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AgriVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [farmersRes, farmsRes, lotsRes, loansRes] = await Promise.all([
    fetchAgriFarmers(orgId),
    fetchAgriFarms(orgId),
    fetchAgriLots(orgId),
    fetchAgriLoans(orgId),
  ]);

  const farmers = farmersRes.data;
  const farms = farmsRes.data;
  const lots = lotsRes.data;
  const loans = loansRes.data;
  const live = farmersRes.source === 'live';

  return (
    <AdminShell
      title="Agriculture"
      subtitle="Farmer registry, produce traceability, and input financing"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${farmers.length} farmers` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Agriculture"
          stats={[
            { label: 'Farmers', value: live ? farmers.length.toLocaleString() : '—' },
            { label: 'Farms', value: live ? farms.length.toLocaleString() : '—' },
            { label: 'Lots', value: live ? lots.length.toLocaleString() : '—' },
            { label: 'Input loans', value: live ? loans.length.toLocaleString() : '—' },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Register farmers, farms, lots, and input loans">
            <form action={registerAgriFarmerAction}>
              <VerticalFormCard title="Register farmer">
                <VerticalFormField label="External ref">
                  <VerticalInput name="external_ref" required placeholder="farmer_001" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register farmer" />
              </VerticalFormCard>
            </form>

            <form action={registerAgriFarmAction}>
              <VerticalFormCard title="Register farm">
                <VerticalFormField label="Farmer">
                  <VerticalSelect name="farmer_id" required defaultValue="">
                    <option value="" disabled>
                      Select farmer
                    </option>
                    {farmers.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.externalRef}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Crop">
                  <VerticalInput name="crop" placeholder="Maize" />
                </VerticalFormField>
                <VerticalFormField label="Season">
                  <VerticalInput name="season" placeholder="2026-A" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register farm" />
              </VerticalFormCard>
            </form>

            <form action={registerAgriLotAction}>
              <VerticalFormCard title="Register produce lot">
                <VerticalFormField label="Farm">
                  <VerticalSelect name="farm_id" required defaultValue="">
                    <option value="" disabled>
                      Select farm
                    </option>
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.crop ?? f.id.slice(0, 8)}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Lot code">
                  <VerticalInput name="lot_code" required placeholder="LOT-2026-001" />
                </VerticalFormField>
                <VerticalFormField label="Origin">
                  <VerticalInput name="origin" placeholder="Kano" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register lot" />
              </VerticalFormCard>
            </form>

            <form action={agriInputLoanAction}>
              <VerticalFormCard title="Originate input loan">
                <VerticalFormField label="Farmer">
                  <VerticalSelect name="farmer_id" required defaultValue="">
                    <option value="" disabled>
                      Select farmer
                    </option>
                    {farmers.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.externalRef}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Amount (minor)">
                  <VerticalInput name="amount_minor" required placeholder="500000" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="NGN" />
                </VerticalFormField>
                <VerticalSubmitButton label="Originate loan" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Farmers"
            description="Registered farmer identities and external references"
            source={farmersRes.source}
            rowCount={farmers.length}
            offlineDescription="Start with pnpm --filter @salychain/service-agri dev (port 4025)."
            emptyDescription="No farmers registered yet."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>External ref</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {farmers.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>
                      <p className="font-medium text-saly-text-primary">{row.externalRef}</p>
                      <p className="font-mono text-[10px] text-saly-text-faint">{row.id}</p>
                    </VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Input loans"
            description="Farmer input financing"
            source={farmersRes.source}
            rowCount={loans.length}
            offlineDescription="Loans unavailable while agri service is offline."
            emptyDescription="No input loans originated."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {loans.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>{formatMinorAmount(row.amountMinor, row.currency)}</VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)}>{row.status}</SalyBadge>
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

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
  createAviationSettlementAction,
  mintAviationPartAction,
  registerAviationAircraftAction,
} from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchAviationAircraft,
  fetchAviationParts,
  fetchAviationSettlements,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AviationVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [aircraftRes, partsRes, settlementsRes] = await Promise.all([
    fetchAviationAircraft(orgId),
    fetchAviationParts(orgId),
    fetchAviationSettlements(orgId),
  ]);

  const aircraft = aircraftRes.data;
  const parts = partsRes.data;
  const settlements = settlementsRes.data;
  const live = aircraftRes.source === 'live';

  return (
    <AdminShell
      title="Aviation"
      subtitle="Aircraft registry, part provenance, and MRO settlements"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${aircraft.length} aircraft` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Aviation"
          stats={[
            { label: 'Aircraft', value: live ? aircraft.length.toLocaleString() : '—' },
            { label: 'Parts', value: live ? parts.length.toLocaleString() : '—' },
            { label: 'Settlements', value: live ? settlements.length.toLocaleString() : '—' },
            { label: 'Org', value: orgId },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Register aircraft, mint parts, and settle trades" columns={3}>
            <form action={registerAviationAircraftAction}>
              <VerticalFormCard title="Register aircraft">
                <VerticalFormField label="Tail number">
                  <VerticalInput name="tail" required placeholder="N123SA" />
                </VerticalFormField>
                <VerticalFormField label="Model">
                  <VerticalInput name="model" required placeholder="B737-800" />
                </VerticalFormField>
                <VerticalFormField label="Owner ref">
                  <VerticalInput name="owner_ref" required placeholder="owner_demo_airline" />
                </VerticalFormField>
                <VerticalSubmitButton label="Register aircraft" />
              </VerticalFormCard>
            </form>

            <form action={mintAviationPartAction}>
              <VerticalFormCard title="Mint part">
                <VerticalFormField label="Serial">
                  <VerticalInput name="serial" required placeholder="PN-88421" />
                </VerticalFormField>
                <VerticalFormField label="Part type">
                  <VerticalInput name="part_type" required placeholder="APU" />
                </VerticalFormField>
                <VerticalFormField label="Aircraft (optional)">
                  <VerticalSelect name="aircraft_id" defaultValue="">
                    <option value="">Unlinked</option>
                    {aircraft.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.tail}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalSubmitButton label="Mint part" />
              </VerticalFormCard>
            </form>

            <form action={createAviationSettlementAction}>
              <VerticalFormCard title="Create settlement">
                <VerticalFormField label="Part">
                  <VerticalSelect name="part_id" required defaultValue="">
                    <option value="" disabled>
                      Select part
                    </option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.serial} ({p.partType})
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Buyer ref">
                  <VerticalInput name="buyer_ref" required placeholder="buyer_mro" />
                </VerticalFormField>
                <VerticalFormField label="Seller ref">
                  <VerticalInput name="seller_ref" required placeholder="seller_oem" />
                </VerticalFormField>
                <VerticalFormField label="Amount (minor)">
                  <VerticalInput name="amount_minor" required placeholder="45000000" />
                </VerticalFormField>
                <VerticalFormField label="Currency">
                  <VerticalInput name="currency" defaultValue="USD" />
                </VerticalFormField>
                <VerticalSubmitButton label="Create settlement" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Aircraft registry"
            description="Registered tail numbers and ownership"
            source={aircraftRes.source}
            rowCount={aircraft.length}
            offlineDescription="Start with pnpm --filter @salychain/service-aviation dev (port 4027)."
            emptyDescription="No aircraft registered yet."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Tail</VerticalTableHeadCell>
                <VerticalTableHeadCell>Model</VerticalTableHeadCell>
                <VerticalTableHeadCell>Owner</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {aircraft.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell className="font-medium text-saly-text-primary">{row.tail}</VerticalTableCell>
                    <VerticalTableCell>{row.model}</VerticalTableCell>
                    <VerticalTableCell mono>{row.ownerRef}</VerticalTableCell>
                    <VerticalTableCell className="text-[11px] text-saly-text-muted">
                      {formatDate(row.createdAt)}
                    </VerticalTableCell>
                  </VerticalTableRow>
                ))}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Settlements"
            description="Part trade settlements"
            source={aircraftRes.source}
            rowCount={settlements.length}
            offlineDescription="Settlements unavailable while aviation service is offline."
            emptyDescription="No settlements recorded."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Buyer / Seller</VerticalTableHeadCell>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {settlements.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell className="text-[11px]">
                      {row.buyerRef} / {row.sellerRef}
                    </VerticalTableCell>
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

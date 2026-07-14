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
import { createScmSettlementAction, createScmShipmentAction } from '@/app/verticals/actions';
import {
  ADMIN_VERTICAL_ORG_ID,
  fetchScmSettlements,
  fetchScmShipments,
  formatDate,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ScmVerticalPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [shipmentsRes, settlementsRes] = await Promise.all([
    fetchScmShipments(orgId),
    fetchScmSettlements(orgId),
  ]);

  const shipments = shipmentsRes.data;
  const settlements = settlementsRes.data;
  const live = shipmentsRes.source === 'live';

  return (
    <AdminShell
      title="Supply chain"
      subtitle="Shipment tracking and settlement"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${shipments.length} shipments` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="SCM"
          stats={[
            { label: 'Shipments', value: live ? shipments.length.toLocaleString() : '—' },
            {
              label: 'Settlements',
              value: settlementsRes.source === 'live' ? settlements.length.toLocaleString() : '—',
            },
            { label: 'Org', value: orgId },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Create shipments and link settlements">
            <form action={createScmShipmentAction}>
              <VerticalFormCard title="New shipment">
                <VerticalFormField label="Origin">
                  <VerticalInput name="origin" required placeholder="Lagos Port" />
                </VerticalFormField>
                <VerticalFormField label="Destination">
                  <VerticalInput name="destination" required placeholder="Abuja DC" />
                </VerticalFormField>
                <VerticalSubmitButton label="Create shipment" />
              </VerticalFormCard>
            </form>

            <form action={createScmSettlementAction}>
              <VerticalFormCard title="Create settlement">
                <VerticalFormField label="Shipment">
                  <VerticalSelect name="shipment_id" required defaultValue="">
                    <option value="" disabled>
                      Select shipment
                    </option>
                    {shipments.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.origin} → {s.destination}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Amount (minor)">
                  <VerticalInput name="amount_minor" required placeholder="2500000" />
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
            title="Shipments"
            description="Logistics routes and delivery status"
            source={shipmentsRes.source}
            rowCount={shipments.length}
            offlineDescription="Start with pnpm --filter @salychain/service-scm dev (port 4026)."
            emptyDescription="No shipments created yet."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Route</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {shipments.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>
                      {row.origin} → {row.destination}
                    </VerticalTableCell>
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

          <VerticalTableSection
            title="Settlements"
            description="Linked shipment payments"
            source={shipmentsRes.source}
            rowCount={settlements.length}
            offlineDescription="Settlements unavailable while SCM service is offline."
            emptyDescription="No settlements recorded."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Amount</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Created</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {settlements.map((row) => (
                  <VerticalTableRow key={row.id}>
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

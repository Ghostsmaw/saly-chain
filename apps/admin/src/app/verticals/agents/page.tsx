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
import { createAgentAction, publishAgentServiceAction } from '@/app/verticals/actions';
import {
  ADMIN_DEMO_OWNER_ID,
  ADMIN_VERTICAL_ORG_ID,
  fetchAgentMarketplace,
  fetchOrgAgents,
  formatMinorAmount,
} from '@/lib/verticals';
import { verticalStatusVariant } from '@/lib/saly-verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AgentsMarketplacePage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const orgId = ADMIN_VERTICAL_ORG_ID;
  const [marketplaceRes, agentsRes] = await Promise.all([
    fetchAgentMarketplace(50),
    fetchOrgAgents(orgId),
  ]);

  const listings = marketplaceRes.data;
  const agents = agentsRes.data;
  const live = marketplaceRes.source === 'live';
  const activeAgents = agents.filter((a) => a.status === 'ACTIVE').length;

  return (
    <AdminShell
      title="Marketplace"
      subtitle="Paid agent capabilities, org-registered agents, and marketplace listings"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${listings.length} listings` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <VerticalFlash ok={resolved?.ok} error={resolved?.error} />

        <VerticalHero
          live={live}
          title="Agents"
          stats={[
            { label: 'Marketplace listings', value: live ? listings.length.toLocaleString() : '—' },
            { label: 'Org agents', value: agentsRes.source === 'live' ? agents.length.toLocaleString() : '—' },
            { label: 'Active agents', value: agentsRes.source === 'live' ? activeAgents.toLocaleString() : '—' },
            { label: 'Org', value: orgId },
          ]}
        />

        <div className="mt-10">
          <VerticalFormSection title="Create records" description="Register agents and publish marketplace services">
            <form action={createAgentAction}>
              <VerticalFormCard
                title="New agent"
                hint="Requires wallet service (:4002) for custodial provisioning."
              >
                <VerticalFormField label="Name">
                  <VerticalInput name="name" required placeholder="Invoice Automation Agent" />
                </VerticalFormField>
                <VerticalFormField label="Owner ID">
                  <VerticalInput name="owner_id" defaultValue={ADMIN_DEMO_OWNER_ID} />
                </VerticalFormField>
                <VerticalSubmitButton label="Create agent" />
              </VerticalFormCard>
            </form>

            <form action={publishAgentServiceAction}>
              <VerticalFormCard title="Publish service">
                <VerticalFormField label="Agent">
                  <VerticalSelect name="agent_id" required defaultValue="">
                    <option value="" disabled>
                      Select agent
                    </option>
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </VerticalSelect>
                </VerticalFormField>
                <VerticalFormField label="Service name">
                  <VerticalInput name="name" required />
                </VerticalFormField>
                <VerticalFormField label="Description">
                  <VerticalInput name="description" />
                </VerticalFormField>
                <VerticalFormField label="Price (minor)">
                  <VerticalInput name="price_minor" required placeholder="2500" />
                </VerticalFormField>
                <VerticalFormField label="Tags (comma-separated)">
                  <VerticalInput name="tags" placeholder="finance,ocr" />
                </VerticalFormField>
                <input type="hidden" name="currency" value="USD" />
                <VerticalSubmitButton label="Publish to marketplace" />
              </VerticalFormCard>
            </form>
          </VerticalFormSection>
        </div>

        <div className="mt-10 space-y-10">
          <VerticalTableSection
            title="Marketplace discover"
            description="Public agent services available for subscription"
            source={marketplaceRes.source}
            rowCount={listings.length}
            offlineDescription="Start with pnpm --filter @salychain/service-agents dev (port 4011)."
            emptyDescription="Publish via POST /v1/agents/:id/services with list_on_marketplace=true."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Service</VerticalTableHeadCell>
                <VerticalTableHeadCell>Agent</VerticalTableHeadCell>
                <VerticalTableHeadCell>Price</VerticalTableHeadCell>
                <VerticalTableHeadCell>Tags</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {listings.map((row) => {
                  const tags = Array.isArray(row.tags) ? (row.tags as string[]) : [];
                  return (
                    <VerticalTableRow key={row.id}>
                      <VerticalTableCell>
                        <p className="font-medium text-saly-text-primary">{row.service.name}</p>
                        {row.service.description ? (
                          <p className="mt-0.5 text-xs text-saly-text-faint">{row.service.description}</p>
                        ) : null}
                      </VerticalTableCell>
                      <VerticalTableCell>
                        <p>{row.service.agent.name}</p>
                        <p className="font-mono text-[10px] text-saly-text-faint">{row.service.agent.id}</p>
                      </VerticalTableCell>
                      <VerticalTableCell>
                        {formatMinorAmount(row.service.priceMinor, row.service.currency)}
                      </VerticalTableCell>
                      <VerticalTableCell>
                        <div className="flex flex-wrap gap-1">
                          {tags.length === 0 ? (
                            <SalyBadge variant="neutral">—</SalyBadge>
                          ) : (
                            tags.map((tag) => (
                              <SalyBadge key={tag} variant="info">
                                {tag}
                              </SalyBadge>
                            ))
                          )}
                        </div>
                      </VerticalTableCell>
                    </VerticalTableRow>
                  );
                })}
              </VerticalTableBody>
            </VerticalTable>
          </VerticalTableSection>

          <VerticalTableSection
            title="Organization agents"
            description={`Agents registered under ${orgId}`}
            source={agentsRes.source}
            rowCount={agents.length}
            offlineDescription="Org agents unavailable while agents service is offline."
            emptyDescription="No agents registered for this organization."
          >
            <VerticalTable>
              <VerticalTableHeadRow>
                <VerticalTableHeadCell>Agent</VerticalTableHeadCell>
                <VerticalTableHeadCell>Status</VerticalTableHeadCell>
                <VerticalTableHeadCell>Owner</VerticalTableHeadCell>
              </VerticalTableHeadRow>
              <VerticalTableBody>
                {agents.map((row) => (
                  <VerticalTableRow key={row.id}>
                    <VerticalTableCell>
                      <p className="font-medium text-saly-text-primary">{row.name}</p>
                      <p className="font-mono text-[10px] text-saly-text-faint">{row.id}</p>
                    </VerticalTableCell>
                    <VerticalTableCell>
                      <SalyBadge variant={verticalStatusVariant(row.status)} dot>
                        {row.status}
                      </SalyBadge>
                    </VerticalTableCell>
                    <VerticalTableCell mono>{row.owner_id}</VerticalTableCell>
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

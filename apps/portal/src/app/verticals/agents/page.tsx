import { Card, CardHeader, Chip } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';
import { VerticalEmptyState } from '@/components/verticals/VerticalEmptyState';
import { VerticalFlash } from '@/components/verticals/VerticalFlash';
import { VerticalSubmitButton } from '@/components/verticals/VerticalSubmitButton';
import { verticalInputClass } from '@/components/verticals/form-styles';
import { createAgentAction, publishAgentServiceAction } from '@/app/verticals/actions';
import {
  fetchAgentMarketplace,
  fetchOrgAgents,
  formatMinorAmount,
} from '@/lib/verticals';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalAgentsPage({
  searchParams,
}: {
  searchParams?: Promise<{ ok?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const [marketplaceRes, agentsRes] = await Promise.all([
    fetchAgentMarketplace(50),
    fetchOrgAgents(),
  ]);

  const listings = marketplaceRes.data;
  const agents = agentsRes.data;

  return (
    <PortalShell title="Agent marketplace" subtitle="Discover agent services and manage your org's agents.">
      <VerticalFlash ok={resolved?.ok} error={resolved?.error} />
      <Card className="mb-6">
        <CardHeader title="Create" subtitle="Register agents and publish marketplace listings." />
        <div className="grid gap-4 p-4 pt-0 md:grid-cols-2">
          <form action={createAgentAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <input name="name" required placeholder="Agent name" className={verticalInputClass} />
            <VerticalSubmitButton label="Create agent" />
          </form>
          <form action={publishAgentServiceAction} className="flex flex-col gap-2 rounded-lg border border-surface-border p-3">
            <select name="agent_id" required className={verticalInputClass} defaultValue="">
              <option value="" disabled>Agent</option>
              {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <input name="name" required placeholder="Service name" className={verticalInputClass} />
            <input name="price_minor" required placeholder="Price minor" className={verticalInputClass} />
            <input name="tags" placeholder="tags (comma-separated)" className={verticalInputClass} />
            <input type="hidden" name="currency" value="USD" />
            <VerticalSubmitButton label="Publish service" />
          </form>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader
            title="Marketplace"
            subtitle={marketplaceRes.source === 'live' ? `${listings.length} services` : 'Agents service offline'}
          />
          {marketplaceRes.source !== 'live' ? (
            <VerticalEmptyState message="Start the agents service (pnpm --filter @salychain/service-agents dev)." />
          ) : listings.length === 0 ? (
            <VerticalEmptyState message="No marketplace listings published yet." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Agent</th>
                  <th className="pb-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3">
                      <p className="font-medium">{row.service.name}</p>
                      {row.service.description && (
                        <p className="text-xs text-text-tertiary">{row.service.description}</p>
                      )}
                    </td>
                    <td className="py-3">{row.service.agent.name}</td>
                    <td className="py-3">{formatMinorAmount(row.service.priceMinor, row.service.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <CardHeader title="Your agents" subtitle={`${agents.length} registered`} />
          {agentsRes.source !== 'live' ? (
            <VerticalEmptyState message="Org agents unavailable." />
          ) : agents.length === 0 ? (
            <VerticalEmptyState message="No agents registered for your organization." />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">ID</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="py-3 font-medium">{row.name}</td>
                    <td className="py-3"><Chip tone={row.status === 'ACTIVE' ? 'success' : 'neutral'}>{row.status}</Chip></td>
                    <td className="py-3 font-mono text-xs text-text-tertiary">{row.id}</td>
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

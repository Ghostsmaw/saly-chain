import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalySection,
  SalyStat,
} from '@/components/saly/ui';
import { fetchRecentIntents, type FetchResult } from '@/lib/api';
import { truncateId } from '@/lib/saly-format';

const AGENTS_URL = process.env.AGENTS_BASE_URL ?? 'http://localhost:4011';
const INTENT_URL = process.env.INTENT_BASE_URL ?? 'http://localhost:4008';

async function fetchAgents(): Promise<{ data: AgentSummary[]; source: 'live' | 'unavailable' }> {
  try {
    const res = await fetch(`${AGENTS_URL}/v1/agents?limit=10`, { cache: 'no-store' });
    if (!res.ok) return { data: [], source: 'unavailable' };
    const json = (await res.json()) as { data: AgentSummary[] };
    return { data: json.data ?? [], source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

async function fetchAgentIntents(limit = 20): Promise<FetchResult<IntentRow[]>> {
  try {
    const res = await fetch(`${INTENT_URL}/v1/intents?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) return { data: [], source: 'unavailable' };
    const json = (await res.json()) as { data: IntentRow[] };
    const agentIntents = (json.data ?? []).filter(
      (i) => i.kind === 'INVOICE' || i.kind === 'AGENT_PAY' || i.channel === 'AGENT',
    );
    return { data: agentIntents, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

interface AgentSummary {
  id: string;
  name: string;
  status: string;
  owner_id: string;
  wallet_ids: string[];
}

interface IntentRow {
  intent_id: string;
  kind: string;
  state: string;
  channel: string;
  actor_ref: string;
  created_at: string;
}

function intentStateVariant(state: string): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (state) {
    case 'ACCEPTED':
      return 'success';
    case 'REJECTED':
      return 'danger';
    default:
      return 'neutral';
  }
}

export default async function AiInsightsPage() {
  const [agents, agentIntents, allIntents] = await Promise.all([
    fetchAgents(),
    fetchAgentIntents(),
    fetchRecentIntents(50),
  ]);

  const funnel = buildFunnel(allIntents.data);
  const activeAgents = agents.data.filter((a) => a.status === 'ACTIVE').length;
  const live = agents.source === 'live' || allIntents.source === 'live';

  return (
    <AdminShell
      title="Intelligence"
      subtitle="Saly AI activity, agent wallets, and spending policy signals"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? `${activeAgents} active agents` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
          <div className="p-6">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <SalyBadge variant="accent">
                <Sparkles className="mr-1 inline h-3 w-3" />
                AI ops
              </SalyBadge>
              <SalyBadge variant={agents.source === 'live' ? 'success' : 'warning'} dot>
                Agents {agents.source === 'live' ? 'live' : 'offline'}
              </SalyBadge>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <SalyStat
                label="Active agents"
                value={agents.source === 'live' ? activeAgents.toLocaleString() : '—'}
                mono={false}
              />
              <SalyStat
                label="Agent intents"
                value={agentIntents.source === 'live' ? agentIntents.data.length.toLocaleString() : '—'}
                hint="INVOICE / AGENT_PAY"
                mono={false}
              />
              <SalyStat
                label="Settled (all intents)"
                value={allIntents.source === 'live' ? funnel.settled.toLocaleString() : '—'}
                mono={false}
              />
            </div>
          </div>
        </SalyCard>

        <div className="mt-10">
          <SalySection title="Intent funnel" description="received → accepted → settled">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(['received', 'accepted', 'rejected', 'settled'] as const).map((stage) => (
                <SalyCard key={stage} className="text-center">
                  <p className="font-mono text-2xl font-medium text-saly-text-primary">{funnel[stage]}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-saly-text-faint">{stage}</p>
                </SalyCard>
              ))}
            </div>
          </SalySection>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalySection title="Agent wallets" description="Registered agents and custodial wallet count">
            <SalyCard padding={false} className="overflow-hidden">
              {agents.data.length === 0 ? (
                <div className="p-6">
                  <SalyEmptyState title="No agents registered" description="Create agents via the marketplace module." />
                </div>
              ) : (
                <ul className="divide-y divide-saly-border">
                  {agents.data.map((a) => (
                    <li key={a.id} className="flex items-center justify-between px-4 py-3 hover:bg-saly-bg-hover">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-saly bg-white text-black">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-saly-text-primary">{a.name}</p>
                          <p className="font-mono text-[10px] text-saly-text-faint">{truncateId(a.id)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <SalyBadge variant={a.status === 'ACTIVE' ? 'success' : 'warning'} dot>
                          {a.status}
                        </SalyBadge>
                        <p className="mt-1 text-xs text-saly-text-faint">{a.wallet_ids.length} wallet(s)</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </SalyCard>
          </SalySection>

          <SalySection title="Recent agent intents" description="Latest INVOICE and AGENT_PAY activity">
            <SalyCard padding={false} className="overflow-hidden">
              {agentIntents.data.length === 0 ? (
                <div className="p-6">
                  <SalyEmptyState
                    title="No agent intents yet"
                    description="INVOICE / AGENT_PAY intents appear here once submitted."
                  />
                </div>
              ) : (
                <ul className="divide-y divide-saly-border">
                  {agentIntents.data.slice(0, 8).map((i) => (
                    <li key={i.intent_id} className="flex items-center justify-between px-4 py-3 hover:bg-saly-bg-hover">
                      <div>
                        <p className="font-medium text-saly-text-primary">{i.kind}</p>
                        <p className="font-mono text-[10px] text-saly-text-faint">{truncateId(i.intent_id)}</p>
                      </div>
                      <SalyBadge variant={intentStateVariant(i.state)}>{i.state}</SalyBadge>
                    </li>
                  ))}
                </ul>
              )}
              {agentIntents.data.length > 0 ? (
                <div className="border-t border-saly-border px-4 py-2 text-right">
                  <Link href="/intents" className="text-xs text-saly-text-muted hover:text-saly-text-primary">
                    View all intents →
                  </Link>
                </div>
              ) : null}
            </SalyCard>
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

function buildFunnel(intents: { state: string }[]) {
  return {
    received: intents.length,
    accepted: intents.filter((i) => i.state === 'ACCEPTED').length,
    rejected: intents.filter((i) => i.state === 'REJECTED').length,
    settled: intents.filter((i) => i.state === 'ACCEPTED').length,
  };
}

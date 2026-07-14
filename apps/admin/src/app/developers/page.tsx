import Link from 'next/link';
import { BookOpen, Code2, KeyRound, Rocket, Terminal, Webhook } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyButton,
  SalyCard,
  SalyCodeBlock,
  SalyEmptyState,
  SalyMetricStrip,
  SalySection,
} from '@/components/saly/ui';
import { fetchPlatformUsers } from '@/lib/api';
import { formatDate, truncateId } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const QUICK_START = `# Install SDK
pnpm add @salychain/sdk

# Initialize client
import { SalyClient } from '@salychain/sdk';
const saly = new SalyClient({ apiKey: process.env.SALY_API_KEY });

# Create a payout intent
await saly.intents.create({ ... });`;

const RPC_ENDPOINTS = `# L3 RPC
https://rpc.salychain.io/l3

# Base settlement
https://mainnet.base.org

# Webhook verification
X-Saly-Signature: sha256=...`;

export default async function DevelopersPage() {
  const { data, source } = await fetchPlatformUsers({ role: 'DEVELOPER', limit: 200 });
  const developers = data.data;
  const active = developers.filter((d) => d.status === 'ACTIVE').length;

  return (
    <AdminShell
      title="Developers"
      subtitle="API keys, RPC endpoints, SDKs, and portal accounts"
      topRight={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${active} active` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyMetricStrip
          items={[
            { label: 'Developer accounts', value: source === 'live' ? data.total.toLocaleString() : '—' },
            { label: 'Active', value: source === 'live' ? active.toLocaleString() : '—' },
            { label: 'API version', value: 'v1' },
            { label: 'SDK', value: '@salychain/sdk' },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DevResource
            icon={<KeyRound className="h-4 w-4" />}
            title="API Keys"
            description="Manage portal keys and rotation policy"
            action="View keys"
            href="/settings"
          />
          <DevResource
            icon={<Terminal className="h-4 w-4" />}
            title="RPC URLs"
            description="L3, Base, and settlement endpoints"
            action="Copy endpoints"
            href="#rpc"
          />
          <DevResource
            icon={<Rocket className="h-4 w-4" />}
            title="Deploy contract"
            description="Verified deployment pipeline"
            action="Open registry"
            href="/contracts"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <SalySection title="Quick start" description="Ship your first integration in minutes">
            <SalyCard>
              <SalyCodeBlock>{QUICK_START}</SalyCodeBlock>
              <div className="mt-4 flex gap-2">
                <SalyButton variant="primary" size="sm">
                  <BookOpen className="h-3.5 w-3.5" />
                  Documentation
                </SalyButton>
                <SalyButton variant="secondary" size="sm">
                  <Code2 className="h-3.5 w-3.5" />
                  SDK reference
                </SalyButton>
              </div>
            </SalyCard>
          </SalySection>

          <SalySection title="RPC & webhooks" description="Infrastructure endpoints">
            <SalyCard>
              <SalyCodeBlock>{RPC_ENDPOINTS}</SalyCodeBlock>
              <div className="mt-4 flex items-center gap-2 text-xs text-saly-text-muted">
                <Webhook className="h-3.5 w-3.5" />
                Webhook logs available in execution service audit trail
              </div>
            </SalyCard>
          </SalySection>
        </div>

        <div className="mt-10">
          <SalySection title="Developer directory" description="Portal accounts with KYC and API access">
            <SalyCard padding={false} className="overflow-hidden">
              {source !== 'live' ? (
                <div className="p-6">
                  <SalyEmptyState
                    title="Identity service offline"
                    description="Start the local stack (pnpm dev) to load developer accounts."
                  />
                </div>
              ) : developers.length === 0 ? (
                <div className="p-6">
                  <SalyEmptyState title="No developers yet" description="Accounts appear after portal signup." />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                        <th className="px-4 py-2.5 font-medium">Developer</th>
                        <th className="px-4 py-2.5 font-medium">Account ID</th>
                        <th className="px-4 py-2.5 font-medium">Status</th>
                        <th className="px-4 py-2.5 font-medium">Joined</th>
                        <th className="px-4 py-2.5 font-medium" />
                      </tr>
                    </thead>
                    <tbody>
                      {developers.map((d) => (
                        <tr key={d.id} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                          <td className="px-4 py-3">
                            <Link href={`/users/${d.id}`} className="font-medium text-saly-text-primary hover:text-violet-300">
                              {d.display_name || d.email}
                            </Link>
                            <p className="text-xs text-saly-text-faint">{d.email}</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-[11px] text-saly-text-muted">{truncateId(d.id)}</td>
                          <td className="px-4 py-3">
                            <SalyBadge variant={d.status === 'ACTIVE' ? 'success' : 'danger'}>{d.status}</SalyBadge>
                          </td>
                          <td className="px-4 py-3 text-[11px] text-saly-text-muted">{formatDate(d.created_at)}</td>
                          <td className="px-4 py-3 text-right">
                            <Link href={`/users/${d.id}`} className="text-xs text-saly-text-muted hover:text-saly-text-primary">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SalyCard>
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

function DevResource({
  icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <SalyCard hover>
      <div className="mb-3 text-saly-text-faint">{icon}</div>
      <p className="text-sm font-medium text-saly-text-primary">{title}</p>
      <p className="mt-1 text-xs text-saly-text-muted">{description}</p>
      <Link href={href} className="mt-4 inline-block text-xs text-saly-text-secondary hover:text-saly-text-primary">
        {action} →
      </Link>
    </SalyCard>
  );
}

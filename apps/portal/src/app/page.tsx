import { ArrowRight, Brain, Key, Webhook } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import Link from 'next/link';
import { PortalShell } from '@/components/PortalShell';
import { listApiKeys, listIntents, listSubscriptions, listTransactions } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalDashboard() {
  const [keys, subs, intents, txs] = await Promise.all([
    listApiKeys(),
    listSubscriptions(),
    listIntents(5),
    listTransactions(5),
  ]);

  return (
    <PortalShell title="Welcome to SalyChain" subtitle="Build payments in minutes, not quarters.">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard
          label="API Keys"
          value={keys.source === 'live' ? `${keys.data.filter((k) => k.status === 'ACTIVE').length}` : '—'}
          subtitle={keys.source === 'live' ? `${keys.data.length} total` : 'Service unavailable'}
          href="/api-keys"
          icon={<Key className="h-4 w-4" />}
        />
        <KpiCard
          label="Webhook Subscriptions"
          value={subs.source === 'live' ? `${subs.data.filter((s) => s.status === 'ACTIVE').length}` : '—'}
          subtitle={subs.source === 'live' ? `${subs.data.length} total` : 'Service unavailable'}
          href="/webhooks"
          icon={<Webhook className="h-4 w-4" />}
        />
        <KpiCard
          label="Intents (last 5)"
          value={intents.source === 'live' ? `${intents.data.length}` : '—'}
          subtitle={intents.source === 'live' ? 'Recent activity' : 'Service unavailable'}
          href="/intents"
          icon={<Brain className="h-4 w-4" />}
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Quickstart" subtitle="Get from zero to a settled payment in five minutes" />
          <ol className="flex flex-col gap-3 text-sm text-text-secondary">
            <Step n={1} href="/api-keys">
              Create a test API key (<code>sk_test_…</code>) with scopes <code>intents:write transactions:read webhooks:write</code>.
            </Step>
            <Step n={2} href="/webhooks">
              Register a webhook so we can notify your backend when transactions settle.
            </Step>
            <Step n={3} href="/docs">
              Install the SDK and submit your first intent.
            </Step>
          </ol>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-surface-border bg-surface-cardHover/60 p-4 text-xs text-text-secondary">
{`pnpm add @salychain/sdk

import SalyChain from '@salychain/sdk';
const saly = new SalyChain({ apiKey: process.env.SALY_API_KEY! });
await saly.intents.submit(myIntent, { idempotencyKey: 'demo-1' });`}
          </pre>
        </Card>

        <Card>
          <CardHeader title="Latest transactions" right={<Link className="text-xs text-brand-300 hover:text-brand-200" href="/transactions">View all</Link>} />
          {txs.source === 'unavailable' ? (
            <EmptyState message="Execution service unreachable. Start the local stack with pnpm dev." />
          ) : txs.data.length === 0 ? (
            <EmptyState message="No transactions yet. Submit an intent to see your first one here." />
          ) : (
            <ul className="flex flex-col">
              {txs.data.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 border-b border-surface-divider py-3 last:border-b-0">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-text-primary">{t.id}</p>
                    <p className="text-[11px] text-text-tertiary">{t.kind.replace('_', ' ').toLowerCase()}</p>
                  </div>
                  <Chip tone={chipToneForState(t.state)}>{t.state}</Chip>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </PortalShell>
  );
}

function KpiCard({
  label,
  value,
  subtitle,
  href,
  icon,
}: {
  label: string;
  value: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:border-brand-500/40">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-text-tertiary">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-text-primary">{value}</p>
            <p className="mt-1 text-xs text-text-tertiary">{subtitle}</p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/15 text-brand-200">
            {icon}
          </div>
        </div>
        <p className="mt-4 inline-flex items-center gap-1 text-xs text-brand-300">
          Manage <ArrowRight className="h-3 w-3" />
        </p>
      </Card>
    </Link>
  );
}

function Step({ n, href, children }: { n: number; href: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-200">
        {n}
      </span>
      <span className="flex-1">
        {children}
        <Link href={href} className="ml-2 text-xs text-brand-300 hover:text-brand-200">→ open</Link>
      </span>
    </li>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-8 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}

function chipToneForState(state: string): 'success' | 'warning' | 'danger' | 'info' {
  if (state === 'SETTLED') return 'success';
  if (state === 'FAILED' || state === 'REJECTED' || state === 'REVERSED') return 'danger';
  if (state === 'EXECUTING' || state === 'AWAITING_CONFIRMATION') return 'warning';
  return 'info';
}

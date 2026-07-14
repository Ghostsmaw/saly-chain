import { Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  KeyRound,
  Lock,
  Radio,
  ShieldCheck,
} from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { AdminChainRailPanel } from '@/components/AdminChainRailPanel';
import { SalyAreaChart } from '@/components/saly/charts/SalyAreaChart';
import { SalyFadeIn, SalyStagger, SalyStaggerItem } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalySection,
  SalySkeleton,
  SalyStat,
} from '@/components/saly/ui';
import { fetchBroadcastJobs, fetchSignerHealth, fetchWalletStats, fetchWallets } from '@/lib/api';
import { broadcastStatusVariant } from '@/lib/saly-tx';
import { formatDateTime, truncateAddress } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function WalletsPage() {
  return (
    <AdminShell
      title="Wallets"
      subtitle="Custody portfolio, signing policy, and broadcast queue"
    >
      <SalyFadeIn>
        <Suspense fallback={<StripSkeleton />}>
          <CustodyHero />
        </Suspense>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Suspense fallback={<ChartSkeleton />}>
              <AllocationPanel />
            </Suspense>
          </div>
          <div className="xl:col-span-4">
            <Suspense fallback={<PanelSkeleton />}>
              <SigningPosture />
            </Suspense>
          </div>
        </div>

        <div className="mt-10">
          <Suspense fallback={<PanelSkeleton />}>
            <ChainRailSection />
          </Suspense>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<PanelSkeleton />}>
            <WalletInventory />
          </Suspense>
          <Suspense fallback={<PanelSkeleton />}>
            <BroadcastQueue />
          </Suspense>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function CustodyHero() {
  const [{ data: signer, source }, { data: stats, source: walletSource }] = await Promise.all([
    fetchSignerHealth(),
    fetchWalletStats(),
  ]);

  const prodReady = signer.kms_provider === 'aws' && signer.kms_available;

  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <SalyBadge variant={signer.ok && source === 'live' ? 'success' : 'warning'} dot>
            {signer.ok && source === 'live' ? 'Custody operational' : 'Signer degraded'}
          </SalyBadge>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-saly-text-primary">
              {walletSource === 'live' ? stats.total.toLocaleString() : '—'}
            </p>
            <p className="mt-1 text-sm text-saly-text-muted">Custodial wallets under KMS isolation</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SalyBadge variant={prodReady ? 'success' : 'warning'}>{prodReady ? 'Production KMS' : 'Dev KMS'}</SalyBadge>
          <SalyBadge variant="neutral">{signer.kms_provider}</SalyBadge>
          {stats.pending_broadcasts > 0 ? (
            <SalyBadge variant="warning">{stats.pending_broadcasts} pending broadcasts</SalyBadge>
          ) : (
            <SalyBadge variant="success">Queue idle</SalyBadge>
          )}
        </div>
      </div>
    </SalyCard>
  );
}

async function AllocationPanel() {
  const { data: stats, source } = await fetchWalletStats();
  const entries = Object.entries(stats.by_chain).map(([label, value]) => ({ label, value }));

  return (
    <SalySection
      title="Asset allocation"
      description="Wallet distribution by chain rail"
      action={
        <Link href="/liquidity" className="inline-flex items-center gap-1 text-xs text-saly-text-muted hover:text-saly-text-primary">
          Liquidity <ArrowUpRight className="h-3 w-3" />
        </Link>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        <div className="border-b border-saly-border px-5 py-4">
          <p className="font-mono text-2xl font-medium text-saly-text-primary">
            {source === 'live' ? stats.total.toLocaleString() : '—'}
          </p>
          <p className="text-xs text-saly-text-muted">Total provisioned wallets</p>
        </div>
        <div className="p-4">
          {source === 'live' && entries.length > 0 ? (
            <SalyAreaChart data={entries} height={220} color="#a1a1aa" />
          ) : (
            <SalyEmptyState title="No allocation data" description="Provision wallets to see chain distribution." />
          )}
        </div>
      </SalyCard>
    </SalySection>
  );
}

async function SigningPosture() {
  const { data: signer, source } = await fetchSignerHealth();

  return (
    <SalySection title="Signing posture" description="KMS boundary and policy gates">
      <SalyCard>
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-4 w-4 text-saly-text-faint" />
            <SalyStat label="KMS provider" value={signer.kms_provider} hint={signer.wrapping_key_ref} />
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-saly-text-faint" />
            <SalyStat
              label="Availability"
              value={signer.kms_available ? 'Available' : 'Unavailable'}
              hint={source === 'live' ? (signer.ok ? 'Healthy' : 'Degraded') : 'Offline'}
            />
          </div>
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-4 w-4 text-saly-text-faint" />
            <SalyStat label="Model" value="Wallet → Signer → KMS" hint="Keys never leave signer boundary" />
          </div>
        </div>
        <div className="mt-6 rounded-saly border border-saly-border bg-saly-bg-secondary p-3">
          <p className="text-xs font-medium text-saly-text-primary">Policy enforcement</p>
          <ul className="mt-2 space-y-1.5 text-xs text-saly-text-muted">
            <li>Destination allowlist per wallet</li>
            <li>Per-tx and rolling 24h caps</li>
            <li>Multi-approver threshold for high-value spends</li>
          </ul>
        </div>
      </SalyCard>
    </SalySection>
  );
}

async function ChainRailSection() {
  const { data: stats, source } = await fetchWalletStats();
  if (source === 'unavailable') return null;
  return <AdminChainRailPanel byChain={stats.by_chain} />;
}

async function WalletInventory() {
  const [{ data: wallets, source }, { data: stats }] = await Promise.all([
    fetchWallets(50),
    fetchWalletStats(),
  ]);

  return (
    <SalySection
      title="Wallet inventory"
      description="Custodial addresses linked to ledger accounts"
      action={<SalyBadge variant="neutral">{stats.total} total</SalyBadge>}
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source === 'unavailable' ? (
          <div className="p-5">
            <SalyEmptyState title="Wallet service offline" description="Boot services/wallet on port 4002." />
          </div>
        ) : wallets.length === 0 ? (
          <div className="p-5">
            <SalyEmptyState title="No wallets" description="Provision custodial wallets via the wallet API." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                  <th className="px-4 py-2.5 font-medium">Chain</th>
                  <th className="px-4 py-2.5 font-medium">Address</th>
                  <th className="px-4 py-2.5 font-medium">Kind</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Ledger</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((w) => (
                  <tr key={w.id} className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover">
                    <td className="px-4 py-3">
                      <SalyBadge variant="neutral">{w.chain}</SalyBadge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-saly-text-primary">{truncateAddress(w.address)}</td>
                    <td className="px-4 py-3 text-xs text-saly-text-muted">{w.kind.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3">
                      <SalyBadge
                        variant={w.status === 'ACTIVE' ? 'success' : w.status === 'FROZEN' ? 'danger' : 'warning'}
                      >
                        {w.status}
                      </SalyBadge>
                    </td>
                    <td className="px-4 py-3">
                      <SalyBadge variant={w.ledger_account_id ? 'success' : 'warning'}>
                        {w.ledger_account_id ? 'Linked' : 'Pending'}
                      </SalyBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SalyCard>
    </SalySection>
  );
}

async function BroadcastQueue() {
  const [{ data: jobs, source }, { data: stats }] = await Promise.all([
    fetchBroadcastJobs(30),
    fetchWalletStats(),
  ]);

  return (
    <SalySection
      title="Broadcast queue"
      description="Async sign-and-broadcast jobs"
      action={
        stats.pending_broadcasts > 0 ? (
          <SalyBadge variant="warning">{stats.pending_broadcasts} in flight</SalyBadge>
        ) : (
          <SalyBadge variant="success">Idle</SalyBadge>
        )
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source === 'unavailable' ? (
          <div className="p-5">
            <SalyEmptyState title="Queue unavailable" description="Wallet service offline." />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center gap-3 p-5 text-sm text-saly-text-muted">
            <Radio className="h-4 w-4" />
            No broadcast jobs yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Chain</th>
                  <th className="px-4 py-2.5 font-medium">Amount</th>
                  <th className="px-4 py-2.5 font-medium">Destination</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover">
                    <td className="px-4 py-3">
                      <SalyBadge variant={broadcastStatusVariant(job.status)}>{job.status}</SalyBadge>
                    </td>
                    <td className="px-4 py-3 text-xs text-saly-text-muted">{job.chain ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-saly-text-primary">
                      {job.amount_minor && job.asset ? `${job.amount_minor} ${job.asset}` : '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-saly-text-muted">
                      {job.destination_address ? truncateAddress(job.destination_address) : '—'}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-saly-text-muted">{formatDateTime(job.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SalyCard>
    </SalySection>
  );
}

function StripSkeleton() {
  return <SalySkeleton className="h-32 w-full rounded-saly-lg" />;
}
function ChartSkeleton() {
  return <SalySkeleton className="h-72 w-full rounded-saly-lg" />;
}
function PanelSkeleton() {
  return <SalySkeleton className="h-64 w-full rounded-saly-lg" />;
}

import Link from 'next/link';
import { KeyRound, Users2, Wallet } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { BusinessesExplorer } from '@/components/saly/businesses/BusinessesExplorer';
import { BusinessesHero } from '@/components/saly/businesses/BusinessesHero';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalyEmptyState, SalySection } from '@/components/saly/ui';
import { fetchPlatformUsers, fetchWalletStats } from '@/lib/api';
import { computeBusinessStats } from '@/lib/saly-businesses';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BusinessesPage() {
  const [{ data: businessesRes, source }, walletRes] = await Promise.all([
    fetchPlatformUsers({ role: 'BUSINESS', limit: 200 }),
    fetchWalletStats(),
  ]);

  const businesses = businessesRes.data;
  const stats = computeBusinessStats(businesses);
  const developers = businessesRes.by_role['DEVELOPER'] ?? 0;
  const walletTotal = walletRes.source === 'live' ? walletRes.data.total : null;

  return (
    <AdminShell
      title="Organizations"
      subtitle="Business accounts with treasury and API access"
      topRight={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? `${stats.active} active` : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <BusinessesHero
          live={source === 'live'}
          total={businessesRes.total}
          active={stats.active}
          suspended={stats.suspended}
          custodialWallets={walletTotal}
          developerAccounts={developers}
          walletLive={walletRes.source === 'live'}
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <OrgResource
            icon={<Wallet className="h-4 w-4" />}
            title="Treasury & custody"
            description="Custodial wallets, signing policy, and broadcast queue"
            action="Open wallets"
            href="/wallets"
          />
          <OrgResource
            icon={<KeyRound className="h-4 w-4" />}
            title="API access"
            description="Portal keys, webhook secrets, and rotation policy"
            action="Manage keys"
            href="/settings"
          />
          <OrgResource
            icon={<Users2 className="h-4 w-4" />}
            title="Developer accounts"
            description="KYC-verified portal users with SDK and RPC access"
            action="View developers"
            href="/developers"
          />
        </div>

        <div className="mt-10">
          <SalySection
            title="Business directory"
            description="Organizations registered on the business surface — KYB, treasury, and spend controls"
            action={
              source === 'live' ? (
                <SalyBadge variant="neutral">{`${businesses.length} loaded`}</SalyBadge>
              ) : undefined
            }
          >
            {source !== 'live' ? (
              <SalyCard>
                <SalyEmptyState
                  title="Identity service unavailable"
                  description="Start the local stack (pnpm dev) to load real business accounts."
                />
              </SalyCard>
            ) : businesses.length === 0 ? (
              <SalyCard>
                <SalyEmptyState
                  title="No business accounts yet"
                  description="Organizations appear here once businesses sign up on the business app."
                />
              </SalyCard>
            ) : (
              <BusinessesExplorer businesses={businesses} />
            )}
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

function OrgResource({
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

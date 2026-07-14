import { Suspense } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { FxRateBoard } from '@/components/saly/liquidity/FxRateBoard';
import { LiquidityHero } from '@/components/saly/liquidity/LiquidityHero';
import { PspRailsPanel } from '@/components/saly/liquidity/PspRailsPanel';
import { QuotesExplorer } from '@/components/saly/liquidity/QuotesExplorer';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalySection, SalySkeleton } from '@/components/saly/ui';
import { fetchFxRates, fetchRecentQuotes } from '@/lib/api';
import { computeFxStats, computeQuoteStats } from '@/lib/saly-liquidity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function LiquidityPage() {
  return (
    <AdminShell
      title="Liquidity & FX"
      subtitle="Mid-market rates, treasury spreads, and HMAC-sealed conversion quotes"
    >
      <LiquidityPageContent />
    </AdminShell>
  );
}

function LiquidityPageContent() {
  return (
    <SalyFadeIn>
      <Suspense fallback={<HeroSkeleton />}>
        <LiquidityInsights />
      </Suspense>

      <div className="mt-10">
        <Suspense fallback={<PanelSkeleton />}>
          <FxBoardSection />
        </Suspense>
      </div>

      <div className="mt-10">
        <PspRailsPanel />
      </div>

      <div className="mt-10">
        <Suspense fallback={<TableSkeleton />}>
          <QuotesSection />
        </Suspense>
      </div>
    </SalyFadeIn>
  );
}

async function LiquidityInsights() {
  const [ratesRes, quotesRes] = await Promise.all([fetchFxRates(), fetchRecentQuotes(50)]);
  const live = ratesRes.source === 'live';
  const fxStats = computeFxStats(ratesRes.data.pairs);
  const quoteStats = computeQuoteStats(quotesRes.data);

  const providerMix = Object.entries(
    ratesRes.data.pairs.reduce<Record<string, number>>((acc, p) => {
      const key = p.provider ?? 'unknown';
      if (p.available) acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value }));

  return (
    <LiquidityHero
      live={live}
      provider={ratesRes.data.provider}
      pairsLive={fxStats.live}
      pairsTotal={fxStats.total}
      openQuotes={quoteStats.issued}
      consumedQuotes={quoteStats.consumed}
      providerMix={providerMix}
    />
  );
}

async function FxBoardSection() {
  const { data, source } = await fetchFxRates();

  return (
    <SalySection
      title="Rate board"
      description="Live mid-market pairs from composite providers"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? 'Connected' : 'Offline'}
        </SalyBadge>
      }
    >
      <FxRateBoard pairs={data.pairs} source={source} />
    </SalySection>
  );
}

async function QuotesSection() {
  const { data, source } = await fetchRecentQuotes(50);
  const stats = computeQuoteStats(data);

  return (
    <SalySection
      title="Signed quotes"
      description="HMAC-sealed FX conversions — execution must present signature at draw-down"
      action={
        source === 'live' ? (
          <div className="flex gap-2">
            {stats.issued > 0 ? <SalyBadge variant="warning">{stats.issued} open</SalyBadge> : null}
            <SalyBadge variant="neutral">{stats.consumed} consumed</SalyBadge>
          </div>
        ) : (
          <SalyBadge variant="warning" dot>
            Offline
          </SalyBadge>
        )
      }
    >
      <QuotesExplorer quotes={data} source={source} />
    </SalySection>
  );
}

function HeroSkeleton() {
  return <SalySkeleton className="h-48 w-full rounded-saly-lg" />;
}

function PanelSkeleton() {
  return <SalySkeleton className="h-72 w-full rounded-saly-lg" />;
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <SalySkeleton className="h-10 w-full max-w-md rounded-saly" />
      {Array.from({ length: 5 }).map((_, i) => (
        <SalySkeleton key={i} className="h-11 w-full rounded-saly" />
      ))}
    </div>
  );
}

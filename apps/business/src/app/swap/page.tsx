import { Suspense } from 'react';
import { BusinessShell } from '@/components/BusinessShell';
import { LiveBadge } from '@/components/LiveBadge';
import { SwapForm } from '@/components/SwapForm';
import { FxRatesPanel } from '@/components/FxRatesPanel';
import { fetchDexCatalog, fetchFxRates, fetchTreasurySummary } from '@/lib/api';
import { submitSwap, previewDexQuote, previewFxQuote, checkDexPool } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SwapPage() {
  const [treasury, fx, dexCatalog] = await Promise.all([
    fetchTreasurySummary(),
    fetchFxRates(),
    fetchDexCatalog().catch(() => null),
  ]);
  const orgName = treasury.org?.name ?? 'Your Business';

  return (
    <BusinessShell
      title="Swap"
      subtitle="Treasury FX or on-chain Uniswap V3 swaps on Base"
      orgName={orgName}
      topRight={<LiveBadge live={treasury.source === 'live' && fx.source === 'live'} />}
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Suspense fallback={<div className="text-sm text-text-muted">Loading wallets…</div>}>
          <SwapForm
            wallets={treasury.data.wallets}
            action={submitSwap}
            quoteAction={previewDexQuote}
            fxQuoteAction={previewFxQuote}
            poolAction={checkDexPool}
            dexCatalog={dexCatalog ?? undefined}
          />
        </Suspense>
        <FxRatesPanel rates={fx.data} live={fx.source === 'live'} />
      </div>
    </BusinessShell>
  );
}

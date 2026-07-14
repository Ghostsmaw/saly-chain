import type { LiquidityEnv } from '../config/env.js';
import { CachedRateProvider } from './cached-rate.provider.js';
import { CoinbaseRateProvider } from './coinbase-rate.provider.js';
import { CompositeRateProvider } from './composite-rate.provider.js';
import { FrankfurterRateProvider } from './frankfurter-rate.provider.js';
import type { RateProvider } from './rate.provider.js';
import { StubRateProvider } from './stub-rate.provider.js';

export function createRateProvider(env: LiquidityEnv): RateProvider {
  const cacheTtl = env.LIQUIDITY_RATE_CACHE_TTL_MS;
  const wrap = (p: RateProvider): RateProvider =>
    cacheTtl > 0 ? new CachedRateProvider(p, cacheTtl) : p;

  switch (env.LIQUIDITY_RATE_PROVIDER) {
    case 'stub':
      return wrap(new StubRateProvider());
    case 'coinbase':
      return wrap(new CoinbaseRateProvider({ baseUrl: env.COINBASE_API_URL }));
    case 'frankfurter':
      return wrap(new FrankfurterRateProvider({ baseUrl: env.FRANKFURTER_API_URL }));
    case 'composite': {
      const chain: RateProvider[] = [
        new CoinbaseRateProvider({ baseUrl: env.COINBASE_API_URL }),
        new FrankfurterRateProvider({ baseUrl: env.FRANKFURTER_API_URL }),
      ];
      if (env.LIQUIDITY_RATE_STUB_FALLBACK) {
        chain.push(new StubRateProvider());
      }
      return wrap(new CompositeRateProvider(chain));
    }
    default:
      throw new Error(`Unknown rate provider: ${env.LIQUIDITY_RATE_PROVIDER}`);
  }
}

/** True when the feed name indicates dev stub pricing — surface in UI/admin. */
export function isStubRateProvider(provider: string): boolean {
  return provider === 'stub' || provider.includes('stub');
}

/** Pairs surfaced on admin/business FX dashboards. */
export const FX_DASHBOARD_PAIRS: Array<[string, string]> = [
  ['USD', 'NGN'],
  ['USD', 'EUR'],
  ['USD', 'GBP'],
  ['USD', 'GHS'],
  ['USD', 'KES'],
  ['USDC', 'USD'],
];

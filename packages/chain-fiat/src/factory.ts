import type { FiatAdapter } from './adapter.js';
import type { FiatEnv } from './config.js';
import { CompositeFiatAdapter } from './composite.adapter.js';
import { FlutterwaveFiatAdapter } from './flutterwave.adapter.js';
import { PaystackFiatAdapter } from './paystack.adapter.js';
import { StubFiatAdapter } from './stub.adapter.js';

export function createFiatAdapter(env: FiatEnv): FiatAdapter {
  switch (env.FIAT_PSP_PROVIDER) {
    case 'stub':
      return new StubFiatAdapter({ settlementLatencyMs: env.FIAT_STUB_SETTLEMENT_MS });
    case 'flutterwave':
      return new FlutterwaveFiatAdapter(env.FLUTTERWAVE_SECRET_KEY!, env.FLUTTERWAVE_BASE_URL);
    case 'paystack':
      return new PaystackFiatAdapter(env.PAYSTACK_SECRET_KEY!, env.PAYSTACK_BASE_URL);
    case 'composite':
      return createCompositeAdapter(env);
    default:
      throw new Error(`Unknown FIAT_PSP_PROVIDER: ${env.FIAT_PSP_PROVIDER}`);
  }
}

function createCompositeAdapter(env: FiatEnv): FiatAdapter {
  const adapters: FiatAdapter[] = [];

  if (env.PAYSTACK_SECRET_KEY) {
    adapters.push(new PaystackFiatAdapter(env.PAYSTACK_SECRET_KEY, env.PAYSTACK_BASE_URL));
  }
  if (env.FLUTTERWAVE_SECRET_KEY) {
    adapters.push(new FlutterwaveFiatAdapter(env.FLUTTERWAVE_SECRET_KEY, env.FLUTTERWAVE_BASE_URL));
  }

  if (adapters.length === 0) {
    return new StubFiatAdapter({ settlementLatencyMs: env.FIAT_STUB_SETTLEMENT_MS });
  }

  if (adapters.length === 1) return adapters[0]!;
  return new CompositeFiatAdapter(adapters);
}

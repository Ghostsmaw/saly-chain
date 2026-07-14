import { ValidationError } from '@salychain/errors';
import type { FiatAdapter } from './adapter.js';
import type {
  FiatDestination,
  FiatPayinCustomer,
  FiatPayinInstruction,
  FiatPayinMethod,
  FiatTransfer,
} from './types.js';

/**
 * Routes payouts to the first adapter that supports the destination.
 * Typical wiring: Paystack for NGN, Flutterwave for pan-African + international.
 */
export class CompositeFiatAdapter implements FiatAdapter {
  readonly rail = 'ANY' as const;

  constructor(private readonly adapters: FiatAdapter[]) {
    if (adapters.length === 0)
      throw new Error('CompositeFiatAdapter requires at least one adapter');
  }

  supports(destination: FiatDestination): boolean {
    return this.adapters.some((a) => a.supports(destination));
  }

  private pick(destination: FiatDestination): FiatAdapter {
    const adapter = this.adapters.find((a) => a.supports(destination));
    if (!adapter) {
      throw ValidationError(
        'chain.fiat.unsupported_destination',
        `No PSP adapter supports ${destination.currency}/${destination.countryCode}`,
      );
    }
    return adapter;
  }

  async send(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    destination: FiatDestination;
  }): Promise<FiatTransfer> {
    return this.pick(input.destination).send(input);
  }

  async getStatus(pspId: string): Promise<FiatTransfer | null> {
    for (const adapter of this.adapters) {
      const t = await adapter.getStatus(pspId);
      if (t) return t;
    }
    return null;
  }

  async cancel(pspId: string): Promise<{ canceled: boolean }> {
    for (const adapter of this.adapters) {
      const t = await adapter.getStatus(pspId);
      if (t) return adapter.cancel(pspId);
    }
    return { canceled: false };
  }

  supportsPayin(input: { currency: string; countryCode: string }): boolean {
    return this.adapters.some((a) => a.supportsPayin(input));
  }

  async createPayin(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    customer: FiatPayinCustomer;
    method?: FiatPayinMethod;
  }): Promise<FiatPayinInstruction> {
    const adapter = this.adapters.find((a) =>
      a.supportsPayin({ currency: input.currency, countryCode: input.customer.countryCode }),
    );
    if (!adapter) {
      throw ValidationError(
        'chain.fiat.unsupported_payin',
        `No PSP adapter supports pay-in for ${input.currency}/${input.customer.countryCode}`,
      );
    }
    return adapter.createPayin(input);
  }

  async getPayinStatus(pspReference: string): Promise<FiatPayinInstruction | null> {
    for (const adapter of this.adapters) {
      const p = await adapter.getPayinStatus(pspReference);
      if (p) return p;
    }
    return null;
  }
}

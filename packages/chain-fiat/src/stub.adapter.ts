import { createHash } from 'node:crypto';
import { ulid } from 'ulid';
import { NotFoundError, ValidationError } from '@salychain/errors';
import type { FiatAdapter } from './adapter.js';
import type {
  FiatDestination,
  FiatPayinCustomer,
  FiatPayinInstruction,
  FiatPayinMethod,
  FiatTransfer,
  FiatTransferStatus,
} from './types.js';

/**
 * In-process stub used for dev, tests, and the S3 routing-engine integration.
 *
 * Behaviour:
 *   - Accepts every well-formed destination.
 *   - Immediately marks the transfer PROCESSING, then transitions to SETTLED
 *     after `SETTLEMENT_LATENCY_MS` (default 1500ms).
 *   - Holds state in-memory; replace with `process.env.FIAT_PSP_PROVIDER`
 *     selection in production wiring.
 */
export class StubFiatAdapter implements FiatAdapter {
  readonly rail = 'ANY' as const;
  private readonly store = new Map<string, FiatTransfer>();
  private readonly payins = new Map<string, FiatPayinInstruction>();
  private readonly settlementLatencyMs: number;

  constructor(opts: { settlementLatencyMs?: number } = {}) {
    this.settlementLatencyMs = opts.settlementLatencyMs ?? 1_500;
  }

  supports(destination: FiatDestination): boolean {
    if (!destination.accountIdentifier) return false;
    if (destination.currency.length !== 3) return false;
    if (destination.countryCode.length !== 2) return false;
    return true;
  }

  async send(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    destination: FiatDestination;
  }): Promise<FiatTransfer> {
    if (!this.supports(input.destination)) {
      throw ValidationError(
        'chain.fiat.unsupported_destination',
        'Destination not supported by stub fiat adapter',
      );
    }
    // Idempotency: same correlationId returns the existing transfer.
    for (const t of this.store.values()) {
      if (t.correlationId === input.correlationId) return t;
    }
    const pspId = `pspstub_${ulid()}`;
    const transfer: FiatTransfer = {
      pspId,
      correlationId: input.correlationId,
      rail: input.destination.rail,
      status: 'PROCESSING',
      amountMinor: input.amountMinor,
      currency: input.currency,
      destination: input.destination,
      createdAt: new Date().toISOString(),
    };
    this.store.set(pspId, transfer);

    // Fake settlement after a short delay. In real PSPs this is a webhook
    // delivered to the wallet/listener service. We expose the same shape so
    // upstream consumers don't depend on adapter internals.
    setTimeout(() => {
      const cur = this.store.get(pspId);
      if (cur && (cur.status === 'PROCESSING' || cur.status === 'PENDING')) {
        this.store.set(pspId, { ...cur, status: 'SETTLED', settledAt: new Date().toISOString() });
      }
    }, this.settlementLatencyMs).unref?.();

    return transfer;
  }

  async getStatus(pspId: string): Promise<FiatTransfer | null> {
    return this.store.get(pspId) ?? null;
  }

  async cancel(pspId: string): Promise<{ canceled: boolean }> {
    const t = this.store.get(pspId);
    if (!t) throw NotFoundError('chain.fiat.not_found', `pspId ${pspId} not known`);
    if (t.status !== 'PENDING' && t.status !== 'PROCESSING') return { canceled: false };
    this.store.set(pspId, { ...t, status: 'CANCELED', settledAt: new Date().toISOString() });
    return { canceled: true };
  }

  // ───────────────────────────── Pay-in (inbound) ─────────────────────────────

  supportsPayin(input: { currency: string; countryCode: string }): boolean {
    return input.currency.length === 3 && input.countryCode.length === 2;
  }

  async createPayin(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    customer: FiatPayinCustomer;
    method?: FiatPayinMethod;
  }): Promise<FiatPayinInstruction> {
    if (
      !this.supportsPayin({ currency: input.currency, countryCode: input.customer.countryCode })
    ) {
      throw ValidationError(
        'chain.fiat.unsupported_payin',
        'Pay-in currency/country not supported by stub adapter',
      );
    }
    // Idempotency: same correlationId returns the existing instruction.
    for (const p of this.payins.values()) {
      if (p.correlationId === input.correlationId) return p;
    }

    const method: FiatPayinMethod = input.method ?? 'VIRTUAL_ACCOUNT';
    const pspReference = `pspstub_payin_${ulid()}`;
    // Deterministic 10-digit virtual account number derived from the correlation.
    const accountNumber = createHash('sha256')
      .update(input.correlationId)
      .digest('hex')
      .replace(/\D/g, '')
      .padEnd(10, '0')
      .slice(0, 10);

    const instruction: FiatPayinInstruction = {
      pspReference,
      correlationId: input.correlationId,
      method,
      status: 'PENDING',
      amountMinor: input.amountMinor,
      currency: input.currency.toUpperCase(),
      createdAt: new Date().toISOString(),
      ...(method === 'VIRTUAL_ACCOUNT'
        ? {
            bankName: 'SalyChain Test Bank',
            accountNumber,
            accountName: input.customer.name,
          }
        : { checkoutUrl: `https://pay.stub.salychain.dev/checkout/${pspReference}` }),
    };
    this.payins.set(pspReference, instruction);

    // Simulate the payer funding the account after a short delay. Real PSPs
    // deliver this as a webhook; the execution poller recovers it via
    // `getPayinStatus`, so the end-to-end stub path still settles.
    setTimeout(() => {
      const cur = this.payins.get(pspReference);
      if (cur && cur.status === 'PENDING') {
        this.payins.set(pspReference, {
          ...cur,
          status: 'SETTLED',
          settledAt: new Date().toISOString(),
        });
      }
    }, this.settlementLatencyMs).unref?.();

    return instruction;
  }

  async getPayinStatus(pspReference: string): Promise<FiatPayinInstruction | null> {
    return this.payins.get(pspReference) ?? null;
  }

  // Helpers exposed for tests / dashboards.
  _all(): FiatTransfer[] {
    return [...this.store.values()];
  }
  _allPayins(): FiatPayinInstruction[] {
    return [...this.payins.values()];
  }
  _markStatus(pspId: string, status: FiatTransferStatus): void {
    const t = this.store.get(pspId);
    if (t) this.store.set(pspId, { ...t, status });
  }
  _settlePayin(pspReference: string): void {
    const p = this.payins.get(pspReference);
    if (p)
      this.payins.set(pspReference, {
        ...p,
        status: 'SETTLED',
        settledAt: new Date().toISOString(),
      });
  }
}

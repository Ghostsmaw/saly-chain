import type {
  FiatDestination,
  FiatPayinCustomer,
  FiatPayinInstruction,
  FiatPayinMethod,
  FiatTransfer,
} from './types.js';

/**
 * `FiatAdapter` is the contract every fiat PSP integration implements.
 *
 * The shape mirrors the chain adapters: build/prepare → submit → poll for
 * confirmation. We deliberately do NOT expose lower-level concepts (signing,
 * batching, currency conversion) because PSP semantics vary too much — those
 * decisions are made *inside* each adapter implementation.
 */
export interface FiatAdapter {
  readonly rail: import('./types.js').FiatRail | 'ANY';

  /**
   * Inexpensive pre-flight check: would this destination be accepted by the
   * underlying PSP? Used by the routing service to skip rails that can't reach
   * the destination at all.
   */
  supports(destination: FiatDestination): boolean;

  /**
   * Send a payment. Idempotent on `correlationId` — callers MUST reuse the
   * same id on retry, and adapters MUST de-dupe at the PSP boundary
   * (every modern PSP supports this through their own idempotency keys).
   */
  send(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    destination: FiatDestination;
  }): Promise<FiatTransfer>;

  /** Look up the current status of a transfer by PSP id. */
  getStatus(pspId: string): Promise<FiatTransfer | null>;

  /** Best-effort cancel. Only succeeds while PSP status is PENDING. */
  cancel(pspId: string): Promise<{ canceled: boolean }>;

  // ───────────────────────────── Pay-in (inbound) ─────────────────────────────

  /** Can this PSP accept inbound funds in the given currency/country? */
  supportsPayin(input: { currency: string; countryCode: string }): boolean;

  /**
   * Open a pay-in: issue a virtual account or hosted checkout the payer funds.
   * Idempotent on `correlationId`. The credit is confirmed later via webhook
   * (or recovered via `getPayinStatus`).
   */
  createPayin(input: {
    correlationId: string;
    amountMinor: string;
    currency: string;
    customer: FiatPayinCustomer;
    method?: FiatPayinMethod;
  }): Promise<FiatPayinInstruction>;

  /** Poll the current pay-in status by PSP reference (webhook-miss recovery). */
  getPayinStatus(pspReference: string): Promise<FiatPayinInstruction | null>;
}

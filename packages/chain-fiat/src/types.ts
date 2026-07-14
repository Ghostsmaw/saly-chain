/**
 * Fiat rail types.
 *
 * Fiat rails are *fundamentally different* from chain rails:
 *
 *   - There is no public chain to observe; confirmation comes from the PSP's
 *     own API + bank-statement reconciliation, on schedules ranging from
 *     seconds (instant rails like FedNow / SEPA Instant) to days (Wire / ACH).
 *
 *   - The "transaction hash" is a PSP-issued reference id, not a cryptographic
 *     hash. We treat it the same way for tracking but it's not collision-
 *     resistant in the cryptographic sense.
 *
 *   - Destinations are bank accounts (IBAN / SWIFT / sort-code / mobile-money
 *     handles), not chain addresses.
 *
 * The adapter surface mirrors `chain-base` and `chain-xrpl` so the routing
 * service can treat all rails through the same evaluator pattern.
 */

export type FiatRail =
  | 'SEPA' // EUR, T+0/T+1 European Union
  | 'SEPA_INSTANT' // EUR, real-time
  | 'ACH' // USD, T+1/T+3 United States
  | 'WIRE' // USD, same-day domestic / T+1 cross-border
  | 'FASTER' // GBP UK, real-time
  | 'PIX' // BRL Brazil, real-time
  | 'NIP' // NGN Nigeria, real-time
  | 'MPESA'; // KES Kenya / regional, mobile money

export interface FiatDestination {
  /** ISO-4217. */
  currency: string;
  rail: FiatRail;
  /** Free-form, rail-specific. The PSP validates the shape. */
  accountIdentifier: string;
  /** Optional bank routing identifier (BIC, sort code, etc). */
  bankCode?: string;
  /** Holder name as it appears on the destination account. */
  holderName: string;
  /** ISO-3166-1 alpha-2 country code. */
  countryCode: string;
  /** Optional reference shown on the recipient's statement. */
  reference?: string;
}

export interface FiatTransfer {
  /** PSP-issued payment id. */
  pspId: string;
  /** Our internal correlation id. */
  correlationId: string;
  rail: FiatRail;
  status: FiatTransferStatus;
  amountMinor: string;
  currency: string;
  destination: FiatDestination;
  createdAt: string;
  /** Set when status transitions to SETTLED / FAILED. */
  settledAt?: string;
  /** PSP-side reason if FAILED. */
  failureReason?: string;
}

export type FiatTransferStatus =
  | 'PENDING' // accepted by PSP, awaiting processing
  | 'PROCESSING' // in flight on the rail
  | 'SETTLED' // confirmed credited to destination
  | 'FAILED' // rejected / returned
  | 'CANCELED'; // we canceled before the PSP processed it

// ───────────────────────────── Pay-in (inbound) ─────────────────────────────
//
// Pay-in is the inverse of `send`: money flows *into* SalyChain from a payer.
// Two PSP models are supported:
//   - VIRTUAL_ACCOUNT: the PSP issues a dedicated bank account; the payer makes
//     a bank transfer to it, and the PSP fires a credit webhook when it lands.
//   - CHECKOUT: the PSP hosts a payment page; the payer pays card/transfer and
//     the PSP fires a charge-success webhook.
//
// Confirmation is never synchronous — it arrives via webhook (preferred) or is
// recovered by polling `getPayinStatus` (webhook-miss resilience).

export type FiatPayinMethod = 'VIRTUAL_ACCOUNT' | 'CHECKOUT';

export type FiatPayinStatus =
  | 'PENDING' // instruction issued, awaiting payer funds
  | 'SETTLED' // funds received + confirmed by the PSP
  | 'FAILED' // charge failed / reversed
  | 'EXPIRED'; // instruction lapsed before payment

export interface FiatPayinCustomer {
  /** Payer / paying org display name. */
  name: string;
  email?: string;
  phone?: string;
  /** ISO-3166-1 alpha-2 country code. */
  countryCode: string;
}

export interface FiatPayinInstruction {
  /** PSP-issued id we persist to correlate the later credit webhook. */
  pspReference: string;
  /** Our internal correlation id (the execution transaction id). */
  correlationId: string;
  method: FiatPayinMethod;
  status: FiatPayinStatus;
  amountMinor: string;
  currency: string;
  /** VIRTUAL_ACCOUNT instructions for the payer. */
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  /** CHECKOUT hosted-payment URL. */
  checkoutUrl?: string;
  /** When the instruction expires (ISO-8601), if the PSP enforces a window. */
  expiresAt?: string;
  createdAt: string;
  /** Set once the payer's funds land. */
  settledAt?: string;
  failureReason?: string;
}

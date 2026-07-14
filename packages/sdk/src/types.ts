/**
 * Public DTOs. We intentionally keep these *separate* from the internal SDK
 * types so we can evolve our internal schema without breaking external
 * partners. Renaming / restructuring here is a SemVer-major change.
 */

export type IntentState = 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'FAILED';

export interface IntentRecord {
  intent_id: string;
  actor_ref: string;
  channel: string;
  kind: string;
  state: IntentState;
  execution_transaction_id?: string;
  rejection?: { code: string; message: string };
  payload: unknown;
  created_at: string;
  updated_at: string;
}

export interface IntentSubmissionResult {
  intent_id: string;
  state: IntentState;
  execution_transaction_id?: string;
  rejection?: { code: string; message: string };
}

export type TransactionState =
  | 'CREATED'
  | 'SCREENED'
  | 'ROUTED'
  | 'QUOTED'
  | 'RESERVED'
  | 'EXECUTING'
  | 'AWAITING_CONFIRMATION'
  | 'SETTLED'
  | 'FAILED'
  | 'REVERSING'
  | 'REVERSED'
  | 'REJECTED';

export interface Transaction {
  id: string;
  kind: 'INTERNAL_TRANSFER' | 'BASE_PAYOUT' | 'XRPL_PAYOUT';
  state: TransactionState;
  source: { wallet_id?: string; account_id?: string; amount_minor: string; currency: string };
  destination: { wallet_id?: string; account_id?: string; address?: string; chain?: string };
  ledger_entry_id?: string;
  tx_hash?: string;
  intent_id?: string;
  created_at: string;
  settled_at?: string;
  events: Array<{ state: TransactionState; at: string; detail?: Record<string, unknown> }>;
}

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'DISABLED';

export interface WebhookSubscription {
  id: string;
  org_id: string;
  url: string;
  description?: string;
  subjects: string[];
  status: SubscriptionStatus;
  signing_key_id: string;
  consecutive_failures: number;
  disabled_at?: string;
  last_succeeded_at?: string;
  last_attempted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface WebhookSubscriptionWithSecret {
  subscription: WebhookSubscription;
  /** Returned ONLY on create or rotate-secret. Store it; we cannot show it again. */
  signing_secret: string;
}

export interface Page<T> {
  data: T[];
  next_cursor?: string | null;
}

/**
 * The on-the-wire shape of a webhook event delivered to a partner. The body
 * is JSON; the signature is in the `X-Saly-Signature` header.
 */
export interface WebhookEnvelope<TData = unknown> {
  id: string;
  event_id: string;
  subject: string;
  created_at: string;
  delivery_attempt: number;
  data: TData;
}

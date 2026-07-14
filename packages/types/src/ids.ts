/**
 * Branded ID types for compile-time safety. A `UserId` cannot be passed where
 * a `WalletId` is expected, even though both are strings at runtime.
 *
 * Convention: all IDs are `<prefix>_<ULID>` strings.
 */

declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type BusinessId = Brand<string, 'BusinessId'>;
export type AgentId = Brand<string, 'AgentId'>;
export type WalletId = Brand<string, 'WalletId'>;
export type AccountId = Brand<string, 'AccountId'>;
export type TransactionId = Brand<string, 'TransactionId'>;
export type IntentId = Brand<string, 'IntentId'>;
export type JournalEntryId = Brand<string, 'JournalEntryId'>;
export type PostingId = Brand<string, 'PostingId'>;
export type IdempotencyKey = Brand<string, 'IdempotencyKey'>;
export type TraceId = Brand<string, 'TraceId'>;
export type CorrelationId = Brand<string, 'CorrelationId'>;

export const PREFIXES = {
  user: 'usr',
  business: 'biz',
  agent: 'agt',
  wallet: 'wal',
  account: 'acc',
  transaction: 'txn',
  intent: 'itn',
  journalEntry: 'jen',
  posting: 'pst',
} as const;

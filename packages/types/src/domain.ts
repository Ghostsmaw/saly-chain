/**
 * Domain enums and shared shapes. Mirrors the SQL enums declared in the
 * ledger / wallet / execution Prisma schemas. Whenever the SQL changes, this
 * file changes — and the lint rule in CI checks the two stay in sync.
 */

export type AccountType =
  | 'ASSET'
  | 'LIABILITY'
  | 'EQUITY'
  | 'REVENUE'
  | 'EXPENSE';

export type AccountStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED';

export type PostingDirection = 'DEBIT' | 'CREDIT';

export type JournalEntryStatus = 'PENDING' | 'POSTED' | 'REVERSED';

export type TransactionKind =
  | 'PAYIN'
  | 'PAYOUT'
  | 'TRANSFER'
  | 'SWAP'
  | 'FEE'
  | 'REWARD'
  | 'REVERSAL';

export type TransactionState =
  | 'CREATED'
  | 'SCREENED'
  | 'ROUTED'
  | 'RESERVED'
  | 'EXECUTING'
  | 'AWAITING_CONFIRMATION'
  | 'SETTLED'
  | 'FAILED'
  | 'REVERSING'
  | 'REVERSED'
  | 'REJECTED';

export type Rail = 'BASE' | 'XRPL' | 'INTERNAL' | 'FIAT' | 'L3';

export type Chain = 'BASE' | 'XRPL' | 'ETHEREUM' | 'POLYGON' | 'INTERNAL' | 'SALY_L3';

export type WalletStatus = 'PROVISIONING' | 'ACTIVE' | 'FROZEN' | 'ARCHIVED';

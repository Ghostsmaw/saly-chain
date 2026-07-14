export type PostingDirection = 'DEBIT' | 'CREDIT';

export type LedgerAccountType = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';

export interface TopupPosting {
  account_id: string;
  direction: PostingDirection;
  amount_minor: string;
  currency: string;
}

/** Staging asset account for inbound funds before allocation to customer liabilities. */
export function clearingAccountCode(currency: string, prefix = 'asset.clearing'): string {
  return `${prefix}.${currency.toUpperCase()}`;
}

/** Equity offset used when ops seed the clearing pool (no real pay-in rail in Tier 2). */
export function inboundEquityAccountCode(currency: string, prefix = 'equity.inbound'): string {
  return `${prefix}.${currency.toLowerCase()}`;
}

/**
 * Settled-cash asset account for a real PSP pay-in, e.g. `asset.bank.paystack.NGN`.
 * Unlike the simulated clearing pool, this represents money actually received at
 * the PSP — so a real pay-in DEBITS this account instead of the equity offset.
 */
export function bankSettlementAccountCode(
  provider: string,
  currency: string,
  prefix = 'asset.bank',
): string {
  const safeProvider = provider.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return `${prefix}.${safeProvider}.${currency.toUpperCase()}`;
}

export function isAssetNormal(type: LedgerAccountType | string): boolean {
  return type === 'ASSET' || type === 'EXPENSE';
}

/**
 * Ledger postings for a TOPUP: debit clearing (inbound asset) and credit the
 * destination liability (customer / business treasury balance).
 */
export function buildTopupPostings(input: {
  clearingAccountId: string;
  destinationAccountId: string;
  destinationAccountType: LedgerAccountType | string;
  amountMinor: string;
  currency: string;
}): TopupPosting[] {
  const currency = input.currency.toUpperCase();
  const destDirection: PostingDirection = isAssetNormal(input.destinationAccountType)
    ? 'DEBIT'
    : 'CREDIT';

  return [
    {
      account_id: input.clearingAccountId,
      direction: 'DEBIT',
      amount_minor: input.amountMinor,
      currency,
    },
    {
      account_id: input.destinationAccountId,
      direction: destDirection,
      amount_minor: input.amountMinor,
      currency,
    },
  ];
}

/** Ops bootstrap: prefund clearing pool before customer TOPUP allocations. */
/**
 * Real pay-in postings: DR the PSP settled-cash asset (money received) and
 * credit the destination treasury account. Direction on the destination follows
 * its normal balance side (liability/equity → CREDIT, asset/expense → DEBIT).
 */
export function buildPayinPostings(input: {
  bankAccountId: string;
  destinationAccountId: string;
  destinationAccountType: LedgerAccountType | string;
  amountMinor: string;
  currency: string;
}): TopupPosting[] {
  const currency = input.currency.toUpperCase();
  const destDirection: PostingDirection = isAssetNormal(input.destinationAccountType)
    ? 'DEBIT'
    : 'CREDIT';

  return [
    {
      account_id: input.bankAccountId,
      direction: 'DEBIT',
      amount_minor: input.amountMinor,
      currency,
    },
    {
      account_id: input.destinationAccountId,
      direction: destDirection,
      amount_minor: input.amountMinor,
      currency,
    },
  ];
}

export function buildClearingSeedPostings(input: {
  clearingAccountId: string;
  equityAccountId: string;
  amountMinor: string;
  currency: string;
}): TopupPosting[] {
  const currency = input.currency.toUpperCase();
  return [
    {
      account_id: input.clearingAccountId,
      direction: 'DEBIT',
      amount_minor: input.amountMinor,
      currency,
    },
    {
      account_id: input.equityAccountId,
      direction: 'CREDIT',
      amount_minor: input.amountMinor,
      currency,
    },
  ];
}

export interface TopupEventDetail {
  amount_minor: string;
  currency: string;
  ledger_transaction_id?: string;
  clearing_account_id?: string;
  destination_account_id?: string;
  external_reference?: string;
}

export function extractTopupDetail(
  events: Array<{ detail?: Record<string, unknown> | null }>,
): TopupEventDetail | null {
  for (const event of events) {
    const topup = event.detail?.topup;
    if (topup && typeof topup === 'object') return topup as TopupEventDetail;
  }
  return null;
}

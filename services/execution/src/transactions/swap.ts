import { ValidationError } from '@salychain/errors';
import type { Intent } from '@salychain/intent-schema';
import type { QuoteResponse } from '@salychain/sdk-internal';

/** Enforce max_slippage_bps, max_fee (spread cost), and fixed destination amount on a signed quote. */
export function assertQuoteConstraints(intent: Intent, quote: QuoteResponse): void {
  const maxSlippage = intent.constraints?.max_slippage_bps;

  if (maxSlippage != null && quote.spread_bps > maxSlippage) {
    throw ValidationError(
      'LIQUIDITY_SLIPPAGE_EXCEEDED',
      `Quote spread ${quote.spread_bps} bps exceeds max_slippage_bps ${maxSlippage}`,
    );
  }

  const maxFee = intent.constraints?.max_fee;
  if (maxFee && maxFee.currency.toUpperCase() === quote.from_currency.toUpperCase()) {
    const spreadCostMinor =
      (BigInt(quote.from_amount_minor) * BigInt(quote.spread_bps)) / 10_000n;
    if (spreadCostMinor > BigInt(maxFee.amount_minor)) {
      throw ValidationError(
        'LIQUIDITY_FEE_EXCEEDED',
        `Implied spread cost ${spreadCostMinor} exceeds max_fee ${maxFee.amount_minor}`,
      );
    }
  }

  if (intent.destination.amount) {
    const quotedOut = BigInt(quote.to_amount_minor);
    const expectedOut = BigInt(intent.destination.amount.amount_minor);
    const toleranceBps = BigInt(maxSlippage ?? 0);
    const floor = (expectedOut * (10_000n - toleranceBps)) / 10_000n;
    if (quotedOut < floor) {
      throw ValidationError(
        'LIQUIDITY_SLIPPAGE_EXCEEDED',
        `Quoted output ${quotedOut} is below minimum ${floor} (${toleranceBps} bps tolerance)`,
      );
    }
  }
}

/** @deprecated Use {@link assertQuoteConstraints} */
export const assertSwapSlippage = assertQuoteConstraints;

export function fxPoolAccountCode(currency: string, prefix: string): string {
  return `${prefix}.${currency.toUpperCase()}`;
}

export function clearingAccountCode(currency: string, prefix = 'asset.clearing'): string {
  return `${prefix}.${currency.toUpperCase()}`;
}

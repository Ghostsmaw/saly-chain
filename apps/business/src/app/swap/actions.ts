'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';
import { Money, type CurrencyCode } from '@salychain/money';
import {
  fetchDexPoolReadiness,
  fetchDexQuotePreview,
  fetchFxQuotePreview,
  submitOnchainSwapIntent,
  submitSwapIntent,
} from '@/lib/api';
import { requireSession } from '@/lib/auth';

export async function checkDexPool(formData: FormData) {
  await requireSession();
  const fromCurrency = String(formData.get('from_currency') ?? '');
  const toCurrency = String(formData.get('to_currency') ?? '');
  if (!fromCurrency || !toCurrency) {
    return { ok: false, ready: false, message: 'Missing pair.' };
  }
  try {
    const status = await fetchDexPoolReadiness(fromCurrency, toCurrency);
    return {
      ok: true,
      ready: status.ready,
      poolAddress: status.pool_address,
      liquidity: status.liquidity,
      network: status.network,
      reason: status.reason,
    };
  } catch (err) {
    return {
      ok: false,
      ready: false,
      message: err instanceof Error ? err.message : 'Pool check failed.',
    };
  }
}

export async function previewDexQuote(formData: FormData) {
  await requireSession();
  const amountRaw = String(formData.get('amount') ?? '').trim();
  const fromCurrency = String(formData.get('from_currency') ?? '');
  const toCurrency = String(formData.get('to_currency') ?? '');
  const walletAddress = String(formData.get('wallet_address') ?? '');
  const slippageRaw = String(formData.get('max_slippage_bps') ?? '100').trim();

  if (!amountRaw || !fromCurrency || !toCurrency || !walletAddress) {
    return { ok: false, message: 'Missing quote fields.' };
  }

  let amountMinor: string;
  try {
    amountMinor = Money.ofMajor(amountRaw, fromCurrency as CurrencyCode).amountMinor.toString();
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Invalid amount.',
    };
  }

  const slippageBps = slippageRaw ? Number(slippageRaw) : 100;

  try {
    const quote = await fetchDexQuotePreview({
      fromCurrency,
      toCurrency,
      amountMinor,
      recipient: walletAddress,
      slippageBps,
    });
    return {
      ok: true,
      toAmountMinor: quote.to_amount_minor,
      minOut: quote.dex.min_amount_out,
      expectedOut: quote.dex.expected_out,
      rate: quote.quoted_rate_1e8,
      provider: quote.provider,
      quoteSource: quote.dex.quote_source,
      poolAddress: quote.dex.pool_address,
      poolLiquidity: quote.dex.pool_liquidity,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Quote unavailable.',
    };
  }
}

export async function previewFxQuote(formData: FormData) {
  await requireSession();
  const amountRaw = String(formData.get('amount') ?? '').trim();
  const fromCurrency = String(formData.get('from_currency') ?? '');
  const toCurrency = String(formData.get('to_currency') ?? '');

  if (!amountRaw || !fromCurrency || !toCurrency) {
    return { ok: false, message: 'Missing quote fields.' };
  }

  let amountMinor: string;
  try {
    amountMinor = Money.ofMajor(amountRaw, fromCurrency as CurrencyCode).amountMinor.toString();
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Invalid amount.',
    };
  }

  try {
    const quote = await fetchFxQuotePreview({ fromCurrency, toCurrency, amountMinor });
    return {
      ok: true,
      toAmountMinor: quote.to_amount_minor,
      quotedRate1e8: quote.quoted_rate_1e8,
      midRate1e8: quote.mid_rate_1e8,
      spreadBps: quote.spread_bps,
      provider: quote.provider,
      expiresAt: quote.expires_at,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'FX quote unavailable.',
    };
  }
}

export async function submitSwap(formData: FormData) {
  await requireSession();
  const mode = String(formData.get('mode') ?? 'ledger');
  const amountRaw = String(formData.get('amount') ?? '').trim();
  const fromCurrency = String(formData.get('from_currency') ?? '');
  const toCurrency = String(formData.get('to_currency') ?? '');
  const slippageRaw = String(formData.get('max_slippage_bps') ?? '').trim();

  if (!amountRaw || !fromCurrency || !toCurrency) {
    return { ok: false, message: 'Complete all swap fields.' };
  }

  if (fromCurrency === toCurrency) {
    return { ok: false, message: 'Choose two different currencies.' };
  }

  let amountMinor: string;
  try {
    amountMinor = Money.ofMajor(amountRaw, fromCurrency as CurrencyCode).amountMinor.toString();
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Invalid amount.',
    };
  }

  const maxSlippageBps = slippageRaw ? Number(slippageRaw) : 100;
  if (!Number.isInteger(maxSlippageBps) || maxSlippageBps < 0 || maxSlippageBps > 10_000) {
    return { ok: false, message: 'Max slippage must be 0–10000 bps.' };
  }

  const idempotencyKey = `biz-swap-${ulid()}`;

  try {
    const result =
      mode === 'onchain'
        ? await submitOnchainSwapIntent({
            idempotencyKey,
            sourceWalletId: String(formData.get('source_wallet_id') ?? ''),
            walletAddress: String(formData.get('wallet_address') ?? ''),
            fromCurrency,
            toCurrency,
            amountMinor,
            maxSlippageBps,
          })
        : await submitSwapIntent({
            idempotencyKey,
            fromLedgerAccountId: String(formData.get('from_account') ?? ''),
            toLedgerAccountId: String(formData.get('to_account') ?? ''),
            fromCurrency,
            toCurrency,
            amountMinor,
            maxSlippageBps,
          });

    revalidatePath('/');
    revalidatePath('/treasury');
    revalidatePath('/transactions');
    revalidatePath('/swap');

    if (result.rejection) {
      return {
        ok: false,
        message: result.rejection.message,
        intentId: result.intent_id,
      };
    }

    return {
      ok: true,
      message:
        mode === 'onchain'
          ? `On-chain swap accepted (${result.state}). Awaiting Base confirmation.`
          : `Swap intent accepted (${result.state}). FX quote locked at execution.`,
      intentId: result.intent_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Failed to submit swap.',
    };
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';
import { Money, type CurrencyCode } from '@salychain/money';
import { submitTransferIntent, voteSpendApproval } from '@/lib/api';
import { requireSession } from '@/lib/auth';

export async function submitTransfer(formData: FormData) {
  await requireSession();
  const amountRaw = String(formData.get('amount') ?? '').trim();
  const currency = String(formData.get('currency') ?? 'USDC');
  const kind = String(formData.get('kind') ?? 'PAYOUT') as 'TRANSFER' | 'PAYOUT';
  const beneficiaryType = String(formData.get('beneficiary_type') ?? 'crypto');
  const memo = String(formData.get('memo') ?? '').trim() || undefined;

  if (!amountRaw) {
    return { ok: false, message: 'Amount is required.' };
  }

  let amountMinor: string;
  try {
    amountMinor = Money.ofMajor(amountRaw, currency as CurrencyCode).amountMinor.toString();
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Invalid amount.',
    };
  }

  const idempotencyKey = `biz-tx-${ulid()}`;

  try {
    let result;
    if (beneficiaryType === 'crypto') {
      const chain = String(formData.get('chain') ?? 'BASE') as 'BASE' | 'XRPL' | 'SALY_L3' | 'INTERNAL';
      const xrplAssetRaw = String(formData.get('xrpl_asset') ?? 'XRP');
      const xrplAsset =
        xrplAssetRaw === 'USD' || xrplAssetRaw === 'EUR' ? xrplAssetRaw : ('XRP' as const);
      result = await submitTransferIntent({
        idempotencyKey,
        kind,
        amountMinor,
        currency,
        beneficiaryKind: 'WALLET',
        chain,
        address: String(formData.get('address') ?? ''),
        memo,
        ...(chain === 'XRPL' ? { xrplAsset, iouIssuer: String(formData.get('iou_issuer') ?? '').trim() || undefined } : {}),
      });
    } else if (beneficiaryType === 'bank') {
      const fiatSource = String(formData.get('fiat_source_ledger_id') ?? '').trim();
      result = await submitTransferIntent({
        idempotencyKey,
        kind,
        amountMinor,
        currency,
        beneficiaryKind: 'BANK',
        bankCountry: String(formData.get('bank_country') ?? ''),
        bankAccount: String(formData.get('bank_account') ?? ''),
        bankCode: String(formData.get('bank_code') ?? ''),
        accountName: String(formData.get('account_name') ?? '') || undefined,
        fromLedgerAccountId: fiatSource || undefined,
        memo,
      });
    } else {
      result = await submitTransferIntent({
        idempotencyKey,
        kind,
        amountMinor,
        currency,
        beneficiaryKind: 'PHONE',
        phone: String(formData.get('phone') ?? ''),
        memo,
      });
    }

    revalidatePath('/');
    revalidatePath('/transactions');
    revalidatePath('/treasury');

    if (result.rejection) {
      return {
        ok: false,
        message: result.rejection.message,
        intentId: result.intent_id,
      };
    }

    return {
      ok: true,
      message: `Intent submitted (${result.state}). Execution will route and settle automatically.`,
      intentId: result.intent_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Failed to submit transfer.',
    };
  }
}

export async function approveSpend(agentId: string, requestId: string) {
  await requireSession();
  try {
    await voteSpendApproval(agentId, requestId);
    revalidatePath('/approvals');
    revalidatePath('/');
  } catch (err) {
    throw err;
  }
}

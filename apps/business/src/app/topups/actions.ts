'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';
import { businessNgnTreasuryAccountRef } from '@/lib/constants';
import { submitTopupIntent } from '@/lib/api';
import { requireSession } from '@/lib/auth';

function majorToMinor(amount: string, currency: string): string {
  const decimals = currency === 'XRP' ? 6 : 2;
  const parts = amount.trim().split('.');
  const whole = parts[0]?.replace(/[^\d]/g, '') || '0';
  const frac = (parts[1] ?? '').padEnd(decimals, '0').slice(0, decimals);
  return `${whole}${frac}`.replace(/^0+(?=\d)/, '') || '0';
}

export async function runTopup(formData: FormData) {
  await requireSession();
  const amount = String(formData.get('amount') ?? '').trim();
  const currency = String(formData.get('currency') ?? 'NGN').toUpperCase();
  const externalReference = String(formData.get('external_reference') ?? '').trim() || undefined;
  const memo = String(formData.get('memo') ?? '').trim() || undefined;

  if (!amount || Number(amount) <= 0) {
    return { ok: false, message: 'Enter a valid amount.' };
  }

  const amountMinor = majorToMinor(amount, currency);
  const idempotencyKey = `biz-topup-${ulid()}`;

  try {
    const result = await submitTopupIntent({
      idempotencyKey,
      amountMinor,
      currency,
      destinationAccountRef: businessNgnTreasuryAccountRef(),
      externalReference,
      memo,
    });

    revalidatePath('/topups');
    revalidatePath('/transactions');
    revalidatePath('/treasury');

    return {
      ok: true,
      message: `Top-up ${result.state.toLowerCase()} — ${amount} ${currency} credited from clearing.`,
      transactionId: result.execution_transaction_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Top-up submission failed.',
    };
  }
}

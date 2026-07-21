'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';
import { submitL3Payout } from '@/lib/api';
import type { L3PayoutActionResult } from '@/components/L3PayoutForm';
import { requireSession } from '@/lib/auth';

function majorToMinor(amount: string, decimals = 2): string {
  const parts = amount.trim().split('.');
  const whole = parts[0]?.replace(/[^\d]/g, '') || '0';
  const frac = (parts[1] ?? '').padEnd(decimals, '0').slice(0, decimals);
  return `${whole}${frac}`.replace(/^0+(?=\d)/, '') || '0';
}

export async function runL3Payout(formData: FormData): Promise<L3PayoutActionResult> {
  await requireSession();
  const walletId = String(formData.get('wallet_id') ?? '').trim();
  const destinationAddress = String(formData.get('destination_address') ?? '').trim();
  const amount = String(formData.get('amount') ?? '').trim();
  const memo = String(formData.get('memo') ?? '').trim() || undefined;

  if (!walletId) return { ok: false, message: 'Select a source L3 wallet.' };
  if (!/^0x[a-fA-F0-9]{40}$/.test(destinationAddress)) {
    return { ok: false, message: 'Enter a valid 0x destination address.' };
  }
  if (!amount || Number(amount) <= 0) {
    return { ok: false, message: 'Enter a valid amount.' };
  }

  const amountMinor = majorToMinor(amount, 2);
  const idempotencyKey = `biz-l3-${ulid()}`;

  try {
    const result = await submitL3Payout({
      idempotencyKey,
      sourceWalletId: walletId,
      destinationAddress,
      amountMinor,
      memo,
    });

    revalidatePath('/l3');
    revalidatePath('/transactions');
    revalidatePath('/treasury');

    return {
      ok: true,
      message: `L3 payout ${result.state.toLowerCase()} — ${amount} USDC en route.`,
      transactionId: result.execution_transaction_id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'L3 payout submission failed.',
    };
  }
}

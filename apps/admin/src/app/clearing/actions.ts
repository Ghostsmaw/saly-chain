'use server';

import { revalidatePath } from 'next/cache';
import { ulid } from 'ulid';

const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';
const ADMIN_TOKEN = process.env.EXECUTION_ADMIN_TOKEN ?? '';

function authHeaders() {
  return {
    Authorization: `Bearer ${ADMIN_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

export async function seedClearingPool(formData: FormData) {
  if (!ADMIN_TOKEN) {
    return { ok: false as const, message: 'EXECUTION_ADMIN_TOKEN not configured.' };
  }

  const currency = String(formData.get('currency') ?? 'NGN').toUpperCase();
  const amountMajor = String(formData.get('amount') ?? '').trim();
  const memo = String(formData.get('memo') ?? '').trim() || undefined;

  if (!amountMajor || Number(amountMajor) <= 0) {
    return { ok: false as const, message: 'Enter a valid amount.' };
  }

  const decimals = 2;
  const parts = amountMajor.split('.');
  const whole = parts[0]?.replace(/[^\d]/g, '') || '0';
  const frac = (parts[1] ?? '').padEnd(decimals, '0').slice(0, decimals);
  const amountMinor = `${whole}${frac}`.replace(/^0+(?=\d)/, '') || '0';

  const res = await fetch(`${EXECUTION_URL}/v1/admin/clearing/seed`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      idempotency_key: `admin-seed-${ulid()}`,
      currency,
      amount_minor: amountMinor,
      memo,
    }),
  });

  const body = await res.json().catch(() => ({}));
  revalidatePath('/clearing');

  if (!res.ok) {
    return {
      ok: false as const,
      message: (body as { message?: string }).message ?? res.statusText,
    };
  }

  return {
    ok: true as const,
    message: `Seeded ${amountMajor} ${currency} into clearing.`,
    journalEntryId: (body as { journal_entry_id?: string }).journal_entry_id,
  };
}

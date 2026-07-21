'use server';

import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/auth';

const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';
const ADMIN_TOKEN = process.env.EXECUTION_ADMIN_TOKEN ?? '';

function authHeaders(): Record<string, string> {
  const internalToken = process.env.INTERNAL_SERVICE_TOKEN;
  return {
    Authorization: `Bearer ${ADMIN_TOKEN}`,
    'Content-Type': 'application/json',
    ...(internalToken ? { 'x-internal-token': internalToken } : {}),
  };
}

export async function fetchEscrowDeals(status?: string) {
  await requireSession();
  if (!ADMIN_TOKEN) return { ok: false as const, message: 'EXECUTION_ADMIN_TOKEN not configured.', data: [] };
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  const res = await fetch(`${EXECUTION_URL}/v1/escrow/deals${qs}`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) {
    return { ok: false as const, message: await res.text(), data: [] };
  }
  const body = (await res.json()) as { data: EscrowDealRow[] };
  return { ok: true as const, data: body.data };
}

export async function releaseEscrowDeal(dealId: string) {
  await requireSession();
  if (!ADMIN_TOKEN) return { ok: false, message: 'EXECUTION_ADMIN_TOKEN not configured.' };
  const res = await fetch(`${EXECUTION_URL}/v1/escrow/deals/${encodeURIComponent(dealId)}/release`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ actor: 'admin-dashboard' }),
  });
  const body = await res.json().catch(() => ({}));
  revalidatePath('/escrow');
  if (!res.ok) return { ok: false, message: (body as { message?: string }).message ?? res.statusText };
  return { ok: true, message: (body as { message?: string }).message ?? 'Release broadcast.', txHash: (body as { tx_hash?: string }).tx_hash };
}

export async function refundEscrowDeal(dealId: string) {
  await requireSession();
  if (!ADMIN_TOKEN) return { ok: false, message: 'EXECUTION_ADMIN_TOKEN not configured.' };
  const res = await fetch(`${EXECUTION_URL}/v1/escrow/deals/${encodeURIComponent(dealId)}/refund`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ actor: 'admin-dashboard' }),
  });
  const body = await res.json().catch(() => ({}));
  revalidatePath('/escrow');
  if (!res.ok) return { ok: false, message: (body as { message?: string }).message ?? res.statusText };
  return { ok: true, message: (body as { message?: string }).message ?? 'Refund broadcast.', txHash: (body as { tx_hash?: string }).tx_hash };
}

export interface EscrowDealRow {
  id: string;
  deal_id: string;
  transaction_id?: string;
  status: string;
  payer: string;
  payee: string;
  amount_minor: string;
  escrow_contract: string;
  fund_tx_hash?: string;
  resolve_tx_hash?: string;
  funded_at?: string;
  resolved_at?: string;
  events: Array<{ type: string; occurred_at: string; tx_hash?: string }>;
}

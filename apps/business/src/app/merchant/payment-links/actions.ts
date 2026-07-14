'use server';

import { ulid } from 'ulid';
import { merchant } from '@/lib/api';
import { BUSINESS_ACTOR_ID, BUSINESS_ORG_ID, businessNgnTreasuryAccountRef } from '@/lib/constants';

export async function createPaymentLink(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const amountMajor = String(formData.get('amount') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();

  if (!title || !amountMajor) {
    return { ok: false, message: 'Title and amount are required.' };
  }

  const amountMinor = String(Math.round(Number(amountMajor) * 100));
  if (!/^\d+$/.test(amountMinor) || amountMinor === '0') {
    return { ok: false, message: 'Enter a valid amount.' };
  }

  try {
    const link = await merchant().createPaymentLink(
      {
        actor_id: BUSINESS_ACTOR_ID,
        destination_account_ref: businessNgnTreasuryAccountRef(),
        title,
        ...(description ? { description } : {}),
        amount_minor: amountMinor,
        currency: 'NGN',
        country: 'NG',
      },
      { orgId: BUSINESS_ORG_ID, idempotencyKey: `plink_${ulid()}` },
    );
    return { ok: true, message: 'Payment link created.', link };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Failed to create payment link.',
    };
  }
}

export async function archivePaymentLink(linkId: string) {
  try {
    await merchant().archivePaymentLink(linkId, 'archived from business dashboard', {
      orgId: BUSINESS_ORG_ID,
    });
    return { ok: true, message: 'Payment link archived.' };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Failed to archive payment link.',
    };
  }
}

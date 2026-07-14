'use server';

import { ulid } from 'ulid';
import { fetchPublicCheckoutSession, openPublicCheckout } from '@/lib/api';

export async function openCheckoutFromSlug(
  slug: string,
  input: { customer_name: string; customer_email?: string },
) {
  return openPublicCheckout(slug, {
    ...input,
    idempotency_key: `pay_${ulid()}`,
  });
}

export async function pollCheckoutSession(sessionId: string) {
  return fetchPublicCheckoutSession(sessionId);
}

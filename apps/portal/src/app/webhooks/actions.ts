'use server';

import { revalidatePath } from 'next/cache';
import {
  createWebhookSubscription,
  deleteWebhookSubscription,
  mutationError,
  rotateWebhookSubscriptionSecret,
  setWebhookSubscriptionStatus,
} from '@/lib/api';
import { PORTAL_WEBHOOK_SUBJECTS } from '@/lib/constants';
import { requireSession } from '@/lib/auth';

export type PortalActionResult =
  | { ok: true; message?: string; secret?: string; secretLabel?: string }
  | { ok: false; error: string };

function parseSubjects(raw: FormDataEntryValue | null): string[] {
  const value = String(raw ?? '');
  const subjects = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const allowed = new Set<string>(PORTAL_WEBHOOK_SUBJECTS);
  return subjects.filter((s) => allowed.has(s));
}

export async function createWebhookAction(formData: FormData): Promise<PortalActionResult> {
  await requireSession();
  const url = String(formData.get('url') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim() || undefined;
  const subjects = parseSubjects(formData.get('subjects'));

  if (!url) return { ok: false, error: 'Webhook URL is required.' };
  if (subjects.length === 0) return { ok: false, error: 'Select at least one event subject.' };

  try {
    const issued = await createWebhookSubscription({ url, subjects, description });
    revalidatePath('/webhooks');
    return {
      ok: true,
      secret: issued.signing_secret,
      secretLabel: `Signing secret for ${issued.subscription.url}`,
      message: 'Subscription created. Copy the signing secret now — it will not be shown again.',
    };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

export async function rotateWebhookSecretAction(formData: FormData): Promise<PortalActionResult> {
  await requireSession();
  const id = String(formData.get('subscription_id') ?? '');
  if (!id) return { ok: false, error: 'Missing subscription id.' };

  try {
    const issued = await rotateWebhookSubscriptionSecret(id);
    revalidatePath('/webhooks');
    return {
      ok: true,
      secret: issued.signing_secret,
      secretLabel: `New signing secret (kid ${issued.subscription.signing_key_id})`,
      message: 'Secret rotated. Update your verifier before the next delivery.',
    };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

export async function setWebhookStatusAction(formData: FormData): Promise<PortalActionResult> {
  await requireSession();
  const id = String(formData.get('subscription_id') ?? '');
  const status = String(formData.get('status') ?? '') as 'ACTIVE' | 'PAUSED' | 'DISABLED';
  if (!id) return { ok: false, error: 'Missing subscription id.' };
  if (!['ACTIVE', 'PAUSED', 'DISABLED'].includes(status)) {
    return { ok: false, error: 'Invalid status.' };
  }

  try {
    await setWebhookSubscriptionStatus(id, status);
    revalidatePath('/webhooks');
    const label = status === 'ACTIVE' ? 'resumed' : status === 'PAUSED' ? 'paused' : 'disabled';
    return { ok: true, message: `Subscription ${label}.` };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

export async function deleteWebhookAction(formData: FormData): Promise<PortalActionResult> {
  await requireSession();
  const id = String(formData.get('subscription_id') ?? '');
  if (!id) return { ok: false, error: 'Missing subscription id.' };

  try {
    await deleteWebhookSubscription(id);
    revalidatePath('/webhooks');
    return { ok: true, message: 'Subscription deleted.' };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

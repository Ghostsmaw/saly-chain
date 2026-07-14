'use server';

import { revalidatePath } from 'next/cache';
import {
  issueApiKey,
  mutationError,
  revokeApiKey,
  rotateApiKey,
} from '@/lib/api';
import { PORTAL_API_KEY_SCOPES } from '@/lib/constants';

export type PortalActionResult =
  | { ok: true; message?: string; secret?: string; secretLabel?: string }
  | { ok: false; error: string };

function parseScopes(raw: FormDataEntryValue | null): string[] {
  const value = String(raw ?? '');
  const scopes = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const allowed = new Set<string>(PORTAL_API_KEY_SCOPES);
  return scopes.filter((s) => allowed.has(s));
}

function parseIpAllowList(raw: FormDataEntryValue | null): string[] {
  const value = String(raw ?? '').trim();
  if (!value) return [];
  return value
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createApiKeyAction(formData: FormData): Promise<PortalActionResult> {
  const environment = String(formData.get('environment') ?? 'TEST') as 'TEST' | 'LIVE';
  const scopes = parseScopes(formData.get('scopes'));
  const description = String(formData.get('description') ?? '').trim() || undefined;
  const rateRaw = String(formData.get('rate_limit_per_min') ?? '').trim();
  const rateLimitPerMin = rateRaw ? Number(rateRaw) : undefined;
  const ipAllowList = parseIpAllowList(formData.get('ip_allow_list'));

  if (scopes.length === 0) {
    return { ok: false, error: 'Select at least one scope.' };
  }
  if (rateLimitPerMin !== undefined && (!Number.isInteger(rateLimitPerMin) || rateLimitPerMin < 1)) {
    return { ok: false, error: 'Rate limit must be a positive integer.' };
  }

  try {
    const issued = await issueApiKey({
      environment,
      scopes,
      description,
      rateLimitPerMin,
      ipAllowList,
    });
    revalidatePath('/api-keys');
    return {
      ok: true,
      secret: issued.secret,
      secretLabel: `New ${environment} key (${issued.apiKey.prefix}…${issued.apiKey.last_four})`,
      message: 'API key created. Copy the secret now — it will not be shown again.',
    };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

export async function rotateApiKeyAction(formData: FormData): Promise<PortalActionResult> {
  const id = String(formData.get('key_id') ?? '');
  if (!id) return { ok: false, error: 'Missing key id.' };

  try {
    const issued = await rotateApiKey(id, 'portal rotation');
    revalidatePath('/api-keys');
    return {
      ok: true,
      secret: issued.secret,
      secretLabel: `Rotated key (${issued.apiKey.prefix}…${issued.apiKey.last_four})`,
      message: 'Key rotated. The previous secret is revoked. Copy the new secret now.',
    };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

export async function revokeApiKeyAction(formData: FormData): Promise<PortalActionResult> {
  const id = String(formData.get('key_id') ?? '');
  if (!id) return { ok: false, error: 'Missing key id.' };

  try {
    await revokeApiKey(id, 'portal revoke');
    revalidatePath('/api-keys');
    return { ok: true, message: 'API key revoked.' };
  } catch (err) {
    return { ok: false, error: mutationError(err) };
  }
}

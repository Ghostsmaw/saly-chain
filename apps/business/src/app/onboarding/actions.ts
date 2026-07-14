'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import {
  clearOnboardingCookie,
  setSkippedOnboardingCookie,
  syncOnboardingCookie,
} from '@/lib/onboarding-cookies';
import { ONBOARDING_COOKIE, ONBOARDING_SKIPPED } from '@/lib/onboarding-constants';
import {
  getBusinessOnboarding,
  resubmitBusinessOnboarding,
  startBusinessOnboarding,
  submitBusinessOnboardingStep,
} from '@/lib/onboarding';

const ALLOWED_DOC_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
const MAX_DOC_BYTES = 10 * 1024 * 1024;

export interface UploadedDocumentMeta {
  filename: string;
  size: number;
  mime_type: string;
  uploaded_at: string;
}

function inferMimeType(filename: string, type: string): string {
  if (type) return type;
  const ext = filename.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  return map[ext ?? ''] ?? '';
}

function parseUploadMeta(input: unknown, label: string): UploadedDocumentMeta {
  if (!input || typeof input !== 'object') {
    throw new Error(`${label} is required`);
  }
  const value = input as Record<string, unknown>;
  const filename = String(value.filename ?? '').trim();
  const size = Number(value.size ?? 0);
  const mime_type = inferMimeType(filename, String(value.mime_type ?? ''));
  if (!filename || size <= 0) {
    throw new Error(`${label} is required`);
  }
  if (size > MAX_DOC_BYTES) {
    throw new Error(`${label} must be 10 MB or smaller`);
  }
  if (!ALLOWED_DOC_TYPES.has(mime_type)) {
    throw new Error(`${label} must be a PDF, JPG, or PNG file`);
  }
  return {
    filename,
    size,
    mime_type,
    uploaded_at: String(value.uploaded_at ?? new Date().toISOString()),
  };
}

export async function submitOnboardingStepAction(
  step: string,
  data: Record<string, unknown>,
): Promise<{ ok: true; complete: boolean; status?: Awaited<ReturnType<typeof getBusinessOnboarding>> } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    if (!session) return { ok: false, error: 'Not signed in' };

    let payload: Record<string, unknown> = { ...data };

    if (step === 'beneficial_owners') {
      const owners = data.owners;
      if (!Array.isArray(owners) || owners.length === 0) {
        return { ok: false, error: 'Add at least one beneficial owner' };
      }

      payload.owners = owners.map((entry, index) => {
        const row = (entry ?? {}) as Record<string, unknown>;
        const label = `Owner ${index + 1}`;
        const name = String(row.name ?? '').trim();
        const email = String(row.email ?? '').trim();
        const ownership_pct = String(row.ownership_pct ?? '').trim();

        if (!name) throw new Error(`${label}: name is required`);
        if (!email) throw new Error(`${label}: email is required`);
        if (!ownership_pct) throw new Error(`${label}: ownership % is required`);

        return {
          name,
          email,
          ownership_pct,
          id_card: parseUploadMeta(row.id_card, `${label} ID card`),
          id_card_back:
            row.id_card_back && typeof row.id_card_back === 'object' && 'filename' in row.id_card_back
              ? parseUploadMeta(row.id_card_back, `${label} ID back`)
              : null,
          proof_of_address: parseUploadMeta(row.proof_of_address, `${label} proof of address`),
        };
      });
    } else {
      for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === 'object' && 'filename' in value && 'size' in value) {
          payload[key] = parseUploadMeta(value, key.replace(/_/g, ' '));
        }
      }
    }

    const status = await submitBusinessOnboardingStep(session.userId, step, payload);
    const jar = await cookies();
    const wasSkipped = jar.get(ONBOARDING_COOKIE)?.value === ONBOARDING_SKIPPED;
    if (status.complete) {
      await clearOnboardingCookie();
    } else if (!wasSkipped || status.status === 'pending_review' || status.status === 'rejected') {
      await syncOnboardingCookie(status);
    }
    revalidatePath('/onboarding');
    revalidatePath('/');
    return { ok: true, complete: status.complete, status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to save step' };
  }
}

export async function skipOnboardingAction(): Promise<void> {
  const session = await getSession();
  if (!session) redirect('/login');

  const status = await getBusinessOnboarding(session.userId);
  if (status.status === 'pending_review' || status.status === 'rejected') {
    redirect('/onboarding');
  }
  if (status.status === 'not_started') {
    await startBusinessOnboarding({
      userId: session.userId,
      displayName: session.displayName,
      email: session.email,
    });
  }

  await setSkippedOnboardingCookie();
  revalidatePath('/');
  redirect('/');
}

export async function resubmitOnboardingAction(): Promise<
  { ok: true; status: Awaited<ReturnType<typeof getBusinessOnboarding>> } | { ok: false; error: string }
> {
  try {
    const session = await getSession();
    if (!session) return { ok: false, error: 'Not signed in' };

    const status = await resubmitBusinessOnboarding(session.userId);
    await syncOnboardingCookie(status);
    revalidatePath('/onboarding');
    return { ok: true, status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to resubmit' };
  }
}

export async function finishOnboardingAction(): Promise<void> {
  const session = await getSession();
  if (!session) return;
  const status = await getBusinessOnboarding(session.userId);
  if (status.complete) await clearOnboardingCookie();
}

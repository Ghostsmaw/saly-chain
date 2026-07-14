'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import {
  clearOnboardingCookie,
  syncOnboardingCookie,
} from '@/lib/onboarding-cookies';
import {
  getDeveloperOnboarding,
  resubmitDeveloperOnboarding,
  submitDeveloperOnboardingStep,
} from '@/lib/onboarding';

export async function submitOnboardingStepAction(
  step: string,
  data: Record<string, string>,
): Promise<{ ok: true; complete: boolean; status?: Awaited<ReturnType<typeof getDeveloperOnboarding>> } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    if (!session) return { ok: false, error: 'Not signed in' };

    const status = await submitDeveloperOnboardingStep(session.userId, step, data);
    if (status.complete) {
      await clearOnboardingCookie();
    } else {
      await syncOnboardingCookie(status);
    }
    revalidatePath('/onboarding');
    return { ok: true, complete: status.complete, status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to save step' };
  }
}

export async function resubmitOnboardingAction(): Promise<
  { ok: true; status: Awaited<ReturnType<typeof getDeveloperOnboarding>> } | { ok: false; error: string }
> {
  try {
    const session = await getSession();
    if (!session) return { ok: false, error: 'Not signed in' };

    const status = await resubmitDeveloperOnboarding(session.userId);
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
  const status = await getDeveloperOnboarding(session.userId);
  if (status.complete) await clearOnboardingCookie();
}

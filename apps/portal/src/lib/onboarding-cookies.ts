'use server';

import { cookies } from 'next/headers';
import type { OnboardingStatusDto } from '@salychain/sdk-internal';
import { getSession } from './auth';
import { ONBOARDING_COOKIE } from './onboarding-constants';
import { applyOnboardingCookie, onboardingCookieOpts } from './apply-onboarding-cookie';
import { signOnboardingState } from './onboarding-token';

export async function syncOnboardingCookie(status: OnboardingStatusDto | null): Promise<void> {
  const jar = await cookies();
  const session = await getSession();
  if (!status || !session) {
    jar.delete(ONBOARDING_COOKIE);
    return;
  }
  await applyOnboardingCookie(jar, session.userId, status);
}

/**
 * Mark onboarding as satisfied. Writes a signed "complete" state (instead of
 * deleting the cookie) so the middleware doesn't need a backend round-trip on
 * the next navigation; falls back to deletion without a session (logout).
 */
export async function clearOnboardingCookie(): Promise<void> {
  const jar = await cookies();
  const session = await getSession();
  const token = session ? await signOnboardingState(session.userId, 'complete') : null;
  if (token) jar.set(ONBOARDING_COOKIE, token, onboardingCookieOpts);
  else jar.delete(ONBOARDING_COOKIE);
}

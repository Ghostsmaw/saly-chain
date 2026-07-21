import type { OnboardingStatusDto } from '@salychain/sdk-internal';
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ONBOARDING_COOKIE } from './onboarding-constants';
import {
  signOnboardingState,
  verifyOnboardingState,
  type OnboardingGateState,
} from './onboarding-token';

export const onboardingCookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const,
  // Secure-by-default: only explicit `next dev` runs over plain HTTP. A
  // mis-set NODE_ENV in any deployed environment still gets a Secure cookie.
  secure: process.env.NODE_ENV !== 'development',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

/**
 * Derive the gate state from the compliance status and persist it as a
 * signed, user-bound cookie (see onboarding-token.ts). "Complete" is written
 * explicitly rather than deleting the cookie, so an absent cookie always
 * means "unknown — re-sync" and never "unrestricted".
 */
export async function applyOnboardingCookie(
  jar: Pick<ResponseCookies, 'get' | 'set' | 'delete'>,
  userId: string,
  status: OnboardingStatusDto,
): Promise<OnboardingGateState> {
  // allowExpired: "skipped" exists only client-side; an expired token must
  // not silently downgrade the user's choice back to the pending wall.
  const current = await verifyOnboardingState(jar.get(ONBOARDING_COOKIE)?.value, userId, {
    allowExpired: true,
  });

  let state: OnboardingGateState;
  if (!status.required || status.complete) state = 'complete';
  else if (current === 'skipped') state = 'skipped';
  else if (status.status === 'pending_review') state = 'review';
  else if (status.status === 'rejected') state = 'rejected';
  else state = 'pending';

  const token = await signOnboardingState(userId, state);
  if (token) jar.set(ONBOARDING_COOKIE, token, onboardingCookieOpts);
  else jar.delete(ONBOARDING_COOKIE);
  return state;
}

import type { OnboardingStatusDto } from '@salychain/sdk-internal';
import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import {
  ONBOARDING_COOKIE,
  ONBOARDING_PENDING,
  ONBOARDING_REJECTED,
  ONBOARDING_REVIEW,
  ONBOARDING_SKIPPED,
} from './onboarding-constants';

const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

/** Keep the middleware onboarding cookie aligned with compliance status. */
export function applyOnboardingCookie(
  jar: Pick<ResponseCookies, 'get' | 'set' | 'delete'>,
  status: OnboardingStatusDto,
): void {
  const current = jar.get(ONBOARDING_COOKIE)?.value;

  if (!status.required || status.complete) {
    jar.delete(ONBOARDING_COOKIE);
    return;
  }

  if (current === ONBOARDING_SKIPPED) return;

  if (status.status === 'pending_review') {
    jar.set(ONBOARDING_COOKIE, ONBOARDING_REVIEW, cookieOpts);
    return;
  }

  if (status.status === 'rejected') {
    jar.set(ONBOARDING_COOKIE, ONBOARDING_REJECTED, cookieOpts);
    return;
  }

  jar.set(ONBOARDING_COOKIE, ONBOARDING_PENDING, cookieOpts);
}

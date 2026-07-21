import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import { safeInternalPath } from '@/lib/session';
import { getDeveloperOnboarding, isOnboardingEnabledForProfile } from '@/lib/onboarding';
import { applyOnboardingCookie, onboardingCookieOpts } from '@/lib/apply-onboarding-cookie';
import { ONBOARDING_COOKIE } from '@/lib/onboarding-constants';
import { signOnboardingState } from '@/lib/onboarding-token';

/**
 * Rebuilds the signed onboarding-state cookie from the backend, then sends
 * the user on their way. The middleware redirects here whenever the cookie
 * is missing or unverifiable — this route is the only way to "recover" from
 * a deleted or forged gate cookie, and it answers from the source of truth.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = safeInternalPath(url.searchParams.get('next'));
  const session = await getSession();
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

  const jar = await cookies();
  try {
    if (await isOnboardingEnabledForProfile('developer')) {
      const status = await getDeveloperOnboarding(session.userId);
      await applyOnboardingCookie(jar, session.userId, status);
    } else {
      const token = await signOnboardingState(session.userId, 'complete');
      if (token) jar.set(ONBOARDING_COOKIE, token, onboardingCookieOpts);
    }
  } catch {
    // Compliance backend unreachable: fail closed to limited (review-mode)
    // access for a short window instead of dropping the gate or loop-
    // redirecting. The next sync after expiry retries the backend.
    const token = await signOnboardingState(session.userId, 'review');
    if (token) jar.set(ONBOARDING_COOKIE, token, { ...onboardingCookieOpts, maxAge: 60 });
  }

  return NextResponse.redirect(new URL(next, req.url));
}

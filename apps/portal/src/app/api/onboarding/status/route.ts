import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import { getDeveloperOnboarding, isOnboardingEnabledForProfile, onboardingProgressPercent } from '@/lib/onboarding';
import { applyOnboardingCookie } from '@/lib/apply-onboarding-cookie';
import {
  ONBOARDING_COOKIE,
  ONBOARDING_REJECTED,
  ONBOARDING_REVIEW,
  ONBOARDING_SKIPPED,
} from '@/lib/onboarding-constants';

export type OnboardingGateMode = 'skipped' | 'review' | 'rejected';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ required: false, limited: false, progress: 0 });
  }

  const enabled = await isOnboardingEnabledForProfile('developer');
  if (!enabled) {
    return NextResponse.json({ required: false, limited: false, progress: 100 });
  }

  const status = await getDeveloperOnboarding(session.userId);
  const jar = await cookies();
  applyOnboardingCookie(jar, status);
  const cookieVal = jar.get(ONBOARDING_COOKIE)?.value;
  const progress = onboardingProgressPercent(status);

  let mode: OnboardingGateMode | null = null;
  if (cookieVal === ONBOARDING_SKIPPED) mode = 'skipped';
  else if (cookieVal === ONBOARDING_REVIEW || status.status === 'pending_review') mode = 'review';
  else if (cookieVal === ONBOARDING_REJECTED || status.status === 'rejected') mode = 'rejected';

  const limited = Boolean(mode && !status.complete);

  return NextResponse.json({
    required: status.required && !status.complete,
    limited,
    mode,
    progress,
    complete: status.complete,
    status: status.status,
    submitted_at: status.submitted_at ?? null,
    label: 'KYC',
  });
}

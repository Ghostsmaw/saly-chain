import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';
import { getBusinessOnboarding, isOnboardingEnabledForProfile, onboardingProgressPercent } from '@/lib/onboarding';
import { applyOnboardingCookie } from '@/lib/apply-onboarding-cookie';
import type { OnboardingGateMode } from '@/components/OnboardingBanner';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ required: false, limited: false, progress: 0 });
  }

  const enabled = await isOnboardingEnabledForProfile('business');
  if (!enabled) {
    return NextResponse.json({ required: false, limited: false, progress: 100 });
  }

  const status = await getBusinessOnboarding(session.userId);
  const jar = await cookies();
  const gateState = await applyOnboardingCookie(jar, session.userId, status);
  const progress = onboardingProgressPercent(status);

  let mode: OnboardingGateMode | null = null;
  if (gateState === 'skipped') mode = 'skipped';
  else if (gateState === 'review' || status.status === 'pending_review') mode = 'review';
  else if (gateState === 'rejected' || status.status === 'rejected') mode = 'rejected';

  const limited = Boolean(mode && !status.complete);

  return NextResponse.json({
    required: status.required && !status.complete,
    limited,
    mode,
    progress,
    complete: status.complete,
    status: status.status,
    submitted_at: status.submitted_at ?? null,
    label: status.profile === 'business' ? 'KYB' : 'KYC',
  });
}

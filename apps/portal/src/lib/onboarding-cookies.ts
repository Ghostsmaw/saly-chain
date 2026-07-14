'use server';

import { cookies } from 'next/headers';
import type { OnboardingStatusDto } from '@salychain/sdk-internal';
import { ONBOARDING_COOKIE } from './onboarding-constants';
import { applyOnboardingCookie } from './apply-onboarding-cookie';

export async function syncOnboardingCookie(status: OnboardingStatusDto | null): Promise<void> {
  const jar = await cookies();
  if (!status) {
    jar.delete(ONBOARDING_COOKIE);
    return;
  }
  applyOnboardingCookie(jar, status);
}

export async function clearOnboardingCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(ONBOARDING_COOKIE);
}

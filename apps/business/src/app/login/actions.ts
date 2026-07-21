'use server';

import { redirect } from 'next/navigation';
import { login, persistSession } from '@/lib/auth';
import { describeAuthError } from '@/lib/auth-error';
import { clearOnboardingCookie, syncOnboardingCookie } from '@/lib/onboarding-cookies';
import { refreshOnboardingGate, startBusinessOnboarding, postAuthRedirectPath } from '@/lib/onboarding';
import { safeInternalPath } from '@/lib/session';

export interface LoginState {
  error?: string;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/') || '/';

  if (!email || !password) {
    return { error: 'Enter your email and password.' };
  }

  let redirectPath = safeInternalPath(next);

  try {
    const session = await login(email, password);
    await persistSession(session);
    const pending = await refreshOnboardingGate(session.id);
    if (pending) {
      const status = await startBusinessOnboarding({
        userId: session.id,
        displayName: session.display_name,
        email: session.email,
      });
      await syncOnboardingCookie(status);
      redirectPath = await postAuthRedirectPath(status);
    } else {
      await clearOnboardingCookie();
    }
  } catch (err) {
    return { error: describeAuthError(err, 'business') };
  }

  redirect(redirectPath);
}

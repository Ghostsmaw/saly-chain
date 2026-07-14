'use server';

import { redirect } from 'next/navigation';
import { persistSession, register } from '@/lib/auth';
import { describeAuthError } from '@/lib/auth-error';
import { clearOnboardingCookie, syncOnboardingCookie } from '@/lib/onboarding-cookies';
import { postAuthRedirectPath, startDeveloperOnboarding } from '@/lib/onboarding';

export interface SignupState {
  error?: string;
}

export async function signupAction(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const displayName = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!email || !password) {
    return { error: 'Enter your email and a password.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }
  if (password !== confirm) {
    return { error: 'Passwords do not match.' };
  }

  let redirectPath = '/';

  try {
    const session = await register({ email, password, displayName: displayName || undefined });
    await persistSession(session);
    const status = await startDeveloperOnboarding({
      userId: session.id,
      displayName: session.display_name,
      email: session.email,
    });
    if (!status || status.complete) {
      await clearOnboardingCookie();
    } else {
      await syncOnboardingCookie(status);
    }
    redirectPath = await postAuthRedirectPath(status);
  } catch (err) {
    return { error: describeAuthError(err, 'developer') };
  }

  redirect(redirectPath);
}

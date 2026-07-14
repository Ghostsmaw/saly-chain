'use server';

import { redirect } from 'next/navigation';
import { login, persistSession } from '@/lib/auth';
import { describeAuthError } from '@/lib/auth-error';

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

  try {
    const session = await login(email, password);
    await persistSession(session);
  } catch (err) {
    return { error: describeAuthError(err, 'admin') };
  }

  redirect(next.startsWith('/') ? next : '/');
}

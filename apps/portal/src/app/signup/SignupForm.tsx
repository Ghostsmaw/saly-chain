'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { AuthError, Field, PasswordField, SubmitButton } from '@/components/auth-ui';
import { signupAction, type SignupState } from './actions';

const initial: SignupState = {};

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initial);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <AuthError message={state.error} />
      <Field label="Name" name="name" autoComplete="name" placeholder="Ada Lovelace" icon={<User className="h-4 w-4" />} />
      <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" icon={<Mail className="h-4 w-4" />} />
      <PasswordField label="Password" name="password" autoComplete="new-password" icon={<Lock className="h-4 w-4" />} />
      <PasswordField label="Confirm password" name="confirm" autoComplete="new-password" icon={<Lock className="h-4 w-4" />} />
      <SubmitButton label="Create account" pendingLabel="Creating…" icon={<UserPlus className="h-4 w-4" />} />
      <p className="text-center text-sm text-text-tertiary">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-brand-300 hover:text-brand-200">
          Sign in
        </Link>
      </p>
    </form>
  );
}

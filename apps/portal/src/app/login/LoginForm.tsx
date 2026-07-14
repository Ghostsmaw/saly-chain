'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { AuthError, Field, PasswordField, SubmitButton } from '@/components/auth-ui';
import { loginAction, type LoginState } from './actions';

const initial: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="max-w-md w-full space-y-6">
      <input type="hidden" name="next" value={next} />
      <AuthError message={state.error} />
      <div className="space-y-4">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          icon={<Mail className="h-4 w-4" />}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          icon={<Lock className="h-4 w-4" />}
          forgotHref="mailto:support@salychain.io?subject=Developer%20account%20password%20reset"
        />
      </div>
      <SubmitButton label="Sign in" pendingLabel="Signing in…" />
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        New here?{' '}
        <Link
          href="/signup"
          className="font-medium text-[#37003b] transition-colors duration-200 ease-in-out hover:text-[#4a0050] dark:text-[#c77fd0] dark:hover:text-[#e0a8e8]"
        >
          Create a developer account
        </Link>
      </p>
    </form>
  );
}

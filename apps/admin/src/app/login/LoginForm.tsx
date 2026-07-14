'use client';

import { useFormStatus } from 'react-dom';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useActionState, useState } from 'react';
import { loginAction, type LoginState } from './actions';

const initial: LoginState = {};

const inputClass =
  'h-11 w-full rounded-saly border border-saly-border bg-saly-bg-secondary py-2.5 text-sm text-saly-text-primary transition-all duration-200 placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20';

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState(loginAction, initial);
  const [showPw, setShowPw] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {state.error ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-saly border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-400"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <div className="space-y-4">
        <label className="group block space-y-2">
          <span className="text-sm font-medium text-saly-text-secondary">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-saly-text-faint group-focus-within:text-saly-text-muted" />
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@salychain.io"
              className={`${inputClass} pl-10`}
            />
          </div>
        </label>

        <label className="group block space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-saly-text-secondary">Password</span>
            <a
              href="mailto:support@salychain.io?subject=Super%20Admin%20password%20reset"
              className="text-sm text-saly-text-muted transition-colors hover:text-saly-text-primary"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-saly-text-faint group-focus-within:text-saly-text-muted" />
            <input
              name="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={`${inputClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-saly p-0.5 text-saly-text-faint hover:text-saly-text-primary"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-saly bg-white py-2.5 text-sm font-medium text-black transition-all active:scale-[0.98] hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-black" />
          Signing in…
        </span>
      ) : (
        'Sign in to console'
      )}
    </button>
  );
}

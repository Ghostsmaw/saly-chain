'use client';

import { useState, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const inputClass =
  'h-11 w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3.5 text-sm text-zinc-900 transition-all duration-200 ease-in-out placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#37003b]/35 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500';

const labelClass = 'text-sm font-medium text-zinc-700 dark:text-zinc-300';

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-400 duration-200 ease-in-out"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function Field({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: ReactNode;
}) {
  return (
    <label className="group block space-y-2">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors duration-200 ease-in-out group-focus-within:text-[#37003b]">
            {icon}
          </span>
        ) : null}
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={icon ? `${inputClass} pl-10` : inputClass}
        />
      </div>
    </label>
  );
}

export function PasswordField({
  label,
  name,
  autoComplete,
  placeholder = '••••••••',
  icon,
  forgotHref,
}: {
  label: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  icon?: ReactNode;
  forgotHref?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <label className="group block space-y-2">
      <div className="flex items-center justify-between">
        <span className={labelClass}>{label}</span>
        {forgotHref ? (
          <a
            href={forgotHref}
            className="text-sm font-medium text-zinc-500 transition-colors duration-200 ease-in-out hover:text-[#37003b] dark:text-zinc-400 dark:hover:text-[#c77fd0]"
          >
            Forgot password?
          </a>
        ) : null}
      </div>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors duration-200 ease-in-out group-focus-within:text-[#37003b]">
            {icon}
          </span>
        ) : null}
        <input
          name={name}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          required
          placeholder={placeholder}
          className={`${icon ? `${inputClass} pl-10` : inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-[#37003b] dark:hover:text-[#c77fd0]"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}

export function SubmitButton({
  label,
  pendingLabel,
  icon: _icon,
}: {
  label: string;
  pendingLabel: string;
  icon?: ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full transform rounded-lg bg-[#37003b] py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-[#4a0050] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <span className="inline-flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {pendingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}

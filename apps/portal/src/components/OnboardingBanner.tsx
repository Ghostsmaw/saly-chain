'use client';

import Link from 'next/link';
import { Clock, ShieldAlert, XCircle } from 'lucide-react';

export type OnboardingGateMode = 'skipped' | 'review' | 'rejected';

export function OnboardingBanner({ progress, label }: { progress: number; label: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <div>
          <p className="text-sm font-medium text-text-primary">Complete your {label} verification to unlock the platform</p>
          <p className="mt-0.5 text-xs text-text-secondary">
            API keys and developer features are locked until verification is complete.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-border">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${Math.max(progress, 4)}%` }} />
            </div>
            <span className="text-xs font-medium text-amber-200">{progress}% complete</span>
          </div>
        </div>
      </div>
      <Link href="/onboarding" className="shrink-0 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-400">
        Continue {label}
      </Link>
    </div>
  );
}

export function VerificationReviewBanner({ label, submittedAt }: { label: string; submittedAt?: string | null }) {
  return (
    <div className="mb-6 flex flex-wrap items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
      <div>
        <p className="text-sm font-medium text-text-primary">{label} submitted — awaiting admin approval</p>
        <p className="mt-0.5 text-xs text-text-secondary">
          Your verification is in the compliance queue. Platform features stay locked until a super-admin approves your account.
        </p>
        {submittedAt ? <p className="mt-1 text-[11px] text-text-muted">Submitted {new Date(submittedAt).toLocaleString()}</p> : null}
      </div>
    </div>
  );
}

export function VerificationRejectedBanner({ label }: { label: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
      <div className="flex items-start gap-3">
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
        <div>
          <p className="text-sm font-medium text-text-primary">{label} not approved</p>
          <p className="mt-0.5 text-xs text-text-secondary">Update your documents and resubmit. Access remains locked until approved.</p>
        </div>
      </div>
      <Link href="/onboarding" className="shrink-0 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-400">
        Update submission
      </Link>
    </div>
  );
}

export function VerificationReviewDashboard({ label, submittedAt }: { label: string; submittedAt?: string | null }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
      <Clock className="mx-auto h-10 w-10 text-amber-300" />
      <h2 className="mt-4 text-lg font-semibold text-text-primary">Under admin review</h2>
      <p className="mt-2 text-sm text-text-secondary">
        Your {label} package was submitted. A super-admin must approve your verification before API keys and other features unlock.
      </p>
      {submittedAt ? <p className="mt-3 text-xs text-text-muted">Submitted {new Date(submittedAt).toLocaleString()}</p> : null}
      <p className="mt-4 text-xs text-text-tertiary">
        You can review your profile in{' '}
        <Link href="/settings" className="text-brand-300 hover:text-brand-200">Settings</Link> while you wait.
      </p>
    </div>
  );
}

export function VerificationRejectedDashboard({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-rose-500/30 bg-rose-500/5 p-8 text-center">
      <XCircle className="mx-auto h-10 w-10 text-rose-300" />
      <h2 className="mt-4 text-lg font-semibold text-text-primary">Verification not approved</h2>
      <p className="mt-2 text-sm text-text-secondary">Update your {label} documents and resubmit for another review.</p>
      <Link href="/onboarding" className="mt-4 inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400">
        Update and resubmit
      </Link>
    </div>
  );
}

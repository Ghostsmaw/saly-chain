'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { CheckCircle2, Clock, FileText, ShieldCheck, XCircle } from 'lucide-react';
import type { OnboardingStatusDto } from '@salychain/sdk-internal';
import { resubmitOnboardingAction, submitOnboardingStepAction } from './actions';

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/70 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

export function OnboardingWizard({
  initial,
  profile,
}: {
  initial: OnboardingStatusDto;
  profile: 'business' | 'developer';
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [resubmitPending, startResubmit] = useTransition();
  const [editingAfterRejection, setEditingAfterRejection] = useState(false);
  const current = status.current_step;

  function submit(step: string, data: Record<string, string>) {
    setError(null);
    startTransition(async () => {
      const res = await submitOnboardingStepAction(step, data);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
      if (res.complete) {
        router.push('/');
        router.refresh();
        return;
      }
      if (res.status?.status === 'pending_review') {
        router.push('/');
        router.refresh();
        return;
      }
      if (res.status) {
        setStatus(res.status);
        return;
      }
      setStatus((prev) => ({
        ...prev,
        steps: prev.steps.map((s) => (s.key === step ? { ...s, status: 'done' as const } : s)),
        current_step: prev.steps.find((s) => s.key !== step && s.status === 'pending')?.key ?? null,
      }));
    });
  }

  function handleResubmit() {
    setError(null);
    startResubmit(async () => {
      const res = await resubmitOnboardingAction();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setStatus(res.status);
      setEditingAfterRejection(false);
      router.push('/');
      router.refresh();
    });
  }

  if (status.complete) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" />
        <h2 className="mt-3 text-lg font-semibold text-text-primary">Verification approved</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Your KYC has been approved. You now have full access to the developer portal.
        </p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400"
        >
          Continue to dashboard
        </button>
      </div>
    );
  }

  if (status.status === 'pending_review') {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
        <Clock className="mx-auto h-10 w-10 text-amber-300" />
        <h2 className="mt-3 text-lg font-semibold text-text-primary">Under admin review</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Your submission is being reviewed on your dashboard. Platform features unlock after admin approval.
        </p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  if (status.status === 'rejected' && !editingAfterRejection) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center">
        <XCircle className="mx-auto h-10 w-10 text-rose-300" />
        <h2 className="mt-3 text-lg font-semibold text-text-primary">Verification not approved</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Update your documents if needed, then resubmit for another review.
        </p>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setEditingAfterRejection(true)}
            className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover"
          >
            Review submission
          </button>
          <button
            type="button"
            onClick={handleResubmit}
            disabled={resubmitPending}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
          >
            {resubmitPending ? 'Resubmitting…' : 'Resubmit for review'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ol className="flex flex-wrap gap-2">
        {status.steps.map((step) => (
          <li
            key={step.key}
            className={[
              'rounded-full px-3 py-1 text-xs font-medium',
              step.status === 'done'
                ? 'bg-emerald-500/15 text-emerald-200'
                : step.key === current
                  ? 'bg-brand-500/20 text-brand-200 ring-1 ring-brand-500/40'
                  : 'bg-surface-card text-text-muted',
            ].join(' ')}
          >
            {step.label}
          </li>
        ))}
      </ol>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      {current === 'business_details' ? (
        <BusinessDetailsForm pending={pending} onSubmit={(data) => submit('business_details', data)} />
      ) : null}
      {current === 'documents' ? (
        <DocumentsForm pending={pending} onSubmit={(data) => submit('documents', data)} />
      ) : null}
      {current === 'beneficial_owners' ? (
        <OwnersForm pending={pending} onSubmit={(data) => submit('beneficial_owners', data)} />
      ) : null}
      {current === 'personal_details' ? (
        <PersonalDetailsForm pending={pending} onSubmit={(data) => submit('personal_details', data)} />
      ) : null}
      {current === 'identity_documents' ? (
        <IdentityDocsForm pending={pending} onSubmit={(data) => submit('identity_documents', data)} />
      ) : null}
      {current === 'address' ? (
        <AddressForm pending={pending} onSubmit={(data) => submit('address', data)} />
      ) : null}
    </div>
  );
}

function BusinessDetailsForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        <ShieldCheck className="h-5 w-5 text-brand-300" /> Business details
      </h3>
      <Field label="Legal business name" name="legal_name" required />
      <Field label="Trading name" name="trading_name" />
      <Field label="Country (ISO code)" name="country" placeholder="NG" required maxLength={2} />
      <Field label="Registration number" name="registration_number" required />
      <Field label="Business type" name="business_type" placeholder="LLC, Ltd, etc." required />
      <Submit pending={pending} label="Continue" />
    </form>
  );
}

function DocumentsForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        <FileText className="h-5 w-5 text-brand-300" /> Company documents
      </h3>
      <p className="text-sm text-text-secondary">Upload filenames are processed by document OCR (dev stub extracts metadata).</p>
      <Field label="Certificate of incorporation" name="incorporation_certificate" placeholder="acme-incorporation.pdf" required />
      <Field label="Proof of address" name="proof_of_address" placeholder="utility-bill.pdf" required />
      <Submit pending={pending} label="Run OCR & continue" />
    </form>
  );
}

function OwnersForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="text-base font-semibold text-text-primary">Beneficial owners</h3>
      <Field label="Primary owner name" name="owner_1_name" required />
      <Field label="Primary owner email" name="owner_1_email" type="email" required />
      <Field label="Ownership %" name="owner_1_pct" placeholder="100" required />
      <Submit pending={pending} label="Submit for review" />
    </form>
  );
}

function PersonalDetailsForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        <ShieldCheck className="h-5 w-5 text-brand-300" /> Personal details
      </h3>
      <Field label="Full legal name" name="full_name" required />
      <Field label="Date of birth" name="date_of_birth" type="date" required />
      <Field label="Nationality" name="nationality" placeholder="NG" required />
      <Field label="Country of residence" name="country" placeholder="NG" maxLength={2} required />
      <Submit pending={pending} label="Continue" />
    </form>
  );
}

function IdentityDocsForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        <FileText className="h-5 w-5 text-brand-300" /> Identity verification
      </h3>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
        ID type
        <select name="id_type" className={inputClass} defaultValue="passport">
          <option value="passport">Passport</option>
          <option value="national_id">National ID</option>
          <option value="drivers_license">Driver&apos;s license</option>
        </select>
      </label>
      <Field label="ID front scan filename" name="id_front" placeholder="passport-front.jpg" required />
      <Field label="ID back scan filename" name="id_back" placeholder="passport-back.jpg" />
      <Submit pending={pending} label="Run OCR & continue" />
    </form>
  );
}

function AddressForm({
  pending,
  onSubmit,
}: {
  pending: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="text-base font-semibold text-text-primary">Proof of address</h3>
      <Field label="Street address" name="street" required />
      <Field label="City" name="city" required />
      <Field label="Postal code" name="postal_code" required />
      <Field label="Country" name="country" placeholder="NG" maxLength={2} required />
      <Submit pending={pending} label="Submit for review" />
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className={inputClass}
      />
    </label>
  );
}

function Submit({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
    >
      {pending ? 'Saving…' : label}
    </button>
  );
}

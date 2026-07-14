'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, FileText, Plus, ShieldCheck, Trash2, Users2, XCircle } from 'lucide-react';
import type { OnboardingStatusDto, OnboardingRequirementDto } from '@salychain/sdk-internal';
import { skipOnboardingAction, resubmitOnboardingAction, submitOnboardingStepAction } from './actions';

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/70 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

const ALLOWED_DOC_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function inferMimeType(filename: string, type: string): string {
  if (type) return type;
  const ext = filename.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  return map[ext ?? ''] ?? '';
}

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
  const [skipPending, startSkip] = useTransition();

  const stepKeys = useMemo(() => status.steps.map((s) => s.key), [status.steps]);
  const initialIdx = Math.max(0, stepKeys.indexOf(status.current_step ?? stepKeys[0] ?? ''));
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  const activeKey = stepKeys[activeIdx] ?? null;
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === stepKeys.length - 1;
  const activeStep = status.steps[activeIdx];

  const [resubmitPending, startResubmit] = useTransition();
  const [editingAfterRejection, setEditingAfterRejection] = useState(false);

  const stepRequirements = useMemo(
    () => (status.requirements ?? []).filter((r) => r.step_key === activeKey),
    [status.requirements, activeKey],
  );
  const useRequirementsForm = stepRequirements.length > 0;
  const formId = `onboarding-step-${activeKey}`;

  function applySuccess(step: string, res: { complete: boolean; status?: OnboardingStatusDto }) {
    if (res.status) {
      setStatus(res.status);
      if (res.status.status === 'pending_review' || res.status.status === 'rejected' || res.complete) {
        return;
      }
      if (!res.complete) {
        const nextIdx = Math.min(activeIdx + 1, stepKeys.length - 1);
        setActiveIdx(nextIdx);
      }
      return;
    }
    setStatus((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.key === step ? { ...s, status: 'done' as const } : s)),
      current_step: prev.steps.find((s) => s.key !== step && s.status === 'pending')?.key ?? null,
    }));
    if (!res.complete) setActiveIdx((i) => Math.min(i + 1, stepKeys.length - 1));
  }

  function submitStep(step: string, data: Record<string, unknown>) {
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
      applySuccess(step, res);
    });
  }

  function handleSkip() {
    startSkip(async () => {
      await skipOnboardingAction();
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
          Your {profile === 'business' ? 'KYB' : 'KYC'} has been approved. You now have full access to the platform.
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
          Your submission was reviewed and could not be approved. Update your documents if needed, then resubmit for
          another review.
        </p>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingAfterRejection(true);
              setActiveIdx(0);
            }}
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
      <div className="flex items-center justify-between gap-3">
        <ol className="flex flex-wrap gap-2">
          {status.steps.map((step, idx) => (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={[
                  'rounded-full px-3 py-1 text-xs font-medium transition',
                  step.status === 'done'
                    ? 'bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                    : idx === activeIdx
                      ? 'bg-brand-500/20 text-brand-200 ring-1 ring-brand-500/40'
                      : 'bg-surface-card text-text-muted hover:bg-surface-cardHover',
                ].join(' ')}
              >
                {step.label}
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={handleSkip}
          disabled={skipPending || pending || status.status === 'rejected'}
          className="shrink-0 text-xs text-text-muted underline-offset-2 hover:text-text-secondary hover:underline disabled:opacity-50"
        >
          {skipPending ? 'Skipping…' : 'Skip for now'}
        </button>
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      {activeKey === 'beneficial_owners' ? (
        <BeneficialOwnersForm
          formId={formId}
          defaults={activeStep?.data}
          onError={setError}
          onSubmit={(data) => submitStep('beneficial_owners', data)}
        />
      ) : null}
      {activeKey !== 'beneficial_owners' && useRequirementsForm && activeKey ? (
        <RequirementsStepForm
          formId={formId}
          stepKey={activeKey}
          requirements={stepRequirements}
          defaults={activeStep?.data}
          onError={setError}
          onSubmit={(data) => submitStep(activeKey, data)}
        />
      ) : null}
      {!useRequirementsForm && activeKey === 'business_details' ? (
        <BusinessDetailsForm
          formId={formId}
          pending={pending}
          defaults={activeStep?.data}
          onSubmit={(data) => submitStep('business_details', data)}
        />
      ) : null}
      {!useRequirementsForm && activeKey === 'documents' ? (
        <DocumentsForm
          formId={formId}
          defaults={activeStep?.data}
          onError={setError}
          onSubmit={(data) => submitStep('documents', data)}
        />
      ) : null}
      {!useRequirementsForm && activeKey === 'personal_details' ? (
        <PersonalDetailsForm
          formId={formId}
          pending={pending}
          defaults={activeStep?.data}
          onSubmit={(data) => submitStep('personal_details', data)}
        />
      ) : null}
      {!useRequirementsForm && activeKey === 'identity_documents' ? (
        <IdentityDocsForm
          formId={formId}
          pending={pending}
          defaults={activeStep?.data}
          onSubmit={(data) => submitStep('identity_documents', data)}
        />
      ) : null}
      {!useRequirementsForm && activeKey === 'address' ? (
        <AddressForm
          formId={formId}
          pending={pending}
          defaults={activeStep?.data}
          onSubmit={(data) => submitStep('address', data)}
        />
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-surface-border pt-4">
        <button
          type="button"
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst || pending}
          className="inline-flex items-center gap-1 rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        {isLast ? (
          <button
            type="submit"
            form={formId}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? 'Submitting…' : 'Submit for review'}
          </button>
        ) : (
          <button
            type="submit"
            form={formId}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? 'Saving…' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function RequirementsStepForm({
  formId,
  stepKey,
  requirements,
  defaults,
  onSubmit,
  onError,
}: {
  formId: string;
  stepKey: string;
  requirements: OnboardingRequirementDto[];
  defaults?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
  onError: (msg: string) => void;
}) {
  const d = defaults ?? {};
  const sorted = [...requirements].sort((a, b) => a.sort_order - b.sort_order);
  const hasDocuments = sorted.some((r) => r.input_type === 'document');

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onError('');
        const form = e.currentTarget;
        const payload: Record<string, unknown> = {};

        try {
          for (const req of sorted) {
            if (req.input_type === 'information') {
              const el = form.elements.namedItem(req.field_key) as HTMLInputElement | null;
              const value = el?.value?.trim() ?? '';
              if (!value) {
                onError(`${req.label} is required`);
                return;
              }
              payload[req.field_key] = value;
              continue;
            }

            const fileEl = form.elements.namedItem(req.field_key) as HTMLInputElement | null;
            const file = fileEl?.files?.[0];
            const prev = d[req.field_key] as Record<string, unknown> | undefined;
            const hasPrev = Boolean(prev?.filename);

            if (file?.size) {
              const mime = inferMimeType(file.name, file.type);
              if (!ALLOWED_DOC_TYPES.has(mime)) {
                onError(`${req.label} must be a PDF, JPG, or PNG file`);
                return;
              }
              if (file.size > 10 * 1024 * 1024) {
                onError(`${req.label} must be 10 MB or smaller`);
                return;
              }
              payload[req.field_key] = {
                filename: file.name,
                size: file.size,
                mime_type: mime,
                uploaded_at: new Date().toISOString(),
              };
            } else if (hasPrev) {
              payload[req.field_key] = prev;
            } else {
              onError(`${req.label} is required`);
              return;
            }
          }
          onSubmit(payload);
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Invalid input');
        }
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        {hasDocuments ? (
          <FileText className="h-5 w-5 text-brand-300" />
        ) : (
          <ShieldCheck className="h-5 w-5 text-brand-300" />
        )}
        {stepKey.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </h3>
      {sorted.map((req) => {
        if (req.input_type === 'document') {
          const prev = d[req.field_key] as { filename?: string } | undefined;
          return (
            <div key={req.id}>
              {prev?.filename ? (
                <p className="mb-1 text-xs text-emerald-300">Previously uploaded: {prev.filename}</p>
              ) : null}
              <FileUploadField
                label={req.label}
                name={req.field_key}
                accept={req.accept ?? '.pdf,.jpg,.jpeg,.png,.webp'}
                required={!prev?.filename}
              />
            </div>
          );
        }
        const inputType =
          req.value_format === 'email'
            ? 'email'
            : req.value_format === 'date'
              ? 'date'
              : req.value_format === 'number'
                ? 'number'
                : 'text';
        return (
          <Field
            key={req.id}
            label={req.label}
            name={req.field_key}
            type={inputType}
            required
            placeholder={req.placeholder ?? undefined}
            maxLength={req.value_format === 'country' ? 2 : undefined}
            defaultValue={String(d[req.field_key] ?? '')}
          />
        );
      })}
    </form>
  );
}

type StepFormProps = {
  formId: string;
  pending: boolean;
  defaults?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
};

function BusinessDetailsForm({ formId, pending, defaults, onSubmit }: StepFormProps) {
  const d = defaults ?? {};
  return (
    <form
      id={formId}
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
      <Field label="Legal business name" name="legal_name" required defaultValue={String(d.legal_name ?? '')} />
      <Field label="Trading name" name="trading_name" defaultValue={String(d.trading_name ?? '')} />
      <Field label="Country (ISO code)" name="country" placeholder="NG" required maxLength={2} defaultValue={String(d.country ?? '')} />
      <Field label="Registration number" name="registration_number" required defaultValue={String(d.registration_number ?? '')} />
      <Field label="Business type" name="business_type" placeholder="LLC, Ltd, etc." required defaultValue={String(d.business_type ?? '')} />
    </form>
  );
}

function DocumentsForm({
  formId,
  defaults,
  onSubmit,
  onError,
}: {
  formId: string;
  defaults?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
  onError: (msg: string) => void;
}) {
  const d = defaults ?? {};
  const inc = d.incorporation_certificate as Record<string, unknown> | undefined;
  const addr = d.proof_of_address as Record<string, unknown> | undefined;
  const hasInc = Boolean(inc?.filename);
  const hasAddr = Boolean(addr?.filename);

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onError('');
        const form = e.currentTarget;
        const incFile = (form.elements.namedItem('incorporation_certificate') as HTMLInputElement).files?.[0];
        const addrFile = (form.elements.namedItem('proof_of_address') as HTMLInputElement).files?.[0];

        const buildMeta = (file: File) => {
          const mime = inferMimeType(file.name, file.type);
          if (!ALLOWED_DOC_TYPES.has(mime)) {
            throw new Error(`${file.name} must be a PDF, JPG, or PNG file`);
          }
          if (file.size > 10 * 1024 * 1024) {
            throw new Error(`${file.name} must be 10 MB or smaller`);
          }
          return {
            filename: file.name,
            size: file.size,
            mime_type: mime,
            uploaded_at: new Date().toISOString(),
          };
        };

        try {
          const incorporation_certificate =
            incFile?.size ? buildMeta(incFile) : hasInc ? inc : null;
          const proof_of_address =
            addrFile?.size ? buildMeta(addrFile) : hasAddr ? addr : null;

          if (!incorporation_certificate) {
            onError('Certificate of incorporation is required');
            return;
          }
          if (!proof_of_address) {
            onError('Proof of address is required');
            return;
          }

          onSubmit({ incorporation_certificate, proof_of_address });
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Invalid document');
        }
      }}
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
        <FileText className="h-5 w-5 text-brand-300" /> Company documents
      </h3>
      <p className="text-sm text-text-secondary">
        Upload your incorporation certificate and proof of address. Document metadata is verified with OCR — files stay on
        your device in this preview environment.
      </p>
      {inc?.filename ? (
        <p className="text-xs text-emerald-300">Previously uploaded: {String(inc.filename)}</p>
      ) : null}
      {addr?.filename ? (
        <p className="text-xs text-emerald-300">Previously uploaded: {String(addr.filename)}</p>
      ) : null}
      <FileUploadField
        label="Certificate of incorporation"
        name="incorporation_certificate"
        accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
        required={!hasInc}
      />
      <FileUploadField
        label="Proof of address"
        name="proof_of_address"
        accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
        required={!hasAddr}
      />
    </form>
  );
}

function buildDocumentMeta(file: File): UploadedDocumentMeta {
  const mime = inferMimeType(file.name, file.type);
  if (!ALLOWED_DOC_TYPES.has(mime)) {
    throw new Error(`${file.name} must be a PDF, JPG, or PNG file`);
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error(`${file.name} must be 10 MB or smaller`);
  }
  return {
    filename: file.name,
    size: file.size,
    mime_type: mime,
    uploaded_at: new Date().toISOString(),
  };
}

type OwnerDraft = {
  id: string;
  name: string;
  email: string;
  ownership_pct: string;
  id_card?: Record<string, unknown> | null;
  id_card_back?: Record<string, unknown> | null;
  proof_of_address?: Record<string, unknown> | null;
};

function ownersFromDefaults(d: Record<string, unknown>): OwnerDraft[] {
  if (Array.isArray(d.owners) && d.owners.length > 0) {
    return d.owners.map((entry, index) => {
      const o = (entry ?? {}) as Record<string, unknown>;
      return {
        id: `owner-${index}`,
        name: String(o.name ?? ''),
        email: String(o.email ?? ''),
        ownership_pct: String(o.ownership_pct ?? ''),
        id_card: (o.id_card as Record<string, unknown> | null) ?? null,
        id_card_back: (o.id_card_back as Record<string, unknown> | null) ?? null,
        proof_of_address: (o.proof_of_address as Record<string, unknown> | null) ?? null,
      };
    });
  }
  if (d.owner_1_name) {
    return [
      {
        id: 'owner-0',
        name: String(d.owner_1_name ?? ''),
        email: String(d.owner_1_email ?? ''),
        ownership_pct: String(d.owner_1_pct ?? ''),
        id_card: null,
        id_card_back: null,
        proof_of_address: null,
      },
    ];
  }
  return [{ id: 'owner-0', name: '', email: '', ownership_pct: '' }];
}

type UploadedDocumentMeta = {
  filename: string;
  size: number;
  mime_type: string;
  uploaded_at: string;
};

function BeneficialOwnersForm({
  formId,
  defaults,
  onSubmit,
  onError,
}: {
  formId: string;
  defaults?: Record<string, unknown> | null;
  onSubmit: (data: Record<string, unknown>) => void;
  onError: (msg: string) => void;
}) {
  const d = defaults ?? {};
  const [owners, setOwners] = useState<OwnerDraft[]>(() => ownersFromDefaults(d));

  function addOwner() {
    setOwners((prev) => [
      ...prev,
      { id: `owner-${Date.now()}`, name: '', email: '', ownership_pct: '' },
    ]);
  }

  function removeOwner(id: string) {
    setOwners((prev) => (prev.length <= 1 ? prev : prev.filter((o) => o.id !== id)));
  }

  return (
    <form
      id={formId}
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onError('');
        const form = e.currentTarget;

        try {
          const payload: Record<string, unknown>[] = [];

          for (let i = 0; i < owners.length; i++) {
            const owner = owners[i]!;
            const name = (form.elements.namedItem(`owner_name_${i}`) as HTMLInputElement | null)?.value?.trim() ?? '';
            const email = (form.elements.namedItem(`owner_email_${i}`) as HTMLInputElement | null)?.value?.trim() ?? '';
            const ownership_pct =
              (form.elements.namedItem(`owner_pct_${i}`) as HTMLInputElement | null)?.value?.trim() ?? '';

            if (!name) {
              onError(`Beneficial owner ${i + 1}: name is required`);
              return;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              onError(`Beneficial owner ${i + 1}: a valid email is required`);
              return;
            }
            if (!ownership_pct || Number.isNaN(Number(ownership_pct))) {
              onError(`Beneficial owner ${i + 1}: ownership % is required`);
              return;
            }
            const pct = Number(ownership_pct);
            if (pct <= 0 || pct > 100) {
              onError(`Beneficial owner ${i + 1}: ownership % must be between 1 and 100`);
              return;
            }

            const idCardFile = (form.elements.namedItem(`owner_id_card_${i}`) as HTMLInputElement | null)?.files?.[0];
            const idBackFile = (form.elements.namedItem(`owner_id_card_back_${i}`) as HTMLInputElement | null)?.files?.[0];
            const poaFile = (form.elements.namedItem(`owner_proof_of_address_${i}`) as HTMLInputElement | null)?.files?.[0];

            const prevId = owner.id_card;
            const prevIdBack = owner.id_card_back;
            const prevPoa = owner.proof_of_address;

            let id_card: UploadedDocumentMeta | Record<string, unknown> | null = null;
            if (idCardFile?.size) {
              id_card = buildDocumentMeta(idCardFile);
            } else if (prevId?.filename) {
              id_card = prevId as UploadedDocumentMeta;
            } else {
              onError(`Beneficial owner ${i + 1}: ID card (front) is required`);
              return;
            }

            let id_card_back: UploadedDocumentMeta | Record<string, unknown> | null = null;
            if (idBackFile?.size) {
              id_card_back = buildDocumentMeta(idBackFile);
            } else if (prevIdBack?.filename) {
              id_card_back = prevIdBack as UploadedDocumentMeta;
            }

            let proof_of_address: UploadedDocumentMeta | Record<string, unknown> | null = null;
            if (poaFile?.size) {
              proof_of_address = buildDocumentMeta(poaFile);
            } else if (prevPoa?.filename) {
              proof_of_address = prevPoa as UploadedDocumentMeta;
            } else {
              onError(`Beneficial owner ${i + 1}: proof of address is required`);
              return;
            }

            payload.push({
              name,
              email,
              ownership_pct,
              id_card,
              id_card_back,
              proof_of_address,
            });
          }

          const totalPct = payload.reduce((sum, o) => sum + Number(o.ownership_pct), 0);
          if (totalPct > 100) {
            onError('Total ownership cannot exceed 100%');
            return;
          }

          onSubmit({ owners: payload });
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Invalid owner details');
        }
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
            <Users2 className="h-5 w-5 text-brand-300" />
            Beneficial owners
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Add everyone who owns 25% or more of the business. Upload a government ID and proof of address for each owner.
          </p>
        </div>
        <button
          type="button"
          onClick={addOwner}
          className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-cardHover hover:text-text-primary"
        >
          <Plus className="h-3.5 w-3.5" />
          Add owner
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {owners.map((owner, index) => {
          const idPrev = owner.id_card as { filename?: string } | undefined;
          const idBackPrev = owner.id_card_back as { filename?: string } | undefined;
          const poaPrev = owner.proof_of_address as { filename?: string } | undefined;

          return (
            <div key={owner.id} className="rounded-xl border border-surface-border bg-surface-card/40 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-text-primary">Owner {index + 1}</p>
                {owners.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeOwner(owner.id)}
                    className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <Field label="Full legal name" name={`owner_name_${index}`} required defaultValue={owner.name} />
                <Field label="Email" name={`owner_email_${index}`} type="email" required defaultValue={owner.email} />
                <Field
                  label="Ownership %"
                  name={`owner_pct_${index}`}
                  type="number"
                  placeholder="25"
                  required
                  defaultValue={owner.ownership_pct}
                />
                {idPrev?.filename ? (
                  <p className="text-xs text-emerald-300">ID card on file: {idPrev.filename}</p>
                ) : null}
                <FileUploadField
                  label="Government ID (front)"
                  name={`owner_id_card_${index}`}
                  accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                  required={!idPrev?.filename}
                />
                {idBackPrev?.filename ? (
                  <p className="text-xs text-emerald-300">ID back on file: {idBackPrev.filename}</p>
                ) : null}
                <FileUploadField
                  label="Government ID (back, optional)"
                  name={`owner_id_card_back_${index}`}
                  accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                />
                {poaPrev?.filename ? (
                  <p className="text-xs text-emerald-300">Proof of address on file: {poaPrev.filename}</p>
                ) : null}
                <FileUploadField
                  label="Proof of address"
                  name={`owner_proof_of_address_${index}`}
                  accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                  required={!poaPrev?.filename}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}

function PersonalDetailsForm({ formId, pending, defaults, onSubmit }: StepFormProps) {
  const d = defaults ?? {};
  return (
    <form
      id={formId}
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
      <Field label="Full legal name" name="full_name" required defaultValue={String(d.full_name ?? '')} />
      <Field label="Date of birth" name="date_of_birth" type="date" required defaultValue={String(d.date_of_birth ?? '')} />
      <Field label="Nationality" name="nationality" placeholder="NG" required defaultValue={String(d.nationality ?? '')} />
      <Field label="Country of residence" name="country" placeholder="NG" maxLength={2} required defaultValue={String(d.country ?? '')} />
    </form>
  );
}

function IdentityDocsForm({ formId, pending, defaults, onSubmit }: StepFormProps) {
  const d = defaults ?? {};
  return (
    <form
      id={formId}
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
        <select name="id_type" className={inputClass} defaultValue={String(d.id_type ?? 'passport')}>
          <option value="passport">Passport</option>
          <option value="national_id">National ID</option>
          <option value="drivers_license">Driver&apos;s license</option>
        </select>
      </label>
      <Field label="ID front scan filename" name="id_front" placeholder="passport-front.jpg" required defaultValue={String((d.id_front as { filename?: string })?.filename ?? d.id_front ?? '')} />
      <Field label="ID back scan filename" name="id_back" placeholder="passport-back.jpg" defaultValue={String((d.id_back as { filename?: string })?.filename ?? d.id_back ?? '')} />
    </form>
  );
}

function AddressForm({ formId, pending, defaults, onSubmit }: StepFormProps) {
  const d = defaults ?? {};
  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(fd.entries()) as Record<string, string>);
      }}
    >
      <h3 className="text-base font-semibold text-text-primary">Proof of address</h3>
      <Field label="Street address" name="street" required defaultValue={String(d.street ?? '')} />
      <Field label="City" name="city" required defaultValue={String(d.city ?? '')} />
      <Field label="Postal code" name="postal_code" required defaultValue={String(d.postal_code ?? '')} />
      <Field label="Country" name="country" placeholder="NG" maxLength={2} required defaultValue={String(d.country ?? '')} />
    </form>
  );
}

function FileUploadField({
  label,
  name,
  accept,
  required,
}: {
  label: string;
  name: string;
  accept: string;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
      {label}
      <div className="rounded-xl border border-dashed border-surface-borderStrong bg-surface-card/40 p-4 transition hover:border-brand-500/40 hover:bg-surface-cardHover/40">
        <input
          type="file"
          name={name}
          accept={accept}
          required={required}
          className="block w-full text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-brand-500/15 file:px-3 file:py-2 file:text-xs file:font-medium file:text-brand-200 hover:file:bg-brand-500/25"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <p className="mt-2 text-[11px] text-text-muted">
          {fileName ? `Selected: ${fileName}` : 'PDF, JPG, or PNG · max 10 MB'}
        </p>
      </div>
    </label>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  maxLength,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        className={inputClass}
      />
    </label>
  );
}

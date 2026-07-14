import { FileText, ShieldCheck } from 'lucide-react';
import { Card, CardHeader } from './Card.js';
import { Chip } from './Chip.js';

export interface VerificationStepDisplay {
  key: string;
  label: string;
  status: 'pending' | 'done';
  data: Record<string, unknown> | null;
}

export interface VerificationFieldDisplay {
  field_key: string;
  label: string;
}

export interface VerificationProfileViewProps {
  title: string;
  subtitle?: string;
  status: string;
  profile?: string | null;
  submittedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  tier?: string | null;
  steps: VerificationStepDisplay[];
  requirements?: VerificationFieldDisplay[];
  editHref?: string;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function formatLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function statusTone(status: string): 'success' | 'danger' | 'warning' | 'info' | 'neutral' {
  switch (status) {
    case 'complete':
    case 'APPROVED':
      return 'success';
    case 'rejected':
    case 'REJECTED':
      return 'danger';
    case 'pending_review':
      return 'warning';
    case 'in_progress':
      return 'info';
    default:
      return 'neutral';
  }
}

function isDocument(value: unknown): value is { filename: string; size?: number; mime_type?: string } {
  return Boolean(value && typeof value === 'object' && 'filename' in value && (value as { filename: unknown }).filename);
}

function DataValue({ value }: { value: unknown }) {
  if (value === null || value === undefined || value === '') {
    return <span className="text-text-muted">—</span>;
  }
  if (isDocument(value)) {
    return (
      <span className="inline-flex items-center gap-1.5 text-text-primary">
        <FileText className="h-3.5 w-3.5 text-brand-300" />
        {value.filename}
        {value.size ? <span className="text-text-muted">({Math.round(value.size / 1024)} KB)</span> : null}
      </span>
    );
  }
  if (typeof value === 'object') {
    return (
      <pre className="overflow-x-auto rounded-lg bg-surface-card/60 p-2 text-[11px] text-text-secondary">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  return <span className="text-text-primary">{String(value)}</span>;
}

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="mt-1">
        <DataValue value={value} />
      </dd>
    </div>
  );
}

function BeneficialOwnersBlock({ owners }: { owners: unknown[] }) {
  return (
    <div className="flex flex-col gap-3">
      {owners.map((entry, index) => {
        const owner = (entry ?? {}) as Record<string, unknown>;
        return (
          <div key={index} className="rounded-xl border border-surface-border bg-surface-card/40 p-4">
            <p className="mb-3 text-sm font-medium text-text-primary">Owner {index + 1}</p>
            <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <Field label="Name" value={owner.name} />
              <Field label="Email" value={owner.email} />
              <Field label="Ownership %" value={owner.ownership_pct} />
              <Field label="ID card" value={owner.id_card} />
              <Field label="ID back" value={owner.id_card_back} />
              <Field label="Proof of address" value={owner.proof_of_address} />
            </dl>
          </div>
        );
      })}
    </div>
  );
}

function StepDataPanel({
  stepKey,
  data,
  requirements,
}: {
  stepKey: string;
  data: Record<string, unknown>;
  requirements?: VerificationFieldDisplay[];
}) {
  if (stepKey === 'beneficial_owners' && Array.isArray(data.owners)) {
    return <BeneficialOwnersBlock owners={data.owners} />;
  }

  const labelFor = (key: string) => requirements?.find((r) => r.field_key === key)?.label ?? formatLabel(key);
  const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '');
  if (entries.length === 0) {
    return <p className="text-sm text-text-muted">No data submitted for this step.</p>;
  }

  return (
    <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
      {entries.map(([key, value]) => (
        <Field key={key} label={labelFor(key)} value={value} />
      ))}
    </dl>
  );
}

export function VerificationProfileView({
  title,
  subtitle,
  status,
  profile,
  submittedAt,
  approvedAt,
  rejectedAt,
  tier,
  steps,
  requirements,
  editHref,
}: VerificationProfileViewProps) {
  const doneCount = steps.filter((s) => s.status === 'done').length;
  const notStarted = status === 'not_started' || steps.length === 0;

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle ?? (notStarted ? 'Verification has not been started' : `${doneCount}/${steps.length} steps complete`)}
        right={<ShieldCheck className="h-5 w-5 text-brand-300" />}
      />
      {notStarted ? (
        <p className="px-4 pb-4 text-sm text-text-muted">You have not submitted verification information yet.</p>
      ) : (
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone={statusTone(status)}>{formatLabel(status)}</Chip>
            {profile ? <Chip tone="neutral">{formatLabel(profile)}</Chip> : null}
            {tier ? <Chip tone="info">Tier {tier.replace('TIER_', '')}</Chip> : null}
          </div>

          <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <Field label="Submitted" value={formatDate(submittedAt)} />
            <Field label="Approved" value={formatDate(approvedAt)} />
            <Field label="Last rejection" value={formatDate(rejectedAt)} />
          </dl>

          {status === 'rejected' && editHref ? (
            <p className="text-sm text-text-secondary">
              Your submission was rejected.{' '}
              <a href={editHref} className="text-brand-300 hover:text-brand-200">
                Update and resubmit verification
              </a>
            </p>
          ) : null}

          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div key={step.key} className="rounded-xl border border-surface-border bg-surface-card/30 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-medium text-text-primary">{step.label}</h4>
                  <Chip tone={step.status === 'done' ? 'success' : 'neutral'}>
                    {step.status === 'done' ? 'Complete' : 'Pending'}
                  </Chip>
                </div>
                {step.data ? (
                  <StepDataPanel
                    stepKey={step.key}
                    data={step.data}
                    {...(requirements ? { requirements } : {})}
                  />
                ) : (
                  <p className="text-sm text-text-muted">No submission yet.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

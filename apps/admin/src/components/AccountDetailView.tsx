import Link from 'next/link';
import { Building2, Code2, FileText, ShieldCheck, User, Wallet } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { AccountDetail } from '@/lib/api';

function roleTone(role: string): 'brand' | 'success' | 'info' | 'neutral' {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'brand';
    case 'BUSINESS':
      return 'success';
    case 'DEVELOPER':
      return 'info';
    default:
      return 'neutral';
  }
}

function roleLabel(role: string): string {
  return role.charAt(0) + role.slice(1).toLowerCase().replace('_', ' ');
}

function statusTone(status: string): 'success' | 'danger' | 'warning' | 'info' | 'neutral' {
  switch (status) {
    case 'ACTIVE':
    case 'complete':
    case 'APPROVED':
      return 'success';
    case 'SUSPENDED':
    case 'REJECTED':
      return 'danger';
    case 'pending_review':
    case 'OPEN':
    case 'IN_REVIEW':
      return 'warning';
    case 'rejected':
      return 'danger';
    case 'in_progress':
      return 'info';
    default:
      return 'neutral';
  }
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

function StepDataPanel({ stepKey, data }: { stepKey: string; data: Record<string, unknown> }) {
  if (stepKey === 'beneficial_owners' && Array.isArray(data.owners)) {
    return <BeneficialOwnersBlock owners={data.owners} />;
  }

  const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '');
  if (entries.length === 0) {
    return <p className="text-sm text-text-muted">No data submitted for this step.</p>;
  }

  return (
    <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
      {entries.map(([key, value]) => (
        <Field key={key} label={formatLabel(key)} value={value} />
      ))}
    </dl>
  );
}

export function AccountDetailView({ detail, backHref, backLabel }: { detail: AccountDetail; backHref: string; backLabel: string }) {
  const { user, onboarding, tier, wallets, complianceCases, delegations } = detail;
  const showVerification = user.role === 'BUSINESS' || user.role === 'DEVELOPER';

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={backHref} className="text-xs text-brand-300 hover:text-brand-200">
            ← {backLabel}
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-sm font-semibold text-white">
              {(user.display_name || user.email).slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">{user.display_name || user.email}</h1>
              <p className="text-sm text-text-secondary">{user.email}</p>
            </div>
          </div>
          <p className="mt-2 font-mono text-xs text-text-muted">{user.id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone={roleTone(user.role)}>{roleLabel(user.role)}</Chip>
          <Chip tone={statusTone(user.status)}>{user.status}</Chip>
          {tier?.tier ? <Chip tone="info">Tier {tier.tier}</Chip> : null}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Account information"
            subtitle="Identity record from the platform directory"
            right={<User className="h-5 w-5 text-text-muted" />}
          />
          <dl className="grid grid-cols-1 gap-4 px-4 pb-4 text-sm md:grid-cols-2">
            <Field label="Display name" value={user.display_name} />
            <Field label="Email" value={user.email} />
            <Field label="Role" value={roleLabel(user.role)} />
            <Field label="Status" value={user.status} />
            <Field label="User ID" value={user.id} />
            <Field label="Created" value={formatDate(user.created_at)} />
            <Field label="Last updated" value={formatDate(user.updated_at)} />
          </dl>
        </Card>

        <Card>
          <CardHeader title="Quick stats" />
          <dl className="flex flex-col gap-3 px-4 pb-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Wallets</dt>
              <dd className="font-medium text-text-primary">{wallets.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-text-muted">Compliance cases</dt>
              <dd className="font-medium text-text-primary">{complianceCases.length}</dd>
            </div>
            {user.role === 'DEVELOPER' ? (
              <div className="flex items-center justify-between">
                <dt className="text-text-muted">Agent delegations</dt>
                <dd className="font-medium text-text-primary">{delegations.length}</dd>
              </div>
            ) : null}
            {onboarding ? (
              <div className="flex items-center justify-between">
                <dt className="text-text-muted">Verification</dt>
                <dd>
                  <Chip tone={statusTone(onboarding.status)}>{formatLabel(onboarding.status)}</Chip>
                </dd>
              </div>
            ) : null}
            {onboarding?.status === 'pending_review' ? (
              <p className="text-xs text-amber-300">Awaiting admin approval in Compliance queue</p>
            ) : null}
          </dl>
        </Card>
      </div>

      {showVerification ? (
        <Card>
          <CardHeader
            title={user.role === 'BUSINESS' ? 'KYB verification' : 'KYC verification'}
            subtitle={
              onboarding?.profile
                ? `${onboarding.flow ?? 'progressive'} · ${onboarding.steps.filter((s) => s.status === 'done').length}/${onboarding.steps.length} steps complete`
                : 'Onboarding has not been started'
            }
            right={<ShieldCheck className="h-5 w-5 text-brand-300" />}
          />
          {!onboarding || onboarding.status === 'not_started' ? (
            <p className="px-4 pb-4 text-sm text-text-muted">This account has not started verification onboarding yet.</p>
          ) : (
            <div className="flex flex-col gap-4 px-4 pb-4">
              <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <Field label="Flow status" value={formatLabel(onboarding.status)} />
                <Field label="Profile" value={onboarding.profile} />
                <Field label="Submitted" value={formatDate(onboarding.submitted_at)} />
                <Field label="KYC tier" value={tier?.tier ?? onboarding.tier} />
              </dl>

              <div className="flex flex-col gap-4">
                {onboarding.steps.map((step) => (
                  <div key={step.key} className="rounded-xl border border-surface-border bg-surface-card/30 p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-medium text-text-primary">{step.label}</h4>
                      <Chip tone={step.status === 'done' ? 'success' : 'neutral'}>{step.status === 'done' ? 'Complete' : 'Pending'}</Chip>
                    </div>
                    {step.data ? (
                      <StepDataPanel stepKey={step.key} data={step.data} />
                    ) : (
                      <p className="text-sm text-text-muted">No submission yet.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Custodial wallets"
            subtitle="Wallets linked to this account"
            right={<Wallet className="h-5 w-5 text-text-muted" />}
          />
          {wallets.length === 0 ? (
            <p className="px-4 pb-4 text-sm text-text-muted">No wallets provisioned for this account.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-divider text-xs uppercase tracking-wider text-text-muted">
                    <th className="px-4 py-2 font-medium">Chain</th>
                    <th className="px-4 py-2 font-medium">Address</th>
                    <th className="px-4 py-2 font-medium">Kind</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((w) => (
                    <tr key={w.id} className="border-b border-surface-divider/60">
                      <td className="px-4 py-2 text-text-primary">{w.chain}</td>
                      <td className="max-w-[180px] truncate px-4 py-2 font-mono text-[11px] text-text-secondary">{w.address}</td>
                      <td className="px-4 py-2 text-text-secondary">{w.kind}</td>
                      <td className="px-4 py-2">
                        <Chip tone={statusTone(w.status)}>{w.status}</Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Compliance cases" subtitle="KYC/KYB review queue entries" right={<ShieldCheck className="h-5 w-5 text-text-muted" />} />
          {complianceCases.length === 0 ? (
            <p className="px-4 pb-4 text-sm text-text-muted">No compliance cases linked to this account.</p>
          ) : (
            <ul className="flex flex-col gap-2 px-4 pb-4">
              {complianceCases.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/compliance/${c.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-surface-border bg-surface-card/40 px-3 py-2 transition hover:bg-surface-cardHover/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">{c.summary}</p>
                      <p className="font-mono text-[11px] text-text-muted">{c.id}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Chip tone={statusTone(c.priority)}>{c.priority}</Chip>
                      <Chip tone={statusTone(c.status)}>{c.status}</Chip>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {user.role === 'DEVELOPER' && delegations.length > 0 ? (
        <Card>
          <CardHeader title="Agent delegations" subtitle="Scopes granted to AI agents" right={<Code2 className="h-5 w-5 text-text-muted" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-surface-divider text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-4 py-2 font-medium">Agent</th>
                  <th className="px-4 py-2 font-medium">Scopes</th>
                  <th className="px-4 py-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {delegations.map((d) => (
                  <tr key={`${d.user_id}-${d.agent_id}`} className="border-b border-surface-divider/60">
                    <td className="px-4 py-2 font-mono text-[11px] text-text-secondary">{d.agent_id}</td>
                    <td className="px-4 py-2 text-text-secondary">{(d.scopes ?? []).join(', ') || '—'}</td>
                    <td className="px-4 py-2 text-[11px] text-text-muted">{formatDate(d.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {user.role === 'BUSINESS' ? (
        <Card className="border-brand-500/20 bg-brand-500/5">
          <CardHeader
            title="Business account"
            subtitle="This account uses the business surface for treasury, payroll, and KYB"
            right={<Building2 className="h-5 w-5 text-brand-300" />}
          />
        </Card>
      ) : null}
    </div>
  );
}

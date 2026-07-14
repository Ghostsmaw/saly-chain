'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Building2,
  CheckCircle2,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Pencil,
  Plus,
  ScrollText,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  ToggleLeft,
  Trash2,
  UserPlus,
  UserX,
  Users2,
} from 'lucide-react';
import type { AdminSettingsBundle } from '@/lib/api';
import {
  SettingsPanel,
  settingsGhostBtnClass,
  settingsInputClass,
  settingsPrimaryBtnClass,
  settingsRowClass,
  settingsSearchClass,
} from '@/components/saly/settings/SettingsPanel';
import { SalyBadge } from '@/components/saly/ui';
import {
  createRoleAction,
  createVerificationRequirementAction,
  deleteVerificationRequirementAction,
  inviteAdminAction,
  revokeAdminAction,
  saveGeneralSettingsAction,
  toggleFeatureFlagAction,
  updateRoleAction,
  updateVerificationRequirementAction,
} from '@/app/settings/actions';
import {
  DeleteRequirementDialog,
  InviteAdminDialog,
  RequirementEditorDialog,
  RevokeAdminDialog,
  RoleEditorDialog,
  type RequirementFormInput,
} from '@/components/settings-dialogs';

type TabKey = 'general' | 'team' | 'roles' | 'verification' | 'flags' | 'audit';

const TABS: { key: TabKey; label: string; description: string; icon: React.ReactNode }[] = [
  { key: 'general', label: 'General', description: 'Org profile & security', icon: <SlidersHorizontal className="h-4 w-4" /> },
  { key: 'team', label: 'Team & access', description: 'Admin members', icon: <Users2 className="h-4 w-4" /> },
  { key: 'roles', label: 'Roles (RBAC)', description: 'Permission sets', icon: <KeyRound className="h-4 w-4" /> },
  { key: 'verification', label: 'KYC / KYB', description: 'Documents & information to collect', icon: <ShieldCheck className="h-4 w-4" /> },
  { key: 'flags', label: 'Feature flags', description: 'Rollout toggles', icon: <ToggleLeft className="h-4 w-4" /> },
  { key: 'audit', label: 'Audit log', description: 'Privileged actions', icon: <ScrollText className="h-4 w-4" /> },
];

export function SettingsTabs({
  data,
  currentUserEmail,
}: {
  data: AdminSettingsBundle;
  currentUserEmail?: string | null;
}) {
  const [tab, setTab] = useState<TabKey>('general');

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <nav className="flex h-fit flex-row gap-1.5 overflow-x-auto rounded-saly-lg border border-saly-border bg-saly-bg-secondary p-2 lg:flex-col lg:gap-1">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={[
                'group flex shrink-0 items-center gap-3 rounded-saly px-3 py-2.5 text-left transition lg:w-full',
                active
                  ? 'bg-white/[0.08] text-saly-text-primary ring-1 ring-white/10'
                  : 'text-saly-text-muted hover:bg-saly-bg-hover hover:text-saly-text-primary',
              ].join(' ')}
            >
              <span
                className={[
                  'grid h-9 w-9 shrink-0 place-items-center rounded-saly transition',
                  active ? 'bg-white text-black' : 'bg-saly-bg-hover text-saly-text-faint group-hover:text-saly-text-secondary',
                ].join(' ')}
              >
                {t.icon}
              </span>
              <span className="hidden min-w-0 lg:block">
                <span className="block text-sm font-medium">{t.label}</span>
                <span className="block truncate text-[11px] text-saly-text-faint">{t.description}</span>
              </span>
              <span className="text-sm font-medium lg:hidden">{t.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="min-w-0">
        {tab === 'general' ? <GeneralTab general={data.general} /> : null}
        {tab === 'team' ? (
          <TeamTab team={data.team} roles={data.roles} currentUserEmail={currentUserEmail} />
        ) : null}
        {tab === 'roles' ? <RolesTab roles={data.roles} /> : null}
        {tab === 'verification' ? <VerificationTab requirements={data.verificationRequirements} /> : null}
        {tab === 'flags' ? <FlagsTab flags={data.flags} /> : null}
        {tab === 'audit' ? <AuditTab audit={data.audit} /> : null}
      </div>
    </div>
  );
}

function GeneralTab({ general }: { general: AdminSettingsBundle['general'] }) {
  const [orgName, setOrgName] = useState(general.org_name);
  const [supportEmail, setSupportEmail] = useState(general.support_email);
  const [region, setRegion] = useState(general.region);
  const [security, setSecurity] = useState(general.security);
  const [notify, setNotify] = useState(general.notifications);
  const [saved, setSaved] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function persist(patch: Parameters<typeof saveGeneralSettingsAction>[0]) {
    startTransition(async () => {
      const res = await saveGeneralSettingsAction(patch);
      setSaved(res.ok ? 'Saved' : res.error);
      setTimeout(() => setSaved(null), 3000);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {saved ? (
        <p className={`text-xs ${saved === 'Saved' ? 'text-emerald-300' : 'text-rose-300'}`}>{saved}</p>
      ) : null}
      <SettingsPanel title="Organization profile" subtitle="Public identity used across receipts and the dashboard">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Organization name" icon={<Building2 className="h-4 w-4" />}>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              onBlur={() => persist({ org_name: orgName })}
              disabled={pending}
              className={settingsInputClass}
            />
          </Field>
          <Field label="Support email" icon={<Mail className="h-4 w-4" />}>
            <input
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              onBlur={() => persist({ support_email: supportEmail })}
              disabled={pending}
              className={settingsInputClass}
            />
          </Field>
          <Field label="Operating region" icon={<Globe className="h-4 w-4" />}>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onBlur={() => persist({ region })}
              disabled={pending}
              className={settingsInputClass}
            />
          </Field>
          <Field label="Platform tier" icon={<ShieldCheck className="h-4 w-4" />}>
            <div className="flex h-9 items-center">
              <SalyBadge variant="accent">Enterprise · Unlimited</SalyBadge>
            </div>
          </Field>
        </div>
      </SettingsPanel>

      <SettingsPanel
        title="Security policy"
        subtitle="Account-wide protection rules"
        right={<Lock className="h-4 w-4 text-saly-text-faint" />}
      >
        <div className="flex flex-col divide-y divide-saly-border">
          <ToggleRow
            title="Enforce MFA for all admins"
            description="Require a second factor for every Super Admin login"
            enabled={security.enforce_mfa}
            disabled={pending}
            onToggle={() => {
              const next = { ...security, enforce_mfa: !security.enforce_mfa };
              setSecurity(next);
              persist({ security: next });
            }}
          />
          <ToggleRow
            title="SSO (SAML / OIDC)"
            description="Allow sign-in through your identity provider"
            enabled={security.sso}
            disabled={pending}
            onToggle={() => {
              const next = { ...security, sso: !security.sso };
              setSecurity(next);
              persist({ security: next });
            }}
          />
          <ToggleRow
            title="IP allowlist"
            description="Restrict console access to approved network ranges"
            enabled={security.ip_allowlist}
            disabled={pending}
            onToggle={() => {
              const next = { ...security, ip_allowlist: !security.ip_allowlist };
              setSecurity(next);
              persist({ security: next });
            }}
          />
          <ToggleRow
            title="Auto session timeout"
            description="Sign out idle sessions after 30 minutes"
            enabled={security.session_timeout}
            disabled={pending}
            onToggle={() => {
              const next = { ...security, session_timeout: !security.session_timeout };
              setSecurity(next);
              persist({ security: next });
            }}
          />
        </div>
      </SettingsPanel>

      <SettingsPanel
        title="Notifications"
        subtitle="Where operational alerts are delivered"
        right={<Bell className="h-4 w-4 text-saly-text-faint" />}
      >
        <div className="flex flex-col divide-y divide-saly-border">
          <ToggleRow
            title="Risk & fraud alerts"
            description="High-risk transactions and velocity breaches"
            enabled={notify.risk_alerts}
            disabled={pending}
            onToggle={() => {
              const next = { ...notify, risk_alerts: !notify.risk_alerts };
              setNotify(next);
              persist({ notifications: next });
            }}
          />
          <ToggleRow
            title="Settlement notifications"
            description="Batch settlements and payout confirmations"
            enabled={notify.settlements}
            disabled={pending}
            onToggle={() => {
              const next = { ...notify, settlements: !notify.settlements };
              setNotify(next);
              persist({ notifications: next });
            }}
          />
          <ToggleRow
            title="Weekly digest"
            description="Volume, revenue, and health summary every Monday"
            enabled={notify.weekly_digest}
            disabled={pending}
            onToggle={() => {
              const next = { ...notify, weekly_digest: !notify.weekly_digest };
              setNotify(next);
              persist({ notifications: next });
            }}
          />
        </div>
      </SettingsPanel>
    </div>
  );
}

function TeamTab({
  team,
  roles,
  currentUserEmail,
}: {
  team: AdminSettingsBundle['team'];
  roles: AdminSettingsBundle['roles'];
  currentUserEmail?: string | null;
}) {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [revokeMember, setRevokeMember] = useState<AdminSettingsBundle['team'][number] | null>(null);
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);
  const mfaOn = team.filter((m) => m.mfa).length;
  const selfEmail = currentUserEmail?.trim().toLowerCase();

  return (
    <>
      <SettingsPanel
        className="overflow-hidden"
        title="Admin team"
        subtitle={`${team.length} members · ${mfaOn} with MFA enabled`}
        right={
          <button
            type="button"
            onClick={() => {
              setNotice(null);
              setInviteOpen(true);
            }}
            className={settingsPrimaryBtnClass}
          >
            <UserPlus className="h-3.5 w-3.5" /> Invite admin
          </button>
        }
      >
        {notice ? (
          <p
            className={[
              'mb-3 rounded-lg px-3 py-2 text-xs',
              notice.tone === 'success' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-rose-500/10 text-rose-200',
            ].join(' ')}
          >
            {notice.text}
          </p>
        ) : null}
        <div className="flex flex-col gap-2">
          {team.map((m) => (
            <div key={m.id} className={settingsRowClass}>
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-black ring-2 ring-saly-bg-card">
                    {m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </div>
                  <span
                    className={[
                      'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-saly-bg-primary',
                      m.last_active.includes('m ago') ? 'bg-emerald-400' : 'bg-saly-text-faint',
                    ].join(' ')}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-saly-text-primary">{m.name}</p>
                  <p className="truncate text-[11px] text-saly-text-faint">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SalyBadge variant="accent">{m.role}</SalyBadge>
                {m.mfa ? (
                  <span className="hidden items-center gap-1 text-xs text-emerald-400 sm:flex">
                    <ShieldCheck className="h-3.5 w-3.5" /> MFA
                  </span>
                ) : (
                  <span className="hidden items-center gap-1 text-xs text-red-400 sm:flex">
                    <ShieldCheck className="h-3.5 w-3.5" /> No MFA
                  </span>
                )}
                <span className="hidden text-[11px] text-saly-text-faint md:block">{m.last_active}</span>
                {selfEmail !== m.email.toLowerCase() ? (
                  <button
                    type="button"
                    title="Revoke access"
                    onClick={() => setRevokeMember(m)}
                    className="rounded-saly border border-saly-border p-1.5 text-saly-text-faint transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 active:scale-95"
                  >
                    <UserX className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </SettingsPanel>
      <InviteAdminDialog
        open={inviteOpen}
        roles={roles}
        onClose={() => setInviteOpen(false)}
        onSubmit={async (input) => {
          const res = await inviteAdminAction(input);
          if (res.ok) {
            router.refresh();
            setNotice({ tone: 'success', text: res.message });
            return { ok: true, message: res.message };
          }
          return { ok: false, error: res.error };
        }}
      />
      <RevokeAdminDialog
        open={revokeMember !== null}
        member={revokeMember}
        onClose={() => setRevokeMember(null)}
        onSubmit={async () => {
          if (!revokeMember) return { ok: false, error: 'No member selected' };
          const res = await revokeAdminAction(revokeMember.id);
          if (res.ok) router.refresh();
          return { ok: res.ok, error: res.ok ? undefined : res.error };
        }}
      />
    </>
  );
}

const accentBar: Record<string, string> = {
  brand: 'from-violet-500 to-violet-400',
  success: 'from-emerald-500 to-teal-400',
  warning: 'from-amber-500 to-orange-400',
  danger: 'from-rose-500 to-pink-500',
};

function roleBadgeVariant(tone: string): 'accent' | 'success' | 'warning' | 'danger' | 'neutral' {
  if (tone === 'brand') return 'accent';
  if (tone === 'success' || tone === 'warning' || tone === 'danger') return tone;
  return 'neutral';
}

function RolesTab({ roles }: { roles: AdminSettingsBundle['roles'] }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editRole, setEditRole] = useState<AdminSettingsBundle['roles'][number] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <SettingsPanel key={r.id} className="relative flex flex-col gap-3 overflow-hidden pt-5" padding>
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentBar[r.tone] ?? accentBar.brand}`} />
            <div className="flex items-center justify-between">
              <p className="font-semibold text-saly-text-primary">{r.name}</p>
              <SalyBadge variant={roleBadgeVariant(r.tone)}>
                {r.members} {r.members === 1 ? 'member' : 'members'}
              </SalyBadge>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-saly-text-secondary">
              {r.permissions.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-300" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setEditRole(r)}
              className={settingsGhostBtnClass + ' mt-auto w-full justify-center py-2'}
            >
              Edit permissions
            </button>
          </SettingsPanel>
        ))}
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-saly-lg border border-dashed border-saly-border text-saly-text-faint transition hover:border-saly-border-strong hover:bg-saly-bg-hover hover:text-saly-text-secondary"
        >
          <Plus className="h-6 w-6" />
          <span className="text-sm font-medium">Create new role</span>
        </button>
      </div>
      <RoleEditorDialog
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={async (input) => {
          if (!input.name) return { ok: false, error: 'Role name is required' };
          const res = await createRoleAction({ name: input.name, permissions: input.permissions, tone: input.tone });
          if (res.ok) router.refresh();
          return { ok: res.ok, error: res.ok ? undefined : res.error };
        }}
      />
      <RoleEditorDialog
        open={editRole !== null}
        mode="edit"
        initial={editRole ?? undefined}
        onClose={() => setEditRole(null)}
        onSubmit={async (input) => {
          if (!editRole) return { ok: false, error: 'No role selected' };
          const res = await updateRoleAction(editRole.id, { permissions: input.permissions, tone: input.tone });
          if (res.ok) router.refresh();
          return { ok: res.ok, error: res.ok ? undefined : res.error };
        }}
      />
    </>
  );
}

function VerificationTab({
  requirements: initial,
}: {
  requirements: AdminSettingsBundle['verificationRequirements'];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editing, setEditing] = useState<AdminSettingsBundle['verificationRequirements'][number] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setItems(initial);
  }, [initial]);

  function openCreate() {
    setEditorMode('create');
    setEditing(null);
    setEditorOpen(true);
  }

  function openEdit(req: AdminSettingsBundle['verificationRequirements'][number]) {
    setEditorMode('edit');
    setEditing(req);
    setEditorOpen(true);
  }

  function toggleActive(id: string, next: boolean) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, is_active: next } : r)));
    startTransition(async () => {
      const res = await updateVerificationRequirementAction(id, { is_active: next });
      if (!res.ok) {
        setItems((prev) => prev.map((r) => (r.id === id ? { ...r, is_active: !next } : r)));
      } else {
        setItems((prev) => prev.map((r) => (r.id === id ? res.requirement : r)));
        router.refresh();
      }
    });
  }

  async function handleEditorSubmit(input: RequirementFormInput) {
    if (editorMode === 'create') {
      const res = await createVerificationRequirementAction({
        label: input.label,
        description: input.description,
        category: input.category,
        input_type: input.input_type,
        field_key: input.field_key,
        step_key: input.step_key,
        value_format: input.value_format,
        placeholder: input.placeholder,
        accept: input.accept,
        target_business: input.target_business,
        target_developer: input.target_developer,
        is_active: input.is_active,
      });
      if (!res.ok) return { ok: false, error: res.error };
      setItems((prev) => [...prev, res.requirement].sort((a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label)));
      router.refresh();
      return { ok: true };
    }

    if (!editing) return { ok: false, error: 'No requirement selected' };
    const res = await updateVerificationRequirementAction(editing.id, {
      label: input.label,
      description: input.description ?? '',
      step_key: input.step_key,
      value_format: input.input_type === 'information' ? input.value_format ?? null : null,
      placeholder: input.placeholder ?? null,
      accept: input.input_type === 'document' ? input.accept ?? null : null,
      target_business: input.target_business,
      target_developer: input.target_developer,
      is_active: input.is_active,
    });
    if (!res.ok) return { ok: false, error: res.error };
    setItems((prev) => prev.map((r) => (r.id === editing.id ? res.requirement : r)));
    router.refresh();
    return { ok: true };
  }

  async function handleDelete() {
    if (!deleteTarget) return { ok: false, error: 'No requirement selected' };
    const id = deleteTarget.id;
    const res = await deleteVerificationRequirementAction(id);
    if (!res.ok) return { ok: false, error: res.error };
    setItems((prev) => prev.filter((r) => r.id !== id));
    router.refresh();
    return { ok: true };
  }

  const kyb = items.filter((r) => r.category === 'kyb');
  const kyc = items.filter((r) => r.category === 'kyc');

  function RequirementRow({ req }: { req: AdminSettingsBundle['verificationRequirements'][number] }) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-saly border border-saly-border bg-saly-bg-secondary/60 p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-saly-text-primary">{req.label}</p>
            <SalyBadge variant={req.input_type === 'document' ? 'warning' : 'accent'}>
              {req.input_type === 'document' ? 'Document' : 'Information'}
            </SalyBadge>
            {req.is_active ? <SalyBadge variant="success">Active</SalyBadge> : <SalyBadge variant="neutral">Inactive</SalyBadge>}
          </div>
          <p className="mt-1 text-xs text-saly-text-muted">
            Field: <code className="text-saly-text-secondary">{req.field_key}</code> · Step: {req.step_key}
          </p>
          {req.description ? <p className="mt-1 text-sm text-saly-text-secondary">{req.description}</p> : null}
          <p className="mt-2 text-xs text-saly-text-faint">
            {[req.target_business ? 'Business' : null, req.target_developer ? 'Developers' : null]
              .filter(Boolean)
              .join(' · ') || 'No audience'}
            {req.input_type === 'document' && req.accept ? ` · Accepts ${req.accept}` : null}
            {req.input_type === 'information' && req.value_format ? ` · Format: ${req.value_format}` : null}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-saly-text-secondary">
            <input
              type="checkbox"
              checked={req.is_active}
              disabled={pending}
              onChange={(e) => toggleActive(req.id, e.target.checked)}
              className="rounded border-saly-border"
            />
            Active
          </label>
          <button type="button" onClick={() => openEdit(req)} className={settingsGhostBtnClass}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget({ id: req.id, label: req.label })}
            className="inline-flex items-center gap-1 rounded-saly border border-red-500/30 px-2.5 py-1.5 text-xs text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    );
  }

  const editorInitial: RequirementFormInput | undefined = editing
    ? {
        label: editing.label,
        description: editing.description ?? undefined,
        category: editing.category,
        input_type: editing.input_type,
        field_key: editing.field_key,
        step_key: editing.step_key,
        value_format: editing.value_format ?? undefined,
        placeholder: editing.placeholder ?? undefined,
        accept: editing.accept ?? undefined,
        target_business: editing.target_business,
        target_developer: editing.target_developer,
        is_active: editing.is_active,
      }
    : undefined;

  return (
    <>
      <div className="flex flex-col gap-5">
        <SettingsPanel
          title="Verification requirements"
          subtitle="Define which documents and information Business or Developer users must submit during onboarding"
          right={
            <button type="button" onClick={openCreate} className={settingsPrimaryBtnClass}>
              <Plus className="h-3.5 w-3.5" />
              Add requirement
            </button>
          }
        >
          <div className="flex flex-col gap-6">
            <section>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-saly-text-faint">KYB (Business)</h4>
              <div className="flex flex-col gap-2">
                {kyb.map((req) => (
                  <RequirementRow key={req.id} req={req} />
                ))}
                {kyb.length === 0 ? (
                  <p className="py-4 text-center text-sm text-saly-text-muted">No KYB requirements configured.</p>
                ) : null}
              </div>
            </section>
            <section>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-saly-text-faint">KYC (Developers)</h4>
              <div className="flex flex-col gap-2">
                {kyc.map((req) => (
                  <RequirementRow key={req.id} req={req} />
                ))}
                {kyc.length === 0 ? (
                  <p className="py-4 text-center text-sm text-saly-text-muted">No KYC requirements configured.</p>
                ) : null}
              </div>
            </section>
          </div>
        </SettingsPanel>
      </div>

      <RequirementEditorDialog
        open={editorOpen}
        mode={editorMode}
        initial={editorInitial ? { ...editorInitial, id: editing?.id } : undefined}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleEditorSubmit}
      />

      <DeleteRequirementDialog
        open={deleteTarget !== null}
        requirement={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={handleDelete}
      />
    </>
  );
}

function FlagsTab({ flags: initialFlags }: { flags: AdminSettingsBundle['flags'] }) {
  const [flags, setFlags] = useState(initialFlags);
  const [query, setQuery] = useState('');
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flags;
    return flags.filter(
      (f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.scope.toLowerCase().includes(q),
    );
  }, [flags, query]);

  const enabled = flags.filter((f) => f.enabled).length;

  function toggleFlag(id: string, next: boolean) {
    setFlags((prev) => prev.map((x) => (x.id === id ? { ...x, enabled: next } : x)));
    startTransition(async () => {
      const res = await toggleFeatureFlagAction(id, next);
      if (!res.ok) {
        setFlags((prev) => prev.map((x) => (x.id === id ? { ...x, enabled: !next } : x)));
      }
    });
  }

  return (
    <SettingsPanel
      title="Feature flags"
      subtitle={`${enabled} of ${flags.length} flags enabled`}
      right={
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-saly-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flags…"
            className={settingsSearchClass}
          />
        </div>
      }
    >
      <ul className="flex flex-col gap-2">
        {filtered.map((f) => (
          <li
            key={f.id}
            className={[
              'flex items-center justify-between gap-4 rounded-saly border p-3.5 transition',
              f.enabled
                ? 'border-violet-500/20 bg-violet-500/[0.04]'
                : 'border-saly-border bg-saly-bg-secondary/60 hover:bg-saly-bg-hover',
            ].join(' ')}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-saly-text-primary">{f.name}</p>
                <SalyBadge variant={f.scope === 'Beta' ? 'warning' : f.scope === 'Global' ? 'accent' : 'neutral'}>
                  {f.scope}
                </SalyBadge>
              </div>
              <p className="mt-0.5 text-xs text-saly-text-faint">{f.description}</p>
            </div>
            <Toggle enabled={f.enabled} disabled={pending} onToggle={() => toggleFlag(f.id, !f.enabled)} />
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="py-10 text-center text-sm text-saly-text-muted">No flags match “{query}”.</li>
        ) : null}
      </ul>
    </SettingsPanel>
  );
}

function AuditTab({ audit }: { audit: AdminSettingsBundle['audit'] }) {
  const toneMap: Record<string, 'accent' | 'success' | 'warning' | 'danger' | 'neutral'> = {
    brand: 'accent',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    neutral: 'neutral',
  };
  const dotColor: Record<string, string> = {
    brand: 'bg-violet-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    neutral: 'bg-saly-text-faint',
  };

  return (
    <SettingsPanel
      title="Audit log"
      subtitle="Immutable record of privileged admin actions"
      right={
        <a href="/api/settings/audit/export" download className={settingsGhostBtnClass}>
          Export CSV
        </a>
      }
    >
      <ol className="relative ml-2 border-l border-saly-border">
        {audit.map((a) => (
          <li key={a.id} className="mb-4 ml-6 last:mb-0">
            <span
              className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-saly-bg-primary ${dotColor[a.tone] ?? dotColor.neutral}`}
            />
            <div className={settingsRowClass}>
              <div className="flex min-w-0 items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[11px] font-semibold text-black">
                  {a.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-saly-text-primary">
                    <span className="font-medium">{a.actor}</span>{' '}
                    <span className="text-saly-text-secondary">{a.action.toLowerCase()}</span>
                  </p>
                  <p className="truncate text-xs text-saly-text-faint">{a.target}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <SalyBadge variant={toneMap[a.tone] ?? 'neutral'}>{a.action.split(' ')[0]}</SalyBadge>
                <span className="text-[11px] text-saly-text-faint">{a.when}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SettingsPanel>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-xs font-medium text-saly-text-muted">
        <span className="text-saly-text-faint">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  disabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="font-medium text-saly-text-primary">{title}</p>
        <p className="mt-0.5 text-xs text-saly-text-faint">{description}</p>
      </div>
      <Toggle enabled={enabled} disabled={disabled} onToggle={onToggle} />
    </div>
  );
}

function Toggle({ enabled, disabled, onToggle }: { enabled: boolean; disabled?: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onToggle}
      className={[
        'relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50',
        enabled ? 'bg-white' : 'bg-saly-bg-hover',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 h-5 w-5 rounded-full shadow transition-transform',
          enabled ? 'translate-x-[22px] bg-black' : 'translate-x-0.5 bg-saly-text-faint',
        ].join(' ')}
      />
    </button>
  );
}

'use client';

import { useEffect, useState, useTransition } from 'react';
import { X } from 'lucide-react';
import type { AdminMemberDto, RbacRoleDto } from '@salychain/sdk-internal';

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/70 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

export function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl border border-surface-border p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85)]"
        style={{ backgroundColor: '#15103A' }}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function InviteAdminDialog({
  open,
  roles,
  onClose,
  onSubmit,
}: {
  open: boolean;
  roles: RbacRoleDto[];
  onClose: () => void;
  onSubmit: (input: { name: string; email: string; role_name: string }) => Promise<{ ok: boolean; error?: string; message?: string }>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleName, setRoleName] = useState(roles[0]?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setName('');
    setEmail('');
    setRoleName(roles[0]?.name ?? '');
    setError(null);
    setSuccess(null);
  }, [open, roles]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await onSubmit({ name, email, role_name: roleName });
      if (res.ok) {
        setName('');
        setEmail('');
        setSuccess(res.message ?? 'Invite email sent.');
      } else {
        setError(res.error ?? 'Failed to invite admin');
      }
    });
  }

  return (
    <Modal open={open} title="Invite admin" subtitle="Add a new member to the super-admin team" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Full name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Jane Doe" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Work email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="jane@salychain.io" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Role
          <select required value={roleName} onChange={(e) => setRoleName(e.target.value)} className={inputClass}>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        {success ? <p className="text-xs text-emerald-300">{success}</p> : null}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover">
            {success ? 'Close' : 'Cancel'}
          </button>
          {!success ? (
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
            >
              {pending ? 'Sending invite…' : 'Send invite'}
            </button>
          ) : null}
        </div>
      </form>
    </Modal>
  );
}

const TONE_OPTIONS: RbacRoleDto['tone'][] = ['brand', 'success', 'warning', 'danger'];

export function RoleEditorDialog({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: RbacRoleDto;
  onClose: () => void;
  onSubmit: (input: { name?: string; permissions: string[]; tone: RbacRoleDto['tone'] }) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [tone, setTone] = useState<RbacRoleDto['tone']>(initial?.tone ?? 'brand');
  const [permissionsText, setPermissionsText] = useState((initial?.permissions ?? []).join('\n'));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? '');
    setTone(initial?.tone ?? 'brand');
    setPermissionsText((initial?.permissions ?? []).join('\n'));
    setError(null);
  }, [open, initial, mode]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const permissions = permissionsText.split('\n').map((p) => p.trim()).filter(Boolean);
    startTransition(async () => {
      const res = await onSubmit({
        name: mode === 'create' ? name : undefined,
        permissions,
        tone,
      });
      if (res.ok) {
        if (mode === 'create') {
          setName('');
          setPermissionsText('');
          setTone('brand');
        }
        onClose();
      } else {
        setError(res.error ?? 'Failed to save role');
      }
    });
  }

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Create new role' : `Edit ${initial?.name ?? 'role'}`}
      subtitle={mode === 'create' ? 'Define a permission set for a new RBAC role' : 'Update permissions for this role'}
      onClose={onClose}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        {mode === 'create' ? (
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Role name
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Operations Lead" />
          </label>
        ) : null}
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Accent
          <select value={tone} onChange={(e) => setTone(e.target.value as RbacRoleDto['tone'])} className={inputClass}>
            {TONE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Permissions (one per line)
          <textarea
            required
            rows={6}
            value={permissionsText}
            onChange={(e) => setPermissionsText(e.target.value)}
            className={`${inputClass} resize-y font-mono text-xs`}
            placeholder={'View all transactions\nManage feature flags'}
          />
        </label>
        {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? 'Saving…' : mode === 'create' ? 'Create role' : 'Save permissions'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function RevokeAdminDialog({
  open,
  member,
  onClose,
  onSubmit,
}: {
  open: boolean;
  member: AdminMemberDto | null;
  onClose: () => void;
  onSubmit: () => Promise<{ ok: boolean; error?: string }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setError(null);
  }, [open, member]);

  if (!member) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await onSubmit();
      if (res.ok) {
        onClose();
      } else {
        setError(res.error ?? 'Failed to revoke access');
      }
    });
  }

  return (
    <Modal
      open={open}
      title="Revoke admin access"
      subtitle={`Remove ${member.name} from the super-admin team`}
      onClose={onClose}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">{member.email}</span> will immediately lose access to the
          super-admin console. This action is recorded in the audit log.
        </p>
        {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
          >
            {pending ? 'Revoking…' : 'Revoke access'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export type RequirementFormInput = {
  label: string;
  description?: string;
  category: 'kyb' | 'kyc';
  input_type: 'document' | 'information';
  field_key: string;
  step_key: string;
  value_format?: string;
  placeholder?: string;
  accept?: string;
  target_business: boolean;
  target_developer: boolean;
  is_active: boolean;
};

const STEP_OPTIONS = [
  { value: 'business_details', label: 'Business details' },
  { value: 'documents', label: 'Company documents' },
  { value: 'beneficial_owners', label: 'Beneficial owners' },
  { value: 'personal_details', label: 'Personal details' },
  { value: 'identity_documents', label: 'Identity documents' },
  { value: 'address', label: 'Address' },
];

function slugifyFieldKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

export function RequirementEditorDialog({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: RequirementFormInput & { id?: string };
  onClose: () => void;
  onSubmit: (input: RequirementFormInput) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'kyb' | 'kyc'>('kyb');
  const [inputType, setInputType] = useState<'document' | 'information'>('information');
  const [fieldKey, setFieldKey] = useState('');
  const [stepKey, setStepKey] = useState('business_details');
  const [valueFormat, setValueFormat] = useState('text');
  const [placeholder, setPlaceholder] = useState('');
  const [accept, setAccept] = useState('.pdf,.jpg,.jpeg,.png');
  const [targetBusiness, setTargetBusiness] = useState(true);
  const [targetDeveloper, setTargetDeveloper] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setLabel(initial?.label ?? '');
    setDescription(initial?.description ?? '');
    setCategory(initial?.category ?? 'kyb');
    setInputType(initial?.input_type ?? 'information');
    setFieldKey(initial?.field_key ?? '');
    setStepKey(initial?.step_key ?? 'business_details');
    setValueFormat(initial?.value_format ?? 'text');
    setPlaceholder(initial?.placeholder ?? '');
    setAccept(initial?.accept ?? '.pdf,.jpg,.jpeg,.png');
    setTargetBusiness(initial?.target_business ?? true);
    setTargetDeveloper(initial?.target_developer ?? false);
    setIsActive(initial?.is_active ?? true);
    setError(null);
  }, [open, initial, mode]);

  function onCategoryChange(next: 'kyb' | 'kyc') {
    setCategory(next);
    if (mode === 'create') {
      if (next === 'kyb') {
        setTargetBusiness(true);
        setTargetDeveloper(false);
      } else {
        setTargetBusiness(false);
        setTargetDeveloper(true);
      }
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const resolvedFieldKey = fieldKey.trim() || slugifyFieldKey(label);
    if (!label.trim()) {
      setError('Label is required');
      return;
    }
    if (!resolvedFieldKey) {
      setError('Field key is required');
      return;
    }
    if (!targetBusiness && !targetDeveloper) {
      setError('Select at least one audience (Business or Developers)');
      return;
    }

    startTransition(async () => {
      const res = await onSubmit({
        label: label.trim(),
        description: description.trim() || undefined,
        category,
        input_type: inputType,
        field_key: resolvedFieldKey,
        step_key: stepKey,
        value_format: inputType === 'information' ? valueFormat : undefined,
        placeholder: placeholder.trim() || undefined,
        accept: inputType === 'document' ? accept.trim() : undefined,
        target_business: targetBusiness,
        target_developer: targetDeveloper,
        is_active: isActive,
      });
      if (res.ok) {
        onClose();
      } else {
        setError(res.error ?? 'Failed to save requirement');
      }
    });
  }

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Add requirement' : `Edit ${initial?.label ?? 'requirement'}`}
      subtitle="A document upload or information field shown during onboarding"
      onClose={onClose}
    >
      <form onSubmit={submit} className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Label
          <input required value={label} onChange={(e) => setLabel(e.target.value)} className={inputClass} placeholder="Certificate of incorporation" />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
          Description (optional)
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Category
            <select
              value={category}
              disabled={mode === 'edit'}
              onChange={(e) => onCategoryChange(e.target.value as 'kyb' | 'kyc')}
              className={inputClass}
            >
              <option value="kyb">KYB (Business)</option>
              <option value="kyc">KYC (Developer)</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Collect
            <select
              value={inputType}
              disabled={mode === 'edit'}
              onChange={(e) => setInputType(e.target.value as 'document' | 'information')}
              className={inputClass}
            >
              <option value="information">Information field</option>
              <option value="document">Document upload</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Field key
            <input
              value={fieldKey}
              disabled={mode === 'edit'}
              onChange={(e) => setFieldKey(e.target.value)}
              className={inputClass}
              placeholder={slugifyFieldKey(label) || 'incorporation_certificate'}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Wizard step group
            <select value={stepKey} onChange={(e) => setStepKey(e.target.value)} className={inputClass}>
              {STEP_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {inputType === 'information' ? (
          <>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
              Field format
              <select value={valueFormat} onChange={(e) => setValueFormat(e.target.value)} className={inputClass}>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
                <option value="number">Number</option>
                <option value="country">Country code</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
              Placeholder (optional)
              <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} className={inputClass} />
            </label>
          </>
        ) : (
          <label className="flex flex-col gap-1.5 text-xs font-medium text-text-tertiary">
            Accepted file types
            <input value={accept} onChange={(e) => setAccept(e.target.value)} className={inputClass} placeholder=".pdf,.jpg,.png" />
          </label>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={targetBusiness} onChange={(e) => setTargetBusiness(e.target.checked)} />
            Business
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={targetDeveloper} onChange={(e) => setTargetDeveloper(e.target.checked)} />
            Developers
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>
        </div>
        {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-50"
          >
            {pending ? 'Saving…' : mode === 'create' ? 'Add requirement' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function DeleteRequirementDialog({
  open,
  requirement,
  onClose,
  onSubmit,
}: {
  open: boolean;
  requirement: { id: string; label: string } | null;
  onClose: () => void;
  onSubmit: () => Promise<{ ok: boolean; error?: string }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setError(null);
  }, [open, requirement]);

  if (!requirement) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await onSubmit();
      if (res.ok) {
        onClose();
      } else {
        setError(res.error ?? 'Failed to delete requirement');
      }
    });
  }

  return (
    <Modal
      open={open}
      title="Delete requirement"
      subtitle={`Remove "${requirement.label}" from onboarding`}
      onClose={onClose}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <p className="text-sm text-text-secondary">
          This requirement will no longer appear in onboarding for new submissions. Existing saved data is not removed
          from user profiles. This action is recorded in the audit log.
        </p>
        {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary hover:bg-surface-cardHover">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
          >
            {pending ? 'Deleting…' : 'Delete requirement'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

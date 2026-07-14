import { Injectable } from '@nestjs/common';
import { AuthorizationError, ConflictError, NotFoundError } from '@salychain/errors';
import { ulid } from 'ulid';
import { AuditTone, RequirementInputType, RoleTone, VerificationCategory } from '../generated/prisma/index.js';
import { IdentityProvisionerService } from '../identity/identity-provisioner.service.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

function toneLower(t: RoleTone | AuditTone): string {
  return t.toLowerCase();
}

function parseRoleTone(value?: string): RoleTone {
  switch (value?.toUpperCase()) {
    case 'SUCCESS':
      return RoleTone.SUCCESS;
    case 'WARNING':
      return RoleTone.WARNING;
    case 'DANGER':
      return RoleTone.DANGER;
    default:
      return RoleTone.BRAND;
  }
}

function formatRelative(date: Date): string {
  const sec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (sec < 60) return `${Math.max(1, sec)}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  return `${days}d ago`;
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toMemberDto(m: {
  id: string;
  name: string;
  email: string;
  roleName: string;
  mfaEnabled: boolean;
  lastActiveAt: Date;
}) {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.roleName,
    last_active: formatRelative(m.lastActiveAt),
    last_active_at: m.lastActiveAt.toISOString(),
    mfa: m.mfaEnabled,
  };
}

function toRoleDto(
  r: { id: string; name: string; permissions: unknown; tone: RoleTone },
  members: number,
) {
  return {
    id: r.id,
    name: r.name,
    members,
    permissions: r.permissions as string[],
    tone: toneLower(r.tone),
  };
}

function toRequirementDto(r: {
  id: string;
  slug: string;
  label: string;
  description: string;
  category: VerificationCategory;
  inputType: RequirementInputType;
  fieldKey: string;
  stepKey: string;
  valueFormat: string | null;
  placeholder: string | null;
  accept: string | null;
  sortOrder: number;
  targetBusiness: boolean;
  targetDeveloper: boolean;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
}) {
  return {
    id: r.id,
    slug: r.slug,
    label: r.label,
    description: r.description,
    category: r.category.toLowerCase() as 'kyb' | 'kyc',
    input_type: r.inputType.toLowerCase() as 'document' | 'information',
    field_key: r.fieldKey,
    step_key: r.stepKey,
    value_format: r.valueFormat,
    placeholder: r.placeholder,
    accept: r.accept,
    sort_order: r.sortOrder,
    target_business: r.targetBusiness,
    target_developer: r.targetDeveloper,
    is_active: r.isActive,
    updated_at: r.updatedAt.toISOString(),
    created_at: r.createdAt.toISOString(),
  };
}

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly identity: IdentityProvisionerService,
    private readonly mail: MailService,
  ) {}

  private async memberCountByRole(): Promise<Record<string, number>> {
    const grouped = await this.prisma.adminMember.groupBy({
      by: ['roleName'],
      _count: { _all: true },
    });
    const map: Record<string, number> = {};
    for (const g of grouped) map[g.roleName] = g._count._all;
    return map;
  }

  async getGeneral() {
    const row = await this.prisma.platformSettings.findUniqueOrThrow({ where: { id: 'default' } });
    return {
      org_name: row.orgName,
      support_email: row.supportEmail,
      region: row.region,
      security: {
        enforce_mfa: row.enforceMfa,
        ip_allowlist: row.ipAllowlist,
        sso: row.ssoEnabled,
        session_timeout: row.sessionTimeout,
      },
      notifications: {
        risk_alerts: row.notifyRisk,
        settlements: row.notifySettlements,
        weekly_digest: row.notifyDigest,
      },
      updated_at: row.updatedAt.toISOString(),
    };
  }

  async updateGeneral(input: {
    org_name?: string;
    support_email?: string;
    region?: string;
    security?: Partial<{ enforce_mfa: boolean; ip_allowlist: boolean; sso: boolean; session_timeout: boolean }>;
    notifications?: Partial<{ risk_alerts: boolean; settlements: boolean; weekly_digest: boolean }>;
    actor_ref?: string;
  }) {
    const row = await this.prisma.platformSettings.update({
      where: { id: 'default' },
      data: {
        orgName: input.org_name,
        supportEmail: input.support_email,
        region: input.region,
        enforceMfa: input.security?.enforce_mfa,
        ipAllowlist: input.security?.ip_allowlist,
        ssoEnabled: input.security?.sso,
        sessionTimeout: input.security?.session_timeout,
        notifyRisk: input.notifications?.risk_alerts,
        notifySettlements: input.notifications?.settlements,
        notifyDigest: input.notifications?.weekly_digest,
      },
    });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Updated platform settings',
        target: 'General configuration',
        tone: AuditTone.BRAND,
      });
    }

    return this.getGeneral();
  }

  async listTeam() {
    const rows = await this.prisma.adminMember.findMany({ orderBy: { lastActiveAt: 'desc' } });
    return { data: rows.map(toMemberDto) };
  }

  async inviteTeamMember(input: {
    name: string;
    email: string;
    role_name: string;
    actor_ref?: string;
  }) {
    const role = await this.prisma.rbacRole.findFirst({ where: { name: input.role_name } });
    if (!role) throw NotFoundError('admin.role.not_found', `Role "${input.role_name}" not found`);

    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.adminMember.findUnique({ where: { email } });
    if (existing) {
      const provision = await this.identity.inviteSuperAdmin({
        email,
        displayName: existing.name,
      });
      const delivery = await this.mail.sendAdminInvite({
        to: email,
        name: existing.name,
        role: existing.roleName,
        tempPassword: provision.temp_password,
      });
      return {
        ...toMemberDto(existing),
        invite: {
          email_sent: true,
          delivery: delivery.delivery,
          message: `Invite re-sent to ${email}. ${delivery.message}`,
        },
      };
    }

    const provision = await this.identity.inviteSuperAdmin({
      email,
      displayName: input.name.trim(),
    });

    const member = await this.prisma.adminMember.create({
      data: {
        id: `m_${ulid()}`,
        name: input.name.trim(),
        email,
        roleName: input.role_name,
        mfaEnabled: false,
        lastActiveAt: new Date(),
      },
    });

    const delivery = await this.mail.sendAdminInvite({
      to: email,
      name: member.name,
      role: input.role_name,
      tempPassword: provision.temp_password,
    });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Invited admin',
        target: email,
        tone: AuditTone.NEUTRAL,
      });
    }

    return {
      ...toMemberDto(member),
      invite: {
        email_sent: true,
        delivery: delivery.delivery,
        message: delivery.message,
      },
    };
  }

  async removeTeamMember(input: { id: string; actor_ref?: string; actor_email?: string }) {
    const member = await this.prisma.adminMember.findUnique({ where: { id: input.id } });
    if (!member) throw NotFoundError('admin.member.not_found', `Admin member ${input.id} not found`);

    const actorEmail = input.actor_email?.trim().toLowerCase();
    if (actorEmail && actorEmail === member.email) {
      throw AuthorizationError('admin.member.self_revoke', 'You cannot revoke your own access');
    }

    if (member.roleName === 'Owner') {
      const ownerCount = await this.prisma.adminMember.count({ where: { roleName: 'Owner' } });
      if (ownerCount <= 1) {
        throw ConflictError('admin.member.last_owner', 'Cannot revoke the last Owner');
      }
    }

    await this.prisma.adminMember.delete({ where: { id: input.id } });

    try {
      await this.identity.revokeSuperAdmin({ email: member.email });
    } catch {
      // Team roster is source of truth; identity may not have a linked login yet.
    }

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Revoked admin access',
        target: member.email,
        tone: AuditTone.DANGER,
      });
    }

    return { id: member.id, name: member.name, email: member.email };
  }

  async listRoles() {
    const [rows, counts] = await Promise.all([
      this.prisma.rbacRole.findMany({ orderBy: { name: 'asc' } }),
      this.memberCountByRole(),
    ]);
    return {
      data: rows.map((r) => toRoleDto(r, counts[r.name] ?? 0)),
    };
  }

  async createRole(input: {
    name: string;
    permissions: string[];
    tone?: string;
    actor_ref?: string;
  }) {
    const name = input.name.trim();
    if (!name) throw NotFoundError('admin.role.invalid', 'Role name is required');
    const permissions = input.permissions.map((p) => p.trim()).filter(Boolean);
    if (permissions.length === 0) throw NotFoundError('admin.role.invalid', 'At least one permission is required');

    const existing = await this.prisma.rbacRole.findUnique({ where: { name } });
    if (existing) throw ConflictError('admin.role.exists', `Role "${name}" already exists`);

    const role = await this.prisma.rbacRole.create({
      data: {
        id: `r_${ulid()}`,
        name,
        permissions,
        tone: parseRoleTone(input.tone),
        memberCount: 0,
      },
    });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Created role',
        target: name,
        tone: AuditTone.BRAND,
      });
    }

    return toRoleDto(role, 0);
  }

  async updateRole(
    id: string,
    input: { permissions: string[]; tone?: string; actor_ref?: string },
  ) {
    const existing = await this.prisma.rbacRole.findUnique({ where: { id } });
    if (!existing) throw NotFoundError('admin.role.not_found', `Role ${id} not found`);

    const permissions = input.permissions.map((p) => p.trim()).filter(Boolean);
    if (permissions.length === 0) throw NotFoundError('admin.role.invalid', 'At least one permission is required');

    const role = await this.prisma.rbacRole.update({
      where: { id },
      data: {
        permissions,
        tone: input.tone ? parseRoleTone(input.tone) : undefined,
      },
    });

    const members = await this.prisma.adminMember.count({ where: { roleName: role.name } });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Updated role permissions',
        target: role.name,
        tone: AuditTone.BRAND,
      });
    }

    return toRoleDto(role, members);
  }

  async listFlags() {
    const rows = await this.prisma.featureFlag.findMany({ orderBy: { name: 'asc' } });
    return {
      data: rows.map((f) => ({
        id: f.id,
        key: f.key,
        name: f.name,
        description: f.description,
        enabled: f.enabled,
        scope: f.scope,
        updated_at: f.updatedAt.toISOString(),
      })),
    };
  }

  async getFlagByKey(key: string) {
    const flag = await this.prisma.featureFlag.findUnique({ where: { key } });
    if (!flag) return { key, enabled: false, name: key, description: null, scope: null };
    return {
      key: flag.key,
      enabled: flag.enabled,
      name: flag.name,
      description: flag.description,
      scope: flag.scope,
      updated_at: flag.updatedAt.toISOString(),
    };
  }

  async updateFlag(id: string, enabled: boolean, actorRef?: string) {
    const existing = await this.prisma.featureFlag.findUnique({ where: { id } });
    if (!existing) throw NotFoundError('admin.flag.not_found', `Feature flag ${id} not found`);

    const updated = await this.prisma.featureFlag.update({
      where: { id },
      data: { enabled },
    });

    if (actorRef) {
      await this.appendAudit({
        actor: actorRef,
        action: 'Updated feature flag',
        target: `${updated.name} → ${enabled ? 'enabled' : 'disabled'}`,
        tone: AuditTone.BRAND,
      });
    }

    return {
      id: updated.id,
      key: updated.key,
      name: updated.name,
      description: updated.description,
      enabled: updated.enabled,
      scope: updated.scope,
      updated_at: updated.updatedAt.toISOString(),
    };
  }

  async listVerificationRequirements() {
    const rows = await this.prisma.verificationRequirement.findMany({
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });
    return { data: rows.map(toRequirementDto) };
  }

  async getActiveVerificationRequirements(profile: 'business' | 'developer') {
    const rows = await this.prisma.verificationRequirement.findMany({
      where: {
        isActive: true,
        ...(profile === 'business' ? { targetBusiness: true } : { targetDeveloper: true }),
      },
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });
    return { data: rows.map(toRequirementDto) };
  }

  async createVerificationRequirement(input: {
    label: string;
    description?: string;
    category: 'kyb' | 'kyc';
    input_type: 'document' | 'information';
    field_key: string;
    step_key: string;
    value_format?: string;
    placeholder?: string;
    accept?: string;
    sort_order?: number;
    target_business: boolean;
    target_developer: boolean;
    is_active?: boolean;
    actor_ref?: string;
  }) {
    const label = input.label.trim();
    if (!label) throw NotFoundError('admin.requirement.invalid', 'Label is required');
    if (!input.target_business && !input.target_developer) {
      throw NotFoundError('admin.requirement.invalid', 'Select at least one audience (Business or Developers)');
    }
    const fieldKey = input.field_key.trim();
    if (!fieldKey) throw NotFoundError('admin.requirement.invalid', 'Field key is required');

    const slug = fieldKey.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = await this.prisma.verificationRequirement.findUnique({ where: { slug } });
    if (existing) throw ConflictError('admin.requirement.exists', `Requirement "${slug}" already exists`);

    const row = await this.prisma.verificationRequirement.create({
      data: {
        id: `vr_${ulid()}`,
        slug,
        label,
        description: input.description?.trim() || '',
        category: input.category === 'kyc' ? VerificationCategory.KYC : VerificationCategory.KYB,
        inputType:
          input.input_type === 'document' ? RequirementInputType.DOCUMENT : RequirementInputType.INFORMATION,
        fieldKey,
        stepKey: input.step_key.trim() || 'general',
        valueFormat: input.value_format?.trim() || null,
        placeholder: input.placeholder?.trim() || null,
        accept: input.accept?.trim() || null,
        sortOrder: input.sort_order ?? 0,
        targetBusiness: input.target_business,
        targetDeveloper: input.target_developer,
        isActive: input.is_active ?? false,
      },
    });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Created verification requirement',
        target: label,
        tone: AuditTone.BRAND,
      });
    }

    return toRequirementDto(row);
  }

  async updateVerificationRequirement(
    id: string,
    input: {
      label?: string;
      description?: string;
      step_key?: string;
      value_format?: string | null;
      placeholder?: string | null;
      accept?: string | null;
      target_business?: boolean;
      target_developer?: boolean;
      is_active?: boolean;
      sort_order?: number;
      actor_ref?: string;
    },
  ) {
    const existing = await this.prisma.verificationRequirement.findUnique({ where: { id } });
    if (!existing) throw NotFoundError('admin.requirement.not_found', `Requirement ${id} not found`);

    const targetBusiness = input.target_business ?? existing.targetBusiness;
    const targetDeveloper = input.target_developer ?? existing.targetDeveloper;
    if (!targetBusiness && !targetDeveloper) {
      throw NotFoundError('admin.requirement.invalid', 'Select at least one audience (Business or Developers)');
    }

    const row = await this.prisma.verificationRequirement.update({
      where: { id },
      data: {
        label: input.label?.trim() || undefined,
        description: input.description !== undefined ? input.description.trim() : undefined,
        stepKey: input.step_key?.trim() || undefined,
        valueFormat: input.value_format !== undefined ? input.value_format : undefined,
        placeholder: input.placeholder !== undefined ? input.placeholder : undefined,
        accept: input.accept !== undefined ? input.accept : undefined,
        targetBusiness: input.target_business,
        targetDeveloper: input.target_developer,
        isActive: input.is_active,
        sortOrder: input.sort_order,
      },
    });

    if (input.actor_ref) {
      await this.appendAudit({
        actor: input.actor_ref,
        action: 'Updated verification requirement',
        target: `${row.label}${input.is_active !== undefined ? ` → ${input.is_active ? 'active' : 'inactive'}` : ''}`,
        tone: AuditTone.BRAND,
      });
    }

    return toRequirementDto(row);
  }

  async deleteVerificationRequirement(id: string, actorRef?: string) {
    const existing = await this.prisma.verificationRequirement.findUnique({ where: { id } });
    if (!existing) throw NotFoundError('admin.requirement.not_found', `Requirement ${id} not found`);

    await this.prisma.verificationRequirement.delete({ where: { id } });

    if (actorRef) {
      await this.appendAudit({
        actor: actorRef,
        action: 'Deleted verification requirement',
        target: existing.label,
        tone: AuditTone.DANGER,
      });
    }

    return { id: existing.id, label: existing.label };
  }

  async listAudit(limit = 50) {
    const rows = await this.prisma.auditEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 200),
    });
    return {
      data: rows.map((a) => ({
        id: a.id,
        actor: a.actor,
        action: a.action,
        target: a.target,
        when: formatRelative(a.createdAt),
        created_at: a.createdAt.toISOString(),
        tone: toneLower(a.tone),
      })),
    };
  }

  async exportAuditCsv(limit = 500): Promise<string> {
    const rows = await this.prisma.auditEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 5000),
    });
    const header = 'id,actor,action,target,tone,created_at';
    const lines = rows.map((r) =>
      [r.id, r.actor, r.action, r.target, r.tone, r.createdAt.toISOString()]
        .map((v) => csvEscape(String(v)))
        .join(','),
    );
    return [header, ...lines].join('\n');
  }

  private async appendAudit(input: {
    actor: string;
    action: string;
    target: string;
    tone: AuditTone;
  }) {
    await this.prisma.auditEntry.create({
      data: {
        id: `al_${ulid()}`,
        actor: input.actor,
        action: input.action,
        target: input.target,
        tone: input.tone,
      },
    });
  }
}

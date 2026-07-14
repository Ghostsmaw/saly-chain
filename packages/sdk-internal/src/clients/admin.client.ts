import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export interface PlatformSettingsDto {
  org_name: string;
  support_email: string;
  region: string;
  security: {
    enforce_mfa: boolean;
    ip_allowlist: boolean;
    sso: boolean;
    session_timeout: boolean;
  };
  notifications: {
    risk_alerts: boolean;
    settlements: boolean;
    weekly_digest: boolean;
  };
  updated_at: string;
}

export interface AdminMemberDto {
  id: string;
  name: string;
  email: string;
  role: string;
  last_active: string;
  last_active_at: string;
  mfa: boolean;
}

export interface AdminInviteDeliveryDto {
  email_sent: boolean;
  delivery: 'resend' | 'console';
  message: string;
}

export interface AdminMemberInviteDto extends AdminMemberDto {
  invite: AdminInviteDeliveryDto;
}

export interface RbacRoleDto {
  id: string;
  name: string;
  members: number;
  permissions: string[];
  tone: 'brand' | 'success' | 'warning' | 'danger';
}

export interface FeatureFlagDto {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  scope: string;
  updated_at: string;
}

export interface VerificationRequirementDto {
  id: string;
  slug: string;
  label: string;
  description: string;
  category: 'kyb' | 'kyc';
  input_type: 'document' | 'information';
  field_key: string;
  step_key: string;
  value_format: string | null;
  placeholder: string | null;
  accept: string | null;
  sort_order: number;
  target_business: boolean;
  target_developer: boolean;
  is_active: boolean;
  updated_at: string;
  created_at: string;
}

export interface AuditEntryDto {
  id: string;
  actor: string;
  action: string;
  target: string;
  when: string;
  created_at: string;
  tone: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
}

export class AdminClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'admin', logger: opts.logger });
  }

  getGeneralSettings(options?: RequestOptions): Promise<PlatformSettingsDto> {
    return this.http.get('/v1/settings/general', options);
  }

  updateGeneralSettings(
    input: Partial<{
      org_name: string;
      support_email: string;
      region: string;
      security: Partial<PlatformSettingsDto['security']>;
      notifications: Partial<PlatformSettingsDto['notifications']>;
      actor_ref: string;
    }>,
    options?: RequestOptions,
  ): Promise<PlatformSettingsDto> {
    return this.http.patch('/v1/settings/general', input, options);
  }

  listTeam(options?: RequestOptions): Promise<{ data: AdminMemberDto[] }> {
    return this.http.get('/v1/settings/team', options);
  }

  listRoles(options?: RequestOptions): Promise<{ data: RbacRoleDto[] }> {
    return this.http.get('/v1/settings/roles', options);
  }

  listFlags(options?: RequestOptions): Promise<{ data: FeatureFlagDto[] }> {
    return this.http.get('/v1/settings/flags', options);
  }

  getFlagByKey(key: string, options?: RequestOptions): Promise<{ key: string; enabled: boolean; name: string }> {
    return this.http.get(`/v1/settings/flags/by-key/${encodeURIComponent(key)}`, options);
  }

  updateFlag(
    id: string,
    input: { enabled: boolean; actor_ref?: string },
    options?: RequestOptions,
  ): Promise<FeatureFlagDto> {
    return this.http.patch(`/v1/settings/flags/${encodeURIComponent(id)}`, input, options);
  }

  listVerificationRequirements(options?: RequestOptions): Promise<{ data: VerificationRequirementDto[] }> {
    return this.http.get('/v1/settings/verification-requirements', options);
  }

  getActiveVerificationRequirements(
    profile: 'business' | 'developer',
    options?: RequestOptions,
  ): Promise<{ data: VerificationRequirementDto[] }> {
    return this.http.get(`/v1/settings/verification-requirements/active/${profile}`, options);
  }

  createVerificationRequirement(
    input: {
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
    },
    options?: RequestOptions,
  ): Promise<VerificationRequirementDto> {
    return this.http.post('/v1/settings/verification-requirements', input, options);
  }

  updateVerificationRequirement(
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
    options?: RequestOptions,
  ): Promise<VerificationRequirementDto> {
    return this.http.patch(`/v1/settings/verification-requirements/${encodeURIComponent(id)}`, input, options);
  }

  deleteVerificationRequirement(
    id: string,
    input: { actor_ref?: string } = {},
    options?: RequestOptions,
  ): Promise<{ id: string; label: string }> {
    return this.http.delete(`/v1/settings/verification-requirements/${encodeURIComponent(id)}`, {
      ...options,
      query: { actor_ref: input.actor_ref },
    });
  }

  listAudit(query: { limit?: number } = {}, options?: RequestOptions): Promise<{ data: AuditEntryDto[] }> {
    return this.http.get('/v1/settings/audit', { ...options, query: { limit: query.limit } });
  }

  inviteTeamMember(
    input: { name: string; email: string; role_name: string; actor_ref?: string },
    options?: RequestOptions,
  ): Promise<AdminMemberInviteDto> {
    return this.http.post('/v1/settings/team', input, options);
  }

  removeTeamMember(
    id: string,
    input: { actor_ref?: string; actor_email?: string } = {},
    options?: RequestOptions,
  ): Promise<{ id: string; name: string; email: string }> {
    return this.http.delete(`/v1/settings/team/${encodeURIComponent(id)}`, {
      ...options,
      query: { actor_ref: input.actor_ref, actor_email: input.actor_email },
    });
  }

  createRole(
    input: { name: string; permissions: string[]; tone?: RbacRoleDto['tone']; actor_ref?: string },
    options?: RequestOptions,
  ): Promise<RbacRoleDto> {
    return this.http.post('/v1/settings/roles', input, options);
  }

  updateRole(
    id: string,
    input: { permissions: string[]; tone?: RbacRoleDto['tone']; actor_ref?: string },
    options?: RequestOptions,
  ): Promise<RbacRoleDto> {
    return this.http.patch(`/v1/settings/roles/${encodeURIComponent(id)}`, input, options);
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import {
  createRbacRole,
  createVerificationRequirement,
  deleteVerificationRequirement,
  inviteAdminMember,
  revokeAdminMember,
  updateFeatureFlag,
  updatePlatformSettings,
  updateRbacRole,
  updateVerificationRequirement,
} from '@/lib/api';
import type { PlatformSettingsDto, RbacRoleDto, VerificationRequirementDto } from '@salychain/sdk-internal';
import { getSession } from '@/lib/auth';

function actorRef(session: Awaited<ReturnType<typeof getSession>>): string | undefined {
  return session?.email?.split('@')[0];
}

export async function saveGeneralSettingsAction(
  input: Partial<{
    org_name: string;
    support_email: string;
    region: string;
    security: Partial<PlatformSettingsDto['security']>;
    notifications: Partial<PlatformSettingsDto['notifications']>;
  }>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await updatePlatformSettings({ ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to save settings' };
  }
}

export async function toggleFeatureFlagAction(
  flagId: string,
  enabled: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await updateFeatureFlag(flagId, enabled, actorRef(session));
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to update flag' };
  }
}

export async function inviteAdminAction(input: {
  name: string;
  email: string;
  role_name: string;
}): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    const result = await inviteAdminMember({ ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true, message: result.invite.message };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to invite admin' };
  }
}

export async function revokeAdminAction(
  memberId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await revokeAdminMember(memberId, actorRef(session), session?.email);
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to revoke access' };
  }
}

export async function createRoleAction(input: {
  name: string;
  permissions: string[];
  tone?: RbacRoleDto['tone'];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await createRbacRole({ ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to create role' };
  }
}

export async function updateRoleAction(
  roleId: string,
  input: { permissions: string[]; tone?: RbacRoleDto['tone'] },
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await updateRbacRole(roleId, { ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to update role' };
  }
}

export async function createVerificationRequirementAction(input: {
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
}): Promise<{ ok: true; requirement: VerificationRequirementDto } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    const requirement = await createVerificationRequirement({ ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true, requirement };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to create requirement' };
  }
}

export async function updateVerificationRequirementAction(
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
  },
): Promise<{ ok: true; requirement: VerificationRequirementDto } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    const requirement = await updateVerificationRequirement(id, { ...input, actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true, requirement };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to update requirement' };
  }
}

export async function deleteVerificationRequirementAction(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const session = await getSession();
    await deleteVerificationRequirement(id, { actor_ref: actorRef(session) });
    revalidatePath('/settings');
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to delete requirement' };
  }
}

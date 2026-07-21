import { AuthorizationError } from '@salychain/errors';
import type { AuthenticatedRequest } from './auth.types.js';

/**
 * Resolves the org a request may act on. The authenticated principal is the
 * only source of truth — a client-supplied `org_id` is accepted only when it
 * matches, never as an override. JWT principals carry no verifiable org
 * membership, so any org they claim is rejected outright (fail closed).
 */
export function enforceOrgScope(
  req: AuthenticatedRequest,
  claimedOrgId?: unknown,
): string | undefined {
  const authOrg = req.auth?.org_id;
  const claimed =
    typeof claimedOrgId === 'string' && claimedOrgId.length > 0 ? claimedOrgId : undefined;

  if (authOrg) {
    if (claimed && claimed !== authOrg) {
      throw AuthorizationError(
        'gateway.org_scope.mismatch',
        'org_id does not match the authenticated organization',
      );
    }
    return authOrg;
  }

  if (claimed) {
    throw AuthorizationError(
      'gateway.org_scope.unverifiable',
      'This credential is not bound to an organization; org_id cannot be honored',
    );
  }
  return undefined;
}

import { createHash } from 'node:crypto';
import { IdentityClient } from '@salychain/sdk-internal';

/**
 * Server-side session revalidation against the identity service.
 *
 * Local JWT verification proves the token is authentic — not that the account
 * is still in good standing. This asks identity (which reloads the user row
 * and rejects SUSPENDED/deleted accounts) and memoizes the positive answer
 * for 60s, so a suspension takes effect within a minute instead of living out
 * the token's full TTL.
 *
 * Fail-closed on transport errors for the admin console: a SUPER_ADMIN
 * session must not remain trusted when identity cannot confirm standing.
 * Only definitive success refreshes the positive cache.
 */
const IDENTITY_URL = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';
const REVALIDATE_TTL_MS = 60_000;
const MAX_CACHE_ENTRIES = 5_000;

let client: IdentityClient | null = null;
const confirmedActive = new Map<string, number>();

export async function isSessionRevoked(token: string): Promise<boolean> {
  const key = createHash('sha256').update(token).digest('hex');
  const now = Date.now();

  const validUntil = confirmedActive.get(key);
  if (validUntil !== undefined && validUntil > now) return false;

  try {
    if (!client) client = new IdentityClient({ baseUrl: IDENTITY_URL });
    await client.verifyToken(token);
  } catch (err) {
    const status = (err as { httpStatus?: number }).httpStatus;
    if (status === 401 || status === 403) return true;
    // Identity unreachable — treat as revoked for privileged admin actions.
    return true;
  }

  if (confirmedActive.size >= MAX_CACHE_ENTRIES) {
    for (const [k, until] of confirmedActive) {
      if (until <= now) confirmedActive.delete(k);
    }
    if (confirmedActive.size >= MAX_CACHE_ENTRIES) confirmedActive.clear();
  }
  confirmedActive.set(key, now + REVALIDATE_TTL_MS);
  return false;
}

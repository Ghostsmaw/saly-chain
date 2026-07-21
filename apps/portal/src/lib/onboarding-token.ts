/**
 * Signed onboarding-state cookie.
 *
 * The middleware limits navigation while KYC is incomplete, but a plain-text
 * cookie is client-forgeable: deleting it (or writing a permissive value)
 * used to skip the gate entirely. The state is therefore carried in a short
 * HS256 JWT bound to the user id. Missing, tampered, expired, or
 * wrong-user tokens all read as "unknown", which the middleware resolves by
 * re-syncing from the backend — fail closed, self-healing.
 *
 * Edge-safe: only `jose` on a symmetric key, usable from middleware.
 */
import { SignJWT, jwtVerify } from 'jose';

export type OnboardingGateState = 'pending' | 'review' | 'rejected' | 'skipped' | 'complete';

const STATES: readonly string[] = ['pending', 'review', 'rejected', 'skipped', 'complete'];
const ISSUER = 'salychain.onboarding';
/** Gate state is trusted for at most 10 minutes before a backend re-sync. */
const TOKEN_TTL_SEC = 600;
/** How far past `exp` a token is still readable when explicitly allowed. */
const EXPIRED_GRACE_SEC = 60 * 60 * 24 * 7;

let hmacKey: Uint8Array | null = null;
let warnedMissingSecret = false;

function secret(): Uint8Array | null {
  const raw =
    process.env.ONBOARDING_COOKIE_SECRET ?? process.env.AUTH_JWT_SECRET ?? process.env.JWT_SECRET;
  if (!raw) return null;
  if (!hmacKey) hmacKey = new TextEncoder().encode(raw);
  return hmacKey;
}

/** False only when no signing secret is configured (gate cannot operate). */
export function onboardingSigningConfigured(): boolean {
  if (secret()) return true;
  if (!warnedMissingSecret) {
    warnedMissingSecret = true;
    console.error(
      '[onboarding] No ONBOARDING_COOKIE_SECRET / AUTH_JWT_SECRET configured — ' +
        'the onboarding gate is DISABLED. Set a secret to enforce KYB/KYC path limits.',
    );
  }
  return false;
}

export async function signOnboardingState(
  userId: string,
  state: OnboardingGateState,
): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  return new SignJWT({ st: state })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SEC}s`)
    .sign(key);
}

/**
 * Returns the verified state, or null when the token is missing, invalid,
 * expired, or issued for a different user. `allowExpired` accepts stale
 * tokens (used by the sync route to preserve a user's "skipped" choice,
 * which exists only client-side).
 */
export async function verifyOnboardingState(
  token: string | undefined,
  userId: string,
  options?: { allowExpired?: boolean },
): Promise<OnboardingGateState | null> {
  const key = secret();
  if (!token || !key) return null;
  try {
    const { payload } = await jwtVerify(token, key, {
      issuer: ISSUER,
      algorithms: ['HS256'],
      ...(options?.allowExpired ? { clockTolerance: EXPIRED_GRACE_SEC } : {}),
    });
    if (payload.sub !== userId) return null;
    const state = payload.st;
    return typeof state === 'string' && STATES.includes(state)
      ? (state as OnboardingGateState)
      : null;
  } catch {
    return null;
  }
}

/**
 * Session-token verification for the developer portal.
 *
 * Edge-safe (no `next/headers`, no Node-only APIs) so it can run in both
 * middleware and server components. The session cookie holds the raw identity
 * JWT; every read cryptographically verifies signature, expiry, issuer,
 * audience, and the surface role. Nothing from the cookie is trusted
 * unverified. Missing key material fails closed (no session).
 */
import { createRemoteJWKSet, jwtVerify, type JWTPayload, type JWTVerifyGetKey } from 'jose';
import type { AuthRole } from '@salychain/sdk-internal';

export const SESSION_COOKIE = 'saly_portal_session';
export const REFRESH_COOKIE = 'saly_portal_refresh';
/** Only DEVELOPER accounts may hold a portal session. */
const REQUIRED_ROLE: AuthRole = 'DEVELOPER';

export interface SessionUser {
  userId: string;
  email: string;
  role: AuthRole;
  displayName: string | null;
}

const ISSUER = process.env.AUTH_JWT_ISSUER ?? 'salychain';
const AUDIENCE = process.env.AUTH_JWT_AUDIENCE ?? 'salychain.consumer';
const ALG = process.env.AUTH_JWT_ALG === 'RS256' ? 'RS256' : 'HS256';

let hmacKey: Uint8Array | null = null;
let remoteJwks: JWTVerifyGetKey | null = null;
let warnedMissingKey = false;

function hmacSecret(): Uint8Array | null {
  const secret = process.env.AUTH_JWT_SECRET ?? process.env.JWT_SECRET;
  if (!secret) return null;
  if (!hmacKey) hmacKey = new TextEncoder().encode(secret);
  return hmacKey;
}

function jwks(): JWTVerifyGetKey {
  if (!remoteJwks) {
    const base = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';
    remoteJwks = createRemoteJWKSet(new URL('/v1/.well-known/jwks.json', base));
  }
  return remoteJwks;
}

/**
 * Verify a session JWT and return the authenticated user, or null when the
 * token is missing, tampered with, expired, or issued for another surface.
 */
export async function verifySessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const options = { issuer: ISSUER, audience: AUDIENCE, algorithms: [ALG] };
    let payload: JWTPayload;
    if (ALG === 'RS256') {
      ({ payload } = await jwtVerify(token, jwks(), options));
    } else {
      const key = hmacSecret();
      if (!key) {
        if (!warnedMissingKey) {
          warnedMissingKey = true;
          console.error(
            '[auth] AUTH_JWT_SECRET (or JWT_SECRET) is not configured — all sessions are rejected. ' +
              'Set it to the same value as the identity service JWT_SECRET.',
          );
        }
        return null;
      }
      ({ payload } = await jwtVerify(token, key, options));
    }
    return toSessionUser(payload);
  } catch {
    return null;
  }
}

function toSessionUser(payload: JWTPayload): SessionUser | null {
  if (typeof payload.sub !== 'string' || payload.sub.length === 0) return null;
  if (payload.role !== REQUIRED_ROLE) return null;
  return {
    userId: payload.sub,
    email: typeof payload.email === 'string' ? payload.email : '',
    role: REQUIRED_ROLE,
    displayName: typeof payload.name === 'string' && payload.name.length > 0 ? payload.name : null,
  };
}

/**
 * Constrain a post-login redirect to a same-origin path. Blocks absolute URLs,
 * protocol-relative URLs (`//evil.com`), and backslash tricks.
 */
export function safeInternalPath(path: string | null | undefined, fallback = '/'): string {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return fallback;
  return path;
}

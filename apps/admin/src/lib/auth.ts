import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { IdentityClient, type AuthRole, type AuthSession } from '@salychain/sdk-internal';
import { REFRESH_COOKIE, SESSION_COOKIE, verifySessionToken, type SessionUser } from './session';
import { isSessionRevoked } from './session-revalidation';

const IDENTITY_URL = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';
/** Roles permitted to access the admin console. */
const ALLOWED_ROLE: AuthRole = 'SUPER_ADMIN';

export { SESSION_COOKIE, REFRESH_COOKIE, type SessionUser };

let client: IdentityClient | null = null;
function identity(): IdentityClient {
  if (!client) client = new IdentityClient({ baseUrl: IDENTITY_URL });
  return client;
}

export async function login(email: string, password: string): Promise<AuthSession> {
  return identity().login({ email, password, expectedRole: ALLOWED_ROLE });
}

function cookieBase(maxAge: number) {
  return {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    maxAge,
  };
}

/**
 * Persist access + refresh cookies. Access is short-lived; refresh is rotated
 * on every use and revoked server-side on logout.
 */
export async function persistSession(session: AuthSession): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, session.access_token, cookieBase(session.expires_in));
  jar.set(REFRESH_COOKIE, session.refresh_token, cookieBase(session.refresh_expires_in));
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  const access = jar.get(SESSION_COOKIE)?.value;
  const refresh = jar.get(REFRESH_COOKIE)?.value;
  if (access || refresh) {
    try {
      await identity().logout({ accessToken: access, refreshToken: refresh });
    } catch {
      // Best-effort server revoke — always clear local cookies.
    }
  }
  jar.delete(SESSION_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

/** Returns the authenticated user, refreshing the access JWT when needed. */
export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const access = jar.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(access);
  if (session) return session;

  const refresh = jar.get(REFRESH_COOKIE)?.value;
  if (!refresh) return null;
  try {
    const renewed = await identity().refresh(refresh);
    await persistSession(renewed);
    return verifySessionToken(renewed.access_token);
  } catch {
    try {
      jar.delete(SESSION_COOKIE);
      jar.delete(REFRESH_COOKIE);
    } catch {
      // ignore
    }
    return null;
  }
}

/**
 * Authentication gate for privileged server actions. Redirects to /login when
 * there is no verified session. Call it FIRST, outside any try/catch — the
 * redirect works by throwing.
 */
export async function requireSession(): Promise<SessionUser> {
  const jar = await cookies();
  let token = jar.get(SESSION_COOKIE)?.value;
  let session = await verifySessionToken(token);

  if (!session) {
    const refreshed = await getSession();
    if (!refreshed) redirect('/login');
    token = (await cookies()).get(SESSION_COOKIE)?.value;
    session = refreshed;
  }

  if (!session || !token) redirect('/login');
  if (await isSessionRevoked(token)) {
    try {
      await clearSession();
    } catch {
      // Read-only context — the redirect alone still blocks the action.
    }
    redirect('/login');
  }
  return session;
}

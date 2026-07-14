import { cookies } from 'next/headers';
import { IdentityClient, type AuthRole, type AuthSession } from '@salychain/sdk-internal';

const IDENTITY_URL = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';
export const SESSION_COOKIE = 'saly_portal_session';
const SURFACE_ROLE: AuthRole = 'DEVELOPER';

let client: IdentityClient | null = null;
function identity(): IdentityClient {
  if (!client) client = new IdentityClient({ baseUrl: IDENTITY_URL });
  return client;
}

export interface SessionUser {
  userId: string;
  email: string;
  role: AuthRole;
  displayName: string | null;
}

interface CookiePayload {
  token: string;
  email: string;
  role: AuthRole;
  displayName: string | null;
  userId: string;
}

function encode(session: AuthSession): string {
  const payload: CookiePayload = {
    token: session.access_token,
    email: session.email,
    role: session.role,
    displayName: session.display_name,
    userId: session.id,
  };
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function decode(raw: string): CookiePayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as CookiePayload;
    if (!parsed.token || !parsed.userId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<AuthSession> {
  return identity().login({ email, password, expectedRole: SURFACE_ROLE });
}

export async function register(input: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<AuthSession> {
  return identity().register({ ...input, role: 'DEVELOPER' });
}

export async function persistSession(session: AuthSession): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, encode(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: session.expires_in,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const payload = decode(raw);
  if (!payload) return null;
  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    displayName: payload.displayName,
  };
}

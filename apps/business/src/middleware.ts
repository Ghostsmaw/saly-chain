import { NextResponse, type NextRequest } from 'next/server';
import { REFRESH_COOKIE, SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import { enforceSameOrigin } from '@/lib/request-guards';
import { onboardingSigningConfigured, verifyOnboardingState } from '@/lib/onboarding-token';
import {
  ONBOARDING_COOKIE,
  ONBOARDING_LIMITED_PATHS,
  ONBOARDING_PENDING,
  ONBOARDING_REJECTED,
  ONBOARDING_REVIEW,
  ONBOARDING_REVIEW_PATHS,
  ONBOARDING_SKIPPED,
} from '@/lib/onboarding-constants';

const PUBLIC_PATHS = ['/login', '/signup'];
const IDENTITY_URL = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';

function isAllowedPath(pathname: string, allowed: readonly string[]): boolean {
  return allowed.some((p) => pathname === p || (p !== '/' && pathname.startsWith(`${p}/`)));
}

async function refreshAccess(req: NextRequest): Promise<NextResponse | null> {
  const refresh = req.cookies.get(REFRESH_COOKIE)?.value;
  if (!refresh) return null;
  try {
    const res = await fetch(`${IDENTITY_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const session = (await res.json()) as {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      refresh_expires_in: number;
    };
    const next = NextResponse.next();
    const secure = process.env.NODE_ENV !== 'development';
    next.cookies.set(SESSION_COOKIE, session.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure,
      path: '/',
      maxAge: session.expires_in,
    });
    next.cookies.set(REFRESH_COOKIE, session.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure,
      path: '/',
      maxAge: session.refresh_expires_in,
    });
    return next;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const csrf = enforceSameOrigin(req);
  if (csrf) return csrf;

  const { pathname } = req.nextUrl;
  const rawToken = req.cookies.get(SESSION_COOKIE)?.value;
  let session = await verifySessionToken(rawToken);
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!session && !isPublic) {
    const renewed = await refreshAccess(req);
    if (renewed) return renewed;
  }

  if (session && isPublic) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!session && !isPublic) {
    const loginUrl = new URL('/login', req.url);
    if (pathname !== '/') loginUrl.searchParams.set('next', pathname);
    const res = NextResponse.redirect(loginUrl);
    if (rawToken) res.cookies.delete(SESSION_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    return res;
  }

  if (session && onboardingSigningConfigured()) {
    const onboardingState = await verifyOnboardingState(
      req.cookies.get(ONBOARDING_COOKIE)?.value,
      session.userId,
    );

    if (onboardingState === null) {
      const syncUrl = new URL('/api/onboarding/sync', req.url);
      syncUrl.searchParams.set('next', `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(syncUrl);
    }

    if (onboardingState === ONBOARDING_PENDING && pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    if (onboardingState === ONBOARDING_REVIEW && !isAllowedPath(pathname, ONBOARDING_REVIEW_PATHS)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (onboardingState === ONBOARDING_REJECTED && !isAllowedPath(pathname, ONBOARDING_LIMITED_PATHS)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (onboardingState === ONBOARDING_SKIPPED && !isAllowedPath(pathname, ONBOARDING_LIMITED_PATHS)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};

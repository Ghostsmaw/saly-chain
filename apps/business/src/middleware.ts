import { NextResponse, type NextRequest } from 'next/server';
import {
  ONBOARDING_COOKIE,
  ONBOARDING_LIMITED_PATHS,
  ONBOARDING_PENDING,
  ONBOARDING_REJECTED,
  ONBOARDING_REVIEW,
  ONBOARDING_REVIEW_PATHS,
  ONBOARDING_SKIPPED,
} from '@/lib/onboarding-constants';

const SESSION_COOKIE = 'saly_business_session';
const PUBLIC_PATHS = ['/login', '/signup'];

function isAllowedPath(pathname: string, allowed: readonly string[]): boolean {
  return allowed.some((p) => pathname === p || (p !== '/' && pathname.startsWith(`${p}/`)));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value);
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!hasSession && !isPublic) {
    const loginUrl = new URL('/login', req.url);
    if (pathname !== '/') loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const onboardingState = req.cookies.get(ONBOARDING_COOKIE)?.value;

  if (hasSession && onboardingState === ONBOARDING_PENDING && pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  if (hasSession && onboardingState === ONBOARDING_REVIEW && !isAllowedPath(pathname, ONBOARDING_REVIEW_PATHS)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (hasSession && onboardingState === ONBOARDING_REJECTED && !isAllowedPath(pathname, ONBOARDING_LIMITED_PATHS)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (hasSession && onboardingState === ONBOARDING_SKIPPED && !isAllowedPath(pathname, ONBOARDING_LIMITED_PATHS)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};

import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'saly_admin_session';
const PUBLIC_PATHS = ['/login'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value);
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Signed-in users shouldn't see the login page.
  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Unauthenticated users are redirected to login (preserving intended path).
  if (!hasSession && !isPublic) {
    const loginUrl = new URL('/login', req.url);
    if (pathname !== '/') loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, API routes, and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};

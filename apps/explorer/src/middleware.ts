import { NextResponse, type NextRequest } from 'next/server';

/**
 * Lightweight edge rate limit for the public explorer.
 * Multi-instance deployments should additionally enforce limits at the
 * ingress / Cloudflare layer; this stops accidental self-DoS in a single pod.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

export function middleware(req: NextRequest) {
  const ip = clientIp(req);
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }
  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: { code: 'rate_limited', message: 'Too many requests' } },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

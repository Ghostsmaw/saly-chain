import { NextResponse, type NextRequest } from 'next/server';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Reject cross-site mutating requests. Browser-initiated form posts and
 * Next.js server actions always send Origin; missing Origin on a mutation is
 * treated as hostile when NODE_ENV is production.
 */
export function enforceSameOrigin(req: NextRequest): NextResponse | null {
  if (SAFE_METHODS.has(req.method)) return null;

  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: { code: 'csrf.origin_required', message: 'Origin header required' } },
        { status: 403 },
      );
    }
    return null;
  }
  try {
    const originHost = new URL(origin).host;
    if (host && originHost !== host) {
      return NextResponse.json(
        { error: { code: 'csrf.origin_mismatch', message: 'Cross-origin request blocked' } },
        { status: 403 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: { code: 'csrf.origin_invalid', message: 'Invalid Origin' } },
      { status: 403 },
    );
  }
  return null;
}

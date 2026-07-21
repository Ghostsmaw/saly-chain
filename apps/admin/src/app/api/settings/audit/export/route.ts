import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { fetchAuditExportCsv } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: { code: 'auth.unauthenticated', message: 'Authentication required' } },
      { status: 401 },
    );
  }
  try {
    const csv = await fetchAuditExportCsv(500);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="salychain-audit-${stamp}.csv"`,
      },
    });
  } catch {
    return new Response('Audit export unavailable', { status: 503 });
  }
}

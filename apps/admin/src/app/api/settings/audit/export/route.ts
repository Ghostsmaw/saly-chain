import { fetchAuditExportCsv } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
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

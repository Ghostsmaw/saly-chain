import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const COMPLIANCE_URL = process.env.COMPLIANCE_BASE_URL ?? 'http://localhost:4004';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: { code: 'auth.unauthenticated', message: 'Authentication required' } },
      { status: 401 },
    );
  }
  const { id } = await context.params;
  const body = (await request.json()) as { status?: string; priority?: string; assigned_to?: string };

  const internalToken = process.env.INTERNAL_SERVICE_TOKEN;
  const res = await fetch(`${COMPLIANCE_URL}/v1/cases/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(internalToken ? { 'x-internal-token': internalToken } : {}),
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}

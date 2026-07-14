import { NextResponse } from 'next/server';

const COMPLIANCE_URL = process.env.COMPLIANCE_BASE_URL ?? 'http://localhost:4004';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { status?: string; priority?: string; assigned_to?: string };

  const res = await fetch(`${COMPLIANCE_URL}/v1/cases/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}

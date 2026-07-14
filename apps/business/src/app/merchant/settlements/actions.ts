'use server';

import { merchant } from '@/lib/api';
import { BUSINESS_ORG_ID } from '@/lib/constants';

export async function generateSettlementReport(formData: FormData) {
  const periodStart = String(formData.get('period_start') ?? '');
  const periodEnd = String(formData.get('period_end') ?? '');
  const currency = String(formData.get('currency') ?? 'NGN').trim();

  if (!periodStart || !periodEnd) {
    return { ok: false, message: 'Start and end dates are required.' };
  }

  try {
    const report = await merchant().generateSettlementReport(
      {
        period_start: new Date(periodStart).toISOString(),
        period_end: new Date(`${periodEnd}T23:59:59`).toISOString(),
        currency,
      },
      { orgId: BUSINESS_ORG_ID },
    );
    return { ok: report.status === 'READY', message: `Report ${report.status.toLowerCase()}.`, report };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Failed to generate settlement report.',
    };
  }
}

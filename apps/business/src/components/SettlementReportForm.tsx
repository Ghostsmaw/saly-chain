'use client';

import { useState, useTransition } from 'react';
import { Loader2, Receipt } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { generateSettlementReport } from '@/app/merchant/settlements/actions';

export function SettlementReportForm() {
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function onSubmit(formData: FormData) {
    formData.set('period_start', periodStart);
    formData.set('period_end', periodEnd);
    setResult(null);
    startTransition(async () => {
      const res = await generateSettlementReport(formData);
      setResult({ ok: res.ok, message: res.message });
    });
  }

  return (
    <Card>
      <CardHeader title="Generate report" subtitle="Roll up settled FIAT pay-ins for a period" />
      <form action={onSubmit} className="flex flex-col gap-4 p-5 pt-0">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-text-secondary">Period start</span>
          <input
            type="date"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-text-secondary">Period end</span>
          <input
            type="date"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
            value={periodEnd}
            onChange={(e) => setPeriodEnd(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Receipt className="h-4 w-4" />}
          Generate
        </button>
        {result ? (
          <p className={`text-sm ${result.ok ? 'text-success-300' : 'text-danger-300'}`}>{result.message}</p>
        ) : null}
      </form>
    </Card>
  );
}

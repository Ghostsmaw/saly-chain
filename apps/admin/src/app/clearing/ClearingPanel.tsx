'use client';

import { useState, useTransition } from 'react';
import { ArrowDownToLine, BookOpen, Database, Loader2 } from 'lucide-react';
import { seedClearingPool } from '@/app/clearing/actions';
import { COA_ROWS } from '@/lib/saly-clearing';
import {
  SalyBadge,
  SalyButton,
  SalyCard,
  SalyInput,
} from '@/components/saly/ui';

const inputClass =
  'h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-primary focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20';

export function ClearingSeedForm() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [memo, setMemo] = useState('');
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function onSubmit(formData: FormData) {
    formData.set('amount', amount);
    formData.set('currency', currency);
    formData.set('memo', memo);
    setResult(null);
    startTransition(async () => {
      const res = await seedClearingPool(formData);
      setResult(res);
      if (res.ok) {
        setAmount('');
        setMemo('');
      }
    });
  }

  return (
    <SalyCard>
      <div className="mb-5">
        <p className="text-sm font-medium text-saly-text-primary">Seed clearing pool</p>
        <p className="mt-1 text-xs text-saly-text-muted">
          DR asset.clearing · CR equity.inbound — simulated inbound settlement
        </p>
      </div>

      <form action={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-medium text-saly-text-secondary">Currency</span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="GHS">GHS</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-medium text-saly-text-secondary">Amount</span>
            <SalyInput
              type="number"
              min="0"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-xs font-medium text-saly-text-secondary">Memo</span>
          <SalyInput
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Initial inbound float"
          />
        </label>

        {result ? (
          <p
            className={[
              'rounded-saly border px-3 py-2 text-sm',
              result.ok
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                : 'border-red-500/20 bg-red-500/10 text-red-400',
            ].join(' ')}
          >
            {result.message}
          </p>
        ) : null}

        <SalyButton type="submit" variant="primary" disabled={pending || !amount} className="w-full sm:w-auto">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Seeding…
            </>
          ) : (
            <>
              <ArrowDownToLine className="h-4 w-4" />
              Seed clearing
            </>
          )}
        </SalyButton>
      </form>
    </SalyCard>
  );
}

export function ClearingCoaCard() {
  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="border-b border-saly-border px-5 py-4">
        <p className="text-sm font-medium text-saly-text-primary">Chart of accounts</p>
        <p className="text-xs text-saly-text-muted">Tier 2 inbound clearing ledger structure</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
              <th className="px-4 py-2.5 font-medium">Code</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {COA_ROWS.map((row) => (
              <tr key={row.code} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                <td className="px-4 py-3 font-mono text-[11px] text-saly-text-primary">{row.code}</td>
                <td className="px-4 py-3">
                  <SalyBadge variant="neutral">{row.type}</SalyBadge>
                </td>
                <td className="px-4 py-3 text-xs text-saly-text-muted">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-2 border-t border-saly-border px-5 py-4">
        <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saly-text-faint" />
        <p className="text-[11px] leading-relaxed text-saly-text-muted">
          Runbook{' '}
          <code className="rounded bg-white/[0.06] px-1">docs/runbooks/s7-topup-inbound.md</code>
        </p>
      </div>
    </SalyCard>
  );
}

export function ClearingFlowPanel() {
  const steps = [
    { label: 'Inbound rail', detail: 'Simulated pay-in (Tier 2)' },
    { label: 'asset.clearing', detail: 'Staging pool debited' },
    { label: 'liability.business', detail: 'Customer treasury credited' },
  ];

  return (
    <SalyCard>
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-saly-text-faint" />
        <p className="text-sm font-medium text-saly-text-primary">Settlement flow</p>
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-saly border border-saly-border bg-saly-bg-secondary text-[11px] font-medium text-saly-text-muted">
              {i + 1}
            </span>
            <div>
              <p className="text-xs font-medium text-saly-text-primary">{step.label}</p>
              <p className="text-[11px] text-saly-text-faint">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </SalyCard>
  );
}

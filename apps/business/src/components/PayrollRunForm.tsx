'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { Loader2, Plus, Trash2, Users, Wallet } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { NG_BANKS } from '@/lib/ng-banks';

export interface PayrollEmployeeRow {
  id: string;
  name: string;
  amount: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

const EMPTY_ROW = (): PayrollEmployeeRow => ({
  id: `emp-${Date.now()}`,
  name: '',
  amount: '',
  bankCode: '058',
  accountNumber: '',
  accountName: '',
});

export function PayrollRunForm({
  currency,
  treasuryLabel,
  action,
}: {
  currency: string;
  treasuryLabel?: string;
  action: (formData: FormData) => Promise<{
    ok: boolean;
    message: string;
    intentId?: string;
    batchId?: string;
  }>;
}) {
  const [rows, setRows] = useState<PayrollEmployeeRow[]>([EMPTY_ROW()]);
  const [runName, setRunName] = useState('Monthly Payroll');
  const [payPeriod, setPayPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    intentId?: string;
    batchId?: string;
  } | null>(null);

  const totalDisplay = useMemo(() => {
    const sum = rows.reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0);
    return sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [rows]);

  function addRow() {
    setRows((prev) => [...prev, EMPTY_ROW()]);
  }

  function removeRow(id: string) {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  }

  function updateRow(id: string, patch: Partial<PayrollEmployeeRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function onSubmit(formData: FormData) {
    formData.set('payroll_json', JSON.stringify({ rows, runName, payPeriod, currency }));
    setResult(null);
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
    });
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Run payroll"
        subtitle="Batch NGN bank payouts — screened once, each employee settles independently"
      />

      {treasuryLabel ? (
        <div className="mx-4 mb-4 flex items-start gap-2 rounded-lg border border-brand-500/20 bg-brand-500/5 px-3 py-2.5 text-xs text-text-secondary">
          <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
          <span>
            Debiting treasury account <span className="font-mono text-text-primary">{treasuryLabel}</span>.
            Fund via clearing before large runs — see runbook.
          </span>
        </div>
      ) : null}

      <form action={onSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
          <Field label="Run name">
            <input
              name="run_name"
              value={runName}
              onChange={(e) => setRunName(e.target.value)}
              className={inputClass}
              required
            />
          </Field>
          <Field label="Pay period">
            <input
              name="pay_period"
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              placeholder="2026-03"
              className={inputClass}
            />
          </Field>
          <Field label="Currency">
            <input name="currency" value={currency} readOnly className={`${inputClass} opacity-70`} />
          </Field>
        </div>

        <div className="rounded-xl border border-surface-border bg-surface-cardHover/30">
          <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Users className="h-4 w-4 text-brand-300" />
              Employees ({rows.length})
            </span>
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-1 rounded-lg border border-surface-border bg-surface-card px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary"
            >
              <Plus className="h-3.5 w-3.5" /> Add employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-text-tertiary">
                <tr>
                  <th className="px-4 py-2 font-medium">Employee</th>
                  <th className="px-4 py-2 font-medium">Amount ({currency})</th>
                  <th className="px-4 py-2 font-medium">Bank</th>
                  <th className="px-4 py-2 font-medium">Account</th>
                  <th className="px-4 py-2 font-medium">Account name</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-surface-divider">
                    <td className="px-4 py-2">
                      <input
                        value={row.name}
                        onChange={(e) => updateRow(row.id, { name: e.target.value })}
                        placeholder="Full name"
                        className={cellInputClass}
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.amount}
                        onChange={(e) => updateRow(row.id, { amount: e.target.value })}
                        inputMode="decimal"
                        placeholder="0.00"
                        className={cellInputClass}
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={row.bankCode}
                        onChange={(e) => updateRow(row.id, { bankCode: e.target.value })}
                        className={cellInputClass}
                      >
                        {NG_BANKS.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.accountNumber}
                        onChange={(e) => updateRow(row.id, { accountNumber: e.target.value })}
                        placeholder="10 digits"
                        className={cellInputClass}
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.accountName}
                        onChange={(e) => updateRow(row.id, { accountName: e.target.value })}
                        placeholder={row.name || 'Account name'}
                        className={cellInputClass}
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="rounded-md p-1.5 text-text-muted hover:bg-danger-500/10 hover:text-danger-300"
                        aria-label="Remove employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-surface-border bg-brand-500/5 px-4 py-3">
            <span className="text-sm text-text-secondary">Total payroll</span>
            <span className="text-lg font-semibold text-text-primary">
              {totalDisplay} {currency}
            </span>
          </div>
        </div>

        {result ? (
          <div
            className={[
              'mx-4 rounded-lg border px-4 py-3 text-sm',
              result.ok
                ? 'border-success-500/30 bg-success-500/10 text-success-200'
                : 'border-danger-500/30 bg-danger-500/10 text-danger-200',
            ].join(' ')}
          >
            {result.message}
            {result.batchId ? (
              <p className="mt-2">
                <Link
                  href={`/payroll/${result.batchId}`}
                  className="inline-flex items-center gap-1 font-medium text-brand-200 hover:text-brand-100"
                >
                  Track batch progress →
                </Link>
              </p>
            ) : null}
            {result.intentId ? (
              <p className="mt-1 font-mono text-xs opacity-80">Intent: {result.intentId}</p>
            ) : null}
          </div>
        ) : null}

        <div className="px-4 pb-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:opacity-95 disabled:opacity-60 sm:w-auto"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
            Run payroll batch
          </button>
        </div>
      </form>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/80 px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20';

const cellInputClass =
  'w-full rounded-md border border-surface-border/80 bg-surface-card/60 px-2 py-1.5 text-sm text-text-primary outline-none focus:border-brand-500/40';

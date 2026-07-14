'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { ArrowDownToLine, CheckCircle2, Loader2, Wallet } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';

export function TopupForm({
  currency,
  destinationLabel,
  action,
}: {
  currency: string;
  destinationLabel: string;
  action: (formData: FormData) => Promise<{
    ok: boolean;
    message: string;
    transactionId?: string;
  }>;
}) {
  const [amount, setAmount] = useState('');
  const [externalRef, setExternalRef] = useState('');
  const [memo, setMemo] = useState('');
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    transactionId?: string;
  } | null>(null);

  function onSubmit(formData: FormData) {
    formData.set('amount', amount);
    formData.set('external_reference', externalRef);
    formData.set('memo', memo);
    formData.set('currency', currency);
    setResult(null);
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
      if (res.ok) {
        setAmount('');
        setExternalRef('');
        setMemo('');
      }
    });
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Credit treasury"
        subtitle="Allocate from inbound clearing to your ledger balance — settles immediately"
      />
      <form action={onSubmit} className="flex flex-col gap-5 p-5 pt-0">
        <div className="rounded-lg border border-brand-500/20 bg-brand-500/5 px-4 py-3">
          <div className="flex items-start gap-3">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                Destination account
              </p>
              <p className="mt-0.5 font-mono text-sm text-text-primary">{destinationLabel}</p>
            </div>
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">Amount ({currency})</span>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">
            External reference <span className="text-text-muted">(optional)</span>
          </span>
          <input
            type="text"
            value={externalRef}
            onChange={(e) => setExternalRef(e.target.value)}
            placeholder="Bank wire / transfer reference"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">
            Memo <span className="text-text-muted">(optional)</span>
          </span>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Treasury funding note"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
          />
        </label>

        {result ? (
          <div
            className={[
              'rounded-lg border px-4 py-3 text-sm',
              result.ok
                ? 'border-success-500/30 bg-success-500/10 text-success-200'
                : 'border-danger-500/30 bg-danger-500/10 text-danger-200',
            ].join(' ')}
          >
            <div className="flex items-start gap-2">
              {result.ok ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : null}
              <div>
                <p>{result.message}</p>
                {result.ok && result.transactionId ? (
                  <Link
                    href={`/transactions/${result.transactionId}`}
                    className="mt-1 inline-block text-xs font-medium underline underline-offset-2"
                  >
                    View transaction →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending || !amount}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing…
            </>
          ) : (
            <>
              <ArrowDownToLine className="h-4 w-4" /> Credit from clearing
            </>
          )}
        </button>
      </form>
    </Card>
  );
}

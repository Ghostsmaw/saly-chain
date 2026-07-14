'use client';

import { useState, useTransition } from 'react';
import { Link2, Loader2 } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { createPaymentLink } from '@/app/merchant/payment-links/actions';

export function PaymentLinkForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string; checkoutUrl?: string } | null>(
    null,
  );

  function onSubmit(formData: FormData) {
    formData.set('title', title);
    formData.set('amount', amount);
    formData.set('description', description);
    setResult(null);
    startTransition(async () => {
      const res = await createPaymentLink(formData);
      setResult({
        ok: res.ok,
        message: res.message,
        checkoutUrl: res.link?.checkout_url,
      });
      if (res.ok) {
        setTitle('');
        setAmount('');
        setDescription('');
      }
    });
  }

  return (
    <Card>
      <CardHeader title="New payment link" subtitle="Fixed-amount NGN link with hosted checkout" />
      <form action={onSubmit} className="flex flex-col gap-4 p-5 pt-0">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-text-secondary">Title</span>
          <input
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Invoice #1042"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-text-secondary">Amount (NGN)</span>
          <input
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5000"
            inputMode="decimal"
            required
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-text-secondary">Description (optional)</span>
          <textarea
            className="min-h-20 rounded-lg border border-surface-border bg-surface-card px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Consulting fee — June 2026"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
          Create link
        </button>
        {result ? (
          <p className={`text-sm ${result.ok ? 'text-success-300' : 'text-danger-300'}`}>
            {result.message}
            {result.checkoutUrl ? (
              <>
                {' '}
                <a href={result.checkoutUrl} className="underline">
                  Open checkout
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </form>
    </Card>
  );
}

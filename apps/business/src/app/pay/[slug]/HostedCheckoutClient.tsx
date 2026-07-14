'use client';

import { useEffect, useState, useTransition } from 'react';
import { CheckCircle2, Copy, Loader2 } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { formatMinor } from '@/lib/format';
import { openCheckoutFromSlug, pollCheckoutSession } from './actions';

type PublicLink = {
  slug: string;
  title: string;
  description: string | null;
  amount_minor: string;
  currency: string;
};

export function HostedCheckoutClient({ link }: { link: PublicLink }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pending, startTransition] = useTransition();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [instruction, setInstruction] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || status === 'COMPLETED' || status === 'FAILED' || status === 'EXPIRED') return;
    const timer = setInterval(() => {
      void pollCheckoutSession(sessionId).then((session) => {
        setStatus(session.status);
        if (session.instruction) setInstruction(session.instruction);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [sessionId, status]);

  function pay() {
    setError(null);
    startTransition(async () => {
      try {
        const session = await openCheckoutFromSlug(link.slug, {
          customer_name: name,
          ...(email ? { customer_email: email } : {}),
        });
        setSessionId(session.id);
        setStatus(session.status);
        setInstruction(session.instruction);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not open checkout.');
      }
    });
  }

  const accountNumber = instruction?.accountNumber as string | undefined;
  const bankName = instruction?.bankName as string | undefined;
  const checkoutUrl = instruction?.checkoutUrl as string | undefined;

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader
        title={link.title}
        subtitle={link.description ?? 'Secure payment powered by SalyChain'}
      />
      <div className="flex flex-col gap-4 p-5 pt-0">
        <p className="text-2xl font-semibold text-text-primary">
          {formatMinor(link.amount_minor, link.currency)}
        </p>

        {status === 'COMPLETED' ? (
          <div className="flex items-center gap-2 rounded-lg border border-success-500/30 bg-success-500/10 px-4 py-3 text-sm text-success-200">
            <CheckCircle2 className="h-4 w-4" />
            Payment received — thank you.
          </div>
        ) : !sessionId ? (
          <>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-text-secondary">Your name</span>
              <input
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-text-secondary">Email (optional)</span>
              <input
                type="email"
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={pay}
              disabled={pending || !name.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-400 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Continue to payment
            </button>
          </>
        ) : (
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              Status: <span className="font-medium text-text-primary">{status}</span>
            </p>
            {checkoutUrl ? (
              <a href={checkoutUrl} className="text-brand-300 underline" target="_blank" rel="noreferrer">
                Open hosted checkout
              </a>
            ) : null}
            {accountNumber ? (
              <div className="rounded-lg border border-surface-border bg-surface-cardHover/50 p-3">
                <p className="text-xs uppercase tracking-wide text-text-tertiary">Virtual account</p>
                <p className="font-mono text-base text-text-primary">{accountNumber}</p>
                {bankName ? <p className="text-xs text-text-muted">{bankName}</p> : null}
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-brand-300"
                  onClick={() => navigator.clipboard.writeText(accountNumber)}
                >
                  <Copy className="h-3 w-3" /> Copy account number
                </button>
              </div>
            ) : null}
          </div>
        )}

        {error ? <p className="text-sm text-danger-300">{error}</p> : null}
      </div>
    </Card>
  );
}

'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Boxes, CheckCircle2, Loader2, Wallet } from 'lucide-react';
import { Card, CardHeader } from '@salychain/ui';
import { formatMinor, truncateMiddle } from '@/lib/format';

export interface L3PayoutWalletOption {
  id: string;
  address: string;
  balanceMinor: string | null;
  balanceCurrency: string | null;
}

export type L3PayoutActionResult = {
  ok: boolean;
  message: string;
  transactionId?: string;
};

export function L3PayoutForm({
  wallets,
  disabled,
  disabledReason,
  action,
}: {
  wallets: L3PayoutWalletOption[];
  disabled?: boolean;
  disabledReason?: string;
  action: (formData: FormData) => Promise<L3PayoutActionResult>;
}) {
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? '');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<L3PayoutActionResult | null>(null);

  const noWallets = wallets.length === 0;
  const blocked = disabled || noWallets;

  function onSubmit(formData: FormData) {
    formData.set('wallet_id', walletId);
    formData.set('destination_address', destination.trim());
    formData.set('amount', amount);
    formData.set('memo', memo);
    setResult(null);
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
      if (res.ok) {
        setDestination('');
        setAmount('');
        setMemo('');
      }
    });
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Send USDC on L3"
        subtitle="Direct payout from a custodial L3 wallet — reserved in the ledger before broadcast"
      />
      <form action={onSubmit} className="flex flex-col gap-5 p-5 pt-0">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">Source wallet</span>
          {noWallets ? (
            <span className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-muted">
              No Saly L3 wallets — provision one from the Wallets page.
            </span>
          ) : (
            <select
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
            >
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {truncateMiddle(w.address, 10, 8)}
                  {w.balanceMinor
                    ? ` · ${formatMinor(w.balanceMinor, w.balanceCurrency ?? 'USDC')}`
                    : ''}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">Destination address</span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="0x…"
            spellCheck={false}
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 font-mono text-sm text-text-primary outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">Amount (USDC)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
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
            placeholder="Payout note"
            className="rounded-lg border border-surface-border bg-surface-card px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        {blocked && disabledReason ? (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {disabledReason}
          </div>
        ) : null}

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
              {result.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
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
          disabled={pending || blocked || !destination || !amount}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Boxes className="h-4 w-4" /> Send on L3
            </>
          )}
        </button>

        <p className="flex items-center gap-2 text-[11px] text-text-muted">
          <Wallet className="h-3 w-3" /> Funds are debited from your wallet liability and settle when the L3
          listener confirms the on-chain transfer.
        </p>
      </form>
    </Card>
  );
}

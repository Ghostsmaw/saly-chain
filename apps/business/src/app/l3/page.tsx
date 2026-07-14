import Link from 'next/link';
import { Boxes, CheckCircle2, Clock, Wallet } from 'lucide-react';
import { Card, CardHeader, StatCard } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { L3RailStatus } from '@/components/L3RailStatus';
import { L3PayoutForm, type L3PayoutWalletOption } from '@/components/L3PayoutForm';
import {
  fetchL3Wallets,
  fetchOrganization,
  fetchTransactions,
  getL3RailStatus,
} from '@/lib/api';
import { formatMinor, toneForTxState, truncateMiddle } from '@/lib/format';
import { runL3Payout } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const STATE_TONE_CLASS: Record<string, string> = {
  success: 'bg-success-500/15 text-success-300',
  danger: 'bg-danger-500/15 text-danger-300',
  warning: 'bg-warning-500/15 text-warning-300',
  info: 'bg-brand-500/15 text-brand-200',
  neutral: 'bg-surface-cardHover text-text-muted',
};

export default async function L3RailPage() {
  const status = getL3RailStatus();
  const [orgResult, walletsResult, { data: transactions }] = await Promise.all([
    fetchOrganization(),
    fetchL3Wallets(),
    fetchTransactions(100),
  ]);

  const l3Payouts = transactions.filter((t) => t.kind === 'L3_PAYOUT');
  const settled = l3Payouts.filter((t) => t.state === 'SETTLED');
  const inFlight = l3Payouts.filter(
    (t) => t.state === 'EXECUTING' || t.state === 'AWAITING_CONFIRMATION',
  );
  const settledVolume = settled.reduce((acc, t) => acc + Number(BigInt(t.source.amount_minor)), 0);

  const walletOptions: L3PayoutWalletOption[] = walletsResult.data.map((w) => ({
    id: w.id,
    address: w.address,
    balanceMinor: w.balance_minor,
    balanceCurrency: w.balance_currency,
  }));

  const disabledReason = !status.usdcConfigured
    ? 'L3 USDC is not configured yet — set L3_USDC_ADDRESS to enable payouts.'
    : !status.routingEnabled
      ? 'L3 routing is disabled (ROUTING_L3_ENABLED=false).'
      : undefined;

  return (
    <BusinessShell
      title="L3 Rail"
      subtitle="Saly L3 — custodial USDC payouts on dedicated OP-Stack blockspace"
      orgName={orgResult.data?.name}
    >
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="L3 wallets"
          value={walletsResult.data.length}
          icon={<Wallet className="h-4 w-4" />}
          iconTone="brand"
        />
        <StatCard
          label="Settled payouts"
          value={settled.length}
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconTone="success"
        />
        <StatCard
          label="In flight"
          value={inFlight.length}
          icon={<Clock className="h-4 w-4" />}
          iconTone={inFlight.length > 0 ? 'warning' : 'brand'}
        />
        <StatCard
          label="Settled volume"
          value={formatMinor(String(settledVolume), 'USDC')}
          icon={<Boxes className="h-4 w-4" />}
          iconTone="cyan"
        />
      </section>

      <section className="mb-6">
        <L3RailStatus status={status} />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
        <L3PayoutForm
          wallets={walletOptions}
          disabled={Boolean(disabledReason)}
          disabledReason={disabledReason}
          action={runL3Payout}
        />

        <Card>
          <CardHeader
            title="Recent L3 payouts"
            subtitle={`${l3Payouts.length} transaction${l3Payouts.length === 1 ? '' : 's'}`}
          />
          {l3Payouts.length === 0 ? (
            <p className="py-10 text-center text-sm text-text-tertiary">
              No L3 payouts yet. Send USDC using the form to get started.
            </p>
          ) : (
            <ul className="flex flex-col gap-2 px-4 pb-4">
              {l3Payouts.slice(0, 10).map((tx) => (
                <li key={tx.id}>
                  <Link
                    href={`/transactions/${tx.id}`}
                    className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-cardHover/40 px-3 py-2.5 transition hover:border-violet-500/30 hover:bg-surface-cardHover/70"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {formatMinor(tx.source.amount_minor, tx.source.currency)}
                      </p>
                      <p className="truncate font-mono text-[11px] text-text-muted">
                        {tx.destination.address ? truncateMiddle(tx.destination.address, 8, 6) : tx.id.slice(0, 8)}{' '}
                        · {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={[
                        'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium',
                        STATE_TONE_CLASS[toneForTxState(tx.state)],
                      ].join(' ')}
                    >
                      {tx.state}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </BusinessShell>
  );
}

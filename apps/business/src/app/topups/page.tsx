import Link from 'next/link';
import { ArrowDownToLine, CheckCircle2, Clock, Wallet } from 'lucide-react';
import { Card, CardHeader, StatCard } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { TopupForm } from '@/components/TopupForm';
import { TopupRailBadge } from '@/components/TopupPanel';
import { fetchOrganization, fetchTransactions } from '@/lib/api';
import { businessNgnTreasuryAccountRef } from '@/lib/constants';
import { formatMinor } from '@/lib/format';
import { runTopup } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TopupsPage() {
  const [orgResult, { data: transactions }] = await Promise.all([
    fetchOrganization(),
    fetchTransactions(50),
  ]);

  const topups = transactions.filter((t) => t.kind === 'TOPUP');
  const settled = topups.filter((t) => t.state === 'SETTLED').length;
  const recentVolume = topups
    .filter((t) => t.state === 'SETTLED')
    .reduce((acc, t) => acc + Number(BigInt(t.source.amount_minor)), 0);

  return (
    <BusinessShell
      title="Top up"
      subtitle="Credit your treasury from the inbound clearing pool"
      orgName={orgResult.data?.name}
    >
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Top-ups"
          value={topups.length}
          icon={<ArrowDownToLine className="h-4 w-4" />}
          iconTone="brand"
        />
        <StatCard
          label="Settled"
          value={settled}
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconTone="success"
        />
        <StatCard
          label="Settled volume"
          value={formatMinor(String(recentVolume), 'NGN')}
          icon={<Wallet className="h-4 w-4" />}
          iconTone="cyan"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <TopupForm
          currency="NGN"
          destinationLabel={businessNgnTreasuryAccountRef()}
          action={runTopup}
        />

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="How it works" />
            <ol className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  1
                </span>
                Ops prefunds <code className="text-xs">asset.clearing.NGN</code> via admin seed (simulated inbound).
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  2
                </span>
                Submit a TOPUP — compliance and risk screen once at submission.
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  3
                </span>
                Ledger posts immediately: DR clearing, CR your treasury liability.
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                  4
                </span>
                No PSP or chain confirmation — Tier 2 has no real pay-in rail yet.
              </li>
            </ol>
          </Card>

          <Card>
            <CardHeader
              title="Recent top-ups"
              subtitle={`${topups.length} transaction${topups.length === 1 ? '' : 's'}`}
            />
            {topups.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-tertiary">
                No top-ups yet. Credit your treasury using the form.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {topups.slice(0, 8).map((tx) => (
                  <li key={tx.id}>
                    <Link
                      href={`/transactions/${tx.id}`}
                      className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-cardHover/40 px-3 py-2.5 transition hover:border-brand-500/30 hover:bg-surface-cardHover/70"
                    >
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {formatMinor(tx.source.amount_minor, tx.source.currency)}
                        </p>
                        <p className="font-mono text-[11px] text-text-muted">
                          {tx.topup?.external_reference ?? tx.id.slice(0, 8)} ·{' '}
                          {new Date(tx.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <TopupRailBadge />
                        <span
                          className={[
                            'rounded-full px-2 py-0.5 text-[11px] font-medium',
                            tx.state === 'SETTLED'
                              ? 'bg-success-500/15 text-success-300'
                              : tx.state === 'FAILED'
                                ? 'bg-danger-500/15 text-danger-300'
                                : 'bg-warning-500/15 text-warning-300',
                          ].join(' ')}
                        >
                          {tx.state}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-3 p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p className="text-xs text-text-secondary">
                Real fiat collection and on-chain deposit detection are planned for a later tier. Until
                then, coordinate with ops to seed clearing before large top-ups.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </BusinessShell>
  );
}

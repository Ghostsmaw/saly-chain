'use client';

import { useState, useTransition } from 'react';
import { ArrowDownLeft, ArrowUpRight, Loader2 } from 'lucide-react';
import type { EscrowDealRow } from '@/app/escrow/actions';
import { releaseEscrowDeal, refundEscrowDeal } from '@/app/escrow/actions';
import {
  ESCROW_STATUS_FILTERS,
  type EscrowStatusFilter,
  escrowStatusVariant,
  formatEscrowUsdc,
} from '@/lib/saly-escrow';
import { truncateAddress } from '@/lib/saly-format';
import { SalyBadge, SalyButton, SalyCard, SalyEmptyState, SalyTabs } from '@/components/saly/ui';

export function EscrowExplorer({ deals }: { deals: EscrowDealRow[] }) {
  const [filter, setFilter] = useState<EscrowStatusFilter>('All');
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const filtered =
    filter === 'All' ? deals : deals.filter((d) => d.status === filter);

  function act(dealId: string, action: 'release' | 'refund') {
    setMessage(null);
    startTransition(async () => {
      const res = action === 'release' ? await releaseEscrowDeal(dealId) : await refundEscrowDeal(dealId);
      setMessage(
        res.ok
          ? `${action} submitted${res.txHash ? ` · ${res.txHash.slice(0, 14)}…` : ''}`
          : res.message,
      );
    });
  }

  if (deals.length === 0) {
    return (
      <SalyEmptyState
        title="No escrow deals"
        description="Fund a deal via an intent with escrow_condition."
      />
    );
  }

  return (
    <div className="space-y-4">
      {message ? (
        <p className="rounded-saly border border-saly-border bg-saly-bg-secondary px-3 py-2 text-xs text-saly-text-secondary">
          {message}
        </p>
      ) : null}

      <SalyTabs
        tabs={ESCROW_STATUS_FILTERS.map((s) => ({
          key: s,
          label: s === 'All' ? 'All deals' : s.toLowerCase(),
          count: s === 'All' ? deals.length : deals.filter((d) => d.status === s).length,
        }))}
        active={filter}
        onChange={setFilter}
      />

      <SalyCard padding={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                <th className="px-4 py-2.5 font-medium">Deal</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Amount</th>
                <th className="px-4 py-2.5 font-medium">Payee</th>
                <th className="px-4 py-2.5 font-medium">Events</th>
                <th className="px-4 py-2.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((deal) => (
                <tr key={deal.id} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                  <td className="px-4 py-3 font-mono text-[11px] text-saly-text-primary">
                    {truncateAddress(deal.deal_id, 10, 6)}
                  </td>
                  <td className="px-4 py-3">
                    <SalyBadge variant={escrowStatusVariant(deal.status)} dot>
                      {deal.status}
                    </SalyBadge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-saly-text-primary">
                    {formatEscrowUsdc(deal.amount_minor)}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-saly-text-muted">
                    {truncateAddress(deal.payee)}
                  </td>
                  <td className="px-4 py-3 text-xs text-saly-text-faint">
                    {deal.events.length} event{deal.events.length === 1 ? '' : 's'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {deal.status === 'FUNDED' ? (
                        <>
                          <SalyButton
                            variant="secondary"
                            size="sm"
                            disabled={pending}
                            onClick={() => act(deal.deal_id, 'release')}
                          >
                            {pending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3" />
                            )}
                            Release
                          </SalyButton>
                          <SalyButton
                            variant="ghost"
                            size="sm"
                            disabled={pending}
                            onClick={() => act(deal.deal_id, 'refund')}
                          >
                            {pending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <ArrowDownLeft className="h-3 w-3" />
                            )}
                            Refund
                          </SalyButton>
                        </>
                      ) : (
                        <span className="text-[11px] text-saly-text-faint">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SalyCard>
    </div>
  );
}

export function EscrowTokenHint() {
  return (
    <SalyCard className="border-amber-500/20 bg-amber-500/[0.04]">
      <p className="text-sm text-amber-200/90">
        Set <code className="text-amber-100/90">EXECUTION_ADMIN_TOKEN</code> to enable release/refund API calls.
        Optionally set <code className="text-amber-100/90">WALLET_INTERNAL_ADMIN_TOKEN</code> on wallet.
      </p>
    </SalyCard>
  );
}

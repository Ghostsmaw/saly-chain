'use client';

import { Coins, Radio, Route, Server } from 'lucide-react';
import { SalyBadge, SalyCard } from '@/components/saly/ui';
import { truncateAddress } from '@/lib/saly-format';

export type L3MoneyRailStatus = {
  rpcUrl: string;
  usdcConfigured: boolean;
  usdcAddress: string | null;
  network: string;
  routingEnabled: boolean;
};

export function L3MoneyRailPanel({ status }: { status: L3MoneyRailStatus }) {
  const operational = status.usdcConfigured;

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-saly-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">L3 money rail</p>
          <p className="text-xs text-saly-text-muted">S6 — custodial USDC on the execution layer</p>
        </div>
        <SalyBadge variant={operational ? 'success' : 'warning'} dot>
          {operational ? 'USDC ready' : 'Configure USDC'}
        </SalyBadge>
      </div>

      <div className="grid grid-cols-1 gap-px bg-saly-border sm:grid-cols-2">
        <RailCell icon={<Server className="h-4 w-4" />} label="L3 network" value={status.network} />
        <RailCell
          icon={<Radio className="h-4 w-4" />}
          label="Execution RPC"
          value={status.rpcUrl}
          mono
          truncate
        />
        <RailCell
          icon={<Coins className="h-4 w-4" />}
          label="USDC contract"
          value={status.usdcAddress ?? 'Set L3_USDC_ADDRESS'}
          mono
          truncate={Boolean(status.usdcAddress)}
          muted={!status.usdcAddress}
        />
        <RailCell
          icon={<Route className="h-4 w-4" />}
          label="Routing"
          value={status.routingEnabled ? 'L3 rail enabled' : 'ROUTING_L3_ENABLED=false'}
          mono={false}
        />
      </div>

      {!operational ? (
        <div className="border-t border-saly-border px-5 py-4">
          <p className="text-xs leading-relaxed text-saly-text-muted">
            Deploy or bridge USDC on L3 devnet, then set{' '}
            <code className="rounded bg-white/[0.06] px-1">L3_USDC_ADDRESS</code> — see{' '}
            <code className="rounded bg-white/[0.06] px-1">docs/runbooks/s6-l3-money-rail.md</code>.
          </p>
        </div>
      ) : null}
    </SalyCard>
  );
}

function RailCell({
  icon,
  label,
  value,
  mono,
  truncate: shouldTruncate,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
  muted?: boolean;
}) {
  const display = shouldTruncate ? truncateAddress(value, 14, 10) : value;

  return (
    <div className="bg-saly-bg-card px-5 py-4">
      <div className="flex items-center gap-2 text-saly-text-faint">{icon}</div>
      <p className="mt-2 text-xs text-saly-text-muted">{label}</p>
      <p
        className={[
          'mt-1',
          mono ? 'font-mono text-[11px]' : 'text-sm',
          muted ? 'text-saly-text-faint' : 'text-saly-text-primary',
        ].join(' ')}
        title={value}
      >
        {display}
      </p>
    </div>
  );
}

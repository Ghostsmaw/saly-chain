'use client';

import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpFromLine, Link2, Shield } from 'lucide-react';
import { SalyBadge, SalyCard, SalyDivider, SalyEmptyState } from '@/components/saly/ui';
import { truncateAddress } from '@/lib/saly-format';

export type L3BridgeStatus = {
  configured: boolean;
  network: string;
  optimism_portal?: string;
  l1_standard_bridge?: string;
  l2_standard_bridge?: string;
  recent_count?: number;
};

export function L3BridgePanel({ status }: { status: L3BridgeStatus }) {
  const operational = status.configured && Boolean(status.l1_standard_bridge);

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-saly-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">Canonical OP-Stack bridge</p>
          <p className="text-xs text-saly-text-muted">D2 — deposit and withdraw between Base and L3</p>
        </div>
        <SalyBadge variant={operational ? 'success' : 'warning'} dot>
          {operational ? 'Configured' : 'Awaiting manifest'}
        </SalyBadge>
      </div>

      <BridgeDirectionBar active={operational} recentCount={status.recent_count ?? 0} />

      <SalyDivider />

      <div className="grid grid-cols-1 gap-px bg-saly-border md:grid-cols-2">
        <ContractCell
          icon={<Shield className="h-4 w-4" />}
          label="OptimismPortal"
          value={status.optimism_portal}
        />
        <ContractCell
          icon={<Link2 className="h-4 w-4" />}
          label="L1 Standard Bridge"
          value={status.l1_standard_bridge}
        />
        <ContractCell label="L2 Standard Bridge" value={status.l2_standard_bridge} />
        <ContractCell label="L3 network" value={status.network} mono={false} />
      </div>

      {!operational ? (
        <div className="border-t border-saly-border px-5 py-4">
          <p className="text-xs leading-relaxed text-saly-text-muted">
            Populate{' '}
            <code className="rounded bg-white/[0.06] px-1 text-saly-text-secondary">
              infra/l3/testnet/deployments.base-sepolia.json
            </code>{' '}
            after op-deployer and start{' '}
            <code className="rounded bg-white/[0.06] px-1 text-saly-text-secondary">
              worker-chain-listener-base-bridge
            </code>
            .
          </p>
        </div>
      ) : null}
    </SalyCard>
  );
}

function BridgeDirectionBar({ active, recentCount }: { active: boolean; recentCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-5 py-4">
      <DirectionCard
        icon={<ArrowDownToLine className="h-4 w-4" />}
        label="Deposits"
        sublabel="Base → L3"
        active={active}
      />
      <DirectionCard
        icon={<ArrowUpFromLine className="h-4 w-4" />}
        label="Withdrawals"
        sublabel="L3 → Base"
        active={active}
        delay={0.8}
      />
      <p className="col-span-2 text-center text-[11px] text-saly-text-faint">
        {recentCount > 0 ? `${recentCount} recent bridge transactions tracked` : 'No recent bridge activity'}
      </p>
    </div>
  );
}

function DirectionCard({
  icon,
  label,
  sublabel,
  active,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  active: boolean;
  delay?: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-saly border border-saly-border bg-saly-bg-secondary/50 px-4 py-3">
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay }}
        />
      ) : null}
      <div className="flex items-center gap-2 text-saly-text-faint">{icon}</div>
      <p className="mt-2 text-sm font-medium text-saly-text-primary">{label}</p>
      <p className="text-[11px] text-saly-text-muted">{sublabel}</p>
    </div>
  );
}

function ContractCell({
  icon,
  label,
  value,
  mono = true,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  mono?: boolean;
}) {
  const display = value ?? 'Not set';
  const isSet = Boolean(value);

  return (
    <div className="bg-saly-bg-card px-5 py-4">
      <div className="flex items-center gap-2">
        {icon ? <span className="text-saly-text-faint">{icon}</span> : null}
        <p className="text-xs text-saly-text-muted">{label}</p>
      </div>
      {isSet ? (
        <p
          className={[
            'mt-2 text-saly-text-primary',
            mono ? 'break-all font-mono text-[11px]' : 'text-sm',
          ].join(' ')}
          title={display}
        >
          {mono ? truncateAddress(display, 12, 10) : display}
        </p>
      ) : (
        <p className="mt-2 text-sm text-saly-text-faint">Not configured</p>
      )}
    </div>
  );
}

export function L3BridgeHistory({ recentCount, active }: { recentCount: number; active: boolean }) {
  return (
    <SalyCard>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-saly-text-primary">Bridge history</p>
        <SalyBadge variant={recentCount > 0 ? 'info' : 'neutral'}>{recentCount} recent</SalyBadge>
      </div>
      {recentCount === 0 ? (
        <SalyEmptyState
          title="No bridge transactions"
          description={
            active
              ? 'Bridge is configured — activity will appear once deposits or withdrawals are initiated.'
              : 'Complete bridge setup to enable cross-chain transfers.'
          }
        />
      ) : (
        <ul className="space-y-2">
          {Array.from({ length: Math.min(recentCount, 5) }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-saly border border-saly-border px-3 py-2.5 text-xs"
            >
              <span className="text-saly-text-muted">
                {i % 2 === 0 ? 'Deposit' : 'Withdrawal'} · Base ↔ L3
              </span>
              <span className="font-mono text-saly-text-faint">Pending sync</span>
            </li>
          ))}
        </ul>
      )}
    </SalyCard>
  );
}

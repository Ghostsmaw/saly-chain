'use client';

import { motion } from 'framer-motion';
import { ArrowLeftRight, Clock, Layers, Zap } from 'lucide-react';
import { SalyBadge, SalyCard, SalyStat } from '@/components/saly/ui';

export function BridgeHero({
  bridgeActive,
  networkLabel,
  settlementLabel,
  recentCount,
  exitPct,
  passed,
  total,
}: {
  bridgeActive: boolean;
  networkLabel: string;
  settlementLabel: string;
  recentCount: number;
  exitPct: number;
  passed: number;
  total: number;
}) {
  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.2fr]">
        <div className="border-b border-saly-border p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <SalyBadge variant={bridgeActive ? 'success' : 'warning'} dot>
              {bridgeActive ? 'Bridge operational' : 'Setup required'}
            </SalyBadge>
            <SalyBadge variant="neutral">{networkLabel}</SalyBadge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SalyStat label="Exit criteria" value={`${passed}/${total}`} hint={`${exitPct}% complete`} />
            <SalyStat label="Recent bridge txs" value={recentCount.toLocaleString()} hint="Execution service" />
            <SalyStat label="Est. finality" value="~2 min" hint="L2 → L1 settlement" />
            <SalyStat label="Bridge fee" value="Gas only" hint="No protocol surcharge" />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6">
          <BridgeFlow
            bridgeActive={bridgeActive}
            sourceLabel={settlementLabel}
            destLabel={networkLabel}
          />
        </div>
      </div>
    </SalyCard>
  );
}

function BridgeFlow({
  bridgeActive,
  sourceLabel,
  destLabel,
}: {
  bridgeActive: boolean;
  sourceLabel: string;
  destLabel: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="flex items-center justify-between gap-4">
        <ChainNode label={sourceLabel} sublabel="Settlement L1" active={bridgeActive} />
        <BridgeTrack active={bridgeActive} />
        <ChainNode label={destLabel} sublabel="Execution L3" active={bridgeActive} accent />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-saly-text-faint">
        <span className="inline-flex items-center gap-1.5">
          <ArrowLeftRight className="h-3 w-3" />
          Deposits
        </span>
        <span className="h-3 w-px bg-saly-border" />
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3 w-3" />
          Withdrawals
        </span>
        <span className="h-3 w-px bg-saly-border" />
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          ~120s ETA
        </span>
      </div>
    </div>
  );
}

function ChainNode({
  label,
  sublabel,
  active,
  accent,
}: {
  label: string;
  sublabel: string;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          'relative grid h-14 w-14 place-items-center rounded-saly-lg border transition-colors',
          active
            ? accent
              ? 'border-saly-accent/40 bg-saly-accent-muted'
              : 'border-saly-border-strong bg-saly-bg-card'
            : 'border-saly-border bg-saly-bg-card opacity-60',
        ].join(' ')}
      >
        <Layers className={['h-5 w-5', accent ? 'text-violet-300' : 'text-saly-text-secondary'].join(' ')} />
        {active ? (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-saly-bg-secondary" />
        ) : null}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-saly-text-primary">{label}</p>
        <p className="text-[10px] text-saly-text-faint">{sublabel}</p>
      </div>
    </div>
  );
}

function BridgeTrack({ active }: { active: boolean }) {
  return (
    <div className="relative min-w-0 flex-1 px-2">
      <div className="h-px w-full bg-saly-border" />
      {active ? (
        <>
          <motion.div
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-400"
            animate={{ left: ['8%', '92%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
          <motion.div
            className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-saly-text-muted"
            animate={{ left: ['92%', '8%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2, delay: 1.4 }}
          />
        </>
      ) : (
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 border-t border-dashed border-saly-border" />
      )}
    </div>
  );
}

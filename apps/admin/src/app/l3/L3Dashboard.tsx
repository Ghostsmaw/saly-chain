'use client';

import Link from 'next/link';
import { CheckCircle2, Circle, Clock, ExternalLink, Layers, Server, Target, XCircle } from 'lucide-react';
import type { L3DashboardData } from '@/lib/l3';
import { truncateAddress } from '@/lib/saly-format';
import {
  SalyBadge,
  SalyCard,
  SalyCodeBlock,
  SalyEmptyState,
} from '@/components/saly/ui';

export function L3SpikeExitBanner({ data }: { data: L3DashboardData }) {
  const complete = data.exitCriteria.spikeComplete;
  const pct = Math.round((data.exitCriteria.passed / data.exitCriteria.total) * 100);

  return (
    <SalyCard
      className={
        complete
          ? 'mb-8 border-emerald-500/20 bg-emerald-500/[0.04]'
          : 'mb-8 border-saly-border-strong bg-saly-bg-secondary'
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {complete ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <Target className="h-5 w-5 shrink-0 text-violet-300" />
          )}
          <div>
            <p className="text-sm font-medium text-saly-text-primary">
              {complete ? 'S5 spike complete' : 'Production readiness in progress'}
            </p>
            <p className="mt-0.5 text-xs text-saly-text-muted">
              {complete
                ? `Devnet rollup posting to Base Sepolia — ${data.exitCriteria.passed}/${data.exitCriteria.total} checks passed`
                : `${data.exitCriteria.passed}/${data.exitCriteria.total} exit criteria passed — run pnpm l3:verify-spike`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.06] sm:block">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <SalyBadge variant={complete ? 'success' : 'warning'}>{pct}%</SalyBadge>
        </div>
      </div>
    </SalyCard>
  );
}

export function L3ExitCriteriaPanel({ data }: { data: L3DashboardData }) {
  const pct = Math.round((data.exitCriteria.passed / data.exitCriteria.total) * 100);

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-saly-border px-5 py-4">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">Exit checklist</p>
          <p className="text-xs text-saly-text-muted">S5 devnet + first OutputProposed</p>
        </div>
        <SalyBadge variant={data.exitCriteria.spikeComplete ? 'success' : 'warning'}>
          {data.exitCriteria.passed}/{data.exitCriteria.total}
        </SalyBadge>
      </div>

      <div className="px-5 py-4">
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-white/80 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="space-y-2">
          {data.exitCriteria.criteria.map((c) => (
            <li
              key={c.id}
              className="flex items-start gap-3 rounded-saly border border-saly-border px-3 py-2.5 transition-colors hover:bg-saly-bg-hover"
            >
              <CriterionIcon status={c.status} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm text-saly-text-primary">{c.label}</p>
                  <SalyBadge
                    variant={c.status === 'pass' ? 'success' : c.status === 'fail' ? 'danger' : 'warning'}
                  >
                    {c.status}
                  </SalyBadge>
                </div>
                <p className="mt-0.5 text-xs text-saly-text-muted">{c.description}</p>
                {c.detail ? (
                  <p className="mt-1 font-mono text-[10px] text-saly-text-faint">{c.detail}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {data.manifestPath ? (
          <p className="mt-4 text-xs text-saly-text-faint">
            Manifest · <code className="text-saly-text-muted">{data.manifestPath}</code>
          </p>
        ) : null}
      </div>
    </SalyCard>
  );
}

export function L3SequencerPanel({ data }: { data: L3DashboardData }) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-7">
        <SalyCard padding={false} className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-saly-border px-5 py-4">
            <div>
              <p className="text-sm font-medium text-saly-text-primary">OP-Stack sequencer</p>
              <p className="text-xs text-saly-text-muted">
                {data.network.label} · chain {data.network.chainId}
              </p>
            </div>
            <SalyBadge variant="info">S5 spike</SalyBadge>
          </div>
          <ul className="divide-y divide-saly-border">
            {data.components.map((c) => (
              <li key={c.id} className="flex items-start gap-3 px-5 py-3.5 transition hover:bg-saly-bg-hover">
                <ComponentIcon status={c.status} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-saly-text-primary">{c.label}</p>
                    <SalyBadge
                      variant={
                        c.status === 'required' ? 'success' : c.status === 'future' ? 'neutral' : 'warning'
                      }
                    >
                      {c.status}
                    </SalyBadge>
                  </div>
                  <p className="mt-0.5 text-xs text-saly-text-muted">{c.description}</p>
                  <p className="mt-1 font-mono text-[10px] text-saly-text-faint">{c.process}</p>
                </div>
              </li>
            ))}
          </ul>
        </SalyCard>
      </div>

      <div className="flex flex-col gap-6 xl:col-span-5">
        <SettlementCard data={data} />
        <ArchitectureFlow />
      </div>
    </div>
  );
}

function SettlementCard({ data }: { data: L3DashboardData }) {
  const { monitor } = data;
  const variant =
    data.source === 'live' ? 'success' : data.source === 'unconfigured' ? 'warning' : 'danger';

  return (
    <SalyCard>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">Settlement monitor</p>
          <p className="text-xs text-saly-text-muted">L1 for L3 · {data.network.settlement}</p>
        </div>
        <SalyBadge variant={variant} dot>
          {data.source === 'live' ? 'Live' : data.source}
        </SalyBadge>
      </div>

      <dl className="space-y-3">
        <DetailRow label="Settlement chain ID" value={String(data.network.settlementChainId)} mono />
        <DetailRow
          label="L2OutputOracle"
          value={monitor.l2OutputOracle ? truncateAddress(String(monitor.l2OutputOracle), 10, 8) : 'Not configured'}
          mono
        />
        {monitor.latestOutputIndex !== undefined ? (
          <DetailRow label="Latest output index" value={monitor.latestOutputIndex.toString()} mono />
        ) : null}
        {monitor.latestL2BlockNumber !== undefined ? (
          <DetailRow label="Latest L2 block" value={monitor.latestL2BlockNumber.toString()} mono />
        ) : null}
      </dl>

      {monitor.message ? (
        <p className="mt-4 rounded-saly border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-xs text-amber-200/90">
          {monitor.message}
        </p>
      ) : null}
    </SalyCard>
  );
}

export function L3OutputProposalsPanel({ data }: { data: L3DashboardData }) {
  const p = data.monitor.latestProposal;
  const baseExplorer = 'https://sepolia.basescan.org';

  return (
    <SalyCard padding={false} className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-saly-border px-5 py-4">
        <div>
          <p className="text-sm font-medium text-saly-text-primary">Latest output proposal</p>
          <p className="text-xs text-saly-text-muted">L2OutputOracle.OutputProposed on Base Sepolia</p>
        </div>
        <SalyBadge variant={p ? 'success' : 'neutral'} dot>
          {p ? 'Posted' : 'Awaiting'}
        </SalyBadge>
      </div>

      {!p ? (
        <div className="p-5">
          <SalyEmptyState
            title="No proposal observed"
            description="Deploy devnet and run op-proposer. See docs/runbooks/s5-l3-devnet-rollup.md."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px bg-saly-border md:grid-cols-2 lg:grid-cols-3">
          <ProposalCell label="Output index" value={p.outputIndex.toString()} />
          <ProposalCell label="L2 block" value={p.l2BlockNumber.toString()} />
          <ProposalCell label="L1 timestamp" value={p.l1Timestamp.toString()} />
          <ProposalCell label="L1 block" value={p.l1BlockNumber.toString()} />
          <ProposalCell label="Output root" value={truncateAddress(p.outputRoot, 12, 8)} wide />
          <ProposalCell
            label="L1 transaction"
            value={truncateAddress(p.l1TxHash, 10, 8)}
            href={p.l1TxHash !== '0x' ? `${baseExplorer}/tx/${p.l1TxHash}` : undefined}
          />
        </div>
      )}
    </SalyCard>
  );
}

function ProposalCell({
  label,
  value,
  href,
  wide,
}: {
  label: string;
  value: string;
  href?: string;
  wide?: boolean;
}) {
  return (
    <div className={['bg-saly-bg-card px-5 py-4', wide ? 'md:col-span-2 lg:col-span-1' : ''].join(' ')}>
      <p className="text-xs text-saly-text-muted">{label}</p>
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-violet-300 hover:text-violet-200"
        >
          {value}
          <ExternalLink className="h-3 w-3" />
        </Link>
      ) : (
        <p className="mt-1 font-mono text-xs text-saly-text-primary">{value}</p>
      )}
    </div>
  );
}

function ArchitectureFlow() {
  const steps = [
    { icon: Layers, text: 'User tx → op-geth (L3)' },
    { icon: Server, text: 'op-batcher → Base BatchInbox' },
    { icon: CheckCircle2, text: 'op-proposer → L2OutputOracle', accent: true },
    { icon: Clock, text: 'l3-rollup-monitor → NATS event' },
  ];

  return (
    <SalyCard>
      <p className="mb-4 text-sm font-medium text-saly-text-primary">Settlement data flow</p>
      <ol className="space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-saly border border-saly-border bg-saly-bg-secondary">
                <Icon className={['h-3 w-3', step.accent ? 'text-emerald-400' : 'text-saly-text-faint'].join(' ')} />
              </span>
              <span className="text-xs leading-relaxed text-saly-text-secondary">{step.text}</span>
            </li>
          );
        })}
      </ol>
    </SalyCard>
  );
}

function CriterionIcon({ status }: { status: string }) {
  if (status === 'pass') return <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />;
  if (status === 'fail') return <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />;
  return <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />;
}

function ComponentIcon({ status }: { status: string }) {
  if (status === 'required') return <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />;
  if (status === 'future') return <Circle className="mt-0.5 h-4 w-4 shrink-0 text-saly-text-faint" />;
  return <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />;
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-saly-text-muted">{label}</dt>
      <dd className={['mt-0.5 text-saly-text-primary', mono ? 'font-mono text-xs' : 'text-sm'].join(' ')}>
        {value}
      </dd>
    </div>
  );
}

export function L3OperatorPanel({ manifestPath }: { manifestPath: string | null }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SalyCard>
        <p className="mb-3 text-sm font-medium text-saly-text-primary">Verify spike</p>
        <SalyCodeBlock>{`pnpm l3:verify-spike\npnpm l3:verify-production`}</SalyCodeBlock>
      </SalyCard>
      <SalyCard>
        <p className="mb-3 text-sm font-medium text-saly-text-primary">Deployment manifest</p>
        {manifestPath ? (
          <p className="font-mono text-xs text-saly-text-secondary">{manifestPath}</p>
        ) : (
          <SalyEmptyState
            title="No manifest"
            description="Configure L3_L2_OUTPUT_ORACLE or copy deployments.base-sepolia.json after op-deployer."
          />
        )}
      </SalyCard>
    </div>
  );
}

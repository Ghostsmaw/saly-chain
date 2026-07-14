import { Suspense } from 'react';
import Link from 'next/link';
import { Gauge } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalySection,
  SalySkeleton,
  SalyStat,
} from '@/components/saly/ui';
import { fetchRiskActors, fetchRiskAssessments, fetchRiskSummary } from '@/lib/api';
import {
  formatUsdMinor,
  riskDecisionVariant,
  truncateActorRef,
  velocityHeat,
} from '@/lib/saly-risk';
import { formatDateTime, truncateId } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RiskPage() {
  return (
    <AdminShell
      title="Risk"
      subtitle="Behavioral scoring, velocity windows, and immutable assessment audit trail"
      topRight={
        <Suspense fallback={null}>
          <RiskLiveBadge />
        </Suspense>
      }
    >
      <SalyFadeIn>
        <Suspense fallback={<HeroSkeleton />}>
          <RiskHero />
        </Suspense>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="flex flex-col gap-6 xl:col-span-3">
            <Suspense fallback={<PanelSkeleton title="Recent assessments" />}>
              <AssessmentsSection />
            </Suspense>
          </div>
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Suspense fallback={<PanelSkeleton title="Velocity heatmap" />}>
              <VelocitySection />
            </Suspense>
            <Suspense fallback={<PanelSkeleton title="Decision thresholds" />}>
              <ThresholdsSection />
            </Suspense>
          </div>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

async function RiskLiveBadge() {
  const { source } = await fetchRiskSummary();
  return (
    <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
      {source === 'live' ? 'Live' : 'Offline'}
    </SalyBadge>
  );
}

async function RiskHero() {
  const { data, source } = await fetchRiskSummary();
  const live = source === 'live';
  const blocked = data.last_24h.BLOCK;
  const reviews = data.last_24h.REVIEW;

  return (
    <SalyCard className="border-saly-border-strong bg-saly-bg-secondary p-0" padding={false}>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SalyBadge variant={live ? 'success' : 'warning'} dot>
            {live ? 'Risk engine live' : 'Service offline'}
          </SalyBadge>
          {reviews > 0 ? <SalyBadge variant="warning">{reviews} in review queue</SalyBadge> : null}
          {blocked > 0 ? <SalyBadge variant="danger">{blocked} blocked (24h)</SalyBadge> : null}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <SalyStat label="Assessments (24h)" value={live ? data.last_24h.total.toLocaleString() : '—'} mono={false} />
          <SalyStat label="Review flagged" value={live ? reviews.toLocaleString() : '—'} mono={false} />
          <SalyStat label="Blocked (24h)" value={live ? blocked.toLocaleString() : '—'} mono={false} />
          <SalyStat
            label="Actor profiles"
            value={live ? data.actor_profiles.toLocaleString() : '—'}
            hint="Rolling velocity"
            mono={false}
          />
        </div>
      </div>
    </SalyCard>
  );
}

async function AssessmentsSection() {
  const { data, source } = await fetchRiskAssessments(50);

  return (
    <SalySection
      title="Recent assessments"
      description="Immutable audit log — profiles advance only on commit after settlement"
      action={
        source === 'live' && data.length > 0 ? (
          <SalyBadge variant="neutral">{`${data.length} shown`}</SalyBadge>
        ) : undefined
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source !== 'live' ? (
          <div className="p-6">
            <SalyEmptyState
              title="Risk service unreachable"
              description="Boot services/risk on port 4005 to load assessment data."
            />
          </div>
        ) : data.length === 0 ? (
          <div className="p-6">
            <SalyEmptyState
              title="No assessments yet"
              description="Scores appear when execution calls POST /v1/risk/assess before settlement."
            />
          </div>
        ) : (
          <ul className="divide-y divide-saly-border">
            {data.map((row) => (
              <li key={row.id} className="px-4 py-3 transition hover:bg-saly-bg-hover">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <SalyBadge variant={riskDecisionVariant(row.decision)} dot>
                        {row.decision}
                      </SalyBadge>
                      <ScoreBar score={row.final_score} decision={row.decision} />
                      <span className="font-mono text-xs text-saly-text-muted">{row.final_score}/100</span>
                    </div>
                    <p className="mt-2 text-sm text-saly-text-primary">
                      <span className="font-medium">{row.actor_external_ref}</span>
                      {row.counterparty_ref ? (
                        <span className="text-saly-text-muted"> → {row.counterparty_ref}</span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-xs text-saly-text-muted">
                      {formatUsdMinor(row.amount_usd_minor)}
                      {row.intent_id ? (
                        <>
                          {' · '}
                          <Link href="/intents" className="text-violet-300 hover:text-violet-200">
                            intent {truncateId(row.intent_id)}
                          </Link>
                        </>
                      ) : null}
                      {row.transaction_id ? ` · tx ${truncateId(row.transaction_id)}` : null}
                    </p>
                    {row.reasons.length > 0 ? (
                      <p className="mt-1.5 line-clamp-2 text-[11px] text-saly-text-faint">
                        {row.reasons.join(' · ')}
                      </p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-[11px] text-saly-text-faint">{formatDateTime(row.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SalyCard>
    </SalySection>
  );
}

async function VelocitySection() {
  const { data, source } = await fetchRiskActors(12);

  return (
    <SalySection
      title="Velocity heatmap"
      description="Actors ranked by rolling 24h USD-normalized volume"
      action={
        <SalyBadge variant={source === 'live' ? 'success' : 'danger'} dot>
          {source === 'live' ? 'Live' : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source !== 'live' || data.length === 0 ? (
          <div className="p-6">
            <SalyEmptyState
              title={source !== 'live' ? 'Actor profiles unavailable' : 'No actor activity'}
              description="Profiles populate after the first committed settlement."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                  <th className="px-4 py-2.5 font-medium">Actor</th>
                  <th className="px-4 py-2.5 font-medium">24h vol</th>
                  <th className="px-4 py-2.5 font-medium">24h tx</th>
                  <th className="px-4 py-2.5 font-medium">Lifetime</th>
                </tr>
              </thead>
              <tbody>
                {data.map((actor) => {
                  const heat = velocityHeat(actor.rolling_24h_count);
                  return (
                    <tr key={actor.external_ref} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                      <td className="px-4 py-2.5 font-mono text-xs text-saly-text-primary">
                        {truncateActorRef(actor.external_ref)}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-saly-text-secondary">
                        {formatUsdMinor(actor.rolling_24h_usd_minor)}
                      </td>
                      <td className="px-4 py-2.5">
                        <VelocityPill count={actor.rolling_24h_count} heat={heat} />
                      </td>
                      <td className="px-4 py-2.5 text-xs text-saly-text-muted">{actor.lifetime_count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SalyCard>
    </SalySection>
  );
}

async function ThresholdsSection() {
  const { data } = await fetchRiskSummary();

  return (
    <SalySection title="Decision thresholds" description="RISK_REVIEW_THRESHOLD / RISK_BLOCK_THRESHOLD">
      <SalyCard>
        <div className="space-y-3">
          <ThresholdRow label="Allow" range={`0 – ${data.thresholds.review - 1}`} variant="success" />
          <ThresholdRow
            label="Review"
            range={`${data.thresholds.review} – ${data.thresholds.block - 1}`}
            variant="warning"
          />
          <ThresholdRow label="Block" range={`${data.thresholds.block}+`} variant="danger" />
        </div>
        <div className="mt-4 rounded-saly border border-saly-border bg-saly-bg-secondary/80 p-3">
          <div className="flex items-center gap-2 text-saly-text-secondary">
            <Gauge className="h-4 w-4" />
            <span className="text-xs font-medium text-saly-text-primary">Scoring components</span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-saly-text-muted">
            Velocity, ticket-size anomaly, new-user boost, and counterparty familiarity merge into a 0–100 score with
            full component transparency on every assessment.
          </p>
        </div>
      </SalyCard>
    </SalySection>
  );
}

function ScoreBar({ score, decision }: { score: number; decision: string }) {
  const color =
    decision === 'BLOCK' ? 'bg-red-500' : decision === 'REVIEW' ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-saly-bg-hover">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(score, 100)}%` }} />
    </div>
  );
}

function VelocityPill({ count, heat }: { count: number; heat: 'hot' | 'warm' | 'normal' }) {
  const cls =
    heat === 'hot'
      ? 'bg-red-500/10 text-red-400'
      : heat === 'warm'
        ? 'bg-amber-500/10 text-amber-400'
        : 'bg-white/[0.06] text-saly-text-secondary';

  return <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[11px] ${cls}`}>{count}</span>;
}

function ThresholdRow({
  label,
  range,
  variant,
}: {
  label: string;
  range: string;
  variant: 'success' | 'warning' | 'danger';
}) {
  const dot =
    variant === 'success' ? 'bg-emerald-400' : variant === 'warning' ? 'bg-amber-400' : 'bg-red-400';

  return (
    <div className="flex items-center justify-between rounded-saly border border-saly-border px-3 py-2">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-sm font-medium text-saly-text-primary">{label}</span>
      </div>
      <span className="font-mono text-xs text-saly-text-muted">{range}</span>
    </div>
  );
}

function HeroSkeleton() {
  return <SalySkeleton className="h-36 w-full rounded-saly-lg" />;
}

function PanelSkeleton({ title }: { title: string }) {
  return (
    <SalySection title={title}>
      <SalySkeleton className="h-48 w-full rounded-saly-lg" />
    </SalySection>
  );
}

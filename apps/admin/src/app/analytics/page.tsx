import { Activity, CheckCircle2, LineChart, XCircle } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { SalyAreaChart } from '@/components/saly/charts/SalyAreaChart';
import { SalyBarChart } from '@/components/saly/charts/SalyBarChart';
import { SalyDonutChart } from '@/components/saly/charts/SalyBarChart';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalyMetricStrip,
  SalySection,
  SalyStat,
} from '@/components/saly/ui';
import { fetchAnalytics } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const STATE_COLORS: Record<string, string> = {
  SETTLED: '#34d399',
  EXECUTING: '#60a5fa',
  AWAITING_CONFIRMATION: '#fbbf24',
  PENDING: '#7C3AED',
  FAILED: '#f87171',
  REJECTED: '#f87171',
  REVERSED: '#fb7185',
};

function colorForState(state: string): string {
  return STATE_COLORS[state] ?? '#71717a';
}

export default async function AnalyticsPage() {
  const { data, source } = await fetchAnalytics(500);
  const successRate =
    data.totalTransactions > 0 ? ((data.settled / data.totalTransactions) * 100).toFixed(1) : '0.0';

  const stateEntries = Object.entries(data.byState).sort(([, a], [, b]) => b - a);
  const kindEntries = Object.entries(data.byKind)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label: label.replace(/_/g, ' '), value }));

  return (
    <AdminShell
      title="Analytics"
      subtitle="Throughput, outcomes, and rail distribution"
      topRight={
        <SalyBadge variant={source === 'live' ? 'success' : 'warning'} dot>
          {source === 'live' ? 'Live' : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyMetricStrip
          items={[
            {
              label: 'Transactions',
              value: source === 'live' ? data.totalTransactions.toLocaleString() : '—',
              hint: <Activity className="inline h-3 w-3" />,
            },
            {
              label: 'Settled',
              value: source === 'live' ? data.settled.toLocaleString() : '—',
              hint: <CheckCircle2 className="inline h-3 w-3" />,
            },
            {
              label: 'Success rate',
              value: source === 'live' ? `${successRate}%` : '—',
              hint: <LineChart className="inline h-3 w-3" />,
            },
            {
              label: 'Failed',
              value: source === 'live' ? data.failed.toLocaleString() : '—',
              hint: <XCircle className="inline h-3 w-3" />,
            },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <SalySection title="Transaction volume" description="Daily execution throughput">
              <SalyCard padding={false} className="overflow-hidden">
                <div className="border-b border-saly-border px-5 py-4">
                  <p className="font-mono text-2xl font-medium text-saly-text-primary">
                    {source === 'live'
                      ? data.dailyVolume.reduce((s, p) => s + p.value, 0).toLocaleString()
                      : '—'}
                  </p>
                  <p className="text-xs text-saly-text-muted">Total in selected range</p>
                </div>
                <div className="p-4">
                  {source === 'live' && data.dailyVolume.length > 0 ? (
                    <SalyAreaChart data={data.dailyVolume} height={300} />
                  ) : (
                    <SalyEmptyState
                      title="No volume data"
                      description={source === 'live' ? 'No transactions in range.' : 'Execution service offline.'}
                    />
                  )}
                </div>
              </SalyCard>
            </SalySection>
          </div>

          <div className="xl:col-span-4">
            <SalySection title="Outcome mix" description="Distribution by state">
              <SalyCard>
                {source === 'live' && stateEntries.length > 0 ? (
                  <>
                    <div className="flex justify-center py-2">
                      <SalyDonutChart
                        data={stateEntries.map(([state, count]) => ({
                          label: state,
                          value: count,
                          color: colorForState(state),
                        }))}
                        centerLabel="total"
                        centerValue={data.totalTransactions.toLocaleString()}
                        size={160}
                      />
                    </div>
                    <ul className="mt-4 space-y-2">
                      {stateEntries.map(([state, count]) => (
                        <li key={state} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-saly-text-secondary">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: colorForState(state) }}
                            />
                            {state.replace(/_/g, ' ').toLowerCase()}
                          </span>
                          <span className="font-mono text-xs text-saly-text-muted">{count.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <SalyEmptyState title="No outcome data" />
                )}
              </SalyCard>
            </SalySection>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SalySection title="Volume by rail" description="Transaction kind distribution">
            <SalyCard>
              {source === 'live' && kindEntries.length > 0 ? (
                <SalyBarChart data={kindEntries} height={260} horizontal />
              ) : (
                <SalyEmptyState title="No rail data" />
              )}
            </SalyCard>
          </SalySection>

          <SalySection title="Revenue & economics" description="Settlement aggregation">
            <SalyCard>
              <div className="space-y-4">
                <SalyStat label="GMV (recent)" value="—" hint="Requires settlement aggregation service" />
                <SalyStat label="Take rate" value="—" hint="Configured per rail in billing module" />
                <p className="text-xs leading-relaxed text-saly-text-muted">
                  Throughput and outcome metrics on this page are derived live from the execution service.
                  Monetary analytics will populate once settlement-amount aggregation is enabled.
                </p>
              </div>
            </SalyCard>
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

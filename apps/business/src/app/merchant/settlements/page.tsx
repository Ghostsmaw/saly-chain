import { Card, CardHeader, StatCard } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { SettlementReportForm } from '@/components/SettlementReportForm';
import { fetchOrganization, fetchSettlementReports } from '@/lib/api';
import { formatMinor } from '@/lib/format';
import { Receipt } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettlementsPage() {
  const [orgResult, reportsResult] = await Promise.all([
    fetchOrganization(),
    fetchSettlementReports(25),
  ]);

  const reports = reportsResult.data;
  const ready = reports.filter((r) => r.status === 'READY');

  return (
    <BusinessShell
      title="Settlements"
      subtitle="Per-org settlement reports over confirmed FIAT pay-ins"
      orgName={orgResult.data?.name}
    >
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard label="Reports" value={reports.length} icon={<Receipt className="h-4 w-4" />} iconTone="brand" />
        <StatCard label="Ready" value={ready.length} icon={<Receipt className="h-4 w-4" />} iconTone="success" />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.2fr]">
        <SettlementReportForm />

        <Card>
          <CardHeader title="Recent reports" />
          {reports.length === 0 ? (
            <p className="px-5 pb-8 text-sm text-text-tertiary">No settlement reports yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 px-5 pb-5">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="rounded-lg border border-surface-border bg-surface-cardHover/40 px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {new Date(report.period_start).toLocaleDateString()} –{' '}
                        {new Date(report.period_end).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-muted">
                        {report.transaction_count ?? 0} tx
                        {report.total_settled_minor && report.currency
                          ? ` · ${formatMinor(report.total_settled_minor, report.currency)}`
                          : ''}
                      </p>
                    </div>
                    <span className="rounded-full bg-surface-border px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                      {report.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </BusinessShell>
  );
}

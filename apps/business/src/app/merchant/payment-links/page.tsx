import Link from 'next/link';
import { CheckCircle2, Link2, XCircle } from 'lucide-react';
import { Card, CardHeader, StatCard } from '@salychain/ui';
import { BusinessShell } from '@/components/BusinessShell';
import { PaymentLinkForm } from '@/components/PaymentLinkForm';
import { fetchCheckoutSessions, fetchOrganization, fetchPaymentLinks } from '@/lib/api';
import { formatMinor } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PaymentLinksPage() {
  const [orgResult, linksResult, sessionsResult] = await Promise.all([
    fetchOrganization(),
    fetchPaymentLinks(50),
    fetchCheckoutSessions(50),
  ]);

  const links = linksResult.data;
  const active = links.filter((l) => l.status === 'ACTIVE').length;
  const completedSessions = sessionsResult.data.filter((s) => s.status === 'COMPLETED').length;

  return (
    <BusinessShell
      title="Payment links"
      subtitle="Share hosted checkout links — payers fund your treasury via the real fiat pay-in rail"
      orgName={orgResult.data?.name}
    >
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Links" value={links.length} icon={<Link2 className="h-4 w-4" />} iconTone="brand" />
        <StatCard label="Active" value={active} icon={<CheckCircle2 className="h-4 w-4" />} iconTone="success" />
        <StatCard
          label="Completed checkouts"
          value={completedSessions}
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconTone="cyan"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr]">
        <PaymentLinkForm />

        <Card>
          <CardHeader title="Your links" subtitle={`${links.length} total`} />
          {links.length === 0 ? (
            <p className="px-5 pb-8 text-sm text-text-tertiary">No payment links yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 px-5 pb-5">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/pay/${link.slug}`}
                    className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-cardHover/40 px-3 py-2.5 transition hover:border-brand-500/30"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">{link.title}</p>
                      <p className="text-xs text-text-muted">
                        {formatMinor(link.amount_minor, link.currency)} · {link.slug}
                      </p>
                    </div>
                    <span
                      className={[
                        'rounded-full px-2 py-0.5 text-[11px] font-medium',
                        link.status === 'ACTIVE'
                          ? 'bg-success-500/15 text-success-300'
                          : 'bg-surface-border text-text-tertiary',
                      ].join(' ')}
                    >
                      {link.status}
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

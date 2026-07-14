import Link from 'next/link';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { fetchPublicMints, fetchPublicPor, fetchPublicRedeems } from '@/lib/stablecoin';
import { shortHash } from '@/lib/format';

export const dynamic = 'force-dynamic';

function formatSalysd(minor: string): string {
  const whole = Number(minor) / 1_000_000;
  return whole.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function ratioLabel(bps: number): string {
  return `${(bps / 100).toFixed(2)}%`;
}

export default async function SalysdPage() {
  const [por, mints, redeems] = await Promise.all([
    fetchPublicPor(),
    fetchPublicMints(),
    fetchPublicRedeems(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">SalySD — native stablecoin</h1>
        <p className="mt-1 text-sm text-text-tertiary">
          Reserve-backed supply, proof-of-reserves attestations, and mint/redeem activity on Saly L3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader title="On-chain supply" subtitle="SalySD totalSupply" />
          <p className="px-4 pb-4 text-2xl font-semibold tabular-nums text-text-primary">
            {por ? `$${formatSalysd(por.on_chain_supply_minor)}` : '—'}
          </p>
        </Card>
        <Card>
          <CardHeader title="Reserves attested" subtitle="Custodian balance" />
          <p className="px-4 pb-4 text-2xl font-semibold tabular-nums text-text-primary">
            {por ? `$${formatSalysd(por.reserve_total_minor)}` : '—'}
          </p>
        </Card>
        <Card>
          <CardHeader
            title="Reserve ratio"
            right={
              por ? (
                <Chip tone={por.under_collateralized ? 'danger' : 'success'}>
                  {por.under_collateralized ? 'Under-backed' : 'Backed'}
                </Chip>
              ) : null
            }
          />
          <p className="px-4 pb-4 text-2xl font-semibold tabular-nums text-text-primary">
            {por ? ratioLabel(por.reserve_ratio_bps) : '—'}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Latest proof-of-reserves attestation" subtitle="Public transparency feed" />
        {!por?.attestation ? (
          <p className="py-6 text-center text-sm text-text-muted">No attestation recorded yet.</p>
        ) : (
          <dl className="grid gap-3 px-4 pb-4 text-sm md:grid-cols-2">
            <div>
              <dt className="text-xs text-text-muted">Custodian</dt>
              <dd>{por.attestation.custodian ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Attested at</dt>
              <dd>{por.attestation.as_of}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-xs text-text-muted">Attestation hash</dt>
              <dd className="font-mono text-xs break-all">{por.attestation.hash}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Authorized ceiling</dt>
              <dd className="font-mono text-xs">${formatSalysd(por.attestation.authorized_ceiling_minor)}</dd>
            </div>
            {por.on_chain_oracle ? (
              <div>
                <dt className="text-xs text-text-muted">On-chain oracle ceiling</dt>
                <dd className="font-mono text-xs">
                  ${formatSalysd(por.on_chain_oracle.authorized_mint_ceiling)}
                </dd>
              </div>
            ) : null}
          </dl>
        )}
      </Card>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/l3/bridge" className="text-brand-400 hover:underline">
          L3 ↔ Base bridge →
        </Link>
        <Link href="/l3/settlements" className="text-brand-400 hover:underline">
          L3 settlements →
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Recent mints" subtitle="Org-redacted public feed" />
          {mints.length === 0 ? (
            <p className="py-6 text-center text-sm text-text-muted">No mint activity yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
                    <th className="px-3 py-2 font-medium">Amount</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {mints.map((row) => (
                    <tr key={row.id} className="border-b border-surface-border/50">
                      <td className="px-3 py-2 font-mono text-xs">${formatSalysd(row.amount_minor)}</td>
                      <td className="px-3 py-2">{row.status}</td>
                      <td className="px-3 py-2 font-mono text-xs">
                        {row.tx_hash ? (
                          <Link href={`/tx/saly-l3/${row.tx_hash}`} className="text-brand-400 hover:underline">
                            {shortHash(row.tx_hash)}
                          </Link>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Recent redeems" subtitle="Burn + payout rail" />
          {redeems.length === 0 ? (
            <p className="py-6 text-center text-sm text-text-muted">No redeem activity yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-text-muted">
                    <th className="px-3 py-2 font-medium">Amount</th>
                    <th className="px-3 py-2 font-medium">Rail</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {redeems.map((row) => (
                    <tr key={row.id} className="border-b border-surface-border/50">
                      <td className="px-3 py-2 font-mono text-xs">${formatSalysd(row.amount_minor)}</td>
                      <td className="px-3 py-2">{row.payout_rail}</td>
                      <td className="px-3 py-2">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

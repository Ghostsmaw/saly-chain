import { GitCommitHorizontal } from 'lucide-react';
import { AdminShell } from '@/components/AdminShell';
import { ContractEmergencyControls } from '@/components/ContractEmergencyControls';
import { SalyFadeIn } from '@/components/saly/motion';
import {
  SalyBadge,
  SalyCard,
  SalyEmptyState,
  SalyMetricStrip,
  SalySection,
} from '@/components/saly/ui';
import { fetchContractUpgrades, fetchContracts, type ContractStatus } from '@/lib/api';
import { formatCompactUsd, truncateAddress } from '@/lib/saly-format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function statusVariant(s: ContractStatus): 'success' | 'warning' | 'neutral' {
  return s === 'Active' ? 'success' : s === 'Paused' ? 'warning' : 'neutral';
}

export default async function ContractsPage() {
  const [contractsRes, upgradesRes] = await Promise.all([fetchContracts(), fetchContractUpgrades()]);
  const contracts = contractsRes.data;
  const upgrades = upgradesRes.data;
  const live = contractsRes.source === 'live';

  const tvl = contracts.reduce((s, c) => s + c.tvlUsd, 0);
  const networks = new Set(contracts.map((c) => c.network.split(' ')[0])).size;
  const active = contracts.filter((c) => c.status === 'Active').length;
  const audited = contracts.filter((c) => c.audited).length;

  return (
    <AdminShell
      title="Smart Contracts"
      subtitle="Registry, deployments, verification, and emergency controls"
      topRight={
        <SalyBadge variant={live ? 'success' : 'warning'} dot>
          {live ? 'Live registry' : 'Offline'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <SalyMetricStrip
          items={[
            { label: 'Deployed', value: live ? contracts.length.toString() : '—', hint: `${active} active` },
            { label: 'Networks', value: live ? networks.toString() : '—', hint: 'Base · XRPL · L3' },
            { label: 'Value secured', value: live ? formatCompactUsd(tvl) : '—' },
            { label: 'Audited', value: live ? `${audited}/${contracts.length}` : '—' },
          ]}
        />

        {!live ? (
          <div className="mt-10">
            <SalyEmptyState
              title="Registry offline"
              description="Start the local stack (pnpm dev) to load deployed contracts."
            />
          </div>
        ) : (
          <>
            <div className="mt-10">
              <SalySection title="Contract inventory" description="On-chain programs governed by multisig">
                <SalyCard padding={false} className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
                          <th className="px-4 py-2.5 font-medium">Contract</th>
                          <th className="px-4 py-2.5 font-medium">Network</th>
                          <th className="px-4 py-2.5 font-medium">Address</th>
                          <th className="px-4 py-2.5 font-medium">Version</th>
                          <th className="px-4 py-2.5 font-medium">Secured</th>
                          <th className="px-4 py-2.5 font-medium">Audit</th>
                          <th className="px-4 py-2.5 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map((c) => (
                          <tr key={c.id} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                            <td className="px-4 py-3">
                              <p className="font-medium text-saly-text-primary">{c.name}</p>
                              <p className="text-[11px] text-saly-text-faint">{c.purpose}</p>
                            </td>
                            <td className="px-4 py-3">
                              <SalyBadge variant="neutral">{c.network}</SalyBadge>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-saly-text-secondary">
                              {truncateAddress(c.address, 10, 6)}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-saly-text-muted">{c.version}</td>
                            <td className="px-4 py-3 font-mono text-xs text-saly-text-primary">
                              {c.tvlUsd > 0 ? formatCompactUsd(c.tvlUsd) : '—'}
                            </td>
                            <td className="px-4 py-3">
                              <SalyBadge variant={c.audited ? 'success' : 'warning'}>
                                {c.audited ? 'Audited' : 'Pending'}
                              </SalyBadge>
                            </td>
                            <td className="px-4 py-3">
                              <SalyBadge variant={statusVariant(c.status)}>{c.status}</SalyBadge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SalyCard>
              </SalySection>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SalySection
                title="Emergency controls"
                description="Pause toggles guarded by 3/5 operations multisig"
                action={<SalyBadge variant="warning">Multisig 3/5</SalyBadge>}
              >
                <SalyCard>
                  <ContractEmergencyControls contracts={contracts.filter((c) => c.status !== 'Deprecated')} />
                  <p className="mt-4 text-[11px] text-saly-text-faint">
                    Actions require a signed proposal collecting 3 of 5 operator signatures.
                  </p>
                </SalyCard>
              </SalySection>

              <SalySection title="Upgrade history" description="Proxy implementation changes">
                <SalyCard>
                  <ol className="relative ml-3 border-l border-saly-border">
                    {upgrades.map((u) => (
                      <li key={u.id} className="mb-5 ml-5 last:mb-0">
                        <span className="absolute -left-[7px] grid h-3.5 w-3.5 place-items-center rounded-full bg-saly-accent ring-4 ring-saly-bg-card">
                          <GitCommitHorizontal className="h-2 w-2 text-white" />
                        </span>
                        <p className="text-sm font-medium text-saly-text-primary">{u.contract}</p>
                        <p className="text-xs text-saly-text-muted">
                          {u.from} → <span className="text-violet-300">{u.to}</span>
                        </p>
                        <p className="mt-0.5 text-[11px] text-saly-text-faint">
                          {u.when} · {u.by}
                        </p>
                      </li>
                    ))}
                    {upgrades.length === 0 ? (
                      <li className="ml-5 py-8 text-sm text-saly-text-muted">No upgrade history recorded yet.</li>
                    ) : null}
                  </ol>
                </SalyCard>
              </SalySection>
            </div>
          </>
        )}
      </SalyFadeIn>
    </AdminShell>
  );
}

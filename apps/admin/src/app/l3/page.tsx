import { AdminShell } from '@/components/AdminShell';
import { fetchL3Dashboard, fetchBridgePanelStatus } from '@/lib/l3';
import { isBridgeConfigured as isBridgeExitCriteriaMet } from '@/lib/saly-l3';
import {
  isBridgeConfigured,
  resolveBridgeContracts,
  resolveL3RpcUrl,
  resolveUsdcAddress,
} from '@salychain/chain-l3';
import { SalyFadeIn } from '@/components/saly/motion';
import { SalyBadge, SalyCard, SalySection } from '@/components/saly/ui';
import { BridgeHero } from './BridgeHero';
import { L3BridgeHistory, L3BridgePanel } from './L3BridgePanel';
import {
  L3ExitCriteriaPanel,
  L3OperatorPanel,
  L3OutputProposalsPanel,
  L3SequencerPanel,
  L3SpikeExitBanner,
} from './L3Dashboard';
import { L3MoneyRailPanel } from './L3MoneyRailPanel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function L3RollupPage() {
  const data = await fetchL3Dashboard();
  const showEnvHint = !process.env.L3_L2_OUTPUT_ORACLE && !data.manifestPath;
  const l3Network = (process.env.L3_NETWORK ?? 'saly-devnet') as 'saly-devnet' | 'saly-testnet' | 'saly-mainnet';
  const usdc = resolveUsdcAddress(l3Network);
  const moneyRail = {
    rpcUrl: resolveL3RpcUrl(l3Network),
    usdcConfigured: Boolean(usdc),
    usdcAddress: usdc ?? null,
    network: l3Network,
    routingEnabled: process.env.ROUTING_L3_ENABLED !== 'false',
  };
  const bridgeContracts = resolveBridgeContracts(process.cwd());
  const bridgeStatus = await fetchBridgePanelStatus();
  const bridgeActive = isBridgeConfigured(bridgeContracts) || isBridgeExitCriteriaMet(data.exitCriteria);
  const exitPct = Math.round((data.exitCriteria.passed / data.exitCriteria.total) * 100);

  const bridgePanelStatus = {
    configured: isBridgeConfigured(bridgeContracts),
    network: bridgeContracts.network,
    ...(bridgeContracts.optimismPortal ? { optimism_portal: bridgeContracts.optimismPortal } : {}),
    ...(bridgeContracts.l1StandardBridge ? { l1_standard_bridge: bridgeContracts.l1StandardBridge } : {}),
    ...(bridgeContracts.l2StandardBridge ? { l2_standard_bridge: bridgeContracts.l2StandardBridge } : {}),
    recent_count: bridgeStatus.recent_count,
  };

  return (
    <AdminShell
      title="Bridge & L3"
      subtitle="Cross-chain settlement, rollup infrastructure, and asset movement"
      topRight={
        <SalyBadge variant={bridgeActive ? 'success' : 'warning'} dot>
          {bridgeActive ? 'Operational' : 'Setup required'}
        </SalyBadge>
      }
    >
      <SalyFadeIn>
        <BridgeHero
          bridgeActive={bridgeActive}
          networkLabel={data.network.label}
          settlementLabel={formatSettlement(data.network.settlement)}
          recentCount={bridgeStatus.recent_count}
          exitPct={exitPct}
          passed={data.exitCriteria.passed}
          total={data.exitCriteria.total}
        />

        <div className="mt-6">
          <L3SpikeExitBanner data={data} />
        </div>

        {showEnvHint ? (
          <SalyCard className="mb-8 border-amber-500/20 bg-amber-500/[0.04]">
            <p className="text-sm text-amber-200/90">
              Copy{' '}
              <code className="text-amber-100/90">infra/l3/devnet/deployments.base-sepolia.example.json</code> →{' '}
              <code className="text-amber-100/90">deployments.base-sepolia.json</code> after op-deployer, or set{' '}
              <code className="text-amber-100/90">L3_L2_OUTPUT_ORACLE</code> in admin env.
            </p>
          </SalyCard>
        ) : null}

        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <SalySection title="Bridge contracts" description="Canonical deposit and withdraw rail">
                <L3BridgePanel status={bridgePanelStatus} />
              </SalySection>
            </div>
            <div className="xl:col-span-5">
              <SalySection title="Activity" description="Recent cross-chain movement">
                <L3BridgeHistory recentCount={bridgeStatus.recent_count} active={bridgeActive} />
              </SalySection>
            </div>
          </div>

          <SalySection title="Money rail" description="USDC execution on L3">
            <L3MoneyRailPanel status={moneyRail} />
          </SalySection>

          <SalySection title="Production readiness" description="Exit criteria and deployment checklist">
            <L3ExitCriteriaPanel data={data} />
          </SalySection>

          <SalySection title="Sequencer & settlement" description="OP-Stack components and Base monitor">
            <L3SequencerPanel data={data} />
          </SalySection>

          <SalySection title="Output proposals" description="Latest settlement post to Base">
            <L3OutputProposalsPanel data={data} />
          </SalySection>

          <SalySection title="Operator tools" description="CLI verification and manifest">
            <L3OperatorPanel manifestPath={data.manifestPath} />
          </SalySection>
        </div>
      </SalyFadeIn>
    </AdminShell>
  );
}

function formatSettlement(settlement: string): string {
  if (settlement.includes('sepolia')) return 'Base Sepolia';
  if (settlement.includes('mainnet')) return 'Base';
  return settlement.replace(/-/g, ' ');
}

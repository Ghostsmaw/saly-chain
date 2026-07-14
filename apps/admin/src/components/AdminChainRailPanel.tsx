import { Layers } from 'lucide-react';
import { CHAIN_DEFINITIONS } from '@salychain/types';
import { SalyBadge, SalyCard, SalySection } from '@/components/saly/ui';

export function AdminChainRailPanel({
  byChain,
}: {
  byChain: Record<string, number>;
}) {
  return (
    <SalySection
      title="Multi-chain rails"
      description="Operational custody vs schema-only chains"
      action={
        <span className="inline-flex items-center gap-1.5 text-xs text-saly-text-faint">
          <Layers className="h-3.5 w-3.5" /> Tier 2
        </span>
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-saly-border bg-saly-bg-secondary/80 text-left text-xs text-saly-text-muted">
              <tr>
                <th className="px-4 py-2.5 font-medium">Chain</th>
                <th className="px-4 py-2.5 font-medium">Asset</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Wallets</th>
                <th className="px-4 py-2.5 font-medium">Capabilities</th>
              </tr>
            </thead>
            <tbody>
              {CHAIN_DEFINITIONS.map((chain) => (
                <tr key={chain.id} className="border-b border-saly-border/60 hover:bg-saly-bg-hover">
                  <td className="px-4 py-2.5 font-medium text-saly-text-primary">{chain.label}</td>
                  <td className="px-4 py-2.5 text-saly-text-secondary">{chain.nativeAsset}</td>
                  <td className="px-4 py-2.5">
                    <SalyBadge
                      variant={
                        chain.status === 'live'
                          ? 'success'
                          : chain.status === 'schema_only'
                            ? 'warning'
                            : 'neutral'
                      }
                    >
                      {chain.status}
                    </SalyBadge>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-saly-text-primary">
                    {byChain[chain.id] ?? 0}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-saly-text-muted">{chain.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SalyCard>
    </SalySection>
  );
}

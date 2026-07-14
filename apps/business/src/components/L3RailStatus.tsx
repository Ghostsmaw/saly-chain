import { Coins, Radio, Route, Server } from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { L3RailStatus as L3RailStatusData } from '@/lib/api';
import { truncateMiddle } from '@/lib/format';

export function L3RailStatus({ status }: { status: L3RailStatusData }) {
  const operational = status.usdcConfigured && status.routingEnabled;
  const tone = operational ? 'success' : status.usdcConfigured ? 'warning' : 'neutral';
  const label = operational ? 'Operational' : status.usdcConfigured ? 'Routing off' : 'Configure USDC';

  return (
    <Card className="overflow-hidden border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
      <CardHeader
        title="Saly L3 money rail"
        subtitle="Custodial USDC on dedicated OP-Stack blockspace"
        right={<Chip tone={tone}>{label}</Chip>}
      />
      <dl className="grid grid-cols-1 gap-3 px-4 pb-4 text-sm sm:grid-cols-2">
        <Row icon={<Server className="h-4 w-4 text-violet-300" />} label="Network" value={status.network} />
        <Row
          icon={<Route className="h-4 w-4 text-violet-300" />}
          label="Routing"
          value={status.routingEnabled ? 'L3 rail enabled' : 'Disabled (ROUTING_L3_ENABLED=false)'}
        />
        <Row icon={<Radio className="h-4 w-4 text-violet-300" />} label="Execution RPC" value={status.rpcUrl} mono />
        <Row
          icon={<Coins className="h-4 w-4 text-violet-300" />}
          label="USDC contract"
          value={status.usdcAddress ? truncateMiddle(status.usdcAddress, 10, 8) : 'Set L3_USDC_ADDRESS'}
          mono
        />
      </dl>
      {!status.usdcConfigured ? (
        <p className="border-t border-surface-border/60 px-4 py-3 text-xs text-amber-200/90">
          Deploy or bridge USDC on the L3 devnet, then set{' '}
          <code className="text-amber-50">L3_USDC_ADDRESS</code>. See{' '}
          <code className="text-amber-50">docs/runbooks/s6-l3-money-rail.md</code>.
        </p>
      ) : null}
    </Card>
  );
}

function Row({
  label,
  value,
  mono,
  icon,
}: {
  label: string;
  value: string;
  mono?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="min-w-0">
        <dt className="text-xs text-text-tertiary">{label}</dt>
        <dd className={['mt-0.5 text-text-primary', mono ? 'break-all font-mono text-xs' : ''].join(' ')}>
          {value}
        </dd>
      </div>
    </div>
  );
}

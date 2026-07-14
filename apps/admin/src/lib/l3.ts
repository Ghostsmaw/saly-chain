import type { Address } from 'viem';
import {
  L3RollupMonitor,
  SEQUENCER_COMPONENTS,
  evaluateSpikeExitCriteria,
  loadDeploymentManifest,
  l3Network,
  resolveDeploymentManifestPath,
  resolveOracleAddress,
  withSettlementContracts,
  type L3Network,
  type SpikeExitCriteriaResult,
} from '@salychain/chain-l3';

export type L3DashboardData = {
  network: ReturnType<typeof l3Network>;
  components: typeof SEQUENCER_COMPONENTS;
  monitor: Awaited<ReturnType<L3RollupMonitor['getStatus']>>;
  exitCriteria: SpikeExitCriteriaResult;
  manifestPath: string | null;
  source: 'live' | 'unconfigured' | 'unavailable';
};

function repoSearchRoots(): string[] {
  return [process.cwd(), `${process.cwd()}/../..`, `${process.cwd()}/../../..`];
}

export async function fetchL3Dashboard(): Promise<L3DashboardData> {
  let manifest = null;
  let manifestRoot = process.cwd();
  for (const root of repoSearchRoots()) {
    manifest = loadDeploymentManifest(root);
    if (manifest) {
      manifestRoot = root;
      break;
    }
  }

  const networkId = (process.env.L3_NETWORK ?? manifest?.network ?? 'saly-devnet') as L3Network;
  const oracle = (process.env.L3_L2_OUTPUT_ORACLE ?? resolveOracleAddress(manifestRoot) ?? manifest?.contracts.l2OutputOracle) as Address | undefined;

  if (oracle) {
    withSettlementContracts(networkId, { l2OutputOracle: oracle });
  }

  const network = l3Network(networkId);
  const monitorHealthUrl =
    process.env.L3_MONITOR_HEALTH_URL ?? 'http://127.0.0.1:4098/health';

  const exitCriteria = await evaluateSpikeExitCriteria({
    l3Network: networkId,
    settlementRpcUrl: process.env.L3_SETTLEMENT_RPC_URL,
    l2OutputOracle: oracle,
    monitorHealthUrl,
    cwd: manifestRoot,
  });

  const manifestPath = manifest ? resolveDeploymentManifestPath(manifestRoot) : null;

  if (exitCriteria.monitor) {
    return {
      network,
      components: SEQUENCER_COMPONENTS,
      monitor: exitCriteria.monitor,
      exitCriteria,
      manifestPath,
      source: exitCriteria.monitor.configured ? 'live' : 'unconfigured',
    };
  }

  const monitor = new L3RollupMonitor({
    l3Network: networkId,
    settlementRpcUrl: process.env.L3_SETTLEMENT_RPC_URL,
    l2OutputOracle: oracle,
  });

  try {
    const status = await monitor.getStatus();
    return {
      network,
      components: SEQUENCER_COMPONENTS,
      monitor: status,
      exitCriteria,
      manifestPath,
      source: status.configured ? 'live' : 'unconfigured',
    };
  } catch {
    return {
      network,
      components: SEQUENCER_COMPONENTS,
      monitor: {
        configured: false,
        l3Network: networkId,
        settlementNetwork: network.settlement,
        message: 'Settlement RPC unavailable — check L3_SETTLEMENT_RPC_URL',
      },
      exitCriteria,
      manifestPath,
      source: 'unavailable',
    };
  }
}

const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';

export async function fetchBridgePanelStatus(): Promise<{ recent_count: number }> {
  try {
    const [statusRes, txRes] = await Promise.all([
      fetch(`${EXECUTION_URL}/v1/bridge/status`, { next: { revalidate: 0 } }),
      fetch(`${EXECUTION_URL}/v1/bridge/transactions`, { next: { revalidate: 0 } }),
    ]);
    if (!statusRes.ok) return { recent_count: 0 };
    const txs = txRes.ok ? ((await txRes.json()) as { data?: unknown[] }) : { data: [] };
    return { recent_count: txs.data?.length ?? 0 };
  } catch {
    return { recent_count: 0 };
  }
}

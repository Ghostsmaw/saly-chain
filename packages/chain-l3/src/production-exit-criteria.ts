import type { Address } from 'viem';
import { probeConductorCluster } from './conductor-health.js';
import { loadDeploymentManifest } from './deployments.js';
import type { L3Network } from './network.js';
import { probeL3RpcPool, rpcPoolMaxLag } from './rpc-health.js';
import { createSettlementMonitor, getSettlementStatus } from './settlement-monitor.js';
import { resolveSettlementMode } from './settlement-mode.js';
import type { SpikeCriterionStatus, SpikeExitCriterion } from './exit-criteria.js';

export type ProductionCriterionId =
  | 'mainnet_manifest'
  | 'settlement_configured'
  | 'settlement_proposal_recent'
  | 'conductor_ha'
  | 'rpc_pool_healthy'
  | 'rpc_pool_lag'
  | 'ops_monitor_healthy';

export interface ProductionExitCriteriaResult {
  criteria: SpikeExitCriterion[];
  passed: number;
  total: number;
  productionReady: boolean;
  network: L3Network;
}

export interface EvaluateProductionExitOptions {
  l3Network?: L3Network;
  settlementRpcUrl?: string;
  l3RpcUrls?: string[];
  conductorUrls?: string[];
  opsMonitorHealthUrl?: string;
  maxRpcLagBlocks?: number;
  cwd?: string;
}

function criterion(
  id: ProductionCriterionId,
  label: string,
  description: string,
  status: SpikeCriterionStatus,
  detail?: string,
): SpikeExitCriterion {
  return { id, label, description, status, ...(detail ? { detail } : {}) };
}

export async function evaluateProductionExitCriteria(
  opts: EvaluateProductionExitOptions = {},
): Promise<ProductionExitCriteriaResult> {
  const cwd = opts.cwd ?? process.cwd();
  const manifest = loadDeploymentManifest(cwd);
  const networkId = (opts.l3Network ?? manifest?.network ?? process.env.L3_NETWORK ?? 'saly-mainnet') as L3Network;
  const settlementMode = resolveSettlementMode();
  const criteria: SpikeExitCriterion[] = [];

  criteria.push(
    criterion(
      'mainnet_manifest',
      'Production deploy manifest',
      'infra/l3/production/deployments.base-mainnet.json present',
      manifest && manifest.network === 'saly-mainnet' ? 'pass' : 'pending',
      manifest ? `Manifest ${manifest.deployed_at ?? 'present'}` : 'Run op-deployer apply for mainnet',
    ),
  );

  const settlementAddr = (
    settlementMode === 'fault_proofs'
      ? (process.env.L3_DISPUTE_GAME_FACTORY ?? manifest?.contracts.disputeGameFactory)
      : (process.env.L3_L2_OUTPUT_ORACLE ?? manifest?.contracts.l2OutputOracle)
  ) as Address | undefined;

  const monitor = createSettlementMonitor({
    l3Network: networkId,
    settlementMode,
    ...(opts.settlementRpcUrl ? { settlementRpcUrl: opts.settlementRpcUrl } : {}),
    ...(settlementMode === 'fault_proofs' && settlementAddr
      ? { disputeGameFactory: settlementAddr }
      : {}),
    ...(settlementMode === 'legacy' && settlementAddr ? { l2OutputOracle: settlementAddr } : {}),
  });

  criteria.push(
    criterion(
      'settlement_configured',
      'Settlement contract configured',
      settlementMode === 'fault_proofs'
        ? 'DisputeGameFactory on Base mainnet'
        : 'L2OutputOracle on Base mainnet',
      monitor.isConfigured() ? 'pass' : 'fail',
      settlementAddr ?? 'Set settlement address in manifest or env',
    ),
  );

  if (monitor.isConfigured()) {
    try {
      const status = await getSettlementStatus(monitor);
      const hasProposal =
        status.latestOutputIndex !== undefined &&
        status.latestOutputIndex >= 0n &&
        status.latestProposal !== undefined;
      criteria.push(
        criterion(
          'settlement_proposal_recent',
          'Recent settlement proposal',
          'At least one output root / dispute game on settlement layer',
          hasProposal ? 'pass' : 'pending',
          hasProposal
            ? `Index ${status.latestOutputIndex?.toString() ?? '0'} (${settlementMode})`
            : 'Wait for proposer / fault-proof game creation',
        ),
      );
    } catch (err) {
      criteria.push(
        criterion(
          'settlement_proposal_recent',
          'Recent settlement proposal',
          'Settlement monitor readable',
          'fail',
          (err as Error).message,
        ),
      );
    }
  } else {
    criteria.push(
      criterion(
        'settlement_proposal_recent',
        'Recent settlement proposal',
        'Requires settlement contract',
        'pending',
      ),
    );
  }

  const conductorUrls =
    opts.conductorUrls ??
    (process.env.L3_CONDUCTOR_URLS ? process.env.L3_CONDUCTOR_URLS.split(',').map((s) => s.trim()) : []);
  if (conductorUrls.length >= 2) {
    const cluster = await probeConductorCluster(conductorUrls);
    criteria.push(
      criterion(
        'conductor_ha',
        'Conductor HA cluster',
        '≥2 conductors healthy with elected leader',
        cluster.healthyCount >= 2 && cluster.hasLeader ? 'pass' : 'pending',
        `${cluster.healthyCount}/${conductorUrls.length} healthy, leader=${cluster.hasLeader}`,
      ),
    );
  } else {
    criteria.push(
      criterion(
        'conductor_ha',
        'Conductor HA cluster',
        'L3_CONDUCTOR_URLS comma-separated (≥2)',
        'pending',
        'Set L3_CONDUCTOR_URLS=http://conductor-1:8545,http://conductor-2:8545',
      ),
    );
  }

  const rpcUrls =
    opts.l3RpcUrls ??
    (process.env.L3_RPC_UPSTREAM_URLS
      ? process.env.L3_RPC_UPSTREAM_URLS.split(',').map((s) => s.trim())
      : manifest?.l3_rpc_url
        ? [manifest.l3_rpc_url]
        : []);

  if (rpcUrls.length >= 1) {
    const probes = await probeL3RpcPool({ urls: rpcUrls, network: networkId });
    const healthy = probes.filter((p) => p.ok);
    const lag = rpcPoolMaxLag(probes);
    const maxLag = opts.maxRpcLagBlocks ?? Number(process.env.L3_RPC_MAX_LAG_BLOCKS ?? '3');

    criteria.push(
      criterion(
        'rpc_pool_healthy',
        'RPC upstream pool',
        'All configured L3 JSON-RPC endpoints synced',
        healthy.length === probes.length && healthy.length > 0 ? 'pass' : 'pending',
        `${healthy.length}/${probes.length} healthy`,
      ),
    );
    criteria.push(
      criterion(
        'rpc_pool_lag',
        'RPC replica lag',
        `Max block lag ≤ ${maxLag} across pool`,
        lag <= maxLag ? 'pass' : 'fail',
        `lag=${lag} blocks`,
      ),
    );
  } else {
    for (const id of ['rpc_pool_healthy', 'rpc_pool_lag'] as const) {
      criteria.push(
        criterion(
          id,
          id === 'rpc_pool_healthy' ? 'RPC upstream pool' : 'RPC replica lag',
          'L3_RPC_UPSTREAM_URLS or manifest l3_rpc_url',
          'pending',
        ),
      );
    }
  }

  const opsUrl = opts.opsMonitorHealthUrl ?? process.env.L3_OPS_MONITOR_HEALTH_URL ?? 'http://127.0.0.1:9105/health';
  try {
    const res = await fetch(opsUrl, { signal: AbortSignal.timeout(3_000) });
    if (res.ok) {
      const body = (await res.json()) as { ok?: boolean };
      criteria.push(
        criterion(
          'ops_monitor_healthy',
          'l3-ops-monitor running',
          'Sequencer/batcher/proposal age metrics',
          body.ok ? 'pass' : 'pending',
          opsUrl,
        ),
      );
    } else {
      criteria.push(
        criterion(
          'ops_monitor_healthy',
          'l3-ops-monitor running',
          'Sequencer/batcher/proposal age metrics',
          'pending',
          `HTTP ${res.status}`,
        ),
      );
    }
  } catch {
    criteria.push(
      criterion(
        'ops_monitor_healthy',
        'l3-ops-monitor running',
        'Sequencer/batcher/proposal age metrics',
        'pending',
        `Start: pnpm -F @salychain/worker-l3-ops-monitor dev`,
      ),
    );
  }

  const passed = criteria.filter((c) => c.status === 'pass').length;
  const productionReady =
    criteria.find((c) => c.id === 'settlement_configured')?.status === 'pass' &&
    criteria.find((c) => c.id === 'conductor_ha')?.status === 'pass' &&
    criteria.find((c) => c.id === 'rpc_pool_healthy')?.status === 'pass' &&
    criteria.find((c) => c.id === 'rpc_pool_lag')?.status === 'pass' &&
    criteria.find((c) => c.id === 'ops_monitor_healthy')?.status === 'pass';

  return { criteria, passed, total: criteria.length, productionReady, network: networkId };
}

import type { Address } from 'viem';
import { loadDeploymentManifest, resolveOracleAddress } from './deployments.js';
import { resolveBridgeContracts, isBridgeConfigured } from './bridge/contracts.js';
import type { L3Network } from './network.js';
import { L3RollupMonitor, type RollupMonitorStatus } from './rollup-monitor.js';
import { verifyL3Connection } from './preflight.js';
import { resolveL3RpcUrl } from './rpc.js';

export type SpikeCriterionStatus = 'pass' | 'fail' | 'pending';

export type SpikeExitCriterionId =
  | 'deploy_manifest'
  | 'oracle_configured'
  | 'settlement_rpc'
  | 'oracle_contract'
  | 'output_proposed'
  | 'monitor_worker'
  | 'l3_rpc_reachable'
  | 'bridge_configured'
  | 'l3_listener_healthy';

export interface SpikeExitCriterion {
  id: string;
  label: string;
  description: string;
  status: SpikeCriterionStatus;
  detail?: string;
}

export interface SpikeExitCriteriaResult {
  criteria: SpikeExitCriterion[];
  passed: number;
  total: number;
  /** Devnet S5 spike exit (legacy). */
  spikeComplete: boolean;
  /** D1 testnet / production L3 rail exit — stricter than spikeComplete. */
  l3RailComplete: boolean;
  network: L3Network;
  monitor?: RollupMonitorStatus;
}

export interface EvaluateSpikeExitOptions {
  l3Network?: L3Network;
  settlementRpcUrl?: string;
  l2OutputOracle?: Address;
  monitorHealthUrl?: string;
  l3ListenerMetricsUrl?: string;
  cwd?: string;
}

async function checkListenerMetrics(url: string): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/metrics`, {
      signal: AbortSignal.timeout(3_000),
    });
    if (!res.ok) return { ok: false, detail: `HTTP ${res.status}` };
    const body = await res.text();
    const hasLag = body.includes('salychain_chain_listener_lag_blocks');
    return { ok: hasLag, detail: hasLag ? 'metrics exposed' : 'lag metric missing' };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}

export async function evaluateSpikeExitCriteria(
  opts: EvaluateSpikeExitOptions = {},
): Promise<SpikeExitCriteriaResult> {
  const cwd = opts.cwd ?? process.cwd();
  const manifest = loadDeploymentManifest(cwd);
  const oracle = opts.l2OutputOracle ?? resolveOracleAddress(cwd);
  const networkId = (opts.l3Network ?? manifest?.network ?? process.env.L3_NETWORK ?? 'saly-devnet') as L3Network;
  const settlementRpc =
    opts.settlementRpcUrl ?? process.env.L3_SETTLEMENT_RPC_URL ?? 'https://sepolia.base.org';
  const monitorHealthUrl =
    opts.monitorHealthUrl ?? process.env.L3_MONITOR_HEALTH_URL ?? 'http://127.0.0.1:4098/health';
  const listenerMetricsUrl =
    opts.l3ListenerMetricsUrl ?? process.env.L3_LISTENER_METRICS_URL ?? 'http://127.0.0.1:9101';

  const criteria: SpikeExitCriterion[] = [];
  const isTestnet = networkId === 'saly-testnet';

  criteria.push({
    id: 'deploy_manifest',
    label: isTestnet ? 'Testnet deploy manifest' : 'Devnet deploy manifest',
    description: 'infra/l3/{devnet,testnet}/deployments.base-sepolia.json or L3_L2_OUTPUT_ORACLE env',
    status: manifest || oracle ? 'pass' : 'pending',
    detail: manifest
      ? `Manifest ${manifest.deployed_at ?? 'present'} (${networkId})`
      : oracle
        ? 'Oracle from env (no manifest file)'
        : 'Run op-deployer apply and save manifest',
  });

  criteria.push({
    id: 'oracle_configured',
    label: 'L2OutputOracle configured',
    description: 'Settlement contract address for output proposals',
    status: oracle ? 'pass' : 'fail',
    detail: oracle ?? 'Set L3_L2_OUTPUT_ORACLE or deployments JSON',
  });

  let monitor: L3RollupMonitor | undefined;
  let monitorStatus: RollupMonitorStatus | undefined;

  if (oracle) {
    monitor = new L3RollupMonitor({
      l3Network: networkId,
      settlementRpcUrl: settlementRpc,
      l2OutputOracle: oracle,
    });

    try {
      monitorStatus = await monitor.getStatus();
      criteria.push({
        id: 'settlement_rpc',
        label: 'Base Sepolia RPC reachable',
        description: 'Settlement layer responds to eth_blockNumber / oracle reads',
        status: monitorStatus.configured ? 'pass' : 'fail',
        detail: settlementRpc,
      });

      const hasCode = await monitor.hasOracleBytecode();
      criteria.push({
        id: 'oracle_contract',
        label: 'Oracle contract on-chain',
        description: 'Bytecode at L2OutputOracle address on Base',
        status: hasCode ? 'pass' : 'fail',
        detail: hasCode ? 'Contract deployed' : 'No bytecode — wrong address or undeployed',
      });

      const hasOutput =
        monitorStatus.latestOutputIndex !== undefined &&
        monitorStatus.latestOutputIndex >= 0n &&
        (monitorStatus.latestProposal !== undefined ||
          monitorStatus.latestL2BlockNumber !== undefined);

      criteria.push({
        id: 'output_proposed',
        label: 'First OutputProposed',
        description: 'Proposer submitted ≥1 output root to Base',
        status: hasOutput ? 'pass' : 'pending',
        detail: hasOutput
          ? `Index ${monitorStatus.latestOutputIndex?.toString() ?? '0'}`
          : 'Run op-proposer after L3 blocks are produced',
      });
    } catch (err) {
      criteria.push({
        id: 'settlement_rpc',
        label: 'Base Sepolia RPC reachable',
        description: 'Settlement layer responds to eth_blockNumber / oracle reads',
        status: 'fail',
        detail: (err as Error).message,
      });
      criteria.push({
        id: 'oracle_contract',
        label: 'Oracle contract on-chain',
        description: 'Bytecode at L2OutputOracle address on Base',
        status: 'pending',
      });
      criteria.push({
        id: 'output_proposed',
        label: 'First OutputProposed',
        description: 'Proposer submitted ≥1 output root to Base',
        status: 'pending',
      });
    }
  } else {
    for (const id of ['settlement_rpc', 'oracle_contract', 'output_proposed'] as const) {
      criteria.push({
        id,
        label:
          id === 'settlement_rpc'
            ? 'Base Sepolia RPC reachable'
            : id === 'oracle_contract'
              ? 'Oracle contract on-chain'
              : 'First OutputProposed',
        description: 'Requires oracle address',
        status: 'pending',
      });
    }
  }

  let workerPass = false;
  try {
    const res = await fetch(monitorHealthUrl, { signal: AbortSignal.timeout(3_000) });
    if (res.ok) {
      const body = (await res.json()) as { ok?: boolean; spike_complete?: boolean };
      workerPass = Boolean(body.ok);
      criteria.push({
        id: 'monitor_worker',
        label: 'l3-rollup-monitor running',
        description: 'Worker health endpoint + NATS publisher',
        status: workerPass ? 'pass' : 'pending',
        detail: body.spike_complete ? 'Spike event emitted' : 'Polling settlement layer',
      });
    } else {
      criteria.push({
        id: 'monitor_worker',
        label: 'l3-rollup-monitor running',
        description: 'Worker health endpoint + NATS publisher',
        status: 'pending',
        detail: `HTTP ${res.status} from ${monitorHealthUrl}`,
      });
    }
  } catch {
    criteria.push({
      id: 'monitor_worker',
      label: 'l3-rollup-monitor running',
      description: 'Worker health endpoint + NATS publisher',
      status: 'pending',
      detail: 'Start: pnpm -F @salychain/worker-l3-rollup-monitor dev',
    });
  }

  // D1 — L3 execution RPC (required for testnet rail exit).
  const l3Rpc = manifest?.l3_rpc_url ?? resolveL3RpcUrl(networkId, cwd);
  try {
    const l3Report = await verifyL3Connection({
      network: networkId,
      rpcUrl: l3Rpc,
      requireUsdc: networkId === 'saly-devnet',
      cwd,
    });
    criteria.push({
      id: 'l3_rpc_reachable',
      label: 'L3 execution RPC verified',
      description: 'Chain ID matches registry; devnet also requires USDC bytecode',
      status: l3Report.ok ? 'pass' : isTestnet ? 'fail' : 'pending',
      detail: l3Report.ok ? l3Rpc : l3Report.failures.join('; '),
    });
  } catch (err) {
    criteria.push({
      id: 'l3_rpc_reachable',
      label: 'L3 execution RPC verified',
      description: 'Chain ID matches registry',
      status: 'fail',
      detail: (err as Error).message,
    });
  }

  const bridge = resolveBridgeContracts(cwd);
  const bridgeOk = isBridgeConfigured(bridge) && Boolean(bridge.l1StandardBridge);
  criteria.push({
    id: 'bridge_configured',
    label: 'Canonical bridge contracts',
    description: 'OptimismPortal + L1StandardBridge in manifest/env (D2)',
    status: bridgeOk ? 'pass' : isTestnet ? 'pending' : 'pending',
    detail: bridgeOk
      ? `portal=${bridge.optimismPortal} l1=${bridge.l1StandardBridge}`
      : 'Set bridge addresses in manifest after op-deployer',
  });

  const listenerCheck = await checkListenerMetrics(listenerMetricsUrl);
  criteria.push({
    id: 'l3_listener_healthy',
    label: 'chain-listener-l3 metrics',
    description: 'Prometheus /metrics exposes listener lag (optional for devnet)',
    status: listenerCheck.ok ? 'pass' : isTestnet ? 'pending' : 'pending',
    detail: `${listenerMetricsUrl} — ${listenerCheck.detail}`,
  });

  const passed = criteria.filter((c) => c.status === 'pass').length;

  const spikeComplete =
    criteria.find((c) => c.id === 'oracle_configured')?.status === 'pass' &&
    criteria.find((c) => c.id === 'settlement_rpc')?.status === 'pass' &&
    criteria.find((c) => c.id === 'oracle_contract')?.status === 'pass' &&
    criteria.find((c) => c.id === 'output_proposed')?.status === 'pass';

  const l3RailComplete =
    spikeComplete &&
    criteria.find((c) => c.id === 'l3_rpc_reachable')?.status === 'pass' &&
    criteria.find((c) => c.id === 'bridge_configured')?.status === 'pass' &&
    criteria.find((c) => c.id === 'monitor_worker')?.status === 'pass';

  return {
    criteria,
    passed,
    total: criteria.length,
    spikeComplete,
    l3RailComplete,
    network: networkId,
    ...(monitorStatus !== undefined ? { monitor: monitorStatus } : {}),
  };
}

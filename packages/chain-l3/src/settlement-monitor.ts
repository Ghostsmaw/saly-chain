import type { Address } from 'viem';
import type { Logger } from '@salychain/logger';
import { FaultProofRollupMonitor } from './fault-proof-monitor.js';
import type { L3Network } from './network.js';
import {
  L3RollupMonitor,
  type OutputProposal,
  type RollupMonitorStatus,
} from './rollup-monitor.js';
import { resolveSettlementMode, type L3SettlementMode } from './settlement-mode.js';

export interface SettlementMonitorOptions {
  l3Network: L3Network;
  settlementRpcUrl?: string;
  settlementMode?: L3SettlementMode;
  l2OutputOracle?: Address;
  disputeGameFactory?: Address;
  logger?: Logger;
}

/** Unified settlement observer — legacy oracle or fault-proof factory. */
export type SettlementMonitor = L3RollupMonitor | FaultProofRollupMonitor;

export function createSettlementMonitor(opts: SettlementMonitorOptions): SettlementMonitor {
  const mode = opts.settlementMode ?? resolveSettlementMode();
  if (mode === 'fault_proofs') {
    return new FaultProofRollupMonitor({
      l3Network: opts.l3Network,
      ...(opts.settlementRpcUrl ? { settlementRpcUrl: opts.settlementRpcUrl } : {}),
      ...(opts.disputeGameFactory ? { disputeGameFactory: opts.disputeGameFactory } : {}),
      ...(opts.logger ? { logger: opts.logger } : {}),
    });
  }
  return new L3RollupMonitor({
    l3Network: opts.l3Network,
    ...(opts.settlementRpcUrl ? { settlementRpcUrl: opts.settlementRpcUrl } : {}),
    ...(opts.l2OutputOracle ? { l2OutputOracle: opts.l2OutputOracle } : {}),
    ...(opts.logger ? { logger: opts.logger } : {}),
  });
}

export async function getSettlementStatus(monitor: SettlementMonitor): Promise<RollupMonitorStatus> {
  return monitor.getStatus();
}

export async function getLatestSettlementProposal(
  monitor: SettlementMonitor,
): Promise<OutputProposal | null> {
  return monitor.getLatestOutputProposal();
}

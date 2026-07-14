import type { SpikeExitCriteriaResult } from '@salychain/chain-l3';

export function criterionPassed(exit: SpikeExitCriteriaResult, id: string): boolean {
  return exit.criteria.find((c) => c.id === id)?.status === 'pass';
}

export function isBridgeConfigured(exit: SpikeExitCriteriaResult): boolean {
  return criterionPassed(exit, 'bridge_configured');
}

export function isMonitorHealthy(exit: SpikeExitCriteriaResult): boolean {
  return criterionPassed(exit, 'monitor_worker') || criterionPassed(exit, 'l3_rpc_reachable');
}

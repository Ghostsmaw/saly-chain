/** How L3 output roots are proposed on the settlement layer (Base). */
export type L3SettlementMode = 'legacy' | 'fault_proofs';

export function resolveSettlementMode(env: Record<string, string | undefined> = process.env): L3SettlementMode {
  const raw = (env.L3_SETTLEMENT_MODE ?? 'legacy').toLowerCase();
  if (raw === 'fault_proofs' || raw === 'fault-proofs' || raw === 'faultproofs') {
    return 'fault_proofs';
  }
  return 'legacy';
}

export function settlementModeLabel(mode: L3SettlementMode): string {
  return mode === 'fault_proofs' ? 'DisputeGameFactory (fault proofs)' : 'L2OutputOracle (legacy)';
}

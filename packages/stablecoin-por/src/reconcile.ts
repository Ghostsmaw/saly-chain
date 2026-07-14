/** Reserve total minus on-chain supply. Positive = over-collateralized. */
export function supplyDriftMinor(onChainSupplyMinor: bigint, reserveTotalMinor: bigint): bigint {
  return reserveTotalMinor - onChainSupplyMinor;
}

export function isUnderCollateralized(onChainSupplyMinor: bigint, reserveTotalMinor: bigint): boolean {
  return onChainSupplyMinor > reserveTotalMinor;
}

/** Basis points (10000 = 100%). When supply is zero, returns 10000 if reserves > 0 else 0. */
export function reserveRatioBps(onChainSupplyMinor: bigint, reserveTotalMinor: bigint): number {
  if (onChainSupplyMinor === 0n) return reserveTotalMinor > 0n ? 10_000 : 0;
  return Number((reserveTotalMinor * 10_000n) / onChainSupplyMinor);
}

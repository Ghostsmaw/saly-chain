import type { Address } from 'viem';
import {
  loadDeploymentManifest,
  type L3DeploymentManifest,
} from '../deployments.js';
import type { L3Network } from '../network.js';

export interface BridgeContractSet {
  optimismPortal?: Address;
  l1StandardBridge?: Address;
  l2StandardBridge?: Address;
  network: L3Network;
  settlement: L3DeploymentManifest['settlement'];
}

const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

function asAddress(value: string | undefined): Address | undefined {
  if (!value || !ADDRESS_RE.test(value)) return undefined;
  return value as Address;
}

/** Resolve canonical L3 ↔ Base bridge contracts from manifest then env. */
export function resolveBridgeContracts(cwd = process.cwd()): BridgeContractSet {
  const manifest = loadDeploymentManifest(cwd);
  const network = (manifest?.network ??
    process.env.L3_NETWORK ??
    'saly-devnet') as L3Network;
  const settlement = manifest?.settlement ?? 'base-sepolia';

  const optimismPortal =
    manifest?.contracts.optimismPortal ?? asAddress(process.env.L3_OPTIMISM_PORTAL);
  const l1StandardBridge =
    manifest?.contracts.l1StandardBridge ?? asAddress(process.env.L3_L1_STANDARD_BRIDGE);
  const l2StandardBridge =
    manifest?.contracts.l2StandardBridge ?? asAddress(process.env.L3_L2_STANDARD_BRIDGE);

  return {
    network,
    settlement,
    ...(optimismPortal ? { optimismPortal } : {}),
    ...(l1StandardBridge ? { l1StandardBridge } : {}),
    ...(l2StandardBridge ? { l2StandardBridge } : {}),
  };
}

export function isBridgeConfigured(contracts: BridgeContractSet): boolean {
  return Boolean(contracts.optimismPortal);
}

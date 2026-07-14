import type { L3Network } from './network.js';
import { l3Network } from './network.js';
import { loadDeploymentManifest } from './deployments.js';
import { withL3UsdcAddress } from './assets.js';
import type { Address } from 'viem';

/** Resolve stable L3 execution RPC from env → manifest → network default. */
export function resolveL3RpcUrl(networkId: L3Network, cwd = process.cwd()): string {
  const fromEnv = process.env.L3_L3_RPC_URL;
  if (fromEnv) return fromEnv;

  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.l3_rpc_url) return manifest.l3_rpc_url;

  return l3Network(networkId).defaultRpcUrl ?? 'http://127.0.0.1:9545';
}

/** Load USDC address from manifest assets block when present. */
export function applyManifestAssets(manifest: {
  network: L3Network;
  assets?: { USDC?: Address };
}): void {
  if (manifest.assets?.USDC) {
    withL3UsdcAddress(manifest.network, manifest.assets.USDC);
  }
}

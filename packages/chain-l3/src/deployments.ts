import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Address } from 'viem';
import type { L3Network } from './network.js';

export interface L3DeploymentManifest {
  network: L3Network;
  settlement: 'base-sepolia' | 'base-mainnet';
  deployed_at?: string;
  op_deployer_version?: string;
  contracts: {
    l2OutputOracle?: Address;
    batchInbox?: Address;
    optimismPortal?: Address;
    l1StandardBridge?: Address;
    l2StandardBridge?: Address;
    disputeGameFactory?: Address;
    systemConfig?: Address;
  };
  l3_rpc_url?: string;
  l3_chain_id?: number;
  assets?: {
    USDC?: Address;
    SalySD?: Address;
    SalyAttestationRegistry?: Address;
    SalyAssetToken?: Address;
    SalyAgentRegistry?: Address;
    SalyStreamPay?: Address;
  };
  /** Base-settlement governance stack (Milestone E0). */
  governance?: {
    token?: Address;
    timelock?: Address;
    governor?: Address;
  };
  notes?: string;
}

const MANIFEST_FILENAMES = ['deployments.base-sepolia.json', 'deployments.base-mainnet.json'] as const;

const NETWORK_MANIFEST_DIRS: Record<L3Network, string> = {
  'saly-devnet': 'devnet',
  'saly-testnet': 'testnet',
  'saly-mainnet': 'production',
};

function manifestCandidates(cwd: string, network?: L3Network): string[] {
  const fromEnv = process.env.L3_DEPLOYMENTS_FILE;
  const paths = fromEnv ? [resolve(cwd, fromEnv)] : [];
  const networks = network
    ? ([NETWORK_MANIFEST_DIRS[network]] as const)
    : (['devnet', 'testnet', 'production'] as const);
  const basePaths = networks.flatMap((net) =>
    MANIFEST_FILENAMES.flatMap((file) => [
      resolve(cwd, `infra/l3/${net}`, file),
      resolve(cwd, `../../infra/l3/${net}`, file),
      resolve(cwd, `../../../infra/l3/${net}`, file),
      resolve(cwd, `../../../../infra/l3/${net}`, file),
    ]),
  );
  return [...paths, ...basePaths];
}

/** Resolve manifest path from env or default repo location. */
export function resolveDeploymentManifestPath(cwd = process.cwd(), network?: L3Network): string {
  for (const path of manifestCandidates(cwd, network)) {
    if (existsSync(path)) return path;
  }
  const net = network ? NETWORK_MANIFEST_DIRS[network] : 'devnet';
  const file = network === 'saly-mainnet' ? 'deployments.base-mainnet.json' : 'deployments.base-sepolia.json';
  return resolve(cwd, `infra/l3/${net}`, file);
}

export function loadDeploymentManifest(cwd = process.cwd(), network?: L3Network): L3DeploymentManifest | null {
  for (const path of manifestCandidates(cwd, network)) {
    if (!existsSync(path)) continue;
    try {
      const raw = readFileSync(path, 'utf8');
      return JSON.parse(raw) as L3DeploymentManifest;
    } catch {
      continue;
    }
  }
  return null;
}

/** Prefer manifest for the requested network (avoids devnet shadowing testnet verify). */
export function loadDeploymentManifestForNetwork(
  network: L3Network,
  cwd = process.cwd(),
): L3DeploymentManifest | null {
  return loadDeploymentManifest(cwd, network) ?? loadDeploymentManifest(cwd);
}

/** Oracle address from manifest, then L3_L2_OUTPUT_ORACLE env. */
export function resolveOracleAddress(cwd = process.cwd()): Address | undefined {
  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.contracts.l2OutputOracle) return manifest.contracts.l2OutputOracle;
  const fromEnv = process.env.L3_L2_OUTPUT_ORACLE;
  if (fromEnv && /^0x[a-fA-F0-9]{40}$/.test(fromEnv)) return fromEnv as Address;
  return undefined;
}

export function applyManifestToEnv(manifest: L3DeploymentManifest): void {
  if (manifest.contracts.l2OutputOracle) {
    process.env.L3_L2_OUTPUT_ORACLE = manifest.contracts.l2OutputOracle;
  }
  if (manifest.contracts.disputeGameFactory) {
    process.env.L3_DISPUTE_GAME_FACTORY = manifest.contracts.disputeGameFactory;
  }
  if (manifest.contracts.batchInbox) process.env.L3_BATCH_INBOX = manifest.contracts.batchInbox;
  if (manifest.contracts.optimismPortal) process.env.L3_OPTIMISM_PORTAL = manifest.contracts.optimismPortal;
  if (manifest.contracts.l1StandardBridge) {
    process.env.L3_L1_STANDARD_BRIDGE = manifest.contracts.l1StandardBridge;
  }
  if (manifest.contracts.l2StandardBridge) {
    process.env.L3_L2_STANDARD_BRIDGE = manifest.contracts.l2StandardBridge;
  }
  if (manifest.l3_rpc_url) process.env.L3_L3_RPC_URL = manifest.l3_rpc_url;
  if (manifest.assets?.USDC) process.env.L3_USDC_ADDRESS = manifest.assets.USDC;
  if (manifest.assets?.SalySD) process.env.L3_SALYSD_ADDRESS = manifest.assets.SalySD;
  if (manifest.assets?.SalyAttestationRegistry) {
    process.env.L3_ATTESTATION_REGISTRY_ADDRESS = manifest.assets.SalyAttestationRegistry;
  }
  if (manifest.assets?.SalyAssetToken) {
    process.env.L3_ASSET_TOKEN_ADDRESS = manifest.assets.SalyAssetToken;
  }
  if (manifest.governance?.token) process.env.GOVERNANCE_TOKEN_ADDRESS = manifest.governance.token;
  if (manifest.governance?.timelock) process.env.GOVERNANCE_TIMELOCK_ADDRESS = manifest.governance.timelock;
  if (manifest.governance?.governor) process.env.GOVERNANCE_GOVERNOR_ADDRESS = manifest.governance.governor;
  process.env.L3_NETWORK = manifest.network;
}

export function resolvePortalAddress(cwd = process.cwd()): Address | undefined {
  const manifest = loadDeploymentManifest(cwd);
  if (manifest?.contracts.optimismPortal) return manifest.contracts.optimismPortal;
  const fromEnv = process.env.L3_OPTIMISM_PORTAL;
  if (fromEnv && /^0x[a-fA-F0-9]{40}$/.test(fromEnv)) return fromEnv as Address;
  return undefined;
}

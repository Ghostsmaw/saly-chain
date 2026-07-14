/**
 * Milestone E0–E2 ops exit gate — manifest, registry env, and on-chain role checks.
 */
import { createPublicClient, http, keccak256, toBytes, type Address } from 'viem';
import { loadDeploymentManifestForNetwork, type L3DeploymentManifest } from './deployments.js';
import { resolveAttestationRegistryAddress, resolveSalysdAddress } from './assets.js';
import { l3Network, type L3Network } from './network.js';
import { l3ViemChain } from './viem-chain.js';
import { resolveL3RpcUrl } from './rpc.js';

const PAUSER_ROLE = keccak256(toBytes('PAUSER_ROLE'));

export interface GovernanceVerifyInput {
  contractRegistryBaseUrl?: string;
  walletBaseUrl?: string;
  l3Network?: L3Network;
  cwd?: string;
  /** Custodial wallet id expected in contract-registry GOVERNANCE_EXECUTOR_WALLET_ID. */
  governanceExecutorWalletId?: string;
}

export interface GovernanceVerifyResult {
  ok: boolean;
  checks: Array<{ name: string; ok: boolean; detail?: string }>;
}

async function registryHealth(baseUrl: string): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(`${baseUrl}/v1/health`, { signal: AbortSignal.timeout(10_000) });
    return { ok: res.ok, detail: `status=${res.status}` };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}

async function readPauserRole(rpcUrl: string, token: Address, holder: Address): Promise<boolean> {
  const def = l3Network('saly-testnet');
  const client = createPublicClient({
    chain: l3ViemChain(def, rpcUrl),
    transport: http(rpcUrl, { timeout: 15_000 }),
  });
  return client.readContract({
    address: token,
    abi: [
      {
        type: 'function',
        name: 'hasRole',
        stateMutability: 'view',
        inputs: [
          { name: 'role', type: 'bytes32' },
          { name: 'account', type: 'address' },
        ],
        outputs: [{ type: 'bool' }],
      },
    ] as const,
    functionName: 'hasRole',
    args: [PAUSER_ROLE, holder],
  });
}

export async function verifyGovernanceExit(input: GovernanceVerifyInput): Promise<GovernanceVerifyResult> {
  const checks: GovernanceVerifyResult['checks'] = [];
  const network = input.l3Network ?? 'saly-testnet';
  const cwd = input.cwd ?? process.cwd();
  const manifest = loadDeploymentManifestForNetwork(network, cwd);
  const salysd = resolveSalysdAddress(network, cwd);
  const attestationRegistry = resolveAttestationRegistryAddress(network, cwd);

  checks.push({
    name: 'salysd_manifest',
    ok: Boolean(salysd ?? manifest?.assets?.SalySD),
    detail: salysd ?? manifest?.assets?.SalySD ?? 'missing',
  });

  checks.push({
    name: 'attestation_registry_manifest',
    ok: Boolean(attestationRegistry ?? manifest?.assets?.SalyAttestationRegistry),
    detail: attestationRegistry ?? manifest?.assets?.SalyAttestationRegistry ?? 'missing',
  });

  const agentRegistry = manifest?.assets?.SalyAgentRegistry;
  checks.push({
    name: 'agent_registry_manifest',
    ok: Boolean(agentRegistry) || process.env.GOVERNANCE_MANIFEST_OPTIONAL === '1',
    detail: agentRegistry ?? 'optional — run deploy:agents',
  });

  const gov = manifest?.governance;
  checks.push({
    name: 'governance_manifest',
    ok: Boolean(gov?.token && gov.timelock && gov.governor) || process.env.GOVERNANCE_MANIFEST_OPTIONAL === '1',
    detail: gov?.governor ?? 'optional — set GOVERNANCE_MANIFEST_OPTIONAL=1 or run deploy:governance',
  });

  if (input.contractRegistryBaseUrl) {
    const health = await registryHealth(input.contractRegistryBaseUrl);
    checks.push({ name: 'contract_registry_health', ...health });

    try {
      const res = await fetch(`${input.contractRegistryBaseUrl}/v1/contracts`, {
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        const body = (await res.json()) as { data?: Array<{ id: string; execution_mode?: string }> };
        const salysdRow = body.data?.find((c) => c.id === 'c_salysd');
        checks.push({
          name: 'registry_salysd_on_chain',
          ok: salysdRow?.execution_mode === 'ON_CHAIN',
          detail: salysdRow?.execution_mode ?? 'row missing',
        });
      } else {
        checks.push({ name: 'registry_salysd_on_chain', ok: false, detail: `status=${res.status}` });
      }
    } catch (err) {
      checks.push({ name: 'registry_salysd_on_chain', ok: false, detail: (err as Error).message });
    }
  }

  if (input.governanceExecutorWalletId) {
    checks.push({
      name: 'governance_executor_wallet_id',
      ok: /^[0-9a-f-]{36}$/.test(input.governanceExecutorWalletId),
      detail: input.governanceExecutorWalletId,
    });
  } else if (process.env.GOVERNANCE_EXECUTOR_WALLET_ID) {
    checks.push({
      name: 'governance_executor_wallet_id',
      ok: true,
      detail: process.env.GOVERNANCE_EXECUTOR_WALLET_ID,
    });
  } else {
    checks.push({
      name: 'governance_executor_wallet_id',
      ok: process.env.GOVERNANCE_EXECUTOR_OPTIONAL === '1',
      detail: process.env.GOVERNANCE_EXECUTOR_OPTIONAL === '1'
        ? 'optional (local ops mode)'
        : 'GOVERNANCE_EXECUTOR_WALLET_ID unset',
    });
  }

  const rpcUrl = process.env.L3_L3_RPC_URL ?? manifest?.l3_rpc_url ?? resolveL3RpcUrl(network);
  const executorWalletId = input.governanceExecutorWalletId ?? process.env.GOVERNANCE_EXECUTOR_WALLET_ID;
  const token = (salysd ?? manifest?.assets?.SalySD) as Address | undefined;

  if (token && input.walletBaseUrl && executorWalletId && rpcUrl) {
    try {
      const res = await fetch(`${input.walletBaseUrl}/v1/wallets/${executorWalletId}`, {
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        const wallet = (await res.json()) as { address?: string; chain?: string };
        if (wallet.address && wallet.chain === 'SALY_L3') {
          const hasPauser = await readPauserRole(rpcUrl, token, wallet.address as Address);
          checks.push({
            name: 'salysd_pauser_role',
            ok: hasPauser,
            detail: `${wallet.address} has PAUSER_ROLE=${hasPauser}`,
          });
        } else {
          checks.push({ name: 'salysd_pauser_role', ok: false, detail: 'executor wallet not SALY_L3' });
        }
      } else {
        checks.push({ name: 'salysd_pauser_role', ok: false, detail: `wallet lookup status=${res.status}` });
      }
    } catch (err) {
      checks.push({ name: 'salysd_pauser_role', ok: false, detail: (err as Error).message });
    }
  }

  const ok = checks.every((c) => c.ok);
  return { ok, checks };
}

export function manifestHasGovernanceAssets(manifest: L3DeploymentManifest | null): boolean {
  return Boolean(
    manifest?.assets?.SalyAttestationRegistry &&
      (manifest.assets.SalySD ?? manifest.assets.SalyAttestationRegistry),
  );
}

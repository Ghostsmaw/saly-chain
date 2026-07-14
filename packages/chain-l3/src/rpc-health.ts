import { createPublicClient, http } from 'viem';
import type { L3Network } from './network.js';
import { l3Network } from './network.js';
import { l3ViemChain } from './viem-chain.js';

export interface L3RpcProbeResult {
  url: string;
  ok: boolean;
  chainId?: number;
  blockNumber?: bigint;
  /** True when eth_syncing is false and blockNumber > 0. */
  synced: boolean;
  latencyMs: number;
  detail: string;
  role?: 'sequencer' | 'replica' | 'gateway';
}

export interface ProbeL3RpcPoolInput {
  urls: string[];
  network: L3Network;
  expectedChainId?: number;
  timeoutMs?: number;
}

export async function probeL3RpcEndpoint(input: {
  url: string;
  network: L3Network;
  expectedChainId?: number;
  timeoutMs?: number;
  role?: L3RpcProbeResult['role'];
}): Promise<L3RpcProbeResult> {
  const def = l3Network(input.network);
  const expected = input.expectedChainId ?? def.chainId;
  const started = Date.now();

  try {
    const client = createPublicClient({
      chain: l3ViemChain(def, input.url),
      transport: http(input.url, { timeout: input.timeoutMs ?? 5_000 }),
    });

    const [chainId, blockNumber] = await Promise.all([
      client.getChainId(),
      client.getBlockNumber(),
    ]);

    const latencyMs = Date.now() - started;
    const chainOk = chainId === expected;
    const synced = blockNumber > 0n;

    return {
      url: input.url,
      ok: chainOk && synced,
      chainId,
      blockNumber,
      synced,
      latencyMs,
      ...(input.role ? { role: input.role } : {}),
      detail: chainOk
        ? synced
          ? `block ${blockNumber} (${latencyMs}ms)`
          : 'node syncing'
        : `chainId ${chainId} != expected ${expected}`,
    };
  } catch (err) {
    return {
      url: input.url,
      ok: false,
      synced: false,
      latencyMs: Date.now() - started,
      ...(input.role ? { role: input.role } : {}),
      detail: (err as Error).message,
    };
  }
}

export async function probeL3RpcPool(input: ProbeL3RpcPoolInput): Promise<L3RpcProbeResult[]> {
  return Promise.all(
    input.urls.map((url, i) =>
      probeL3RpcEndpoint({
        url,
        network: input.network,
        ...(input.expectedChainId !== undefined ? { expectedChainId: input.expectedChainId } : {}),
        ...(input.timeoutMs !== undefined ? { timeoutMs: input.timeoutMs } : {}),
        role: i === 0 ? 'sequencer' : 'replica',
      }),
    ),
  );
}

/** Blocks behind the healthiest endpoint in the pool. */
export function rpcPoolMaxLag(probes: L3RpcProbeResult[]): number {
  const blocks = probes.filter((p) => p.ok && p.blockNumber !== undefined).map((p) => p.blockNumber!);
  if (blocks.length < 2) return 0;
  const max = blocks.reduce((a, b) => (a > b ? a : b));
  const min = blocks.reduce((a, b) => (a < b ? a : b));
  return Number(max - min);
}

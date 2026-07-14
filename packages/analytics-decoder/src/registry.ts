import { decodeEventLog, type Abi } from 'viem';
import type { AbiRegistryEntry, DecodedChainEvent, RawEvmLog } from './types.js';

function registryKey(chainId: string, address: string): string {
  return `${chainId}:${address.toLowerCase()}`;
}

/**
 * ABI registry keyed by `(chain_id, contract_address)`.
 * Decoders register known ABIs at startup; unknown logs are skipped (not failed).
 */
export class AbiRegistry {
  private readonly entries = new Map<string, AbiRegistryEntry>();

  register(entry: AbiRegistryEntry): void {
    this.entries.set(registryKey(entry.chainId, entry.address), {
      ...entry,
      address: entry.address.toLowerCase(),
    });
  }

  registerMany(entries: readonly AbiRegistryEntry[]): void {
    for (const e of entries) this.register(e);
  }

  lookup(chainId: string, address: string): AbiRegistryEntry | undefined {
    return this.entries.get(registryKey(chainId, address));
  }

  /** All registered contract addresses for a chain (e.g. for eth_getLogs filters). */
  addressesForChain(chainId: string): string[] {
    return [...this.entries.values()]
      .filter((e) => e.chainId === chainId && e.protocol !== 'xrpl_payment')
      .map((e) => e.address);
  }

  /** Token contracts (ERC-20) registered for a chain. */
  tokenAddresses(chainId: string): string[] {
    return [...this.entries.values()]
      .filter((e) => e.chainId === chainId && e.protocol === 'erc20')
      .map((e) => e.address);
  }

  decodeLog(chainId: string, log: RawEvmLog): DecodedChainEvent | null {
    const entry = this.lookup(chainId, log.address);
    if (!entry) return null;
    try {
      const decoded = decodeEventLog({
        abi: entry.abi as Abi,
        data: log.data,
        topics: log.topics as [signature: `0x${string}`, ...args: `0x${string}`[]],
      });
      const rawArgs = decoded.args as unknown;
      const argObj: Record<string, unknown> =
        rawArgs && typeof rawArgs === 'object' && !Array.isArray(rawArgs)
          ? (rawArgs as Record<string, unknown>)
          : {};
      return {
        chainId,
        txHash: log.txHash,
        logIndex: log.logIndex,
        blockNumber: log.blockNumber,
        blockHash: log.blockHash,
        contractAddress: log.address.toLowerCase(),
        eventName: String(decoded.eventName),
        protocol: entry.protocol,
        args: serializeArgs(argObj),
      };
    } catch {
      return null;
    }
  }
}

function serializeArgs(args: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(args)) {
    if (typeof v === 'bigint') out[k] = v.toString();
    else if (Array.isArray(v)) out[k] = v.map((x) => (typeof x === 'bigint' ? x.toString() : x));
    else out[k] = v;
  }
  return out;
}

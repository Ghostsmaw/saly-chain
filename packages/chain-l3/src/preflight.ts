import { createPublicClient, http, isAddress, type Address, type Hex } from 'viem';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import { getL3Asset, resolveUsdcAddress } from './assets.js';
import type { L3Network } from './network.js';
import { l3Network } from './network.js';
import { resolveL3RpcUrl } from './rpc.js';
import { l3ViemChain } from './viem-chain.js';

/**
 * Minimal probe surface used by the connection preflight. Injectable so the
 * verification logic can be unit-tested without a live RPC endpoint.
 */
export interface L3ChainProbe {
  getChainId(): Promise<number>;
  getBytecode(args: { address: Address }): Promise<Hex | undefined>;
}

export interface L3ConnectionReport {
  ok: boolean;
  network: L3Network;
  rpcUrl: string;
  expectedChainId: number;
  actualChainId?: number;
  chainIdMatches: boolean;
  usdcAddress?: Address;
  usdcDeployed?: boolean;
  /** Stable, namespaced reasons the connection is unsafe to use. Empty when ok. */
  failures: string[];
}

export interface VerifyL3ConnectionOptions {
  network: L3Network;
  rpcUrl?: string;
  /**
   * Require the USDC contract to be present with bytecode. Use for money-rail
   * processes (listener, execution) — never operate a custodial rail against an
   * unverified or non-existent token contract.
   */
  requireUsdc?: boolean;
  /** Override the USDC address (otherwise resolved from env/manifest/registry). */
  usdcAddress?: Address;
  logger?: Logger;
  /** Injectable probe (tests). Defaults to a viem public client over `rpcUrl`. */
  probe?: L3ChainProbe;
  cwd?: string;
}

function defaultProbe(network: L3Network, rpcUrl: string): L3ChainProbe {
  const def = l3Network(network);
  const client = createPublicClient({
    chain: l3ViemChain(def, rpcUrl),
    transport: http(rpcUrl, { timeout: 15_000, retryCount: 2 }),
  });
  return {
    getChainId: () => client.getChainId(),
    getBytecode: (args) => client.getBytecode(args),
  };
}

/**
 * Verify the L3 execution RPC is the chain we think it is and (optionally) that
 * the configured USDC contract exists. Returns a structured report; never throws
 * for an unsafe-but-reachable endpoint. Throws only on bad inputs.
 */
export async function verifyL3Connection(
  opts: VerifyL3ConnectionOptions,
): Promise<L3ConnectionReport> {
  const cwd = opts.cwd ?? process.cwd();
  const def = l3Network(opts.network);
  const rpcUrl = opts.rpcUrl ?? resolveL3RpcUrl(opts.network, cwd);
  const probe = opts.probe ?? defaultProbe(opts.network, rpcUrl);
  const usdcAddress =
    opts.usdcAddress ?? (resolveUsdcAddress(opts.network, cwd) as Address | undefined);

  if (opts.usdcAddress && !isAddress(opts.usdcAddress)) {
    throw ValidationError('chain.l3.bad_usdc_address', `Invalid USDC address: ${opts.usdcAddress}`);
  }

  const report: L3ConnectionReport = {
    ok: false,
    network: opts.network,
    rpcUrl,
    expectedChainId: def.chainId,
    chainIdMatches: false,
    failures: [],
    ...(usdcAddress ? { usdcAddress } : {}),
  };

  try {
    report.actualChainId = await probe.getChainId();
  } catch (err) {
    report.failures.push(`chain.l3.rpc_unreachable: ${(err as Error).message}`);
    finalize(report, opts.logger);
    return report;
  }

  report.chainIdMatches = report.actualChainId === def.chainId;
  if (!report.chainIdMatches) {
    report.failures.push(
      `chain.l3.chain_id_mismatch: expected ${def.chainId} for ${opts.network}, got ${report.actualChainId}`,
    );
  }

  if (opts.requireUsdc) {
    const asset = getL3Asset(opts.network, 'USDC');
    if (!usdcAddress) {
      report.failures.push(
        'chain.l3.usdc_unconfigured: set L3_USDC_ADDRESS or a deployments manifest with assets.USDC',
      );
    } else if (asset.decimals !== 6) {
      report.failures.push(`chain.l3.usdc_bad_decimals: expected 6, got ${asset.decimals}`);
    } else {
      try {
        const code = await probe.getBytecode({ address: usdcAddress });
        report.usdcDeployed = Boolean(code && code !== '0x');
        if (!report.usdcDeployed) {
          report.failures.push(
            `chain.l3.usdc_not_deployed: no bytecode at ${usdcAddress} on ${opts.network}`,
          );
        }
      } catch (err) {
        report.failures.push(`chain.l3.usdc_probe_failed: ${(err as Error).message}`);
      }
    }
  }

  finalize(report, opts.logger);
  return report;
}

function finalize(report: L3ConnectionReport, logger?: Logger): void {
  report.ok = report.failures.length === 0;
  if (report.ok) {
    logger?.info?.(
      `L3 connection verified: ${report.network} chainId=${report.actualChainId} rpc=${report.rpcUrl}` +
        (report.usdcAddress ? ` usdc=${report.usdcAddress}` : ''),
    );
  } else {
    logger?.error?.(`L3 connection unsafe (${report.network}): ${report.failures.join('; ')}`);
  }
}

/**
 * Fail-closed variant: throws an ExternalError when the connection is unsafe.
 * Use at money-rail process startup so a misconfigured node never moves funds.
 */
export async function assertL3Connection(
  opts: VerifyL3ConnectionOptions,
): Promise<L3ConnectionReport> {
  const report = await verifyL3Connection(opts);
  if (!report.ok) {
    throw ExternalError(
      'chain.l3.connection_unsafe',
      `Refusing to operate L3 rail: ${report.failures.join('; ')}`,
      { details: { report } },
    );
  }
  return report;
}

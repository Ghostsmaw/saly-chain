import { describe, expect, it } from 'vitest';
import { getCode } from 'viem/actions';
import {
  createBasePublicClient,
  getDexPoolStatus,
  isAllowedDexRouter,
  listDexPairs,
  prepareExactInputSingleSwap,
  quoteExactInputSingle,
  UNISWAP_V3_QUOTER_V2,
  UNISWAP_V3_SWAP_ROUTER,
  type BaseNetwork,
  type DexTokenSymbol,
} from './index.js';

const live = process.env.DEX_E2E_LIVE === 'true';
const network = (process.env.BASE_NETWORK ?? 'base-sepolia') as BaseNetwork;
const rpcUrl = process.env.BASE_RPC_URL ?? 'https://sepolia.base.org';
const recipient =
  (process.env.DEX_E2E_RECIPIENT as `0x${string}` | undefined) ??
  ('0x1111111111111111111111111111111111111111' as const);

/** Sample input sizes per token (minor units). */
const SAMPLE_IN: Record<DexTokenSymbol, bigint> = {
  USDC: 1_000_000n,
  WETH: 1_000_000_000_000_000n,
  DAI: 1_000_000_000_000_000_000n,
};

describe.skipIf(!live)('DEX live E2E (on-chain)', () => {
  const client = createBasePublicClient(network, rpcUrl);

  it('verifies canonical router and quoter bytecode', async () => {
    const router = UNISWAP_V3_SWAP_ROUTER[network];
    const quoter = UNISWAP_V3_QUOTER_V2[network];
    const routerCode = await getCode(client, { address: router });
    const quoterCode = await getCode(client, { address: quoter });
    expect(routerCode).toBeDefined();
    expect(routerCode).not.toBe('0x');
    expect(quoterCode).toBeDefined();
    expect(quoterCode).not.toBe('0x');
    expect(isAllowedDexRouter(network, router)).toBe(true);
  });

  it.each(listDexPairs(network).map((p) => [p.from, p.to] as const))(
    'quotes and prepares swap for %s→%s on %s',
    async (tokenIn, tokenOut) => {
      const amountIn = SAMPLE_IN[tokenIn];
      const pool = await getDexPoolStatus(client, network, tokenIn, tokenOut);
      expect(pool, `pool for ${tokenIn}/${tokenOut}`).not.toBeNull();
      expect(pool!.liquidity).toBeGreaterThan(0n);

      const amountOut = await quoteExactInputSingle(client, network, {
        network,
        tokenIn,
        tokenOut,
        amountIn,
      });
      expect(amountOut).toBeGreaterThan(0n);

      const prepared = prepareExactInputSingleSwap({
        network,
        tokenIn,
        tokenOut,
        recipient,
        amountIn,
        amountOutMinimum: (amountOut * 99n) / 100n,
      });
      expect(prepared.calldata.length).toBeGreaterThan(10);
      expect(prepared.router.toLowerCase()).toBe(UNISWAP_V3_SWAP_ROUTER[network].toLowerCase());
    },
    120_000,
  );
});

describe('DEX live E2E gate', () => {
  it('skips on-chain tests unless DEX_E2E_LIVE=true', () => {
    if (!live) {
      expect(process.env.DEX_E2E_LIVE).not.toBe('true');
    } else {
      expect(['base-mainnet', 'base-sepolia']).toContain(network);
    }
  });
});

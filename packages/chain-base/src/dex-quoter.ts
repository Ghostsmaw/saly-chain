import {
  createPublicClient,
  encodeFunctionData,
  http,
  type Address,
  type Hex,
  type PublicClient,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { BaseNetwork } from './assets.js';
import { DEFAULT_POOL_FEE, UNISWAP_V3_SWAP_ROUTER } from './dex.js';
import { getDexPairConfig } from './dex-pairs.js';
import { getDexTokenAddress, type DexTokenSymbol } from './dex-tokens.js';

/** Uniswap V3 QuoterV2 — canonical deployments (see Uniswap Base deployments). */
export const UNISWAP_V3_QUOTER_V2: Record<BaseNetwork, Address> = {
  'base-mainnet': '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  'base-sepolia': '0xC5290058841028F1614F3A6F0F5816cAd0df5E27',
};

/** Uniswap V3 factory — used to verify pool existence. */
export const UNISWAP_V3_FACTORY: Record<BaseNetwork, Address> = {
  'base-mainnet': '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  'base-sepolia': '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
};

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as Address;

const QUOTER_V2_ABI = [
  {
    type: 'function',
    name: 'quoteExactInputSingle',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'fee', type: 'uint24' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' },
        ],
      },
    ],
    outputs: [
      { name: 'amountOut', type: 'uint256' },
      { name: 'sqrtPriceX96After', type: 'uint160' },
      { name: 'initializedTicksCrossed', type: 'uint32' },
      { name: 'gasEstimate', type: 'uint256' },
    ],
  },
] as const;

const FACTORY_ABI = [
  {
    type: 'function',
    name: 'getPool',
    stateMutability: 'view',
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' },
      { name: 'fee', type: 'uint24' },
    ],
    outputs: [{ name: 'pool', type: 'address' }],
  },
] as const;

const POOL_ABI = [
  {
    type: 'function',
    name: 'liquidity',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint128' }],
  },
] as const;

export interface DexQuoteInput {
  network: BaseNetwork;
  tokenIn: DexTokenSymbol;
  tokenOut: DexTokenSymbol;
  amountIn: bigint;
  poolFee?: number;
}

export interface DexPoolStatus {
  poolAddress: Address;
  liquidity: bigint;
  fee: number;
}

export function isAllowedDexRouter(network: BaseNetwork, router: string): boolean {
  if (!/^0x[a-fA-F0-9]{40}$/.test(router)) return false;
  return router.toLowerCase() === UNISWAP_V3_SWAP_ROUTER[network].toLowerCase();
}

export function defaultDexRouterAllowlist(network: BaseNetwork): string[] {
  return [UNISWAP_V3_SWAP_ROUTER[network].toLowerCase()];
}

export function createBasePublicClient(network: BaseNetwork, rpcUrl: string) {
  const chain = network === 'base-mainnet' ? base : baseSepolia;
  return createPublicClient({ chain, transport: http(rpcUrl) });
}

/** Read expected output from Uniswap V3 QuoterV2 (simulated eth_call). */
export async function quoteExactInputSingle(
  client: Pick<PublicClient, 'simulateContract'>,
  network: BaseNetwork,
  input: DexQuoteInput,
): Promise<bigint> {
  if (input.amountIn <= 0n) {
    throw ValidationError('chain.dex.bad_amount', 'amountIn must be positive');
  }

  const quoter = UNISWAP_V3_QUOTER_V2[network];
  const tokenIn = getDexTokenAddress(network, input.tokenIn);
  const tokenOut = getDexTokenAddress(network, input.tokenOut);
  const fee =
    input.poolFee ??
    getDexPairConfig(network, input.tokenIn, input.tokenOut)?.poolFee ??
    DEFAULT_POOL_FEE;

  try {
    const { result } = await client.simulateContract({
      address: quoter,
      abi: QUOTER_V2_ABI,
      functionName: 'quoteExactInputSingle',
      args: [
        {
          tokenIn,
          tokenOut,
          amountIn: input.amountIn,
          fee,
          sqrtPriceLimitX96: 0n,
        },
      ],
      account: ZERO_ADDRESS,
    });
    const amountOut = result[0];
    if (amountOut <= 0n) {
      throw ValidationError('chain.dex.zero_output', 'Quoter returned zero output — pool may be empty');
    }
    return amountOut;
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    throw ExternalError(
      'chain.dex.quote_failed',
      `Uniswap QuoterV2 call failed (${input.tokenIn}→${input.tokenOut}): ${msg}. Ensure the ${fee} fee pool exists and has liquidity.`,
    );
  }
}

/** Returns pool address + liquidity for the default fee tier, or null if no pool. */
export async function getDexPoolStatus(
  client: Pick<PublicClient, 'readContract'>,
  network: BaseNetwork,
  tokenIn: DexTokenSymbol,
  tokenOut: DexTokenSymbol,
  poolFee?: number,
): Promise<DexPoolStatus | null> {
  const fee =
    poolFee ??
    getDexPairConfig(network, tokenIn, tokenOut)?.poolFee ??
    DEFAULT_POOL_FEE;
  const factory = UNISWAP_V3_FACTORY[network];
  const a = getDexTokenAddress(network, tokenIn);
  const b = getDexTokenAddress(network, tokenOut);

  const poolAddress = await client.readContract({
    address: factory,
    abi: FACTORY_ABI,
    functionName: 'getPool',
    args: [a, b, fee],
  });

  if (!poolAddress || poolAddress === ZERO_ADDRESS) return null;

  const liquidity = await client.readContract({
    address: poolAddress,
    abi: POOL_ABI,
    functionName: 'liquidity',
  });

  return { poolAddress, liquidity, fee };
}

/** Encode calldata for debugging / tests without hitting RPC. */
export function encodeQuoterCall(network: BaseNetwork, input: DexQuoteInput): Hex {
  const tokenIn = getDexTokenAddress(network, input.tokenIn);
  const tokenOut = getDexTokenAddress(network, input.tokenOut);
  const fee =
    input.poolFee ??
    getDexPairConfig(network, input.tokenIn, input.tokenOut)?.poolFee ??
    DEFAULT_POOL_FEE;
  return encodeFunctionData({
    abi: QUOTER_V2_ABI,
    functionName: 'quoteExactInputSingle',
    args: [
      {
        tokenIn,
        tokenOut,
        amountIn: input.amountIn,
        fee,
        sqrtPriceLimitX96: 0n,
      },
    ],
  });
}

import { encodeFunctionData, type Address, type Hex } from 'viem';
import type { BaseNetwork } from './assets.js';
import { getDexPairConfig } from './dex-pairs.js';
import { getDexTokenAddress, type DexTokenSymbol } from './dex-tokens.js';

/** Uniswap V3 SwapRouter02 — canonical deployments. */
export const UNISWAP_V3_SWAP_ROUTER: Record<BaseNetwork, Address> = {
  'base-mainnet': '0x2626664c2603336E57B271c5C0b26F421741e481',
  'base-sepolia': '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4',
};

/** Default pool fee tier (0.3%). */
export const DEFAULT_POOL_FEE = 3000;

const SWAP_ROUTER_ABI = [
  {
    type: 'function',
    name: 'exactInputSingle',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'recipient', type: 'address' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMinimum', type: 'uint256' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' },
        ],
      },
    ],
    outputs: [{ name: 'amountOut', type: 'uint256' }],
  },
] as const;

export interface DexSwapParams {
  network: BaseNetwork;
  tokenIn: DexTokenSymbol;
  tokenOut: DexTokenSymbol;
  recipient: Address;
  amountIn: bigint;
  amountOutMinimum: bigint;
  deadline?: bigint;
  poolFee?: number;
}

export interface PreparedDexSwap {
  router: Address;
  calldata: Hex;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  amountOutMinimum: bigint;
  spender: Address;
}

/** Encode a Uniswap V3 exactInputSingle swap for the configured router. */
export function prepareExactInputSingleSwap(params: DexSwapParams): PreparedDexSwap {
  const router = UNISWAP_V3_SWAP_ROUTER[params.network];
  const tokenIn = getDexTokenAddress(params.network, params.tokenIn);
  const tokenOut = getDexTokenAddress(params.network, params.tokenOut);
  const fee =
    params.poolFee ??
    getDexPairConfig(params.network, params.tokenIn, params.tokenOut)?.poolFee ??
    DEFAULT_POOL_FEE;

  const calldata = encodeFunctionData({
    abi: SWAP_ROUTER_ABI,
    functionName: 'exactInputSingle',
    args: [
      {
        tokenIn,
        tokenOut,
        fee,
        recipient: params.recipient,
        amountIn: params.amountIn,
        amountOutMinimum: params.amountOutMinimum,
        sqrtPriceLimitX96: 0n,
      },
    ],
  });

  return {
    router,
    calldata,
    tokenIn,
    tokenOut,
    amountIn: params.amountIn,
    amountOutMinimum: params.amountOutMinimum,
    spender: router,
  };
}

/** Apply slippage tolerance to a quoted output amount. */
export function applySlippageFloor(amountOut: bigint, slippageBps: number): bigint {
  const bps = BigInt(Math.max(0, Math.min(10_000, slippageBps)));
  return (amountOut * (10_000n - bps)) / 10_000n;
}

export {
  DEX_PAIR_DEFINITIONS,
  DEX_SUPPORTED_PAIRS,
  dexPairKey,
  getDexPairConfig,
  isDexPairSupported,
  listDexPairs,
  listDexTokens,
} from './dex-pairs.js';

import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  applySlippageFloor,
  createBasePublicClient,
  getDexPoolStatus,
  isDexPairSupported,
  listDexPairs,
  listDexTokens,
  prepareExactInputSingleSwap,
  quoteExactInputSingle,
  type BaseNetwork,
  type DexTokenSymbol,
} from '@salychain/chain-base';
import { ValidationError } from '@salychain/errors';
import { QuoteService, type QuoteResponse } from './quote.service.js';
import { LIQUIDITY_ENV, type LiquidityEnv } from '../config/env.js';

export interface DexQuoteRequest {
  intentId?: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmountMinor: bigint;
  recipient: string;
  slippageBps?: number;
}

export interface DexQuoteResponse extends QuoteResponse {
  quote_type: 'DEX';
  dex: {
    router: string;
    calldata: string;
    token_in: string;
    token_out: string;
    amount_in: string;
    min_amount_out: string;
    expected_out: string;
    recipient: string;
    pool_address?: string;
    pool_liquidity?: string;
    quote_source: 'onchain' | 'stub';
  };
}

/** Dev-only fallback when QuoterV2 / pool unavailable. */
const STUB_WETH_WEI_PER_USDC_MINOR = 300_000_000_000_000n;

@Injectable()
export class DexQuoteService {
  private readonly logger = new Logger(DexQuoteService.name);
  private readonly network: BaseNetwork;
  private readonly client: ReturnType<typeof createBasePublicClient>;
  private readonly stubFallback: boolean;

  constructor(
    private readonly quotes: QuoteService,
    @Inject(LIQUIDITY_ENV) env: LiquidityEnv,
  ) {
    this.network = env.BASE_NETWORK;
    this.client = createBasePublicClient(env.BASE_NETWORK, env.BASE_RPC_URL);
    this.stubFallback = env.DEX_QUOTE_STUB_FALLBACK;
  }

  async quoteDex(input: DexQuoteRequest): Promise<DexQuoteResponse> {
    const tokenIn = input.fromCurrency.toUpperCase() as DexTokenSymbol;
    const tokenOut = input.toCurrency.toUpperCase() as DexTokenSymbol;

    if (!isDexPairSupported(this.network, tokenIn, tokenOut)) {
      throw ValidationError(
        'liquidity.dex.unsupported_pair',
        `DEX pair ${tokenIn}/${tokenOut} is not supported on ${this.network}`,
      );
    }
    if (input.fromAmountMinor <= 0n) {
      throw ValidationError('liquidity.bad_amount', 'fromAmountMinor must be positive');
    }

    const slippageBps = input.slippageBps ?? 100;
    let toAmountMinor: bigint;
    let quoteSource: 'onchain' | 'stub' = 'onchain';
    let poolAddress: string | undefined;
    let poolLiquidity: string | undefined;

    try {
      const pool = await getDexPoolStatus(this.client, this.network, tokenIn, tokenOut);
      if (!pool || pool.liquidity === 0n) {
        throw ValidationError(
          'liquidity.dex.no_pool',
          `No Uniswap V3 pool with liquidity for ${tokenIn}/${tokenOut} on ${this.network}.`,
        );
      }
      poolAddress = pool.poolAddress;
      poolLiquidity = pool.liquidity.toString();

      toAmountMinor = await quoteExactInputSingle(this.client, this.network, {
        network: this.network,
        tokenIn,
        tokenOut,
        amountIn: input.fromAmountMinor,
      });
    } catch (err) {
      if (!this.stubFallback) throw err;
      this.logger.warn(`on-chain DEX quote failed, using stub fallback: ${(err as Error).message}`);
      quoteSource = 'stub';
      toAmountMinor = this.estimateOutputStub(tokenIn, tokenOut, input.fromAmountMinor);
    }

    const minAmountOut = applySlippageFloor(toAmountMinor, slippageBps);

    const prepared = prepareExactInputSingleSwap({
      network: this.network,
      tokenIn,
      tokenOut,
      recipient: input.recipient as `0x${string}`,
      amountIn: input.fromAmountMinor,
      amountOutMinimum: minAmountOut,
    });

    const spreadBps = quoteSource === 'onchain' ? 10 : 30;
    const quotedRate1e8 = (toAmountMinor * 100_000_000n) / input.fromAmountMinor;

    const provider =
      quoteSource === 'onchain' ? `dex:uniswap-v3:${this.network}` : 'dex:uniswap-v3-stub';

    const fxQuote = await this.quotes.quoteWithMetadata({
      intentId: input.intentId,
      fromCurrency: tokenIn,
      toCurrency: tokenOut,
      fromAmountMinor: input.fromAmountMinor,
      toAmountMinor,
      quotedRate1e8,
      // DEX quotes have no separate dealer mid; the executable rate is the mid.
      midRate1e8: quotedRate1e8,
      spreadBps,
      provider,
      metadata: {
        quote_type: 'DEX',
        quote_source: quoteSource,
        router: prepared.router,
        calldata: prepared.calldata,
        token_in: tokenIn,
        token_out: tokenOut,
        min_amount_out: minAmountOut.toString(),
        expected_out: toAmountMinor.toString(),
        recipient: input.recipient,
        pool_address: poolAddress,
        pool_liquidity: poolLiquidity,
      },
    });

    this.logger.log(
      `dex quote [${quoteSource}] ${tokenIn}→${tokenOut} in=${input.fromAmountMinor} out=${toAmountMinor} minOut=${minAmountOut}`,
    );

    return {
      ...fxQuote,
      quote_type: 'DEX',
      dex: {
        router: prepared.router,
        calldata: prepared.calldata,
        token_in: tokenIn,
        token_out: tokenOut,
        amount_in: input.fromAmountMinor.toString(),
        min_amount_out: minAmountOut.toString(),
        expected_out: toAmountMinor.toString(),
        recipient: input.recipient,
        pool_address: poolAddress,
        pool_liquidity: poolLiquidity,
        quote_source: quoteSource,
      },
    };
  }

  /** Check pool readiness without issuing a signed quote. */
  async getPoolReadiness(tokenIn: string, tokenOut: string) {
    const a = tokenIn.toUpperCase() as DexTokenSymbol;
    const b = tokenOut.toUpperCase() as DexTokenSymbol;
    if (!isDexPairSupported(this.network, a, b)) {
      return { ready: false, reason: 'unsupported_pair' as const, network: this.network };
    }
    const pool = await getDexPoolStatus(this.client, this.network, a, b);
    if (!pool) return { ready: false, reason: 'no_pool' as const, network: this.network };
    if (pool.liquidity === 0n) {
      return {
        ready: false,
        reason: 'empty_pool' as const,
        pool_address: pool.poolAddress,
        network: this.network,
      };
    }
    return {
      ready: true,
      pool_address: pool.poolAddress,
      liquidity: pool.liquidity.toString(),
      fee: pool.fee,
      network: this.network,
    };
  }

  /** Supported pairs + tokens for the configured Base network (UI bootstrap). */
  listDexCatalog() {
    return {
      network: this.network,
      tokens: listDexTokens(this.network).map((t) => ({
        symbol: t.symbol,
        decimals: t.decimals,
        label: t.label,
      })),
      pairs: listDexPairs(this.network).map((p) => ({
        from: p.from,
        to: p.to,
        pool_fee: p.pool_fee,
      })),
    };
  }

  private estimateOutputStub(tokenIn: DexTokenSymbol, tokenOut: DexTokenSymbol, amountIn: bigint): bigint {
    if ((tokenIn === 'USDC' && tokenOut === 'DAI') || (tokenIn === 'DAI' && tokenOut === 'USDC')) {
      return tokenIn === 'USDC'
        ? (amountIn * 1_000_000_000_000_000_000n) / 1_000_000n
        : (amountIn * 1_000_000n) / 1_000_000_000_000_000_000n;
    }
    if (tokenIn === 'USDC' && tokenOut === 'WETH') {
      return (amountIn * STUB_WETH_WEI_PER_USDC_MINOR) / 1_000_000n;
    }
    if (tokenIn === 'WETH' && tokenOut === 'USDC') {
      return (amountIn * 1_000_000n) / STUB_WETH_WEI_PER_USDC_MINOR;
    }
    if (tokenIn === 'WETH' && tokenOut === 'DAI') {
      return (amountIn * 3_000_000_000_000_000_000n) / STUB_WETH_WEI_PER_USDC_MINOR;
    }
    if (tokenIn === 'DAI' && tokenOut === 'WETH') {
      return (amountIn * STUB_WETH_WEI_PER_USDC_MINOR) / 3_000_000_000_000_000_000n;
    }
    throw ValidationError('liquidity.dex.unsupported_pair', 'Cannot estimate output for pair');
  }
}

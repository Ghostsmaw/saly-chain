#!/usr/bin/env tsx
/**
 * Verify Uniswap V3 pools and QuoterV2 for all configured DEX pairs on Base.
 *
 * Usage:
 *   pnpm --filter @salychain/chain-base check-pool
 *   BASE_NETWORK=base-mainnet BASE_RPC_URL=https://mainnet.base.org pnpm --filter @salychain/chain-base check-pool
 */
import {
  createBasePublicClient,
  getDexPoolStatus,
  listDexPairs,
  quoteExactInputSingle,
  UNISWAP_V3_SWAP_ROUTER,
  type BaseNetwork,
  type DexTokenSymbol,
} from '../src/index.js';

const network = (process.env.BASE_NETWORK as BaseNetwork | undefined) ?? 'base-sepolia';
const rpc = process.env.BASE_RPC_URL ?? (network === 'base-mainnet' ? 'https://mainnet.base.org' : 'https://sepolia.base.org');

const SAMPLE_IN: Record<DexTokenSymbol, bigint> = {
  USDC: 1_000_000n,
  WETH: 1_000_000_000_000_000n,
  DAI: 1_000_000_000_000_000_000n,
};

async function main() {
  const client = createBasePublicClient(network, rpc);
  const pairs = listDexPairs(network);

  console.log(`Network: ${network}`);
  console.log(`RPC:     ${rpc}`);
  console.log(`Router:  ${UNISWAP_V3_SWAP_ROUTER[network]}`);
  console.log(`Pairs:   ${pairs.length}\n`);

  if (pairs.length === 0) {
    console.log('❌ No DEX pairs configured for this network.');
    process.exit(1);
  }

  let failures = 0;

  for (const pair of pairs) {
    const label = `${pair.from}→${pair.to} (${pair.pool_fee / 10_000}%)`;
    const pool = await getDexPoolStatus(client, network, pair.from, pair.to);

    if (!pool) {
      console.log(`❌ ${label} — no pool`);
      failures++;
      continue;
    }

    if (pool.liquidity === 0n) {
      console.log(`⚠️  ${label} — pool ${pool.poolAddress} has zero liquidity`);
      failures++;
      continue;
    }

    try {
      const amountIn = SAMPLE_IN[pair.from];
      const out = await quoteExactInputSingle(client, network, {
        network,
        tokenIn: pair.from,
        tokenOut: pair.to,
        amountIn,
      });
      console.log(`✅ ${label}`);
      console.log(`   Pool: ${pool.poolAddress}`);
      console.log(`   Liquidity: ${pool.liquidity.toString()}`);
      console.log(`   Sample quote in=${amountIn.toString()} out=${out.toString()}\n`);
    } catch (err) {
      console.log(`❌ ${label} — quoter failed: ${(err as Error).message}`);
      failures++;
    }
  }

  if (failures > 0) {
    console.log(`\n${failures} pair(s) need attention.`);
    if (network === 'base-sepolia') {
      console.log('\nSepolia: fund wallet with test USDC + ETH, add liquidity at https://app.uniswap.org/');
    }
    process.exit(1);
  }

  console.log('All configured pairs are ready.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

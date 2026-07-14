import { describe, expect, it } from 'vitest';
import { StubFiatAdapter } from '@salychain/chain-fiat';
import { InternalLedgerEvaluator } from './internal.evaluator.js';
import { SwapLedgerEvaluator } from './swap.evaluator.js';
import { BaseDexSwapEvaluator } from './base-dex.evaluator.js';
import { BaseUsdcEvaluator } from './base.evaluator.js';
import { XrplEvaluator } from './xrpl.evaluator.js';
import { L3UsdcEvaluator } from './l3.evaluator.js';
import { FiatRailEvaluator } from './fiat.evaluator.js';

describe('rail evaluators', () => {
  it('InternalLedgerEvaluator is available for same-currency intra-platform transfers', async () => {
    const out = await new InternalLedgerEvaluator().evaluate({
      source: { type: 'LEDGER_ACCOUNT', currency: 'USD' },
      destination: { type: 'LEDGER_ACCOUNT', currency: 'USD' },
      amountMinor: 10_000n,
    });
    expect(out.available).toBe(true);
    expect(out.expectedCostUsdMinor).toBe(0n);
  });

  it('InternalLedgerEvaluator refuses cross-currency or external destinations', async () => {
    const xCurrency = await new InternalLedgerEvaluator().evaluate({
      source: { type: 'LEDGER_ACCOUNT', currency: 'USD' },
      destination: { type: 'LEDGER_ACCOUNT', currency: 'NGN' },
      amountMinor: 1n,
    });
    const external = await new InternalLedgerEvaluator().evaluate({
      source: { type: 'LEDGER_ACCOUNT', currency: 'USD' },
      destination: { type: 'EXTERNAL_ADDRESS', currency: 'USD' },
      amountMinor: 1n,
    });
    expect(xCurrency.available).toBe(false);
    expect(external.available).toBe(false);
  });

  it('BaseUsdcEvaluator is available only for USDC over Base', async () => {
    const ok = await new BaseUsdcEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USDC', chain: 'base-sepolia' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'base-sepolia', currency: 'USDC' },
      amountMinor: 1_000n,
    });
    const wrongChain = await new BaseUsdcEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USDC' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'ethereum', currency: 'USDC' },
      amountMinor: 1_000n,
    });
    expect(ok.available).toBe(true);
    expect(wrongChain.available).toBe(false);
  });

  it('XrplEvaluator is available for native XRP and IOU payouts', async () => {
    const xrp = await new XrplEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'XRP', chain: 'xrpl-testnet' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'xrpl-testnet', currency: 'XRP' },
      amountMinor: 1_000_000n,
    });
    expect(xrp.available).toBe(true);
    expect(xrp.expectedSeconds).toBeLessThan(10);

    const usd = await new XrplEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USD', chain: 'xrpl-testnet' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'xrpl-testnet', currency: 'USD' },
      amountMinor: 10_00n,
    });
    expect(usd.available).toBe(true);
    expect(usd.notes.some((n) => n.includes('IOU'))).toBe(true);
  });

  it('BaseDexSwapEvaluator serves on-chain USDC→WETH swaps', async () => {
    const ok = await new BaseDexSwapEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USDC' },
      destination: { type: 'EXTERNAL_ADDRESS', currency: 'WETH', chain: 'BASE' },
      amountMinor: 1_000_000n,
      intentKind: 'SWAP',
      swapExecution: 'onchain',
    });
    expect(ok.available).toBe(true);
    expect(ok.rail).toBe('BASE');
  });

  it('SwapLedgerEvaluator disables ledger FX when swap_execution=onchain', async () => {
    const out = await new SwapLedgerEvaluator().evaluate({
      source: { type: 'LEDGER_ACCOUNT', currency: 'USD' },
      destination: { type: 'LEDGER_ACCOUNT', currency: 'NGN' },
      amountMinor: 1n,
      intentKind: 'SWAP',
      swapExecution: 'onchain',
    });
    expect(out.available).toBe(false);
  });

  it('L3UsdcEvaluator is available for USDC over saly-devnet', async () => {
    const ok = await new L3UsdcEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USDC', chain: 'SALY_L3' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'saly-devnet', currency: 'USDC' },
      amountMinor: 1_000n,
    });
    const wrong = await new L3UsdcEvaluator().evaluate({
      source: { type: 'WALLET', currency: 'USDC' },
      destination: { type: 'EXTERNAL_ADDRESS', chain: 'base-sepolia', currency: 'USDC' },
      amountMinor: 1_000n,
    });
    expect(ok.available).toBe(true);
    expect(wrong.available).toBe(false);
  });

  it('FiatRailEvaluator is available for NGN bank accounts when enabled', async () => {
    const out = await new FiatRailEvaluator({
      enabled: true,
      adapter: new StubFiatAdapter(),
    }).evaluate({
      source: { type: 'LEDGER_ACCOUNT', currency: 'NGN' },
      destination: {
        type: 'BANK_ACCOUNT',
        currency: 'NGN',
        country_code: 'NG',
        address: '0123456789',
      },
      amountMinor: 100_000n,
    });
    expect(out.available).toBe(true);
    expect(out.rail).toBe('FIAT');
    expect(out.notes.some((n) => n.includes('NIP'))).toBe(true);
  });
});

import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * Cross-currency ledger swap. Available when both legs are internal ledger
 * accounts in different currencies — execution pairs this with a signed FX quote.
 */
export class SwapLedgerEvaluator implements RailEvaluator {
  readonly rail = 'INTERNAL' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const crossCurrency = input.source.currency !== input.destination.currency;
    const internalSource =
      input.source.type === 'LEDGER_ACCOUNT' || input.source.type === 'WALLET';
    const internalDest =
      input.destination.type === 'LEDGER_ACCOUNT' || input.destination.type === 'WALLET';
    const swapIntent = input.intentKind === 'SWAP';
    const onchain = input.swapExecution === 'onchain';

    if (onchain) {
      return {
        rail: 'INTERNAL',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 100,
        privacy: 100,
        notes: ['ledger FX disabled when swap_execution=onchain'],
      };
    }

    if (!crossCurrency || !internalSource || !internalDest) {
      return {
        rail: 'INTERNAL',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 100,
        privacy: 100,
        notes: ['cross-currency swap requires internal ledger accounts in different currencies'],
      };
    }

    if (!swapIntent) {
      return {
        rail: 'INTERNAL',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 100,
        privacy: 100,
        notes: ['cross-currency ledger conversion requires intent kind SWAP'],
      };
    }

    return {
      rail: 'INTERNAL',
      available: true,
      expectedCostUsdMinor: 0n,
      expectedSeconds: 2,
      reliability: 100,
      privacy: 100,
      notes: [
        swapIntent
          ? 'treasury FX swap — debit source currency, credit destination via FX pool'
          : 'cross-currency internal conversion via signed liquidity quote',
      ],
    };
  }
}

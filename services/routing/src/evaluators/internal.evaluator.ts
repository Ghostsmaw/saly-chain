import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * Internal ledger transfer. Only available when both legs are SalyChain
 * accounts in the same currency. Zero cost, instant settlement.
 */
export class InternalLedgerEvaluator implements RailEvaluator {
  readonly rail = 'INTERNAL' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const sameCurrency = input.source.currency === input.destination.currency;
    const internalDestination = input.destination.type === 'LEDGER_ACCOUNT' || input.destination.type === 'WALLET';
    const internalSource = input.source.type === 'LEDGER_ACCOUNT' || input.source.type === 'WALLET';

    if (!sameCurrency || !internalDestination || !internalSource) {
      return {
        rail: 'INTERNAL',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 100,
        privacy: 100,
        notes: ['internal transfer requires both legs to be SalyChain accounts in the same currency'],
      };
    }

    return {
      rail: 'INTERNAL',
      available: true,
      expectedCostUsdMinor: 0n,
      expectedSeconds: 1,
      reliability: 100,
      privacy: 100,
      notes: ['atomic ledger journal entry, no chain fees'],
    };
  }
}

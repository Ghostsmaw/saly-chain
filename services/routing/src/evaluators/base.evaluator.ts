import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * Base (L2) USDC rail. Fixed-ish gas cost in USD-cents, ~2s block time but ~12s
 * to "soft" finality (2 confirmations). Reliable when both endpoints support USDC.
 */
export class BaseUsdcEvaluator implements RailEvaluator {
  readonly rail = 'BASE' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const supportsUsdc = input.source.currency === 'USDC' && input.destination.currency === 'USDC';
    const evmDestination =
      input.destination.type === 'EXTERNAL_ADDRESS' &&
      input.destination.chain?.toLowerCase().startsWith('base');

    if (!supportsUsdc || !evmDestination) {
      return {
        rail: 'BASE',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 95,
        privacy: 30,
        notes: ['Base USDC rail requires USDC on both sides and a base-* destination chain'],
      };
    }

    // Base gas cost for a USDC transfer hovers around $0.001–$0.05 depending on congestion.
    // Use a conservative $0.05 = 5 USD-cents.
    return {
      rail: 'BASE',
      available: true,
      expectedCostUsdMinor: 5n,
      expectedSeconds: 12,
      reliability: 95,
      privacy: 30,
      notes: ['Base USDC transfer with ~2 confirmation finality'],
    };
  }
}

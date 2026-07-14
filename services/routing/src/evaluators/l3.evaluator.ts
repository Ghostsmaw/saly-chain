import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * Saly L3 USDC rail — dedicated OP-Stack blockspace, settles to Base.
 * Lower marginal cost than Base L2 for high-volume SalyChain intents.
 */
export class L3UsdcEvaluator implements RailEvaluator {
  readonly rail = 'L3' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const supportsUsdc = input.source.currency === 'USDC' && input.destination.currency === 'USDC';
    const l3Destination =
      input.destination.type === 'EXTERNAL_ADDRESS' &&
      (input.destination.chain?.toUpperCase() === 'SALY_L3' ||
        input.destination.chain?.toLowerCase().startsWith('saly-'));

    if (!supportsUsdc || !l3Destination) {
      return {
        rail: 'L3',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 90,
        privacy: 35,
        notes: ['L3 USDC rail requires USDC on both sides and saly-* / SALY_L3 destination'],
      };
    }

    return {
      rail: 'L3',
      available: true,
      expectedCostUsdMinor: 2n,
      expectedSeconds: 8,
      reliability: 90,
      privacy: 35,
      notes: ['Saly L3 USDC transfer — dedicated sequencer blockspace'],
    };
  }
}

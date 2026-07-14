import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * On-chain escrow rail (ADR-0014). Selected when the intent carries an
 * escrow release condition and the destination is a Base USDC address.
 */
export class EscrowEvaluator implements RailEvaluator {
  readonly rail = 'ESCROW' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    if (!input.escrowCondition) {
      return unavailable('Intent has no escrow_condition');
    }

    const supportsUsdc = input.source.currency === 'USDC' && input.destination.currency === 'USDC';
    const evmDestination =
      input.destination.type === 'EXTERNAL_ADDRESS' &&
      input.destination.chain?.toLowerCase().startsWith('base');

    if (!supportsUsdc || !evmDestination) {
      return unavailable('Escrow requires USDC on Base with an external base destination');
    }

    return {
      rail: 'ESCROW',
      available: true,
      expectedCostUsdMinor: 12n,
      expectedSeconds: 20,
      reliability: 92,
      privacy: 35,
      notes: [
        `Escrow condition: ${input.escrowCondition.type}`,
        'Funds held in SalyEscrow until resolver release or deadline refund',
      ],
    };
  }
}

function unavailable(reason: string): RailEvaluation {
  return {
    rail: 'ESCROW',
    available: false,
    expectedCostUsdMinor: 0n,
    expectedSeconds: 0,
    reliability: 90,
    privacy: 35,
    notes: [reason],
  };
}

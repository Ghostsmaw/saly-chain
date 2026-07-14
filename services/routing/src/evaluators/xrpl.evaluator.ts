import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * XRPL native rail. ~3-4s ledger close → sub-second perceived finality.
 * Supports native XRP and issued-currency (IOU) payouts when destination is XRPL.
 */
export class XrplEvaluator implements RailEvaluator {
  readonly rail = 'XRPL' as const;

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const xrplDestination =
      input.destination.type === 'EXTERNAL_ADDRESS' &&
      input.destination.chain?.toLowerCase().startsWith('xrpl');

    const nativeXrp =
      input.source.currency === 'XRP' && input.destination.currency === 'XRP';
    const iouPayout =
      input.source.currency === input.destination.currency &&
      input.source.currency !== 'XRP' &&
      /^[A-Z]{3}$/.test(input.source.currency);

    if ((!nativeXrp && !iouPayout) || !xrplDestination) {
      return {
        rail: 'XRPL',
        available: false,
        expectedCostUsdMinor: 0n,
        expectedSeconds: 0,
        reliability: 99,
        privacy: 35,
        notes: ['XRPL rail requires matching currency (XRP or IOU) and an xrpl-* destination chain'],
      };
    }

    return {
      rail: 'XRPL',
      available: true,
      expectedCostUsdMinor: 1n,
      expectedSeconds: 4,
      reliability: 99,
      privacy: 35,
      notes: [
        nativeXrp
          ? 'XRPL native Payment with ~4s validated-ledger finality'
          : `XRPL IOU Payment (${input.source.currency}) via gateway issuer + trust line`,
      ],
    };
  }
}

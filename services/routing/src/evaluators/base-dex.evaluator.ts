import type { BaseNetwork } from '@salychain/chain-base';
import { isDexPairSupported } from '@salychain/chain-base';
import type { RailEvaluation, RailEvaluator, RoutingInput } from './rail.evaluator.js';

/**
 * On-chain DEX swap via Uniswap V3 on Base (custodial wallet executes swap).
 * Competes with ledger SWAP when swap_execution=onchain.
 */
export class BaseDexSwapEvaluator implements RailEvaluator {
  readonly rail = 'BASE' as const;

  constructor(private readonly network: BaseNetwork = 'base-sepolia') {}

  async evaluate(input: RoutingInput): Promise<RailEvaluation> {
    const onchain = input.swapExecution === 'onchain';
    const swapIntent = input.intentKind === 'SWAP';

    if (!onchain || !swapIntent) {
      return unavailable('on-chain DEX requires SWAP intent with swap_execution=onchain');
    }

    const from = input.source.currency.toUpperCase();
    const to = input.destination.currency.toUpperCase();

    if (!isDexPairSupported(this.network, from, to)) {
      return unavailable(`DEX pair ${from}/${to} not supported on ${this.network}`);
    }

    if (input.source.type !== 'WALLET' && input.source.type !== 'LEDGER_ACCOUNT') {
      return unavailable('DEX swap requires a custodial BASE wallet source');
    }

    return {
      rail: 'BASE',
      available: true,
      expectedCostUsdMinor: 50n,
      expectedSeconds: 45,
      reliability: 92,
      privacy: 70,
      notes: [
        'Uniswap V3 exactInputSingle on Base — custodial wallet signs approve + swap',
        `pair ${from}→${to} (${this.network})`,
      ],
    };
  }
}

function unavailable(note: string): RailEvaluation {
  return {
    rail: 'BASE',
    available: false,
    expectedCostUsdMinor: 0n,
    expectedSeconds: 0,
    reliability: 0,
    privacy: 0,
    notes: [note],
  };
}

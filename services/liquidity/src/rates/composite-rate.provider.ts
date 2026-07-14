import { NotFoundError } from '@salychain/errors';
import type { RateProvider, RateQuote } from './rate.provider.js';

/**
 * Tries providers in order until one returns a rate.
 * Useful for resilient FX: Coinbase for broad coverage, Frankfurter for ECB majors.
 */
export class CompositeRateProvider implements RateProvider {
  readonly name: string;

  constructor(
    private readonly providers: RateProvider[],
    name = 'composite',
  ) {
    if (providers.length === 0) throw new Error('CompositeRateProvider requires at least one provider');
    this.name = name;
  }

  async getMidRate(base: string, quote: string): Promise<RateQuote> {
    const errors: string[] = [];
    for (const p of this.providers) {
      try {
        const quoteResult = await p.getMidRate(base, quote);
        return { ...quoteResult, provider: `${this.name}:${quoteResult.provider}` };
      } catch (err) {
        errors.push(`${p.name}: ${(err as Error).message}`);
      }
    }
    throw NotFoundError(
      'liquidity.pair_unsupported',
      `No provider could quote ${base}/${quote} (${errors.join('; ')})`,
    );
  }
}

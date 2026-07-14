import type { SanctionsProvider, ScreeningResult, ScreeningTarget } from './screening.provider.js';

/**
 * Runs multiple vendor providers and merges their results.
 * Strictest-wins aggregation happens upstream in ScreeningService.
 */
export class CompositeSanctionsProvider implements SanctionsProvider {
  readonly name: string;

  constructor(
    private readonly providers: SanctionsProvider[],
    name = 'composite',
  ) {
    if (providers.length === 0) throw new Error('CompositeSanctionsProvider requires at least one provider');
    this.name = name;
  }

  async screen(target: ScreeningTarget): Promise<ScreeningResult[]> {
    const settled = await Promise.allSettled(this.providers.map((p) => p.screen(target)));
    const merged: ScreeningResult[] = [];

    for (const res of settled) {
      if (res.status === 'fulfilled') {
        merged.push(...res.value);
      }
    }

    if (merged.length === 0) {
      merged.push({
        category: 'SANCTIONS',
        decision: 'ALLOW',
        score: 0,
        provider: this.name,
        matchedListIds: [],
      });
    }

    return merged;
  }

  /** Exposed for admin provider status dashboard. */
  configuredProviders(): string[] {
    return this.providers.map((p) => p.name);
  }
}

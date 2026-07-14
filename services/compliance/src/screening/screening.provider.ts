import type { ScreeningCategory, ScreeningDecision } from '../generated/prisma/index.js';

export interface ScreeningTarget {
  /** A subject id when known, otherwise free-form (e.g. raw chain address). */
  identifier: string;
  /** Subject hint for richer matching. */
  displayName?: string;
  countryCode?: string;
  /** Chain + address pair for on-chain screening providers. */
  chainAddress?: { chain: string; address: string };
}

export interface ScreeningResult {
  category: ScreeningCategory;
  decision: ScreeningDecision;
  score: number;
  provider: string;
  matchedListIds: string[];
  details?: Record<string, unknown>;
}

/**
 * Abstraction for the compliance vendor. Providers MUST be deterministic for
 * the same input within a single screening window, so caching is safe and
 * audit replays produce identical results.
 */
export interface SanctionsProvider {
  readonly name: string;
  screen(target: ScreeningTarget): Promise<ScreeningResult[]>;
}

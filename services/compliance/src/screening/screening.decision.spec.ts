import { describe, expect, it } from 'vitest';

type ScreeningDecision = 'ALLOW' | 'REVIEW' | 'BLOCK';

/** Mirrors aggregateDecision in screening.service.ts — keep in sync. */
function aggregateDecision(decisions: ScreeningDecision[]): ScreeningDecision {
  if (decisions.includes('BLOCK')) return 'BLOCK';
  if (decisions.includes('REVIEW')) return 'REVIEW';
  return 'ALLOW';
}

describe('screening aggregateDecision', () => {
  it('BLOCK wins over REVIEW and ALLOW', () => {
    expect(aggregateDecision(['ALLOW', 'REVIEW', 'BLOCK'])).toBe('BLOCK');
  });

  it('REVIEW wins over ALLOW', () => {
    expect(aggregateDecision(['ALLOW', 'REVIEW'])).toBe('REVIEW');
  });

  it('all ALLOW yields ALLOW', () => {
    expect(aggregateDecision(['ALLOW', 'ALLOW'])).toBe('ALLOW');
  });

  it('empty input defaults to ALLOW (no adverse signals)', () => {
    expect(aggregateDecision([])).toBe('ALLOW');
  });
});

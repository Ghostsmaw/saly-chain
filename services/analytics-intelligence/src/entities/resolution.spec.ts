import { describe, expect, it } from 'vitest';
import { resolveEntities, type AddressNode } from './resolution.js';
import { deriveEntityRisk } from './labeling.js';

function clusterOf(clusters: { addresses: string[] }[], addr: string): string[] {
  return clusters.find((c) => c.addresses.includes(addr))?.addresses ?? [];
}

describe('resolveEntities', () => {
  it('links two addresses that share >= minShared distinct counterparties', () => {
    const nodes: AddressNode[] = [
      { address: 'A', counterparties: ['x', 'y', 'z'] },
      { address: 'B', counterparties: ['x', 'y'] },
      { address: 'C', counterparties: ['q'] },
    ];
    const { clusters } = resolveEntities(nodes, { minShared: 2 });
    expect(clusterOf(clusters, 'A')).toEqual(['A', 'B']);
    expect(clusterOf(clusters, 'C')).toEqual(['C']);
  });

  it('does not link when shared counterparties are below the threshold', () => {
    const nodes: AddressNode[] = [
      { address: 'A', counterparties: ['x', 'y'] },
      { address: 'B', counterparties: ['x', 'q'] },
    ];
    const { clusters, links } = resolveEntities(nodes, { minShared: 2 });
    expect(links).toBe(0);
    expect(clusterOf(clusters, 'A')).toEqual(['A']);
    expect(clusterOf(clusters, 'B')).toEqual(['B']);
  });

  it('suppresses hub counterparties (used by too many addresses)', () => {
    // "hub" is shared by A, B, C, D; with maxCounterpartyDegree=3 it is ignored.
    const nodes: AddressNode[] = [
      { address: 'A', counterparties: ['hub', 'p'] },
      { address: 'B', counterparties: ['hub', 'p'] },
      { address: 'C', counterparties: ['hub'] },
      { address: 'D', counterparties: ['hub'] },
    ];
    const { clusters } = resolveEntities(nodes, { minShared: 1, maxCounterpartyDegree: 3 });
    // 'p' (shared only by A,B) still links A&B; 'hub' is ignored.
    expect(clusterOf(clusters, 'A')).toEqual(['A', 'B']);
    expect(clusterOf(clusters, 'C')).toEqual(['C']);
    expect(clusterOf(clusters, 'D')).toEqual(['D']);
  });

  it('forms transitive clusters (A-B, B-C ⇒ {A,B,C})', () => {
    const nodes: AddressNode[] = [
      { address: 'A', counterparties: ['m', 'n'] },
      { address: 'B', counterparties: ['m', 'n', 'o', 'p'] },
      { address: 'C', counterparties: ['o', 'p'] },
    ];
    const { clusters } = resolveEntities(nodes, { minShared: 2 });
    expect(clusterOf(clusters, 'A')).toEqual(['A', 'B', 'C']);
  });

  it('is deterministic and sorts members + clusters', () => {
    const nodes: AddressNode[] = [
      { address: 'zeta', counterparties: ['s', 't'] },
      { address: 'alpha', counterparties: ['s', 't'] },
    ];
    const a = resolveEntities(nodes, { minShared: 2 });
    const b = resolveEntities([...nodes].reverse(), { minShared: 2 });
    expect(a.clusters).toEqual(b.clusters);
    expect(a.clusters[0]!.addresses).toEqual(['alpha', 'zeta']);
  });

  it('ignores self-referencing counterparties', () => {
    const nodes: AddressNode[] = [
      { address: 'A', counterparties: ['A', 'x', 'y'] },
      { address: 'B', counterparties: ['x', 'y'] },
    ];
    const { clusters } = resolveEntities(nodes, { minShared: 2 });
    expect(clusterOf(clusters, 'A')).toEqual(['A', 'B']);
  });
});

describe('deriveEntityRisk', () => {
  it('returns neutral risk for unlabeled clusters', () => {
    expect(deriveEntityRisk([{}, {}])).toEqual({
      riskScore: 0,
      sanctioned: false,
      label: null,
      category: null,
    });
  });

  it('flags sanctioned and scores 100 when any member is sanctioned', () => {
    const r = deriveEntityRisk([
      { label: 'Acme', category: 'exchange' },
      { label: 'OFAC SDN', category: 'sanctioned' },
    ]);
    expect(r.sanctioned).toBe(true);
    expect(r.riskScore).toBe(100);
    expect(r.label).toBe('OFAC SDN');
    expect(r.category).toBe('sanctioned');
  });

  it('takes the highest-risk member label as the entity label', () => {
    const r = deriveEntityRisk([
      { label: 'Coinbase', category: 'exchange' },
      { label: 'TornadoCash', category: 'mixer' },
    ]);
    expect(r.category).toBe('mixer');
    expect(r.riskScore).toBe(90);
    expect(r.sanctioned).toBe(false);
  });

  it('uses a default score for unknown categories', () => {
    const r = deriveEntityRisk([{ label: 'Mystery', category: 'weird-new-thing' }]);
    expect(r.riskScore).toBe(40);
  });

  it('scores known low-risk service categories modestly', () => {
    expect(deriveEntityRisk([{ category: 'exchange' }]).riskScore).toBe(30);
    expect(deriveEntityRisk([{ category: 'system' }]).riskScore).toBe(5);
  });
});

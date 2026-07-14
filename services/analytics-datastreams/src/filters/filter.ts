import { z } from 'zod';
import type { Subject } from '@salychain/events';
import { extractEventFacets, type EventFacets } from './facets.js';

/**
 * StreamFilter — the declarative predicate a partner attaches to a stream.
 *
 * All clauses are AND-ed together; within a clause the values are OR-ed. An
 * empty filter (`{}`) matches every event the service consumes — callers are
 * expected to scope at least `subjects` for anything but a firehose.
 *
 * Matching semantics:
 *   - subjects:   event subject matches one of the patterns (supports trailing
 *                 `*` single-token and `>` multi-token NATS wildcards)
 *   - chains:     facet.chain ∈ set (case-insensitive)
 *   - rails:      facet.rail ∈ set (case-insensitive)
 *   - assets:     facet.asset ∈ set (case-insensitive)
 *   - addresses:  at least one of facet.addresses ∈ set (case-insensitive),
 *                 optionally constrained by `direction`
 *   - minAmountMinor / maxAmountMinor: inclusive bounds on facet.amountMinor.
 *                 Events without an amount facet are EXCLUDED when an amount
 *                 bound is set (fail-closed: a "≥ $1000" stream must not leak
 *                 amount-less events).
 *   - kinds:      facet.kind ∈ set
 *   - agentIds:   facet.agentId ∈ set
 */
export const streamFilterSchema = z
  .object({
    subjects: z.array(z.string().min(1)).max(64).optional(),
    chains: z.array(z.string().min(1)).max(32).optional(),
    rails: z.array(z.string().min(1)).max(32).optional(),
    assets: z.array(z.string().min(1)).max(64).optional(),
    addresses: z.array(z.string().min(1)).max(256).optional(),
    direction: z.enum(['from', 'to', 'either']).optional(),
    minAmountMinor: z
      .string()
      .regex(/^\d+$/, 'minAmountMinor must be a non-negative integer string')
      .optional(),
    maxAmountMinor: z
      .string()
      .regex(/^\d+$/, 'maxAmountMinor must be a non-negative integer string')
      .optional(),
    kinds: z.array(z.string().min(1)).max(64).optional(),
    agentIds: z.array(z.string().min(1)).max(256).optional(),
  })
  .strict()
  .refine(
    (f) =>
      f.minAmountMinor === undefined ||
      f.maxAmountMinor === undefined ||
      BigInt(f.minAmountMinor) <= BigInt(f.maxAmountMinor),
    { message: 'minAmountMinor must be <= maxAmountMinor', path: ['minAmountMinor'] },
  )
  .refine((f) => f.direction === undefined || (f.addresses?.length ?? 0) > 0, {
    message: 'direction requires at least one address',
    path: ['direction'],
  });

export type StreamFilter = z.infer<typeof streamFilterSchema>;

/** Lower-cased Set for O(1) case-insensitive membership. */
function lowerSet(xs?: string[]): Set<string> | undefined {
  if (!xs || xs.length === 0) return undefined;
  return new Set(xs.map((x) => x.toLowerCase()));
}

/**
 * Match a single NATS subject against a pattern. Supports the same `*` (one
 * token) and `>` (greedy tail) wildcards as NATS itself, so `salychain.tx.*`
 * and `salychain.chain.>` behave exactly as a subscriber would expect.
 */
export function subjectMatches(pattern: string, subject: string): boolean {
  if (pattern === subject) return true;
  const p = pattern.split('.');
  const s = subject.split('.');
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '>') return true;
    if (s[i] === undefined) return false;
    if (p[i] === '*') continue;
    if (p[i] !== s[i]) return false;
  }
  return p.length === s.length;
}

/**
 * Pre-compiled filter: parses the value sets once so the hot path (one call per
 * event per active stream) avoids re-lowercasing arrays and re-parsing bigints.
 */
export class CompiledFilter {
  private readonly subjects?: string[];
  private readonly chains?: Set<string>;
  private readonly rails?: Set<string>;
  private readonly assets?: Set<string>;
  private readonly addresses?: Set<string>;
  private readonly direction: 'from' | 'to' | 'either';
  private readonly min?: bigint;
  private readonly max?: bigint;
  private readonly kinds?: Set<string>;
  private readonly agentIds?: Set<string>;

  constructor(filter: StreamFilter) {
    this.subjects = filter.subjects && filter.subjects.length > 0 ? filter.subjects : undefined;
    this.chains = lowerSet(filter.chains);
    this.rails = lowerSet(filter.rails);
    this.assets = lowerSet(filter.assets);
    this.addresses = lowerSet(filter.addresses);
    this.direction = filter.direction ?? 'either';
    this.min = filter.minAmountMinor !== undefined ? BigInt(filter.minAmountMinor) : undefined;
    this.max = filter.maxAmountMinor !== undefined ? BigInt(filter.maxAmountMinor) : undefined;
    this.kinds = lowerSet(filter.kinds);
    this.agentIds = lowerSet(filter.agentIds);
  }

  /** True if the event (already-extracted facets) satisfies every clause. */
  matchesFacets(subject: Subject, facets: EventFacets): boolean {
    if (this.subjects && !this.subjects.some((p) => subjectMatches(p, subject))) return false;

    if (this.chains && !(facets.chain && this.chains.has(facets.chain.toLowerCase()))) return false;
    if (this.rails && !(facets.rail && this.rails.has(facets.rail.toLowerCase()))) return false;
    if (this.assets && !(facets.asset && this.assets.has(facets.asset.toLowerCase()))) return false;

    if (this.addresses && !this.addressMatches(subject, facets)) return false;

    if (this.min !== undefined || this.max !== undefined) {
      if (facets.amountMinor === undefined) return false; // fail-closed
      if (this.min !== undefined && facets.amountMinor < this.min) return false;
      if (this.max !== undefined && facets.amountMinor > this.max) return false;
    }

    if (this.kinds && !(facets.kind && this.kinds.has(facets.kind.toLowerCase()))) return false;
    if (this.agentIds && !(facets.agentId && this.agentIds.has(facets.agentId.toLowerCase())))
      return false;

    return true;
  }

  /** Convenience: extract facets then match. */
  matches(subject: Subject, event: unknown): boolean {
    return this.matchesFacets(subject, extractEventFacets(subject, event));
  }

  private addressMatches(_subject: Subject, facets: EventFacets): boolean {
    const set = this.addresses!;
    if (this.direction === 'either') {
      return facets.addresses.some((a) => set.has(a));
    }
    // Directional matching uses the normalized sender/recipient role facets. If
    // a role is absent for this event type the clause is unmatched (fail-closed).
    const role = this.direction === 'from' ? facets.fromAddress : facets.toAddress;
    return role !== undefined && set.has(role);
  }
}

/** Parse + validate an untrusted filter object, throwing zod errors upward. */
export function parseStreamFilter(input: unknown): StreamFilter {
  return streamFilterSchema.parse(input ?? {});
}

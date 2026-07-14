import type { RouteDecisionListItem } from '@/lib/api';

export type RouteCandidate = {
  rail: string;
  available: boolean;
  score: number;
  expected_cost_usd_minor?: string;
  expected_seconds?: number;
  reliability?: number;
  privacy?: number;
  notes?: string[];
};

export type RouteInputSnapshot = {
  amount_minor?: string;
  source?: { currency?: string; chain?: string };
  destination?: { currency?: string; chain?: string };
  risk_score?: number;
};

export type ParsedRouteDecision = RouteDecisionListItem & {
  parsedInput: RouteInputSnapshot;
  parsedCandidates: RouteCandidate[];
};

export function parseRouteDecision(d: RouteDecisionListItem): ParsedRouteDecision {
  return {
    ...d,
    parsedInput: (d.input ?? {}) as RouteInputSnapshot,
    parsedCandidates: ((d.candidates as RouteCandidate[] | null) ?? []).slice().sort((a, b) => b.score - a.score),
  };
}

export function formatRouteAmount(input: RouteInputSnapshot): string {
  const amount = input.amount_minor ?? '?';
  const currency = input.source?.currency ?? input.destination?.currency ?? '?';
  return `${amount} ${currency}`;
}

export function formatRouteCorridor(input: RouteInputSnapshot): string {
  const src = input.source?.currency ?? '?';
  const dst = input.destination?.currency ?? '?';
  const chain = input.destination?.chain;
  return chain ? `${src} → ${dst} (${chain})` : `${src} → ${dst}`;
}

export function railVariant(
  rail: string,
  selected?: string,
  available?: boolean,
): 'accent' | 'success' | 'neutral' | 'danger' | 'warning' {
  if (rail === selected) return 'accent';
  if (available === false) return 'danger';
  if (available === true) return 'neutral';
  return 'neutral';
}

export function computeRoutingStats(decisions: ParsedRouteDecision[]) {
  const byRail: Record<string, number> = {};
  let totalScore = 0;

  for (const d of decisions) {
    byRail[d.selected_rail] = (byRail[d.selected_rail] ?? 0) + 1;
    totalScore += d.selected_score;
  }

  const topRail =
    Object.entries(byRail).sort(([, a], [, b]) => b - a)[0]?.[0] ?? '—';
  const avgScore = decisions.length > 0 ? Math.round(totalScore / decisions.length) : 0;
  const railsUsed = Object.keys(byRail).length;

  const distribution = Object.entries(byRail)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value }));

  return { total: decisions.length, topRail, avgScore, railsUsed, distribution };
}

export const ROUTING_RAILS = ['All', 'INTERNAL', 'BASE', 'XRPL', 'L3', 'FIAT', 'ESCROW'] as const;
export type RoutingRailFilter = (typeof ROUTING_RAILS)[number];

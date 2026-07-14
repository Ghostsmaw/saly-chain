export type RiskDecision = 'ALLOW' | 'REVIEW' | 'BLOCK';

export function riskDecisionVariant(decision: string): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (decision) {
    case 'ALLOW':
      return 'success';
    case 'REVIEW':
      return 'warning';
    case 'BLOCK':
      return 'danger';
    default:
      return 'neutral';
  }
}

export function formatUsdMinor(minor: string): string {
  const n = Number(minor) / 100;
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export function truncateActorRef(ref: string): string {
  if (ref.length <= 20) return ref;
  return `${ref.slice(0, 10)}…${ref.slice(-6)}`;
}

export function velocityHeat(count: number): 'hot' | 'warm' | 'normal' {
  if (count >= 10) return 'hot';
  if (count >= 5) return 'warm';
  return 'normal';
}

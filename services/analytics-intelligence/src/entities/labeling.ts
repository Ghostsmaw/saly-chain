/**
 * Derives an entity's label/category and a 0..100 risk score from the labels of
 * its member addresses. Pure + deterministic.
 *
 * Category risk weights encode a simple, explainable policy: known illicit
 * categories dominate; service/exchange addresses are low-but-nonzero; unlabeled
 * is neutral. The dominant (highest-risk) member label wins the entity label so
 * a single sanctioned address taints the whole cluster (fail-safe).
 */
export interface MemberLabel {
  label?: string | null;
  category?: string | null;
}

export interface EntityRisk {
  riskScore: number;
  sanctioned: boolean;
  label: string | null;
  category: string | null;
}

const CATEGORY_RISK: Record<string, number> = {
  sanctioned: 100,
  ofac: 100,
  mixer: 90,
  tumbler: 90,
  darknet: 95,
  scam: 85,
  fraud: 85,
  exploit: 88,
  gambling: 55,
  exchange: 30,
  cex: 30,
  dex: 25,
  bridge: 35,
  contract: 15,
  system: 5,
};

const SANCTIONED_CATEGORIES = new Set(['sanctioned', 'ofac']);

export function deriveEntityRisk(members: MemberLabel[]): EntityRisk {
  let best: { score: number; label: string | null; category: string | null } = {
    score: 0,
    label: null,
    category: null,
  };
  let sanctioned = false;

  for (const m of members) {
    const category = (m.category ?? '').toLowerCase().trim();
    if (SANCTIONED_CATEGORIES.has(category)) sanctioned = true;
    const score = category ? (CATEGORY_RISK[category] ?? 40) : 0;
    if (score > best.score || (score === best.score && best.label === null && m.label)) {
      best = { score, label: m.label ?? null, category: m.category ?? null };
    }
  }

  return {
    riskScore: clip(best.score),
    sanctioned,
    label: best.label,
    category: best.category,
  };
}

function clip(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

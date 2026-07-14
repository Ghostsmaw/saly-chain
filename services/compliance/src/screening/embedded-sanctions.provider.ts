import type { SanctionsProvider, ScreeningResult, ScreeningTarget } from './screening.provider.js';

/**
 * Embedded sanctions provider for dev / test.
 *
 * Contains a tiny curated subset of well-known sanctioned actors and a list of
 * high-risk country codes. NOT a substitute for a real screening vendor —
 * production deploys MUST switch to Chainalysis / Refinitiv / Comply.
 *
 * The lists below are illustrative and deliberately conservative; they are
 * not the source of truth for any legal screening obligation.
 */

const HARDCODED_BLOCKED_ADDRESSES = new Set<string>([
  // Public OFAC SDN list samples (Tornado Cash deposit contracts, etc.). Kept
  // small here; the real provider should be authoritative.
  '0x8589427373D6D84E98730D7795D8f6f8731FDA16'.toLowerCase(),
  '0x722122dF12D4e14e13Ac3b6895a86e84145b6967'.toLowerCase(),
]);

const HARDCODED_BLOCKED_NAMES = [
  /vladimir putin/i,
  /alexander lukashenko/i,
  /kim jong-un/i,
  /bashar al-assad/i,
];

const HIGH_RISK_COUNTRIES = new Set(['IR', 'KP', 'SY', 'CU', 'AF', 'SD']);
const REVIEW_COUNTRIES = new Set(['MM', 'VE', 'YE', 'BY']);

export class EmbeddedSanctionsProvider implements SanctionsProvider {
  readonly name = 'embedded';

  async screen(target: ScreeningTarget): Promise<ScreeningResult[]> {
    const results: ScreeningResult[] = [];

    // 1) Address-based screening.
    if (target.chainAddress) {
      const addressLower = target.chainAddress.address.toLowerCase();
      if (HARDCODED_BLOCKED_ADDRESSES.has(addressLower)) {
        results.push({
          category: 'SANCTIONS',
          decision: 'BLOCK',
          score: 100,
          provider: this.name,
          matchedListIds: ['ofac-sdn-embedded'],
          details: { chain: target.chainAddress.chain, address: target.chainAddress.address },
        });
      }
    }

    // 2) Name-based screening (very rough — real providers use phonetic + fuzzy).
    if (target.displayName) {
      for (const pattern of HARDCODED_BLOCKED_NAMES) {
        if (pattern.test(target.displayName)) {
          results.push({
            category: 'SANCTIONS',
            decision: 'BLOCK',
            score: 100,
            provider: this.name,
            matchedListIds: ['ofac-sdn-embedded'],
            details: { matched_pattern: pattern.source },
          });
          break;
        }
      }
    }

    // 3) Country risk.
    if (target.countryCode) {
      const cc = target.countryCode.toUpperCase();
      if (HIGH_RISK_COUNTRIES.has(cc)) {
        results.push({
          category: 'COUNTRY_RISK',
          decision: 'BLOCK',
          score: 95,
          provider: this.name,
          matchedListIds: ['high-risk-jurisdictions'],
          details: { country_code: cc },
        });
      } else if (REVIEW_COUNTRIES.has(cc)) {
        results.push({
          category: 'COUNTRY_RISK',
          decision: 'REVIEW',
          score: 60,
          provider: this.name,
          matchedListIds: ['review-jurisdictions'],
          details: { country_code: cc },
        });
      }
    }

    // No hits = clean.
    if (results.length === 0) {
      results.push({
        category: 'SANCTIONS',
        decision: 'ALLOW',
        score: 0,
        provider: this.name,
        matchedListIds: [],
      });
    }
    return results;
  }
}

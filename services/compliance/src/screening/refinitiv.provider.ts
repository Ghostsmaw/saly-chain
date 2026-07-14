import { ExternalError } from '@salychain/errors';
import type { SanctionsProvider, ScreeningResult, ScreeningTarget } from './screening.provider.js';
import { ScreeningHttpClient } from './screening-http.client.js';

interface RefinitivTokenResponse {
  access_token: string;
  expires_in: number;
}

interface RefinitivScreeningResponse {
  caseId?: string;
  results?: Array<{
    resultId?: string;
    matchScore?: number;
    matchStrength?: string;
    categories?: string[];
    primaryName?: string;
    sources?: Array<{ name?: string; type?: string }>;
  }>;
}

/**
 * Refinitiv World-Check One — enterprise watchlist screening.
 * https://developers.lseg.com/en/api-catalog/world-check-one/
 */
export class RefinitivWorldCheckProvider implements SanctionsProvider {
  readonly name = 'refinitiv';
  private readonly http: ScreeningHttpClient;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly groupId: string;
  private readonly baseUrl: string;
  private token: { value: string; expiresAt: number } | null = null;

  constructor(opts: {
    apiKey: string;
    apiSecret: string;
    groupId: string;
    baseUrl?: string;
    timeoutMs?: number;
  }) {
    if (!opts.apiKey || !opts.apiSecret || !opts.groupId) {
      throw new Error('RefinitivWorldCheckProvider requires REFINITIV_API_KEY, SECRET, and GROUP_ID');
    }
    this.apiKey = opts.apiKey;
    this.apiSecret = opts.apiSecret;
    this.groupId = opts.groupId;
    this.baseUrl = (opts.baseUrl ?? 'https://api-worldcheck.refinitiv.com').replace(/\/$/, '');
    this.http = new ScreeningHttpClient({
      baseUrl: this.baseUrl,
      timeoutMs: opts.timeoutMs ?? 15_000,
    });
  }

  async screen(target: ScreeningTarget): Promise<ScreeningResult[]> {
    if (!target.displayName?.trim()) return [];

    const token = await this.ensureToken();
    const body = await this.http.request<RefinitivScreeningResponse>(
      '/v2/cases/screeningRequest',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          groupId: this.groupId,
          entityType: 'INDIVIDUAL',
          name: target.displayName.trim(),
          providerTypes: ['WATCHLIST'],
          ...(target.countryCode ? { country: target.countryCode.toUpperCase() } : {}),
        },
      },
    );

    const hits = body.results ?? [];
    if (hits.length === 0) return [];

    const results: ScreeningResult[] = [];
    for (const hit of hits) {
      const score = Math.round((hit.matchScore ?? 0.5) * 100);
      const categories = (hit.categories ?? []).map((c) => c.toLowerCase());
      const listIds = (hit.sources ?? []).map((s) => s.name ?? s.type ?? 'worldcheck').filter(Boolean);

      if (categories.some((c) => c.includes('sanction'))) {
        results.push({
          category: 'SANCTIONS',
          decision: score >= 85 || hit.matchStrength === 'EXACT' ? 'BLOCK' : 'REVIEW',
          score: Math.max(score, 75),
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['worldcheck-sanctions'],
          details: { primary_name: hit.primaryName, match_strength: hit.matchStrength },
        });
      } else if (categories.some((c) => c.includes('pep'))) {
        results.push({
          category: 'PEP',
          decision: 'REVIEW',
          score: Math.min(score, 80),
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['worldcheck-pep'],
          details: { primary_name: hit.primaryName },
        });
      } else if (score >= 70) {
        results.push({
          category: 'ADVERSE_MEDIA',
          decision: 'REVIEW',
          score,
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['worldcheck-watchlist'],
          details: { primary_name: hit.primaryName, categories: hit.categories },
        });
      }
    }

    return results;
  }

  private async ensureToken(): Promise<string> {
    if (this.token && this.token.expiresAt > Date.now() + 60_000) {
      return this.token.value;
    }

    const creds = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
    const url = `${this.baseUrl}/v2/oauth/token`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: 'grant_type=client_credentials',
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      throw ExternalError('compliance.refinitiv_error', `Refinitiv token HTTP ${res.status}`);
    }

    const tokenBody = (await res.json()) as RefinitivTokenResponse;
    if (!tokenBody.access_token) {
      throw ExternalError('compliance.refinitiv_error', 'Refinitiv token exchange failed');
    }

    this.token = {
      value: tokenBody.access_token,
      expiresAt: Date.now() + (tokenBody.expires_in ?? 3600) * 1000,
    };
    return this.token.value;
  }
}

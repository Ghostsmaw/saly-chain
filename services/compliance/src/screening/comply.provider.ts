import { ExternalError } from '@salychain/errors';
import type { SanctionsProvider, ScreeningResult, ScreeningTarget } from './screening.provider.js';
import { ScreeningHttpClient } from './screening-http.client.js';

interface ComplySearchHit {
  doc?: {
    id?: string;
    name?: string;
    types?: string[];
    sources?: string[];
  };
  score?: number;
}

interface ComplySearchResponse {
  status?: string;
  content?: {
    data?: {
      id?: number;
      ref?: string;
      match_status?: string;
      hits?: ComplySearchHit[];
    };
  };
}

/**
 * ComplyAdvantage Mesh — entity / name sanctions, PEP, and adverse media.
 * https://docs.complyadvantage.com/
 */
export class ComplyAdvantageProvider implements SanctionsProvider {
  readonly name = 'comply';
  private readonly http: ScreeningHttpClient;

  constructor(apiKey: string, baseUrl = 'https://api.complyadvantage.com', timeoutMs = 15_000) {
    if (!apiKey) throw new Error('ComplyAdvantageProvider requires COMPLYADVANTAGE_API_KEY');
    this.http = new ScreeningHttpClient({
      baseUrl,
      defaultHeaders: { Authorization: `Token token=${apiKey}` },
      timeoutMs,
    });
  }

  async screen(target: ScreeningTarget): Promise<ScreeningResult[]> {
    if (!target.displayName?.trim()) return [];

    const body = await this.http.request<ComplySearchResponse>('/searches', {
      method: 'POST',
      body: {
        search_term: target.displayName.trim(),
        client_ref: target.identifier,
        fuzziness: 0.6,
        filters: {
          types: ['sanction', 'pep', 'adverse-media'],
          ...(target.countryCode ? { country_codes: [target.countryCode.toUpperCase()] } : {}),
        },
      },
    });

    if (body.status && body.status !== 'success') {
      throw ExternalError('compliance.comply_error', 'ComplyAdvantage search rejected');
    }

    const data = body.content?.data;
    if (!data) return [];

    const hits = data.hits ?? [];
    if (hits.length === 0 || data.match_status === 'no_match') return [];

    const results: ScreeningResult[] = [];

    for (const hit of hits) {
      const types = (hit.doc?.types ?? []).map((t) => t.toLowerCase());
      const scorePct = Math.round((hit.score ?? 0.5) * 100);
      const listIds = [hit.doc?.id, ...(hit.doc?.sources ?? [])].filter(Boolean) as string[];

      if (types.includes('sanction')) {
        results.push({
          category: 'SANCTIONS',
          decision: scorePct >= 85 ? 'BLOCK' : 'REVIEW',
          score: Math.max(scorePct, 70),
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['comply-sanctions'],
          details: { name: hit.doc?.name, match_status: data.match_status, types },
        });
      }
      if (types.includes('pep')) {
        results.push({
          category: 'PEP',
          decision: scorePct >= 90 ? 'BLOCK' : 'REVIEW',
          score: Math.min(scorePct, 85),
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['comply-pep'],
          details: { name: hit.doc?.name, match_status: data.match_status },
        });
      }
      if (types.includes('adverse-media')) {
        results.push({
          category: 'ADVERSE_MEDIA',
          decision: 'REVIEW',
          score: Math.min(scorePct, 70),
          provider: this.name,
          matchedListIds: listIds.length ? listIds : ['comply-adverse-media'],
          details: { name: hit.doc?.name },
        });
      }
    }

    if (results.length === 0 && data.match_status === 'potential_match') {
      results.push({
        category: 'SANCTIONS',
        decision: 'REVIEW',
        score: 65,
        provider: this.name,
        matchedListIds: [String(data.id ?? 'comply-potential')],
        details: { match_status: data.match_status, ref: data.ref },
      });
    }

    return results;
  }
}

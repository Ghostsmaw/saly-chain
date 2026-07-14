import { ExternalError } from '@salychain/errors';
import type { SanctionsProvider, ScreeningResult, ScreeningTarget } from './screening.provider.js';
import { ScreeningHttpClient } from './screening-http.client.js';

interface ChainalysisAddressResponse {
  identifications?: Array<{
    category?: string;
    name?: string;
    description?: string;
    url?: string;
  }>;
}

interface ChainalysisRiskEntity {
  risk?: string;
  cluster?: { name?: string; category?: string };
  exposures?: Array<{ category?: string; value?: number }>;
}

/**
 * Chainalysis address / entity screening.
 * Uses the institutional Risk API when configured; falls back to the public
 * sanctions identification endpoint for dev stacks without a contract.
 *
 * https://docs.chainalysis.com/
 */
export class ChainalysisSanctionsProvider implements SanctionsProvider {
  readonly name = 'chainalysis';
  private readonly http: ScreeningHttpClient;
  private readonly usePublicApi: boolean;

  constructor(
    apiKey: string,
    baseUrl = 'https://api.chainalysis.com',
    timeoutMs = 15_000,
  ) {
    if (!apiKey) throw new Error('ChainalysisSanctionsProvider requires CHAINALYSIS_API_KEY');
    this.usePublicApi = baseUrl.includes('public.chainalysis.com');
    this.http = new ScreeningHttpClient({
      baseUrl,
      defaultHeaders: { Token: apiKey },
      timeoutMs,
    });
  }

  async screen(target: ScreeningTarget): Promise<ScreeningResult[]> {
    if (!target.chainAddress) return [];

    const address = target.chainAddress.address;
    const chain = target.chainAddress.chain.toUpperCase();

    if (this.usePublicApi) {
      return this.screenPublicAddress(address, chain);
    }
    return this.screenRiskEntity(address, chain);
  }

  private async screenPublicAddress(address: string, chain: string): Promise<ScreeningResult[]> {
    const body = await this.http.request<ChainalysisAddressResponse>(
      `/api/v1/address/${encodeURIComponent(address)}`,
    );
    const sanctions = (body.identifications ?? []).filter(
      (i) => i.category?.toLowerCase() === 'sanctions' || i.name?.toLowerCase().includes('sanction'),
    );
    if (sanctions.length === 0) return [];

    return [
      {
        category: 'SANCTIONS',
        decision: 'BLOCK',
        score: 100,
        provider: this.name,
        matchedListIds: sanctions.map((s) => s.name ?? 'chainalysis-sanctions').filter(Boolean),
        details: { chain, address, identifications: sanctions },
      },
    ];
  }

  private async screenRiskEntity(address: string, chain: string): Promise<ScreeningResult[]> {
    const path = `/api/risk/v2/entities/${encodeURIComponent(address)}`;
    let entity: ChainalysisRiskEntity;
    try {
      entity = await this.http.request<ChainalysisRiskEntity>(path);
    } catch (err) {
      throw ExternalError(
        'compliance.chainalysis_error',
        `Chainalysis screening failed for ${address}: ${(err as Error).message}`,
      );
    }

    const risk = entity.risk?.toLowerCase() ?? '';
    const exposureHit = (entity.exposures ?? []).some(
      (e) => e.category?.toLowerCase().includes('sanction') || (e.value ?? 0) >= 0.25,
    );
    const clusterSanctioned =
      entity.cluster?.category?.toLowerCase().includes('sanction') ?? false;

    if (risk === 'severe' || clusterSanctioned) {
      return [
        {
          category: 'SANCTIONS',
          decision: 'BLOCK',
          score: 100,
          provider: this.name,
          matchedListIds: [entity.cluster?.name ?? 'chainalysis-severe'],
          details: { chain, address, risk: entity.risk, cluster: entity.cluster },
        },
      ];
    }

    if (risk === 'high' || exposureHit) {
      return [
        {
          category: 'ADDRESS_RISK',
          decision: 'REVIEW',
          score: 75,
          provider: this.name,
          matchedListIds: ['chainalysis-high-risk'],
          details: { chain, address, risk: entity.risk, exposures: entity.exposures },
        },
      ];
    }

    if (risk === 'medium') {
      return [
        {
          category: 'ADDRESS_RISK',
          decision: 'REVIEW',
          score: 55,
          provider: this.name,
          matchedListIds: ['chainalysis-medium-risk'],
          details: { chain, address, risk: entity.risk },
        },
      ];
    }

    return [];
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { intelligenceFeatureLookupsTotal } from '@salychain/observability';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';
import { EntitiesService } from '../entities/entities.service.js';
import { INTELLIGENCE_ENV, type IntelligenceEnv } from '../config/env.js';
import { computeAddressFeatures, type AddressFeatures, type TransferRow } from './features.js';

export interface AddressFeatureResponse extends AddressFeatures {
  entity: {
    id: string;
    label: string | null;
    category: string | null;
    risk_score: number;
    sanctioned: boolean;
    address_count: number;
  } | null;
  /**
   * The single risk signal services/risk consumes: max(entity risk, a derived
   * behavioural risk from the features). Always present (0 when unknown).
   */
  entity_risk_score: number;
  sanctioned: boolean;
}

@Injectable()
export class FeaturesService {
  constructor(
    private readonly clickhouse: ClickHouseReadService,
    private readonly entities: EntitiesService,
    @Inject(INTELLIGENCE_ENV) private readonly env: IntelligenceEnv,
  ) {}

  async getAddressFeatures(
    chain: string,
    address: string,
    asOf?: Date,
  ): Promise<AddressFeatureResponse> {
    const cutoff = asOf ?? new Date();
    const transfers = await this.loadTransfers(chain, address, cutoff);
    const features = computeAddressFeatures(transfers, address, chain, cutoff);

    const entity = await this.entities.entityForAddress(chain, address);
    const entityRisk = entity?.riskScore ?? 0;
    const behaviouralRisk = this.behaviouralRisk(features);
    const sanctioned = entity?.sanctioned ?? false;

    intelligenceFeatureLookupsTotal.inc();

    return {
      ...features,
      entity: entity
        ? {
            id: entity.id,
            label: entity.label,
            category: entity.category,
            risk_score: entity.riskScore,
            sanctioned: entity.sanctioned,
            address_count: entity.addressCount,
          }
        : null,
      entity_risk_score: Math.max(entityRisk, behaviouralRisk),
      sanctioned,
    };
  }

  /**
   * A small, explainable behavioural-risk heuristic derived purely from the
   * point-in-time features. It is intentionally conservative; the trained model
   * lands in Milestone F. New + high-velocity addresses score higher.
   */
  private behaviouralRisk(f: AddressFeatures): number {
    let score = 0;
    if (f.transfers_total === 0) return 0;
    if (f.age_days <= 1)
      score += 35; // brand-new address
    else if (f.age_days <= 7) score += 20;
    if (f.distinct_counterparties >= 50)
      score += 25; // fan-out / distribution
    else if (f.distinct_counterparties >= 20) score += 12;
    if (f.transfers_total >= 1000) score += 15; // very high activity
    return Math.max(0, Math.min(100, score));
  }

  private async loadTransfers(chain: string, address: string, asOf: Date): Promise<TransferRow[]> {
    const sql = `
      SELECT formatDateTime(ts, '%FT%TZ', 'UTC') AS ts,
             chain_id,
             from_address,
             to_address,
             amount_raw,
             token_symbol
      FROM token_transfers FINAL
      WHERE chain_id = {chain:String}
        AND (from_address = {addr:String} OR to_address = {addr:String})
        AND ts <= parseDateTimeBestEffort({asOf:String})
      LIMIT {cap:UInt32}`;
    return this.clickhouse.query<TransferRow>(sql, {
      chain,
      addr: address.toLowerCase(),
      asOf: asOf.toISOString(),
      cap: this.env.QUERY_MAX_ROWS,
    });
  }
}

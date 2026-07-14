import { Inject, Injectable, Logger } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { ulid } from 'ulid';
import {
  intelligenceResolutionRunsTotal,
  intelligenceEntitiesTotal,
} from '@salychain/observability';
import { NotFoundError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';
import { INTELLIGENCE_ENV, type IntelligenceEnv } from '../config/env.js';
import { resolveEntities, type AddressNode } from './resolution.js';
import { deriveEntityRisk, type MemberLabel } from './labeling.js';

interface ActivityRow {
  chain: string;
  addr: string;
  cps: string[];
  events: string | number;
}
interface LabelRow {
  chain: string;
  address: string;
  label: string | null;
  category: string | null;
}

@Injectable()
export class EntitiesService {
  private readonly logger = new Logger(EntitiesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly clickhouse: ClickHouseReadService,
    @Inject(INTELLIGENCE_ENV) private readonly env: IntelligenceEnv,
  ) {}

  /**
   * Runs a full entity-resolution pass. Loads address↔counterparty activity from
   * ClickHouse, clusters it (per chain) with the common-counterparty heuristic,
   * labels/scores clusters from known address labels, and re-materializes the
   * `entities` table for the processed chains.
   */
  async runResolution(
    trigger: 'MANUAL' | 'SCHEDULE',
    chain?: string,
  ): Promise<{
    runId: string;
    status: string;
    addressCount: number;
    entityCount: number;
    linkCount: number;
  }> {
    const run = await this.prisma.resolutionRun.create({
      data: {
        id: `res_${ulid()}`,
        status: 'RUNNING',
        trigger,
        chain: chain ?? null,
        lookbackDays: this.env.RESOLUTION_LOOKBACK_DAYS,
        startedAt: new Date(),
      },
    });
    const started = Date.now();

    try {
      const activity = await this.loadActivity(chain);
      const labels = await this.loadLabels(chain);

      // Group activity by chain (clusters are per-chain).
      const byChain = new Map<string, ActivityRow[]>();
      for (const row of activity) {
        const list = byChain.get(row.chain) ?? [];
        list.push(row);
        byChain.set(row.chain, list);
      }

      let totalEntities = 0;
      let totalLinks = 0;
      let totalAddresses = 0;
      const processedChains: string[] = [];

      for (const [chainId, rows] of byChain) {
        processedChains.push(chainId);
        totalAddresses += rows.length;
        const nodes: AddressNode[] = rows.map((r) => ({
          address: r.addr,
          counterparties: r.cps ?? [],
          transferEvents: Number(r.events) || 0,
        }));
        const eventsByAddr = new Map(nodes.map((n) => [n.address, n.transferEvents ?? 0]));

        const { clusters, links } = resolveEntities(nodes, {
          minShared: this.env.RESOLUTION_MIN_SHARED,
        });
        totalLinks += links;

        const persistable = clusters.filter((c) => {
          if (c.addresses.length >= 2) return true;
          // keep singletons only if they carry a known label (worth surfacing)
          const only = c.addresses[0]!;
          return labels.has(`${chainId}:${only}`);
        });

        await this.persistChainEntities(chainId, persistable, labels, eventsByAddr);
        totalEntities += persistable.length;
      }

      const durationMs = Date.now() - started;
      await this.prisma.resolutionRun.update({
        where: { id: run.id },
        data: {
          status: 'SUCCEEDED',
          addressCount: totalAddresses,
          entityCount: totalEntities,
          linkCount: totalLinks,
          durationMs,
          finishedAt: new Date(),
        },
      });

      intelligenceResolutionRunsTotal.inc({ outcome: 'succeeded' });
      const active = await this.prisma.entity.count({ where: { status: 'ACTIVE' } });
      intelligenceEntitiesTotal.set(active);

      this.logger.log(
        `resolution ${run.id} ok: chains=${processedChains.length} addresses=${totalAddresses} entities=${totalEntities} links=${totalLinks} in ${durationMs}ms`,
      );
      return {
        runId: run.id,
        status: 'SUCCEEDED',
        addressCount: totalAddresses,
        entityCount: totalEntities,
        linkCount: totalLinks,
      };
    } catch (err) {
      intelligenceResolutionRunsTotal.inc({ outcome: 'failed' });
      await this.prisma.resolutionRun.update({
        where: { id: run.id },
        data: {
          status: 'FAILED',
          error: (err as Error).message,
          durationMs: Date.now() - started,
          finishedAt: new Date(),
        },
      });
      throw err;
    }
  }

  private async persistChainEntities(
    chain: string,
    clusters: { addresses: string[] }[],
    labels: Map<string, LabelRow>,
    eventsByAddr: Map<string, number>,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Full re-materialization for the chain (cascade removes members).
      await tx.entity.deleteMany({ where: { chain } });

      for (const cluster of clusters) {
        const memberLabels: MemberLabel[] = cluster.addresses.map((a) => {
          const l = labels.get(`${chain}:${a}`);
          return { label: l?.label ?? null, category: l?.category ?? null };
        });
        const risk = deriveEntityRisk(memberLabels);
        const entityId = this.entityId(chain, cluster.addresses);

        await tx.entity.create({
          data: {
            id: entityId,
            chain,
            label: risk.label,
            category: risk.category,
            status: 'ACTIVE',
            addressCount: cluster.addresses.length,
            riskScore: risk.riskScore,
            sanctioned: risk.sanctioned,
            resolvedAt: new Date(),
          },
        });
        await tx.entityMember.createMany({
          data: cluster.addresses.map((address) => ({
            id: `mem_${ulid()}`,
            entityId,
            chain,
            address,
            transferEvents: eventsByAddr.get(address) ?? 0,
            label: labels.get(`${chain}:${address}`)?.label ?? null,
          })),
        });
      }
    });
  }

  private entityId(chain: string, addresses: string[]): string {
    const digest = createHash('sha1')
      .update(`${chain}|${[...addresses].sort().join(',')}`)
      .digest('hex')
      .slice(0, 24);
    return `ent_${digest}`;
  }

  private async loadActivity(chain?: string): Promise<ActivityRow[]> {
    const params: Record<string, string | number> = {
      d: this.env.RESOLUTION_LOOKBACK_DAYS,
      max: this.env.RESOLUTION_MAX_ADDRESSES,
    };
    let chainFilter = '';
    if (chain) {
      params.chain = chain;
      chainFilter = 'AND chain_id = {chain:String}';
    }
    const sql = `
      SELECT chain_id AS chain, addr, groupUniqArray(cp) AS cps, sum(cnt) AS events
      FROM (
        SELECT chain_id, from_address AS addr, to_address AS cp, count() AS cnt
        FROM token_transfers FINAL
        WHERE ts >= now() - toIntervalDay({d:UInt32}) ${chainFilter}
        GROUP BY chain_id, from_address, to_address
        UNION ALL
        SELECT chain_id, to_address AS addr, from_address AS cp, count() AS cnt
        FROM token_transfers FINAL
        WHERE ts >= now() - toIntervalDay({d:UInt32}) ${chainFilter}
        GROUP BY chain_id, to_address, from_address
      )
      WHERE addr != ''
      GROUP BY chain_id, addr
      LIMIT {max:UInt32}`;
    return this.clickhouse.query<ActivityRow>(sql, params);
  }

  /** Best-effort label lookup; the dim_addresses mart may not exist yet. */
  private async loadLabels(chain?: string): Promise<Map<string, LabelRow>> {
    const map = new Map<string, LabelRow>();
    try {
      const params: Record<string, string | number> = {};
      let chainFilter = '';
      if (chain) {
        params.chain = chain;
        chainFilter = 'WHERE chain_id = {chain:String}';
      }
      const rows = await this.clickhouse.query<LabelRow>(
        `SELECT chain_id AS chain, address, label, category FROM dim_addresses ${chainFilter}`,
        params,
      );
      for (const r of rows) {
        if (r.label || r.category) map.set(`${r.chain}:${r.address}`, r);
      }
    } catch {
      this.logger.debug('dim_addresses not available; resolving without labels');
    }
    return map;
  }

  async getEntityById(id: string) {
    const entity = await this.prisma.entity.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!entity) {
      throw NotFoundError('intelligence.entity.not_found', `Entity ${id} not found`);
    }
    return entity;
  }

  async findByAddress(chain: string, address: string) {
    const member = await this.prisma.entityMember.findUnique({
      where: { chain_address: { chain, address: address.toLowerCase() } },
      include: { entity: { include: { members: true } } },
    });
    if (!member) {
      throw NotFoundError(
        'intelligence.entity.not_found',
        `No entity resolved for ${chain}:${address}`,
      );
    }
    return member.entity;
  }

  /** Lightweight lookup used by the feature/risk path (no throw). */
  async entityForAddress(chain: string, address: string) {
    const member = await this.prisma.entityMember.findUnique({
      where: { chain_address: { chain, address: address.toLowerCase() } },
      include: { entity: true },
    });
    return member?.entity ?? null;
  }

  async listEntities(opts: { chain?: string; sanctioned?: boolean; limit: number }) {
    return this.prisma.entity.findMany({
      where: {
        status: 'ACTIVE',
        ...(opts.chain ? { chain: opts.chain } : {}),
        ...(opts.sanctioned !== undefined ? { sanctioned: opts.sanctioned } : {}),
      },
      orderBy: [{ riskScore: 'desc' }, { addressCount: 'desc' }],
      take: opts.limit,
      include: { members: true },
    });
  }

  async listRuns(limit: number) {
    return this.prisma.resolutionRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
